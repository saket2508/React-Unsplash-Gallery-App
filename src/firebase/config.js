import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCeYtDEVJRW3VAzzFKf3DtN7MDDj8muyEo",
  authDomain: "my-gallery-app-686f4.firebaseapp.com",
  databaseURL: "https://my-gallery-app-686f4.firebaseio.com",
  projectId: "my-gallery-app-686f4",
  storageBucket: "my-gallery-app-686f4.appspot.com",
  messagingSenderId: "623036665787",
  appId: "1:623036665787:web:a68f6112d543d45056fe9e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const projectStorage = firebase.storage();
export const projectFireStore = firebase.firestore();
export const auth = firebase.auth();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = projectFireStore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
}

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await projectFireStore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};


// export { projectStorage, projectFireStore, auth, timestamp }