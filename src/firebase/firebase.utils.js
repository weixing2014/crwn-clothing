import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBrcwJpTZdDD_toNqnAVEfTxrJpwld-mK0',
  authDomain: 'crwn-db-8bcb7.firebaseapp.com',
  projectId: 'crwn-db-8bcb7',
  storageBucket: 'crwn-db-8bcb7.appspot.com',
  messagingSenderId: '963817924716',
  appId: '1:963817924716:web:a20863fc9ceab2063ed049',
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const batch = firestore.batch();
  const collectionRef = firestore.collection(collectionKey);

  objectsToAdd.forEach(object => {
    const docRef = collectionRef.doc(object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = firestore.collection('categories');
  const querySnapshot = await collectionRef.get();
  const docs = querySnapshot.docs;

  const categoryMap =
    docs.reduce((acc, docSnapshot) => {
      return [docSnapshot.data(), ...acc];
    }, []);

  return categoryMap;
};

export const getOrCreateUserProfileDocument = async (userAuth, additionalData = {}) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
