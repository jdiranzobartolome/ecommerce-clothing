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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  //if userAuth is null, that means firebase is telling us somebody did logout, so we do nothing.
  if (!userAuth) return;

  // In firebase there are two main of elements for interacting with their database.
  // References and snapShots. Reference gives info about a particular document id, 
  // it gives info even if it does not exist. Basically, it gives us "methods" to interact with 
  // the real databa of the database, represented by the snapShot. 
  // Calling userRef.get() gives us a snapShot of that reference, and, among other things, 
  // the snapShot has a parameter "exists" with let us know whether that particular 
  // document id is populated or is non existent (so we need to create it)
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot =  await userRef.get();

  if (!snapShot.exists) {
    //if snapShop from user uid does not exists, the user is not stored on the 
    // database and needs to be added.
    const { displayName, email } = userAuth;
    const createdAt = new Date(); 

    //asyncrhonous request to database to store the user info.
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('eror creating user', error.message);
    }
  }

  // Since we might need to use the user Reference for other things, we return it.
  return userRef;

}

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