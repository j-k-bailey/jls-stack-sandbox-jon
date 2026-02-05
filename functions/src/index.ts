import { onDocumentWritten } from "firebase-functions/v2/firestore";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import * as logger from "firebase-functions/logger";

// ============================================================================
// INITIALIZATION
// ============================================================================

const app = initializeApp();
const db = getFirestore(app);
const auth = getAuth(app);

// ============================================================================
// TYPES & HELPERS
// ============================================================================

/**
 * Compute custom claims from user role
 * Security rules will interpret these permissions
 */
function computeCustomClaims(userData: any): Record<string, any> {
  const role = userData.role || "viewer";

  return {
    role,
  };
}

// ============================================================================
// CLOUD FUNCTIONS
// ============================================================================

/**
 * Automatically sync user role to custom claims
 * Triggered whenever a user document is created or updated
 */
export const syncUserCustomClaims = onDocumentWritten(
  "users/{userId}",
  async (event) => {
    const userId = event.params.userId;

    // If document was deleted, clear claims
    if (!event.data?.after.exists) {
      logger.info(`User ${userId} deleted, clearing custom claims`);
      await auth.setCustomUserClaims(userId, null);
      return;
    }

    const beforeData = event.data.before?.data();
    const afterData = event.data.after.data();

    // INFINITE LOOP GUARD
    // Only update if the role actually changed
    if (beforeData && beforeData.role === afterData?.role) {
      logger.debug(`Role unchanged for user ${userId}, skipping sync`);
      return;
    }

    const customClaims = computeCustomClaims(afterData);

    try {
      await auth.setCustomUserClaims(userId, customClaims);

      // Update lastTokenRefresh timestamp (won't retrigger due to guard above)
      await event.data.after.ref.update({
        lastTokenRefresh: FieldValue.serverTimestamp(),
      });

      logger.info(`Synced custom claims for user ${userId}:`, customClaims);
    } catch (error) {
      logger.error(`Error syncing custom claims for user ${userId}:`, error);
    }
  },
);

/**
 * Optional: Admin function to create users programmatically
 * Not needed for Google sign-in, but useful for testing or admin panels
 */
export const createUserFunction = onCall(async (request) => {
  const { email, password, role } = request.data;

  // Only admins can create users
  if (request.auth?.token?.role !== "admin") {
    throw new HttpsError("permission-denied", "Only admins can create users");
  }

  try {
    // Create Firebase Auth user
    const userRecord = await auth.createUser({
      email,
      password,
    });

    // Create Firestore profile with specified role
    await db
      .collection("users")
      .doc(userRecord.uid)
      .set({
        firstName: "New",
        lastNameInitial: "U",
        role: role || "viewer",
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });

    logger.info(`Created user ${userRecord.uid} with role ${role}`);

    return { uid: userRecord.uid };
  } catch (error: any) {
    logger.error("Error creating user:", error);
    throw new HttpsError("internal", error.message);
  }
});

/**
 * Optional: Update user role (admin-only)
 * Useful for admin panels where you want to change user permissions
 */
export const updateUserRole = onCall(async (request) => {
  const { userId, role } = request.data;

  // Only admins can update roles
  if (request.auth?.token?.role !== "admin") {
    throw new HttpsError(
      "permission-denied",
      "Only admins can update user roles",
    );
  }

  if (!["viewer", "contributor", "moderator", "admin"].includes(role)) {
    throw new HttpsError("invalid-argument", "Invalid role specified");
  }

  try {
    await db.collection("users").doc(userId).update({
      role,
      updatedAt: FieldValue.serverTimestamp(),
    });

    logger.info(`Updated user ${userId} role to ${role}`);

    return { success: true };
  } catch (error: any) {
    logger.error("Error updating user role:", error);
    throw new HttpsError("internal", error.message);
  }
});
