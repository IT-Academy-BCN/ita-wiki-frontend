import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { IntUser } from "../types";
import { storage } from "../utils";
import { getUserRole } from "./userApi";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

export const app = initializeApp(firebaseConfig);

export const gitHubProvider = new GithubAuthProvider();

export const auth = getAuth(app);

export const signInWithGitHub = async () => {
  try {
    const result = await signInWithPopup(auth, gitHubProvider);
    const newUser: IntUser = {
      id: Number(result.user.providerData[0].uid),
      displayName: result.user.providerData[0].displayName ?? "",
      photoURL: result.user.providerData[0].photoURL ?? "",
    };
    console.log(newUser);

    newUser.role = await getUserRole(newUser.id);

    storage.save("user", newUser);
    return newUser;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        error.message ||
          "Error during GitHub authentication. Please try again.",
      );
    }
    throw new Error("An unknown error occurred during GitHub authentication.");
  }
};
