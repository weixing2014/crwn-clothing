import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';
import { updateDoc } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBrcwJpTZdDD_toNqnAVEfTxrJpwld-mK0',
  authDomain: 'crwn-db-8bcb7.firebaseapp.com',
  projectId: 'crwn-db-8bcb7',
  storageBucket: 'crwn-db-8bcb7.appspot.com',
  messagingSenderId: '963817924716',
  appId: '1:963817924716:web:a20863fc9ceab2063ed049',
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field,
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export const getUserCartItems = async (currentUser) => {
  if (!currentUser) return [];

  const docRef = doc(db, 'carts', currentUser.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log('User cart data:', docSnap.data());
    return docSnap.data().cart;
  }

  return [];
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {},
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createOrUpdateUserCart = async (
  currentUser,
  cartItems = [],
) => {
  if (!currentUser) return;

  const cartDocRef = doc(db, 'carts', currentUser.uid);

  const userCartSnapshot = await getDoc(cartDocRef);

  if (!userCartSnapshot.exists()) {
    const createdAt = new Date();

    try {
      await setDoc(cartDocRef, {
        cart: cartItems,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  } else {
    const createdAt = new Date();

    try {
      await updateDoc(cartDocRef, {
        cart: cartItems,
        createdAt,
      });
    } catch (error) {
      console.log('error updating the user', error.message);
    }
  }

  return userCartSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
