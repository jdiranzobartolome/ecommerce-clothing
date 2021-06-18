// firebase/app needs to always be imported to have access to the rest of 
// the imports. Then, it is better to import only what is needed, since firebase
// is heavy. For now we need authentification and storage (db). 
import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCycsePMezl6y4HsfZIrjAvz292kKHN2wM",
    authDomain: "ecommerce-clothin-db.firebaseapp.com",
    projectId: "ecommerce-clothin-db",
    storageBucket: "ecommerce-clothin-db.appspot.com",
    messagingSenderId: "965184153842",
    appId: "1:965184153842:web:634d50f78d6d184973486b"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Getting the GoogleAuth provider from firebase.
const provider = new firebase.auth.GoogleAuthProvider();

// defining the sing in as "popup" sign in and telling firebase 
// auth that we are going to be using google provider for signing in.
// In the online console of the website we need to enable google in
// the Auth tab. 
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;