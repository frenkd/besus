import firebase_app from "./config";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app);

export const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchMostRecentAction = async (user) => {
    // only take the action with the most recent timestamp
    // return the action
    const querySnapshot = await getDocs(collection(db, "suggested-actions"));
    const actions = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    // get the action for the with user == user
    const actionsForUser = actions.filter((action) => action.user === user);
    const sortedActions = actionsForUser.sort((a, b) => b.timestamp - a.timestamp);
    return sortedActions[0];
}