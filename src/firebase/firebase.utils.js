import firebase from 'firebase/compat/app'; //base import
import 'firebase/compat/firestore'; //for database
import 'firebase/compat/auth' // for authentication

const config = {
    apiKey: "AIzaSyA35kaPX2vI1gDFXby3wcrtgm93TrvsEk8",
    authDomain: "tribe-db-12cbe.firebaseapp.com",
    projectId: "tribe-db-12cbe",
    storageBucket: "tribe-db-12cbe.appspot.com",
    messagingSenderId: "560820922127",
    appId: "1:560820922127:web:4bf811203a1b9df85e407a",
    measurementId: "G-4NZLVVCX7L"

};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName,email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error){
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};



firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'}); //trigger google authentication popup
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;