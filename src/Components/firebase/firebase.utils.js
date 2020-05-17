import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBfylPGB3Vj9XqeRAe6K7n_48vjIv8Z0wU",
  authDomain: "paxanimi-73b93.firebaseapp.com",
  databaseURL: "https://paxanimi-73b93.firebaseio.com",
  projectId: "paxanimi-73b93",
  storageBucket: "paxanimi-73b93.appspot.com",
  messagingSenderId: "852882682760",
  appId: "1:852882682760:web:415f87c7be9f7eb4a6c03d",
  measurementId: "G-NB8J25CEJN"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const trackStock = []

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        trackStock,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};



export const updateTracking = async (user, item) => {

  const {id} = user
  let stockArr = await firestore.collection('users').doc(id)

  try {
    stockArr.update({
      trackStock: firebase.firestore.FieldValue.arrayUnion(item)
  });
  }catch (error){
    console.log('Error adding stock', error)
  }
  
}

export const deleteTracking = async (user, item) => {

  const {id} = user
  let stockArr = await firestore.collection('users').doc(id)

  try {
    stockArr.update({
      trackStock: firebase.firestore.FieldValue.arrayRemove(item)
  });
  }catch (error){
    console.log('Error deleting stock', error)
  }
  
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => {
  console.log(auth.signInWithPopup(provider))
  };

export default firebase;
