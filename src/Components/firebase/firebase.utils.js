import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBfylPGB3Vj9XqeRAe6K7n_48vjIv8Z0wU',
  authDomain: 'paxanimi-73b93.firebaseapp.com',
  databaseURL: 'https://paxanimi-73b93.firebaseio.com',
  projectId: 'paxanimi-73b93',
  storageBucket: 'paxanimi-73b93.appspot.com',
  messagingSenderId: '852882682760',
  appId: '1:852882682760:web:415f87c7be9f7eb4a6c03d',
  measurementId: 'G-NB8J25CEJN',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();
    const trackStock = [];

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
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

export const userList = async () => {
  let userArr = [];

  let users = await firestore.collection('users').get();
  users.docs.map((doc, i) => (userArr[i] = { id: doc.id, ...doc.data() }));

  if (userArr.length > 0) {
    console.log(userArr);
    return userArr;
  }
};

const sentinel = async (data, upF) => {
  const docID = '4mcO13n8lUBeSezFmLD1';

  let doc = await firestore.collection('images').doc(docID);

  let observer = await doc.onSnapshot(
    async (docSnapshot) => {
      let getDoc = await doc.get().then(async (doc) => {
        if (!doc.exists) {
          console.log('No such document!');
        } else if (data.length !== doc.data().receiptImg.length) {
          upF();
        }
      });
    },
    (err) => {
      console.log(`Encountered error: ${err}`);
    }
  );
};

export const receiptListArr = async (updateFunc) => {
  const docID = '4mcO13n8lUBeSezFmLD1';
  var receiptArr = [];
  let arrRef = await firestore.collection('images').doc(docID);
  let getDoc = await arrRef
    .get()
    .then((doc) => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        receiptArr = doc.data().receiptImg;

        sentinel(receiptArr, updateFunc);
      }
    })
    .catch((err) => {
      console.log('Error getting document', err);
    });

  return receiptArr;
};

export const updateReceiptArr = async (id, imgURL, imgAmount) => {
  const docID = '4mcO13n8lUBeSezFmLD1';
  let receiptArr = await firestore.collection('images').doc(docID);
  const date = new Date();
  const createdAt = date.toDateString();
  let item = {
    url: imgURL,
    id: id,
    createdAt: createdAt,
    amount: imgAmount,
  };

  try {
    receiptArr.update({
      receiptImg: firebase.firestore.FieldValue.arrayUnion(item),
    });
  } catch (error) {
    console.log('Error adding stock', error);
  }
};

export const saveReceipt = async (id, imgURL, imgAmount) => {
  const userRef = firestore.doc(`images/${id}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const imgUrl = imgURL;
    const amount = imgAmount;
    const date = new Date();
    const createdAt = date.toDateString();

    try {
      await userRef.set({
        imgUrl,
        createdAt,
        amount,
      });
    } catch (error) {
      console.log('error saving receipt', error.message);
    }
  }
  return userRef;
};

export const updateTracking = async (user, item) => {
  const { id } = user;
  let stockArr = await firestore.collection('users').doc(id);

  try {
    stockArr.update({
      trackStock: firebase.firestore.FieldValue.arrayUnion(item),
    });
  } catch (error) {
    console.log('Error adding stock', error);
  }
};

export const deleteTracking = async (user, item) => {
  const { id } = user;
  let stockArr = await firestore.collection('users').doc(id);

  try {
    stockArr.update({
      trackStock: firebase.firestore.FieldValue.arrayRemove(item),
    });
  } catch (error) {
    console.log('Error deleting stock', error);
  }
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
  // console.log(auth.signInWithPopup(provider))
};

export default firebase;
