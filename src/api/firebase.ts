import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { User } from "../types";
import { storage } from "../utils";

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

export const signInWithGitHub = (callback: (arg0: () => User) => void) => {
  signInWithPopup(auth, gitHubProvider)
    .then((result) => {
      const newUser = {
        uid: result.user.providerData[0].uid,
        displayName: result.user.providerData[0].displayName,
        photoURL: result.user.providerData[0].photoURL,
      } as User

      storage.save("user", newUser)
      callback(() => newUser)
    })
    .catch((error) => {
      console.log("error", error.message);
    });
}
