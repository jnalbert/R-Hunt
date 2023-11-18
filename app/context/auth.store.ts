import { Store, registerInDevtools } from "pullstate";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from '../../firebase/Firebase.Config';
import { SignUpFormState } from "../(auth)/signup";
import { doc, setDoc } from "firebase/firestore";
import { uploadImageToStorageBucket } from "../../firebase/firebase.function";

export const AuthStore = new Store({
  isLoggedIn: false,
  initialized: false,
  userId: null,
});

const unsub = onAuthStateChanged(auth, (user) => {
  // console.log("onAuthStateChange", user);


    // IF DEV MODE
  // const uid = "dev";
  const uid = user ? user.uid : null;
  // console.log("userId", uid)

  AuthStore.update((store) => {
    store.userId = uid;
    store.isLoggedIn = uid ? true : false;
    store.initialized = true;
  });
});

// ADD ACTUAL TYPES TO THESE
export const authSignIn = async (email, password) => {
  try {
    const resp = await signInWithEmailAndPassword(auth, email, password);
    AuthStore.update((store) => {
      store.userId = resp.user.uid;
      store.isLoggedIn = resp.user ? true : false;
    });
    return { user: auth.currentUser.uid };
  } catch (e) {
    return { error: e };
  }
};

export const authSignOut = async () => {
  try {
    await signOut(auth);
    AuthStore.update((store) => {
      store.userId = null;
      store.isLoggedIn = false;
    });
    return { user: null };
  } catch (e) {
    return { error: e };
  }
};

// ADD ACTUAL TYPES TO THESE
export const authSignUp = async (data: SignUpFormState) => {
  try {
    const resp = await createUserWithEmailAndPassword(auth, data.username + "@gmail.com", data.password);

    const path = `users/${resp.user.uid}/profilePhoto`;
    const getProfileUrl = await uploadImageToStorageBucket(path, data.photoUrl);
    
    const userDocRef = doc(db, 'users', resp.user.uid);
    await setDoc(userDocRef, {
      id: resp.user.uid,
      fullName: data.name,
      username: data.username,
      profileUrl: getProfileUrl,
    });

    AuthStore.update((store) => {
      store.userId = resp.user.uid;
      store.isLoggedIn = true;
    });

    return { user: resp.user.uid };
  } catch (e) {
    return { error: e };
  }
};

const _getUserId = async () => {
  const uid = await auth.currentUser.uid;
  return uid;
};

registerInDevtools({ AuthStore });