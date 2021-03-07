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

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
