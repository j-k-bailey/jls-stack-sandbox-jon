import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { readFileSync } from "fs";

let testEnv: RulesTestEnvironment;

// Load rules from file
const rules = readFileSync("firestore.rules", "utf8");

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
