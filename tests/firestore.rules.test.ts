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
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

function createTestNote(authorId: string, overrides = {}) {
  return {
    body: "Test note content",
    authorId,
    createdAt: new Date(),
    ...overrides,
  };
}

function createTestUser(userId: string, role: string) {
  return {
    firstName: "Test",
    lastNameInitial: "U",
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
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
// USER PROFILE TESTS
// ============================================

describe("user profile rules", () => {
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
    test("users can create their own profile as viewer", async () => {
      const db = testEnv.authenticatedContext("user-1", {}).firestore();

      await assertSucceeds(
        setDoc(doc(db, "users", "user-1"), createTestUser("user-1", "viewer")),
      );
    });

    test("users cannot create someone else's profile", async () => {
      const db = testEnv.authenticatedContext("user-1", {}).firestore();

      await assertFails(
        setDoc(doc(db, "users", "user-2"), createTestUser("user-2", "viewer")),
      );
    });

    test("users cannot create profile with contributor role", async () => {
      const db = testEnv.authenticatedContext("user-1", {}).firestore();

      await assertFails(
        setDoc(
          doc(db, "users", "user-1"),
          createTestUser("user-1", "contributor"),
        ),
      );
    });

    test("users cannot create profile with moderator role", async () => {
      const db = testEnv.authenticatedContext("user-1", {}).firestore();

      await assertFails(
        setDoc(
          doc(db, "users", "user-1"),
          createTestUser("user-1", "moderator"),
        ),
      );
    });

    test("users cannot create profile with admin role", async () => {
      const db = testEnv.authenticatedContext("user-1", {}).firestore();

      await assertFails(
        setDoc(doc(db, "users", "user-1"), createTestUser("user-1", "admin")),
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

    test("admins can update user roles", async () => {
      const db = testEnv
        .authenticatedContext("admin", { role: "admin" })
        .firestore();

      await assertSucceeds(
        updateDoc(doc(db, "users", "user-1"), { role: "contributor" }),
      );
    });

    test("viewers cannot update user roles", async () => {
      const db = testEnv
        .authenticatedContext("viewer", { role: "viewer" })
        .firestore();

      await assertFails(
        updateDoc(doc(db, "users", "user-1"), { role: "admin" }),
      );
    });

    test("contributors cannot update user roles", async () => {
      const db = testEnv
        .authenticatedContext("contrib", { role: "contributor" })
        .firestore();

      await assertFails(
        updateDoc(doc(db, "users", "user-1"), { role: "admin" }),
      );
    });

    test("moderators cannot update user roles", async () => {
      const db = testEnv
        .authenticatedContext("mod", { role: "moderator" })
        .firestore();

      await assertFails(
        updateDoc(doc(db, "users", "user-1"), { role: "admin" }),
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

  describe("validation tests", () => {
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

    test("create fails with invalid role", async () => {
      const db = testEnv.authenticatedContext("user-1", {}).firestore();

      await assertFails(
        setDoc(doc(db, "users", "user-1"), {
          ...createTestUser("user-1", "viewer"),
          role: "superadmin",
        }),
      );
    });
  });
});

// ============================================
// PRODUCT IDEAS - READ TESTS
// ============================================

describe("productIdeas read rules", () => {
  test("unauthenticated users cannot read ideas", async () => {
    await setupTestData(async (db) => {
      await setDoc(doc(db, "productIdeas", "idea-1"), createTestIdea("user-1"));
    });

    const db = testEnv.unauthenticatedContext().firestore();
    await assertFails(getDoc(doc(db, "productIdeas", "idea-1")));
  });

  test("viewers can read ideas", async () => {
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

  test("all authenticated users can list ideas", async () => {
    await setupTestData(async (db) => {
      await setDoc(doc(db, "productIdeas", "idea-1"), createTestIdea("user-1"));
      await setDoc(doc(db, "productIdeas", "idea-2"), createTestIdea("user-2"));
    });

    const db = testEnv
      .authenticatedContext("viewer-1", { role: "viewer" })
      .firestore();
    await assertSucceeds(getDocs(collection(db, "productIdeas")));
  });
});

// ============================================
// PRODUCT IDEAS - CREATE TESTS
// ============================================

describe("productIdeas create rules", () => {
  describe("authentication and role checks", () => {
    test("unauthenticated users cannot create ideas", async () => {
      const db = testEnv.unauthenticatedContext().firestore();

      await assertFails(
        addDoc(collection(db, "productIdeas"), createTestIdea("anyone")),
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

    test("contributors can create ideas they own", async () => {
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
  });

  describe("ownership checks", () => {
    test("users cannot create ideas owned by others", async () => {
      const db = testEnv
        .authenticatedContext("contrib-1", { role: "contributor" })
        .firestore();

      await assertFails(
        addDoc(collection(db, "productIdeas"), createTestIdea("other-user")),
      );
    });
  });

  describe("validation tests - title", () => {
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
  });

  describe("validation tests - summary", () => {
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
  });

  describe("validation tests - status", () => {
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
  });

  describe("validation tests - tags", () => {
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
  });

  describe("validation tests - priority", () => {
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
  });

  describe("optional field tests", () => {
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

      await assertSucceeds(addDoc(collection(db, "productIdeas"), minimalIdea));
    });
  });
});

// ============================================
// PRODUCT IDEAS - UPDATE TESTS
// ============================================

describe("productIdeas update rules", () => {
  beforeEach(async () => {
    await setupTestData(async (db) => {
      await setDoc(
        doc(db, "productIdeas", "idea-1"),
        createTestIdea("contrib-1"),
      );
    });
  });

  describe("permission tests", () => {
    test("contributors can update their own ideas", async () => {
      const db = testEnv
        .authenticatedContext("contrib-1", { role: "contributor" })
        .firestore();

      await assertSucceeds(
        updateDoc(doc(db, "productIdeas", "idea-1"), {
          title: "Updated Title",
          summary: "Updated summary",
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
          ownerId: "contrib-1",
        }),
      );
    });
  });

  describe("ownership change prevention", () => {
    test("owner cannot change ownerId to another user", async () => {
      const db = testEnv
        .authenticatedContext("contrib-1", { role: "contributor" })
        .firestore();

      await assertFails(
        updateDoc(doc(db, "productIdeas", "idea-1"), {
          title: "Updated",
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
          ownerId: "contrib-1",
        }),
      );
    });
  });

  describe("validation tests", () => {
    test("update fails with empty title", async () => {
      const db = testEnv
        .authenticatedContext("contrib-1", { role: "contributor" })
        .firestore();

      await assertFails(
        updateDoc(doc(db, "productIdeas", "idea-1"), {
          title: "",
          ownerId: "contrib-1",
        }),
      );
    });

    test("update fails with title over 100 chars", async () => {
      const db = testEnv
        .authenticatedContext("contrib-1", { role: "contributor" })
        .firestore();

      await assertFails(
        updateDoc(doc(db, "productIdeas", "idea-1"), {
          title: "a".repeat(101),
          ownerId: "contrib-1",
        }),
      );
    });

    test("update fails with summary over 1000 chars", async () => {
      const db = testEnv
        .authenticatedContext("contrib-1", { role: "contributor" })
        .firestore();

      await assertFails(
        updateDoc(doc(db, "productIdeas", "idea-1"), {
          summary: "a".repeat(1001),
          ownerId: "contrib-1",
        }),
      );
    });

    test("update fails with invalid status", async () => {
      const db = testEnv
        .authenticatedContext("contrib-1", { role: "contributor" })
        .firestore();

      await assertFails(
        updateDoc(doc(db, "productIdeas", "idea-1"), {
          status: "invalid",
          ownerId: "contrib-1",
        }),
      );
    });

    test("update fails with tags over 10 items", async () => {
      const db = testEnv
        .authenticatedContext("contrib-1", { role: "contributor" })
        .firestore();

      await assertFails(
        updateDoc(doc(db, "productIdeas", "idea-1"), {
          tags: Array(11).fill("tag"),
          ownerId: "contrib-1",
        }),
      );
    });

    test("update fails with invalid priority", async () => {
      const db = testEnv
        .authenticatedContext("contrib-1", { role: "contributor" })
        .firestore();

      await assertFails(
        updateDoc(doc(db, "productIdeas", "idea-1"), {
          priority: "urgent",
          ownerId: "contrib-1",
        }),
      );
    });

    test("update succeeds with valid priority values", async () => {
      const db = testEnv
        .authenticatedContext("contrib-1", { role: "contributor" })
        .firestore();

      for (const priority of ["now", "next", "later"]) {
        await assertSucceeds(
          updateDoc(doc(db, "productIdeas", "idea-1"), {
            priority,
            ownerId: "contrib-1",
          }),
        );
      }
    });
  });
});

// ============================================
// PRODUCT IDEAS - DELETE TESTS
// ============================================

describe("productIdeas delete rules", () => {
  beforeEach(async () => {
    await setupTestData(async (db) => {
      await setDoc(
        doc(db, "productIdeas", "idea-1"),
        createTestIdea("contrib-1"),
      );
    });
  });

  test("contributors can delete their own ideas", async () => {
    const db = testEnv
      .authenticatedContext("contrib-1", { role: "contributor" })
      .firestore();

    await assertSucceeds(deleteDoc(doc(db, "productIdeas", "idea-1")));
  });

  test("contributors cannot delete others' ideas", async () => {
    const db = testEnv
      .authenticatedContext("contrib-2", { role: "contributor" })
      .firestore();

    await assertFails(deleteDoc(doc(db, "productIdeas", "idea-1")));
  });

  test("moderators cannot delete others' ideas", async () => {
    const db = testEnv
      .authenticatedContext("mod-1", { role: "moderator" })
      .firestore();

    await assertFails(deleteDoc(doc(db, "productIdeas", "idea-1")));
  });

  test("moderators can delete their own ideas", async () => {
    await setupTestData(async (db) => {
      await setDoc(doc(db, "productIdeas", "idea-2"), createTestIdea("mod-1"));
    });

    const db = testEnv
      .authenticatedContext("mod-1", { role: "moderator" })
      .firestore();

    await assertSucceeds(deleteDoc(doc(db, "productIdeas", "idea-2")));
  });

  test("admins cannot delete others' ideas", async () => {
    const db = testEnv
      .authenticatedContext("admin-1", { role: "admin" })
      .firestore();

    await assertFails(deleteDoc(doc(db, "productIdeas", "idea-1")));
  });

  test("admins can delete their own ideas", async () => {
    await setupTestData(async (db) => {
      await setDoc(
        doc(db, "productIdeas", "idea-3"),
        createTestIdea("admin-1"),
      );
    });

    const db = testEnv
      .authenticatedContext("admin-1", { role: "admin" })
      .firestore();

    await assertSucceeds(deleteDoc(doc(db, "productIdeas", "idea-3")));
  });

  test("viewers cannot delete any ideas", async () => {
    const db = testEnv
      .authenticatedContext("viewer-1", { role: "viewer" })
      .firestore();

    await assertFails(deleteDoc(doc(db, "productIdeas", "idea-1")));
  });
});

// ============================================
// NOTES SUBCOLLECTION TESTS
// ============================================

describe("notes subcollection rules", () => {
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
    test("contributors can create notes they author", async () => {
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

  describe("delete operations", () => {
    test("note authors can delete their own notes", async () => {
      const db = testEnv
        .authenticatedContext("contrib-1", { role: "contributor" })
        .firestore();

      await assertSucceeds(
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

    test("moderators cannot delete others' notes", async () => {
      const db = testEnv
        .authenticatedContext("mod-1", { role: "moderator" })
        .firestore();

      await assertFails(
        deleteDoc(doc(db, "productIdeas", "idea-1", "notes", "note-1")),
      );
    });

    test("admins cannot delete others' notes", async () => {
      const db = testEnv
        .authenticatedContext("admin-1", { role: "admin" })
        .firestore();

      await assertFails(
        deleteDoc(doc(db, "productIdeas", "idea-1", "notes", "note-1")),
      );
    });
  });

  describe("update operations", () => {
    test("notes cannot be updated (immutable)", async () => {
      const db = testEnv
        .authenticatedContext("contrib-1", { role: "contributor" })
        .firestore();

      await assertFails(
        updateDoc(doc(db, "productIdeas", "idea-1", "notes", "note-1"), {
          body: "Updated content",
        }),
      );
    });

    test("even admins cannot update notes", async () => {
      const db = testEnv
        .authenticatedContext("admin-1", { role: "admin" })
        .firestore();

      await assertFails(
        updateDoc(doc(db, "productIdeas", "idea-1", "notes", "note-1"), {
          body: "Admin trying to update",
        }),
      );
    });
  });

  describe("validation tests", () => {
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
  });
});
