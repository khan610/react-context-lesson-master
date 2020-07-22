import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAGz5j213VYjM_8DTNaSpSoeOSqMSegW4o",
    authDomain: "crwn-db-aa78c.firebaseapp.com",
    databaseURL: "https://crwn-db-aa78c.firebaseio.com",
    projectId: "crwn-db-aa78c",
    storageBucket: "crwn-db-aa78c.appspot.com",
    messagingSenderId: "472932378926",
    appId: "1:472932378926:web:a9cabce3438bb07e6072bf",
    measurementId: "G-2QBYL06L1X"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
