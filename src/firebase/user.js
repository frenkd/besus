import firebase from './config';
import 'firebase/firestore';

const getDb = () => {
  return firebase.firestore();
}

export const getUserData = async (uid) => {
  const db = getDb();
  const docRef = db.collection('user-information').doc(uid);
  const doc = await docRef.get();

  if (doc.exists) {
    return doc.data();
  } else {
    // Handle the case where the document doesn't exist
    return null;
  }
}

export const updateUserData = async (uid, data) => {
  const db = getDb();
  const docRef = db.collection('user-information').doc(uid);
  return docRef.update(data);
}
