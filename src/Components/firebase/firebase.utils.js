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
    const activeTrip = false;

    try {
      await userRef.set({
        activeTrip,
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

//CREATE A NEW TRIP INSTANCE WITH ALL COMPOENTS EMPY
export const createNewTrip = async (user, tripName, id) => {
  const tripRef = firestore.doc(`trips/${id}`);

  const snapShot = await tripRef.get();

  if (!snapShot.exists) {
    const { email } = user;
    const date = new Date();
    const createdAt = date.toDateString();
    const tripImages = [];
    const tripReceipts = [];
    const isActive = true;
    

    try {
      await tripRef.set({
        isActive,
        createdAt,
        tripName,
        tripImages,
        tripReceipts,
      });
      //SET USER AS ACTIVE IN A TRIP SO HE CANT CREATE A NEW ONE AND BE ABLE TO HAVE FRIENDS JOIN
      await updateTripStatus(user.id, id, tripName, createdAt);
    } catch (error) {
      console.log('error creating trip', error.message);
    }
  }
};

//FIND FRIENDS EMAIL TO JOIN THE GROUP
export const findMyFriend = async (email) => {
  let users = await userList();
  let tripExist = false;

  users.map((el) => {
    if (el.email === email && el.activeTrip === true) {
      return (tripExist = el.currentTrip);
    }
  });

  return tripExist;
};

export const updateExpenses = async (userID, x) => {
  let user = await firestore.collection('users').doc(userID);
  let userData = await firestore.collection('users').doc(userID).get();
  let expense = userData.data().expenses;
  let total = expense + x;
  try {
    user.update({
      expenses: total,
    });
  } catch (error) {
    console.log('Error ending trip', error);
  }
};

//SET USER AS ACTIVE IN A TRIP SO HE CANT CREATE A NEW ONE AND BE ABLE TO HAVE FRIENDS JOIN
export const updateTripStatus = async (userID, tripID, tripName, createdAt) => {
  let user = await firestore.collection('users').doc(userID);
  let userRef = await user.get();
  let tripRef = await firestore.collection('trips').doc(tripID);

  let tripInfo = {
    id: tripID,
    name: tripName,
    date: createdAt,
  };

  let newUser = {
    name: userRef.data().displayName,
    id: userID,
    email: userRef.data().email,
  };
  try {
    user.update({
      activeTrip: true,
      trips: firebase.firestore.FieldValue.arrayUnion(tripInfo),
      currentTrip: tripID,
    });

    console.log(newUser);
    tripRef.update({
      users: firebase.firestore.FieldValue.arrayUnion(newUser),
    });
  } catch (error) {
    console.log('Error adding stock', error);
  }
};

export const tripBalance = async (tripId) => {
  let x = []
  let trips = await tripList()
  let tripIndex = 0
  trips.map((ele, i) => {
      if (ele.id === tripId){tripIndex =  i}
  })
  let users = trips[tripIndex].data().users
  let trip = await firestore.collection('trips').doc(tripId);
  //let numOfUsers = users.length
  users.map(async (userId) => {
    
      let user = await firestore.collection('users').doc(userId.id);
      let userData = await firestore.collection('users').doc(userId.id).get()
      let expense = userData.data().expenses
      x = { name:userData.data().displayName, balance:expense}
      console.log(x)
      try {
          user.update({
            expenses: 0,
          });
          trip.update({
            balance: firebase.firestore.FieldValue.arrayUnion(x)
          });
        } catch (error) {
          console.log('Error adding stock', error);
        }
      return 0
  })
  
  console.log(x)
  try {
      
  } catch (error) {
      console.log('Error adding stock', error);
  }
}

export const getTripData = async (tripID) => {
  let tripRef = await firestore.collection('trips').doc(tripID).get();
  let tripData = tripRef.data();
  let obj = {
    name: tripData.tripName,
    date: tripData.createdAt,
  };

  return obj;
};

export const getTripBalance = async (tripID) => {
  let tripRef = await firestore.collection('trips').doc(tripID).get();
  let tripData = tripRef.data();

  return tripData.balance;
};

// export const endTripStatus = async (userID) => {
//   let user = await firestore.collection('users').doc(userID);
//   console.log(user);
//   try {
//     user.update({
//       activeTrip: false,
//       currentTrip: '',
//     });
//   } catch (error) {
//     console.log('Error adding stock', error);
//   }
// };

export const endTripStatus = async (tripID) => {
  let tripData = await firestore.collection('trips').doc(tripID).get();
  let users = tripData.data().users
  users.map(async (ele) => {
    let user = await firestore.collection('users').doc(ele.id)
    try {
      user.update({
        activeTrip: false,
        currentTrip: ''
      })
    }catch (error) {
      console.log('Error adding stock', error);
    }
  })
};

export const cosimo = async (userName, tripId) => {
  let x = await balance(tripId)
  let output = ''
  for(let i = 0; i < x.length; i++)
  {
      if( x[i].balance < 0 )
      {
          for(let j = 0; j < x.length; j++)
          {
              if(x[j].balance > 0)
              {
                  if(x[j].balance >= (x[i].balance*-1))
                  {
                      if(x[i].name === userName)
                        {output += "You should pay " + x[j].name + " $" + (x[i].balance*-1)+ '\n'}
                      x[j].balance += x[i].balance
                      x[i].balance = 0;
                      break;
                  }
                  else 
                  {
                      if(x[i].name === userName)
                        {output += "You should pay " + x[j].name + " $" + (x[j].balance)+ '\n'}
                      x[i].balance += x[j].balance
                      x[j].balance = 0
                  }
              }
          }
      }
      else
      {
          if(x[i].name === userName)
            output += 'You have paid!'
      }
  }
  return output
}

export const retrieveImages = async (user, query) => {
  let currentTrip = '';
  if (query) {
    currentTrip = user.queryID;
  } else {
    currentTrip = user.currentTrip;
  }
  let tripImages = [];
  try {
    let ref = await firestore.collection('trips').doc(currentTrip).get();
    let data = await ref.data();
    tripImages = data.tripImages;
  } catch (err) {
    console.log(err);
  }
  return tripImages.reverse();
};

// UPDATE QUOTE FOR PROFILE
export const updateQuote = async (userID, quote) => {
  console.log('running');
  let user = await firestore.collection('users').doc(userID);

  try {
    user.update({
      quote: quote,
    });
  } catch (error) {
    console.log('Error adding quote', error);
  }
};

export const singleQuery = async (id, tripID) => {
  let userRef = await firestore.collection('users').doc(id);
  try {
    userRef.update({
      queryID: tripID,
    });
  } catch (error) {
    console.log('Error adding image', error);
  }
};

export const fetchTripData = async (tripID) => {
  let tripRef = await firestore.collection('trips').doc(tripID).get();
  return tripRef.data();
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

export const groupList = async (currentTrip) => {
  let userArr = [];
  
  let users = await firestore.collection('trips').doc(currentTrip).get();
  let userRef = users.data()
  userRef.users.map((doc, i) => (userArr[i] = doc ));
  
  
  if (userArr.length > 0) {
    console.log(userArr);
    return userArr;
  }
 
};

export const balance = async (tripId) => {
  let trip = await firestore.collection('trips').doc(tripId).get();
  return trip.data().balance;
};

export const tripList = async () => {

  let users = await firestore.collection('trips').get();
  return users.docs;

};

export const endTrip = async (userID, tripID) => {
  let user = await firestore.collection('users').doc(userID);
  let tripRef = await firestore.collection('trips').doc(tripID).get();
  let tripData = tripRef.data();
  let users = tripData.users;
  try {
    user.update({
      activeTrip: false,
      currentTrip: '',
    });
  } catch (error) {
    console.log('Error ending trip', error);
  }
  try {
    let emails = [];
    users.map(async (user) => {
      emails.push(user.email);
    });
    return emails;
  } catch (err) {
    console.log(err);
  }
};

export const updateImageArr = async (url, tripID) => {
  const docID = tripID;
  let imageArr = await firestore.collection('trips').doc(docID);
  const date = new Date();
  const createdAt = date.toDateString();
  // let item = {
  //   url: url,
  //   id: id,
  //   createdAt: createdAt,
  //   amount: imgAmount,
  // };
  try {
    console.log('running update');
    imageArr.update({
      tripImages: firebase.firestore.FieldValue.arrayUnion(url),
    });
  } catch (error) {
    console.log('Error adding image', error);
  }
};
const sentinel = async (data, upF, currentTrip) => {
  let tripID = currentTrip;
  let doc = await firestore.collection('trips').doc(tripID);

  let observer = await doc.onSnapshot(
    async (docSnapshot) => {
      let getDoc = await doc.get().then(async (doc) => {
        if (!doc.exists) {
          console.log('No such document!');
        } else if (data.length !== doc.data().tripReceipts.length) {
          upF();
        }
      });
    },
    (err) => {
      console.log(`Encountered error: ${err}`);
    }
  );
};

export const receiptListArr = async (query, user, updateFunc) => {
  let currentTrip = '';
  if (query) {
    currentTrip = user.queryID;
  } else {
    currentTrip = user.currentTrip;
  }
  var receiptArr = [];
  let arrRef = await firestore.collection('trips').doc(currentTrip);
  let getDoc = await arrRef
    .get()
    .then((doc) => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        receiptArr = doc.data().tripReceipts;
        sentinel(receiptArr, updateFunc, currentTrip);
      }
    })
    .catch((err) => {
      console.log('Error getting document', err);
    });

  return receiptArr;
};

export const updateReceiptArr = async (id, imgURL, imgAmount, currentTrip) => {
  let tripID = currentTrip;
  let receiptArr = await firestore.collection('trips').doc(tripID);
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
      tripReceipts: firebase.firestore.FieldValue.arrayUnion(item),
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
