/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { readFileSync } from "fs";

let testEnv: RulesTestEnvironment;

const rules = readFileSync("firestore.rules", "utf8");

// Test data factory
function createTestIdea(ownerId: string, overrides = {}) {
  return {
    title: "Test Idea",
    summary: "A test product idea",
    status: "draft",
    ownerId,
    tags: ["test"],
    priority: "next",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    archivedAt: null,
    ...overrides,
  };
}

function createTestNote(authorId: string, overrides = {}) {
  return {
    body: "Test note content",
    authorId,
    authorDisplayName: "Test User",
    authorPhotoURL: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    archivedAt: null,
    ...overrides,
  };
}

function createTestUser(userId: string, role: string) {
  return {
    firstName: "Test",
    lastNameInitial: "U",
    role,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}

// Setup helper to create data without rules
async function setupTestData(callback: (db: any) => Promise<void>) {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    await callback(context.firestore());
  });
}

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: "test-project",
    firestore: {
      rules,
      host: "127.0.0.1",
      port: 8080,
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

// ============================================
// USERS COLLECTION
// ============================================

describe("Users Collection", () => {
  // ------------------------------------------
  // AUTHENTICATION CHECKS
  // ------------------------------------------
  describe("Authentication Checks", () => {
    describe("read operations", () => {
      test("authenticated users can read any profile", async () => {
        await setupTestData(async (db) => {
          await setDoc(
            doc(db, "users", "user-1"),
            createTestUser("user-1", "viewer"),
          );
        });

        const db = testEnv
          .authenticatedContext("user-2", { role: "viewer" })
          .firestore();
        await assertSucceeds(getDoc(doc(db, "users", "user-1")));
      });

      test("unauthenticated users cannot read profiles", async () => {
        await setupTestData(async (db) => {
          await setDoc(
            doc(db, "users", "user-1"),
            createTestUser("user-1", "viewer"),
          );
        });

        const db = testEnv.unauthenticatedContext().firestore();
        await assertFails(getDoc(doc(db, "users", "user-1")));
      });
    });

    describe("create operations", () => {
      test("authenticated users can create their own profile as viewer", async () => {
        const db = testEnv.authenticatedContext("user-1", {}).firestore();

        await assertSucceeds(
          setDoc(
            doc(db, "users", "user-1"),
            createTestUser("user-1", "viewer"),
          ),
        );
      });

      test("authenticated users cannot create profile with contributor role", async () => {
        const db = testEnv.authenticatedContext("user-1", {}).firestore();

        await assertFails(
          setDoc(
            doc(db, "users", "user-1"),
            createTestUser("user-1", "contributor"),
          ),
        );
      });

      test("authenticated users cannot create profile with moderator role", async () => {
        const db = testEnv.authenticatedContext("user-1", {}).firestore();

        await assertFails(
          setDoc(
            doc(db, "users", "user-1"),
            createTestUser("user-1", "moderator"),
          ),
        );
      });

      test("authenticated users cannot create profile with admin role", async () => {
        const db = testEnv.authenticatedContext("user-1", {}).firestore();

        await assertFails(
          setDoc(doc(db, "users", "user-1"), createTestUser("user-1", "admin")),
        );
      });

      test("users with existing role in token cannot escalate on create", async () => {
        const db = testEnv
          .authenticatedContext("user-1", { role: "viewer" })
          .firestore();

        await assertFails(
          setDoc(doc(db, "users", "user-1"), createTestUser("user-1", "admin")),
        );
      });

      test("unauthenticated users cannot create profiles", async () => {
        const db = testEnv.unauthenticatedContext().firestore();
        await assertFails(
          setDoc(
            doc(db, "users", "user-1"),
            createTestUser("user-1", "viewer"),
          ),
        );
      });
    });

    describe("update operations", () => {
      beforeEach(async () => {
        await setupTestData(async (db) => {
          await setDoc(
            doc(db, "users", "user-1"),
            createTestUser("user-1", "viewer"),
          );
        });
      });

      test("admins can update user profiles", async () => {
        const db = testEnv
          .authenticatedContext("admin", { role: "admin" })
          .firestore();

        await assertSucceeds(
          updateDoc(doc(db, "users", "user-1"), { role: "contributor" }),
        );
      });

      test("admins can update firstName and lastNameInitial", async () => {
        const db = testEnv
          .authenticatedContext("admin", { role: "admin" })
          .firestore();

        await assertSucceeds(
          updateDoc(doc(db, "users", "user-1"), {
            firstName: "NewName",
            lastNameInitial: "Z",
          }),
        );
      });

      test("viewers cannot update user profiles", async () => {
        const db = testEnv
          .authenticatedContext("viewer", { role: "viewer" })
          .firestore();

        await assertFails(
          updateDoc(doc(db, "users", "user-1"), { role: "admin" }),
        );
      });

      test("contributors cannot update user profiles", async () => {
        const db = testEnv
          .authenticatedContext("contrib", { role: "contributor" })
          .firestore();

        await assertFails(
          updateDoc(doc(db, "users", "user-1"), { role: "admin" }),
        );
      });

      test("moderators cannot update user profiles", async () => {
        const db = testEnv
          .authenticatedContext("mod", { role: "moderator" })
          .firestore();

        await assertFails(
          updateDoc(doc(db, "users", "user-1"), { role: "admin" }),
        );
      });

      test("non-admins cannot update their own profile", async () => {
        const db = testEnv
          .authenticatedContext("user-1", { role: "viewer" })
          .firestore();

        await assertFails(
          updateDoc(doc(db, "users", "user-1"), { firstName: "Updated" }),
        );
      });

      test("unauthenticated users cannot update profiles", async () => {
        const db = testEnv.unauthenticatedContext().firestore();

        await assertFails(
          updateDoc(doc(db, "users", "user-1"), { firstName: "Hacker" }),
        );
      });
    });

    describe("delete operations", () => {
      beforeEach(async () => {
        await setupTestData(async (db) => {
          await setDoc(
            doc(db, "users", "user-1"),
            createTestUser("user-1", "viewer"),
          );
        });
      });

      test("admins cannot delete user profiles", async () => {
        const db = testEnv
          .authenticatedContext("admin", { role: "admin" })
          .firestore();

        await assertFails(deleteDoc(doc(db, "users", "user-1")));
      });

      test("users cannot delete their own profiles", async () => {
        const db = testEnv
          .authenticatedContext("user-1", { role: "viewer" })
          .firestore();

        await assertFails(deleteDoc(doc(db, "users", "user-1")));
      });
    });
  });

  // ------------------------------------------
  // OWNERSHIP CHECKS
  // ------------------------------------------
  describe("Ownership Checks", () => {
    describe("create operations", () => {
      test("users cannot create someone else's profile", async () => {
        const db = testEnv.authenticatedContext("user-1", {}).firestore();

        await assertFails(
          setDoc(
            doc(db, "users", "user-2"),
            createTestUser("user-2", "viewer"),
          ),
        );
      });
    });
  });

  // ------------------------------------------
  // DATA VALIDATION
  // ------------------------------------------
  describe("Data Validation", () => {
    describe("firstName validation", () => {
      test("create fails with empty firstName", async () => {
        const db = testEnv.authenticatedContext("user-1", {}).firestore();

        await assertFails(
          setDoc(doc(db, "users", "user-1"), {
            ...createTestUser("user-1", "viewer"),
            firstName: "",
          }),
        );
      });

      test("create fails with firstName over 50 chars", async () => {
        const db = testEnv.authenticatedContext("user-1", {}).firestore();

        await assertFails(
          setDoc(doc(db, "users", "user-1"), {
            ...createTestUser("user-1", "viewer"),
            firstName: "a".repeat(51),
          }),
        );
      });

      test("create succeeds with firstName exactly 50 chars", async () => {
        const db = testEnv.authenticatedContext("user-1", {}).firestore();

        await assertSucceeds(
          setDoc(doc(db, "users", "user-1"), {
            ...createTestUser("user-1", "viewer"),
            firstName: "a".repeat(50),
          }),
        );
      });

      test("update fails with empty firstName", async () => {
        await setupTestData(async (db) => {
          await setDoc(
            doc(db, "users", "user-1"),
            createTestUser("user-1", "viewer"),
          );
        });

        const db = testEnv
          .authenticatedContext("admin", { role: "admin" })
          .firestore();

        await assertFails(
          updateDoc(doc(db, "users", "user-1"), { firstName: "" }),
        );
      });
    });

    describe("lastNameInitial validation", () => {
      test("create fails with lastNameInitial over 1 char", async () => {
        const db = testEnv.authenticatedContext("user-1", {}).firestore();

        await assertFails(
          setDoc(doc(db, "users", "user-1"), {
            ...createTestUser("user-1", "viewer"),
            lastNameInitial: "AB",
          }),
        );
      });

      test("create succeeds with empty lastNameInitial", async () => {
        const db = testEnv.authenticatedContext("user-1", {}).firestore();

        await assertSucceeds(
          setDoc(doc(db, "users", "user-1"), {
            ...createTestUser("user-1", "viewer"),
            lastNameInitial: "",
          }),
        );
      });
    });

    describe("role validation", () => {
      test("create fails with invalid role", async () => {
        const db = testEnv.authenticatedContext("user-1", {}).firestore();

        await assertFails(
          setDoc(doc(db, "users", "user-1"), {
            ...createTestUser("user-1", "viewer"),
            role: "superadmin",
          }),
        );
      });

      test("update fails with invalid role value", async () => {
        await setupTestData(async (db) => {
          await setDoc(
            doc(db, "users", "user-1"),
            createTestUser("user-1", "viewer"),
          );
        });

        const db = testEnv
          .authenticatedContext("admin", { role: "admin" })
          .firestore();

        await assertFails(
          updateDoc(doc(db, "users", "user-1"), { role: "superuser" }),
        );
      });
    });
  });
});

// ============================================
// PRODUCT IDEAS COLLECTION
// ============================================

describe("Product Ideas Collection", () => {
  // ------------------------------------------
  // AUTHENTICATION CHECKS
  // ------------------------------------------
  describe("Authentication Checks", () => {
    describe("read operations", () => {
      test("authenticated users can read ideas", async () => {
        await setupTestData(async (db) => {
          await setDoc(
            doc(db, "productIdeas", "idea-1"),
            createTestIdea("other-user"),
          );
        });

        const db = testEnv
          .authenticatedContext("viewer-1", { role: "viewer" })
          .firestore();
        await assertSucceeds(getDoc(doc(db, "productIdeas", "idea-1")));
      });

      test("authenticated users can list ideas", async () => {
        await setupTestData(async (db) => {
          await setDoc(
            doc(db, "productIdeas", "idea-1"),
            createTestIdea("user-1"),
          );
          await setDoc(
            doc(db, "productIdeas", "idea-2"),
            createTestIdea("user-2"),
          );
        });

        const db = testEnv
          .authenticatedContext("viewer-1", { role: "viewer" })
          .firestore();
        await assertSucceeds(getDocs(collection(db, "productIdeas")));
      });

      test("unauthenticated users cannot read ideas", async () => {
        await setupTestData(async (db) => {
          await setDoc(
            doc(db, "productIdeas", "idea-1"),
            createTestIdea("user-1"),
          );
        });

        const db = testEnv.unauthenticatedContext().firestore();
        await assertFails(getDoc(doc(db, "productIdeas", "idea-1")));
      });
    });

    describe("create operations", () => {
      test("contributors can create ideas", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertSucceeds(
          addDoc(collection(db, "productIdeas"), createTestIdea("contrib-1")),
        );
      });

      test("moderators can create ideas", async () => {
        const db = testEnv
          .authenticatedContext("mod-1", { role: "moderator" })
          .firestore();

        await assertSucceeds(
          addDoc(collection(db, "productIdeas"), createTestIdea("mod-1")),
        );
      });

      test("admins can create ideas", async () => {
        const db = testEnv
          .authenticatedContext("admin-1", { role: "admin" })
          .firestore();

        await assertSucceeds(
          addDoc(collection(db, "productIdeas"), createTestIdea("admin-1")),
        );
      });

      test("viewers cannot create ideas", async () => {
        const db = testEnv
          .authenticatedContext("viewer-1", { role: "viewer" })
          .firestore();

        await assertFails(
          addDoc(collection(db, "productIdeas"), createTestIdea("viewer-1")),
        );
      });

      test("unauthenticated users cannot create ideas", async () => {
        const db = testEnv.unauthenticatedContext().firestore();

        await assertFails(
          addDoc(collection(db, "productIdeas"), createTestIdea("anyone")),
        );
      });
    });

    describe("update operations", () => {
      beforeEach(async () => {
        await setupTestData(async (db) => {
          await setDoc(
            doc(db, "productIdeas", "idea-1"),
            createTestIdea("contrib-1"),
          );
        });
      });

      test("contributors can update their own ideas", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertSucceeds(
          updateDoc(doc(db, "productIdeas", "idea-1"), {
            title: "Updated Title",
            summary: "Updated summary",
            status: "active",
            ownerId: "contrib-1",
          }),
        );
      });

      test("contributors cannot update others' ideas", async () => {
        const db = testEnv
          .authenticatedContext("contrib-2", { role: "contributor" })
          .firestore();

        await assertFails(
          updateDoc(doc(db, "productIdeas", "idea-1"), {
            title: "Hacked Title",
            summary: "Updated summary",
            status: "active",
            ownerId: "contrib-1",
          }),
        );
      });

      test("moderators can update any idea", async () => {
        const db = testEnv
          .authenticatedContext("mod-1", { role: "moderator" })
          .firestore();

        await assertSucceeds(
          updateDoc(doc(db, "productIdeas", "idea-1"), {
            title: "Moderator Updated",
            summary: "Updated by moderator",
            status: "active",
            ownerId: "contrib-1",
          }),
        );
      });

      test("admins can update any idea", async () => {
        const db = testEnv
          .authenticatedContext("admin-1", { role: "admin" })
          .firestore();

        await assertSucceeds(
          updateDoc(doc(db, "productIdeas", "idea-1"), {
            title: "Admin Updated",
            summary: "Updated by admin",
            status: "active",
            ownerId: "contrib-1",
          }),
        );
      });

      test("viewers cannot update any ideas", async () => {
        const db = testEnv
          .authenticatedContext("viewer-1", { role: "viewer" })
          .firestore();

        await assertFails(
          updateDoc(doc(db, "productIdeas", "idea-1"), {
            title: "Viewer trying to update",
            summary: "Updated summary",
            status: "active",
            ownerId: "contrib-1",
          }),
        );
      });

      test("unauthenticated users cannot update ideas", async () => {
        const db = testEnv.unauthenticatedContext().firestore();

        await assertFails(
          updateDoc(doc(db, "productIdeas", "idea-1"), {
            title: "Hacked",
            summary: "Updated summary",
            status: "active",
            ownerId: "contrib-1",
          }),
        );
      });

      test("partial updates are allowed", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertSucceeds(
          updateDoc(doc(db, "productIdeas", "idea-1"), {
            title: "Updated Title",
            ownerId: "contrib-1",
          }),
        );
      });

      test("contributors can archive their own ideas", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertSucceeds(
          updateDoc(doc(db, "productIdeas", "idea-1"), {
            archivedAt: serverTimestamp(),
            ownerId: "contrib-1",
          }),
        );
      });

      test("moderators can archive any idea", async () => {
        const db = testEnv
          .authenticatedContext("mod-1", { role: "moderator" })
          .firestore();

        await assertSucceeds(
          updateDoc(doc(db, "productIdeas", "idea-1"), {
            archivedAt: serverTimestamp(),
            ownerId: "contrib-1",
          }),
        );
      });
    });

    describe("delete operations", () => {
      beforeEach(async () => {
        await setupTestData(async (db) => {
          await setDoc(
            doc(db, "productIdeas", "idea-1"),
            createTestIdea("contrib-1"),
          );
        });
      });

      test("contributors cannot delete their own ideas", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(deleteDoc(doc(db, "productIdeas", "idea-1")));
      });

      test("contributors cannot delete others' ideas", async () => {
        const db = testEnv
          .authenticatedContext("contrib-2", { role: "contributor" })
          .firestore();

        await assertFails(deleteDoc(doc(db, "productIdeas", "idea-1")));
      });

      test("moderators cannot delete any ideas", async () => {
        const db = testEnv
          .authenticatedContext("mod-1", { role: "moderator" })
          .firestore();

        await assertFails(deleteDoc(doc(db, "productIdeas", "idea-1")));
      });

      test("admins can delete any idea", async () => {
        const db = testEnv
          .authenticatedContext("admin-1", { role: "admin" })
          .firestore();

        await assertSucceeds(deleteDoc(doc(db, "productIdeas", "idea-1")));
      });

      test("viewers cannot delete any ideas", async () => {
        const db = testEnv
          .authenticatedContext("viewer-1", { role: "viewer" })
          .firestore();

        await assertFails(deleteDoc(doc(db, "productIdeas", "idea-1")));
      });

      test("unauthenticated users cannot delete ideas", async () => {
        const db = testEnv.unauthenticatedContext().firestore();

        await assertFails(deleteDoc(doc(db, "productIdeas", "idea-1")));
      });
    });
  });

  // ------------------------------------------
  // OWNERSHIP CHECKS
  // ------------------------------------------
  describe("Ownership Checks", () => {
    describe("create operations", () => {
      test("users cannot create ideas owned by others", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(
          addDoc(collection(db, "productIdeas"), createTestIdea("other-user")),
        );
      });
    });

    describe("update operations", () => {
      beforeEach(async () => {
        await setupTestData(async (db) => {
          await setDoc(
            doc(db, "productIdeas", "idea-1"),
            createTestIdea("contrib-1"),
          );
        });
      });

      test("owner cannot change ownerId to another user", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(
          updateDoc(doc(db, "productIdeas", "idea-1"), {
            title: "Updated",
            summary: "Updated summary",
            status: "active",
            ownerId: "other-user",
          }),
        );
      });

      test("admin cannot change ownerId", async () => {
        const db = testEnv
          .authenticatedContext("admin-1", { role: "admin" })
          .firestore();

        await assertFails(
          updateDoc(doc(db, "productIdeas", "idea-1"), {
            title: "Updated",
            summary: "Updated summary",
            status: "active",
            ownerId: "admin-1",
          }),
        );
      });

      test("update requires ownerId to match existing", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertSucceeds(
          updateDoc(doc(db, "productIdeas", "idea-1"), {
            title: "Updated",
            summary: "Updated summary",
            status: "active",
            ownerId: "contrib-1",
          }),
        );
      });

      test("cannot change createdAt timestamp", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(
          updateDoc(doc(db, "productIdeas", "idea-1"), {
            title: "Updated",
            summary: "Updated summary",
            status: "active",
            ownerId: "contrib-1",
            createdAt: serverTimestamp(),
          }),
        );
      });
    });
  });

  // ------------------------------------------
  // DATA VALIDATION
  // ------------------------------------------
  describe("Data Validation", () => {
    describe("required fields", () => {
      test("create fails with missing title", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(
          addDoc(collection(db, "productIdeas"), {
            summary: "Test summary",
            status: "draft",
            ownerId: "contrib-1",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            archivedAt: null,
          }),
        );
      });

      test("create fails with missing summary", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(
          addDoc(collection(db, "productIdeas"), {
            title: "Test title",
            status: "draft",
            ownerId: "contrib-1",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            archivedAt: null,
          }),
        );
      });

      test("create fails with missing status", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(
          addDoc(collection(db, "productIdeas"), {
            title: "Test title",
            summary: "Test summary",
            ownerId: "contrib-1",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            archivedAt: null,
          }),
        );
      });

      test("create fails with missing ownerId", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(
          addDoc(collection(db, "productIdeas"), {
            title: "Test title",
            summary: "Test summary",
            status: "draft",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            archivedAt: null,
          }),
        );
      });
    });

    describe("title validation", () => {
      test("create fails with empty title", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(
          addDoc(
            collection(db, "productIdeas"),
            createTestIdea("contrib-1", { title: "" }),
          ),
        );
      });

      test("create fails with title over 100 chars", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(
          addDoc(
            collection(db, "productIdeas"),
            createTestIdea("contrib-1", { title: "a".repeat(101) }),
          ),
        );
      });

      test("create succeeds with title exactly 100 chars", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertSucceeds(
          addDoc(
            collection(db, "productIdeas"),
            createTestIdea("contrib-1", { title: "a".repeat(100) }),
          ),
        );
      });

      test("create fails with non-string title", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(
          addDoc(
            collection(db, "productIdeas"),
            createTestIdea("contrib-1", { title: 123 as any }),
          ),
        );
      });

      test("update fails with empty title", async () => {
        await setupTestData(async (db) => {
          await setDoc(
            doc(db, "productIdeas", "idea-1"),
            createTestIdea("contrib-1"),
          );
        });

        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(
          updateDoc(doc(db, "productIdeas", "idea-1"), {
            title: "",
            summary: "Valid summary",
            status: "draft",
            ownerId: "contrib-1",
          }),
        );
      });

      test("update fails with title over 100 chars", async () => {
        await setupTestData(async (db) => {
          await setDoc(
            doc(db, "productIdeas", "idea-1"),
            createTestIdea("contrib-1"),
          );
        });

        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(
          updateDoc(doc(db, "productIdeas", "idea-1"), {
            title: "a".repeat(101),
            summary: "Valid summary",
            status: "draft",
            ownerId: "contrib-1",
          }),
        );
      });

      test("update fails with non-string title", async () => {
        await setupTestData(async (db) => {
          await setDoc(
            doc(db, "productIdeas", "idea-1"),
            createTestIdea("contrib-1"),
          );
        });

        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(
          updateDoc(doc(db, "productIdeas", "idea-1"), {
            title: 123 as any,
            summary: "Valid summary",
            status: "draft",
            ownerId: "contrib-1",
          }),
        );
      });
    });

    describe("summary validation", () => {
      test("create fails with empty summary", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(
          addDoc(
            collection(db, "productIdeas"),
            createTestIdea("contrib-1", { summary: "" }),
          ),
        );
      });

      test("create fails with summary over 1000 chars", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(
          addDoc(
            collection(db, "productIdeas"),
            createTestIdea("contrib-1", { summary: "a".repeat(1001) }),
          ),
        );
      });

      test("create succeeds with summary exactly 1000 chars", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertSucceeds(
          addDoc(
            collection(db, "productIdeas"),
            createTestIdea("contrib-1", { summary: "a".repeat(1000) }),
          ),
        );
      });

      test("create fails with non-string summary", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(
          addDoc(
            collection(db, "productIdeas"),
            createTestIdea("contrib-1", { summary: true as any }),
          ),
        );
      });

      test("update fails with summary over 1000 chars", async () => {
        await setupTestData(async (db) => {
          await setDoc(
            doc(db, "productIdeas", "idea-1"),
            createTestIdea("contrib-1"),
          );
        });

        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(
          updateDoc(doc(db, "productIdeas", "idea-1"), {
            title: "Valid title",
            summary: "a".repeat(1001),
            status: "draft",
            ownerId: "contrib-1",
          }),
        );
      });
    });

    describe("status validation", () => {
      test("create fails with invalid status", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(
          addDoc(
            collection(db, "productIdeas"),
            createTestIdea("contrib-1", { status: "invalid-status" }),
          ),
        );
      });

      test("create succeeds with all valid status values", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        for (const status of ["draft", "active", "paused", "shipped"]) {
          await assertSucceeds(
            addDoc(
              collection(db, "productIdeas"),
              createTestIdea("contrib-1", { status }),
            ),
          );
        }
      });

      test("update fails with invalid status", async () => {
        await setupTestData(async (db) => {
          await setDoc(
            doc(db, "productIdeas", "idea-1"),
            createTestIdea("contrib-1"),
          );
        });

        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(
          updateDoc(doc(db, "productIdeas", "idea-1"), {
            title: "Valid title",
            summary: "Valid summary",
            status: "invalid",
            ownerId: "contrib-1",
          }),
        );
      });
    });

    describe("tags validation", () => {
      test("create fails with tags array over 10 items", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(
          addDoc(
            collection(db, "productIdeas"),
            createTestIdea("contrib-1", { tags: Array(11).fill("tag") }),
          ),
        );
      });

      test("create succeeds with tags array exactly 10 items", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertSucceeds(
          addDoc(
            collection(db, "productIdeas"),
            createTestIdea("contrib-1", { tags: Array(10).fill("tag") }),
          ),
        );
      });

      test("create succeeds with empty tags array", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertSucceeds(
          addDoc(
            collection(db, "productIdeas"),
            createTestIdea("contrib-1", { tags: [] }),
          ),
        );
      });

      test("create fails with non-list tags", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(
          addDoc(
            collection(db, "productIdeas"),
            createTestIdea("contrib-1", { tags: "not-a-list" as any }),
          ),
        );
      });

      test("update fails with tags over 10 items", async () => {
        await setupTestData(async (db) => {
          await setDoc(
            doc(db, "productIdeas", "idea-1"),
            createTestIdea("contrib-1"),
          );
        });

        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(
          updateDoc(doc(db, "productIdeas", "idea-1"), {
            title: "Valid title",
            summary: "Valid summary",
            status: "draft",
            tags: Array(11).fill("tag"),
            ownerId: "contrib-1",
          }),
        );
      });
    });

    describe("priority validation", () => {
      test("create fails with invalid priority", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(
          addDoc(
            collection(db, "productIdeas"),
            createTestIdea("contrib-1", { priority: "critical" }),
          ),
        );
      });

      test("create succeeds with priority: now", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertSucceeds(
          addDoc(
            collection(db, "productIdeas"),
            createTestIdea("contrib-1", { priority: "now" }),
          ),
        );
      });

      test("create succeeds with priority: next", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertSucceeds(
          addDoc(
            collection(db, "productIdeas"),
            createTestIdea("contrib-1", { priority: "next" }),
          ),
        );
      });

      test("create succeeds with priority: later", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertSucceeds(
          addDoc(
            collection(db, "productIdeas"),
            createTestIdea("contrib-1", { priority: "later" }),
          ),
        );
      });

      test("update fails with invalid priority", async () => {
        await setupTestData(async (db) => {
          await setDoc(
            doc(db, "productIdeas", "idea-1"),
            createTestIdea("contrib-1"),
          );
        });

        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        await assertFails(
          updateDoc(doc(db, "productIdeas", "idea-1"), {
            title: "Valid title",
            summary: "Valid summary",
            status: "draft",
            priority: "urgent",
            ownerId: "contrib-1",
          }),
        );
      });

      test("update succeeds with valid priority values", async () => {
        await setupTestData(async (db) => {
          await setDoc(
            doc(db, "productIdeas", "idea-1"),
            createTestIdea("contrib-1"),
          );
        });

        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        for (const priority of ["now", "next", "later"]) {
          await assertSucceeds(
            updateDoc(doc(db, "productIdeas", "idea-1"), {
              title: "Valid title",
              summary: "Valid summary",
              status: "draft",
              priority,
              ownerId: "contrib-1",
            }),
          );
        }
      });
    });

    describe("optional fields", () => {
      test("create succeeds without tags field", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        const ideaWithoutTags = { ...createTestIdea("contrib-1") } as any;
        delete ideaWithoutTags.tags;

        await assertSucceeds(
          addDoc(collection(db, "productIdeas"), ideaWithoutTags),
        );
      });

      test("create succeeds without priority field", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        const ideaWithoutPriority = { ...createTestIdea("contrib-1") } as any;
        delete ideaWithoutPriority.priority;

        await assertSucceeds(
          addDoc(collection(db, "productIdeas"), ideaWithoutPriority),
        );
      });

      test("create succeeds without both tags and priority", async () => {
        const db = testEnv
          .authenticatedContext("contrib-1", { role: "contributor" })
          .firestore();

        const minimalIdea = { ...createTestIdea("contrib-1") } as any;
        delete minimalIdea.tags;
        delete minimalIdea.priority;

        await assertSucceeds(
          addDoc(collection(db, "productIdeas"), minimalIdea),
        );
      });
    });
  });

  // ------------------------------------------
  // SUBCOLLECTIONS
  // ------------------------------------------
  describe("Notes Subcollection", () => {
    beforeEach(async () => {
      await setupTestData(async (db) => {
        await setDoc(
          doc(db, "productIdeas", "idea-1"),
          createTestIdea("contrib-1"),
        );
        await setDoc(
          doc(db, "productIdeas", "idea-1", "notes", "note-1"),
          createTestNote("contrib-1"),
        );
      });
    });

    // ----------------------------------------
    // Authentication Checks
    // ----------------------------------------
    describe("Authentication Checks", () => {
      describe("read operations", () => {
        test("authenticated users can read notes", async () => {
          const db = testEnv
            .authenticatedContext("viewer-1", { role: "viewer" })
            .firestore();

          await assertSucceeds(
            getDoc(doc(db, "productIdeas", "idea-1", "notes", "note-1")),
          );
        });

        test("unauthenticated users cannot read notes", async () => {
          const db = testEnv.unauthenticatedContext().firestore();

          await assertFails(
            getDoc(doc(db, "productIdeas", "idea-1", "notes", "note-1")),
          );
        });
      });

      describe("create operations", () => {
        test("contributors can create notes", async () => {
          const db = testEnv
            .authenticatedContext("contrib-2", { role: "contributor" })
            .firestore();

          await assertSucceeds(
            addDoc(
              collection(db, "productIdeas", "idea-1", "notes"),
              createTestNote("contrib-2"),
            ),
          );
        });

        test("moderators can create notes", async () => {
          const db = testEnv
            .authenticatedContext("mod-1", { role: "moderator" })
            .firestore();

          await assertSucceeds(
            addDoc(
              collection(db, "productIdeas", "idea-1", "notes"),
              createTestNote("mod-1"),
            ),
          );
        });

        test("admins can create notes", async () => {
          const db = testEnv
            .authenticatedContext("admin-1", { role: "admin" })
            .firestore();

          await assertSucceeds(
            addDoc(
              collection(db, "productIdeas", "idea-1", "notes"),
              createTestNote("admin-1"),
            ),
          );
        });

        test("viewers cannot create notes", async () => {
          const db = testEnv
            .authenticatedContext("viewer-1", { role: "viewer" })
            .firestore();

          await assertFails(
            addDoc(
              collection(db, "productIdeas", "idea-1", "notes"),
              createTestNote("viewer-1"),
            ),
          );
        });

        test("unauthenticated users cannot create notes", async () => {
          const db = testEnv.unauthenticatedContext().firestore();

          await assertFails(
            addDoc(
              collection(db, "productIdeas", "idea-1", "notes"),
              createTestNote("anyone"),
            ),
          );
        });
      });

      describe("update operations", () => {
        test("note authors can update their own notes", async () => {
          const db = testEnv
            .authenticatedContext("contrib-1", { role: "contributor" })
            .firestore();

          await assertSucceeds(
            updateDoc(doc(db, "productIdeas", "idea-1", "notes", "note-1"), {
              body: "Updated content",
              authorId: "contrib-1",
              authorDisplayName: "Test User",
            }),
          );
        });

        test("note authors cannot update others' notes", async () => {
          const db = testEnv
            .authenticatedContext("contrib-2", { role: "contributor" })
            .firestore();

          await assertFails(
            updateDoc(doc(db, "productIdeas", "idea-1", "notes", "note-1"), {
              body: "Trying to update someone else's note",
              authorId: "contrib-1",
              authorDisplayName: "Test User",
            }),
          );
        });

        test("moderators can update any note", async () => {
          const db = testEnv
            .authenticatedContext("mod-1", { role: "moderator" })
            .firestore();

          await assertSucceeds(
            updateDoc(doc(db, "productIdeas", "idea-1", "notes", "note-1"), {
              body: "Moderator updated content",
              authorId: "contrib-1",
              authorDisplayName: "Test User",
            }),
          );
        });

        test("admins can update any note", async () => {
          const db = testEnv
            .authenticatedContext("admin-1", { role: "admin" })
            .firestore();

          await assertSucceeds(
            updateDoc(doc(db, "productIdeas", "idea-1", "notes", "note-1"), {
              body: "Admin updated content",
              authorId: "contrib-1",
              authorDisplayName: "Test User",
            }),
          );
        });

        test("viewers cannot update any notes", async () => {
          const db = testEnv
            .authenticatedContext("viewer-1", { role: "viewer" })
            .firestore();

          await assertFails(
            updateDoc(doc(db, "productIdeas", "idea-1", "notes", "note-1"), {
              body: "Viewer trying to update",
              authorId: "contrib-1",
              authorDisplayName: "Test User",
            }),
          );
        });

        test("cannot change authorId", async () => {
          const db = testEnv
            .authenticatedContext("contrib-1", { role: "contributor" })
            .firestore();

          await assertFails(
            updateDoc(doc(db, "productIdeas", "idea-1", "notes", "note-1"), {
              body: "Updated content",
              authorId: "different-user",
              authorDisplayName: "Test User",
            }),
          );
        });

        test("cannot change createdAt timestamp", async () => {
          const db = testEnv
            .authenticatedContext("contrib-1", { role: "contributor" })
            .firestore();

          await assertFails(
            updateDoc(doc(db, "productIdeas", "idea-1", "notes", "note-1"), {
              body: "Updated content",
              authorId: "contrib-1",
              authorDisplayName: "Test User",
              createdAt: serverTimestamp(),
            }),
          );
        });

        test("contributors can archive their own notes", async () => {
          const db = testEnv
            .authenticatedContext("contrib-1", { role: "contributor" })
            .firestore();

          await assertSucceeds(
            updateDoc(doc(db, "productIdeas", "idea-1", "notes", "note-1"), {
              body: "Test note content",
              authorId: "contrib-1",
              authorDisplayName: "Test User",
              archivedAt: serverTimestamp(),
            }),
          );
        });

        test("moderators can archive any note", async () => {
          const db = testEnv
            .authenticatedContext("mod-1", { role: "moderator" })
            .firestore();

          await assertSucceeds(
            updateDoc(doc(db, "productIdeas", "idea-1", "notes", "note-1"), {
              body: "Test note content",
              authorId: "contrib-1",
              authorDisplayName: "Test User",
              archivedAt: serverTimestamp(),
            }),
          );
        });
      });

      describe("delete operations", () => {
        test("note authors cannot delete their own notes", async () => {
          const db = testEnv
            .authenticatedContext("contrib-1", { role: "contributor" })
            .firestore();

          await assertFails(
            deleteDoc(doc(db, "productIdeas", "idea-1", "notes", "note-1")),
          );
        });

        test("non-authors cannot delete notes", async () => {
          const db = testEnv
            .authenticatedContext("contrib-2", { role: "contributor" })
            .firestore();

          await assertFails(
            deleteDoc(doc(db, "productIdeas", "idea-1", "notes", "note-1")),
          );
        });

        test("moderators cannot delete any notes", async () => {
          const db = testEnv
            .authenticatedContext("mod-1", { role: "moderator" })
            .firestore();

          await assertFails(
            deleteDoc(doc(db, "productIdeas", "idea-1", "notes", "note-1")),
          );
        });

        test("admins can delete any note", async () => {
          const db = testEnv
            .authenticatedContext("admin-1", { role: "admin" })
            .firestore();

          await assertSucceeds(
            deleteDoc(doc(db, "productIdeas", "idea-1", "notes", "note-1")),
          );
        });

        test("unauthenticated users cannot delete notes", async () => {
          const db = testEnv.unauthenticatedContext().firestore();

          await assertFails(
            deleteDoc(doc(db, "productIdeas", "idea-1", "notes", "note-1")),
          );
        });

        test("viewers cannot delete any notes", async () => {
          const db = testEnv
            .authenticatedContext("viewer-1", { role: "viewer" })
            .firestore();

          await assertFails(
            deleteDoc(doc(db, "productIdeas", "idea-1", "notes", "note-1")),
          );
        });
      });
    });

    // ----------------------------------------
    // Ownership Checks
    // ----------------------------------------
    describe("Ownership Checks", () => {
      describe("create operations", () => {
        test("users cannot create notes authored by others", async () => {
          const db = testEnv
            .authenticatedContext("contrib-2", { role: "contributor" })
            .firestore();

          await assertFails(
            addDoc(
              collection(db, "productIdeas", "idea-1", "notes"),
              createTestNote("contrib-1"),
            ),
          );
        });
      });
    });

    // ----------------------------------------
    // Data Validation
    // ----------------------------------------
    describe("Data Validation", () => {
      describe("required fields", () => {
        test("create fails with missing body", async () => {
          const db = testEnv
            .authenticatedContext("contrib-1", { role: "contributor" })
            .firestore();

          await assertFails(
            addDoc(collection(db, "productIdeas", "idea-1", "notes"), {
              authorId: "contrib-1",
              authorDisplayName: "Test User",
              authorPhotoURL: null,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
              archivedAt: null,
            }),
          );
        });

        test("create fails with missing authorId", async () => {
          const db = testEnv
            .authenticatedContext("contrib-1", { role: "contributor" })
            .firestore();

          await assertFails(
            addDoc(collection(db, "productIdeas", "idea-1", "notes"), {
              body: "Test note",
              authorDisplayName: "Test User",
              authorPhotoURL: null,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
              archivedAt: null,
            }),
          );
        });

        test("create fails with missing authorDisplayName", async () => {
          const db = testEnv
            .authenticatedContext("contrib-1", { role: "contributor" })
            .firestore();

          await assertFails(
            addDoc(collection(db, "productIdeas", "idea-1", "notes"), {
              body: "Test note",
              authorId: "contrib-1",
              authorPhotoURL: null,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
              archivedAt: null,
            }),
          );
        });
      });

      describe("body validation", () => {
        test("create fails with empty body", async () => {
          const db = testEnv
            .authenticatedContext("contrib-1", { role: "contributor" })
            .firestore();

          await assertFails(
            addDoc(
              collection(db, "productIdeas", "idea-1", "notes"),
              createTestNote("contrib-1", { body: "" }),
            ),
          );
        });

        test("create fails with body over 2000 chars", async () => {
          const db = testEnv
            .authenticatedContext("contrib-1", { role: "contributor" })
            .firestore();

          await assertFails(
            addDoc(
              collection(db, "productIdeas", "idea-1", "notes"),
              createTestNote("contrib-1", { body: "a".repeat(2001) }),
            ),
          );
        });

        test("create succeeds with body exactly 2000 chars", async () => {
          const db = testEnv
            .authenticatedContext("contrib-1", { role: "contributor" })
            .firestore();

          await assertSucceeds(
            addDoc(
              collection(db, "productIdeas", "idea-1", "notes"),
              createTestNote("contrib-1", { body: "a".repeat(2000) }),
            ),
          );
        });

        test("create fails with non-string body", async () => {
          const db = testEnv
            .authenticatedContext("contrib-1", { role: "contributor" })
            .firestore();

          await assertFails(
            addDoc(
              collection(db, "productIdeas", "idea-1", "notes"),
              createTestNote("contrib-1", { body: 123 as any }),
            ),
          );
        });
      });

      describe("authorId validation", () => {
        test("create fails with non-string authorId", async () => {
          const db = testEnv
            .authenticatedContext("contrib-1", { role: "contributor" })
            .firestore();

          await assertFails(
            addDoc(collection(db, "productIdeas", "idea-1", "notes"), {
              body: "Test note",
              authorId: 123 as any,
              authorDisplayName: "Test User",
              authorPhotoURL: null,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
              archivedAt: null,
            }),
          );
        });
      });

      describe("authorDisplayName validation", () => {
        test("create fails with empty authorDisplayName", async () => {
          const db = testEnv
            .authenticatedContext("contrib-1", { role: "contributor" })
            .firestore();

          await assertFails(
            addDoc(
              collection(db, "productIdeas", "idea-1", "notes"),
              createTestNote("contrib-1", { authorDisplayName: "" }),
            ),
          );
        });

        test("create fails with non-string authorDisplayName", async () => {
          const db = testEnv
            .authenticatedContext("contrib-1", { role: "contributor" })
            .firestore();

          await assertFails(
            addDoc(collection(db, "productIdeas", "idea-1", "notes"), {
              body: "Test note",
              authorId: "contrib-1",
              authorDisplayName: 123 as any,
              authorPhotoURL: null,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
              archivedAt: null,
            }),
          );
        });
      });
    });
  });
});
