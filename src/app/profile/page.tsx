'use client';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; // import Firestore functions
import firebase_app from "@/firebase/config"; // Import firebase app
import { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";


function ProfilePage(): JSX.Element {
  const [location, setLocation] = useState('');
  const [commute, setCommute] = useState('');
  const [misc, setMisc] = useState('');
  const [age, setAge] = useState('');
  const [user, setUser] = useState('');
  const router = useRouter();
  const auth = getAuth(firebase_app);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out!");
        router.push("/"); // Redirect to the main page or wherever you want after signing out
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      // Assuming the user is already authenticated and you have their UID
      const usr = auth.currentUser;
      if (usr) {
        const userUID = usr?.uid; // Replace with actual UID  

        // @ts-ignore
        const userRef = doc(db, 'user-information', userUID);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setLocation(data.location || ''); // The '|| ""' ensures that if the data is not present, it defaults to an empty string
          setCommute(data.commute || '');
          setMisc(data.misc || '');
          setAge(data.age || '');
          setUser(data.user || '');
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchData();
  }, [auth.currentUser]); // The empty dependency array ensures the useEffect runs only once when the component mounts


  const db = getFirestore(firebase_app);

  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const usr = auth.currentUser;
    // Assuming the user is already authenticated and you have their UID
    const userUID = usr?.uid; // Replace with actual UID  

    // @ts-ignore
    const userRef = doc(db, 'user-information', userUID);

    await setDoc(userRef, {
      location,
      commute,
      misc,
      age,
      user
    });

    // Maybe redirect or give feedback to the user
    console.log("Profile updated");
    router.push("/"); // replace with desired redirection after update
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <form onSubmit={handleForm} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-bold mb-6 text-black">Edit Profile of {user}</h1>

          {/* Age */}
          <div className="mb-4">
            <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">
              Age
            </label>
            <input
              onChange={(e) => setAge(e.target.value)}
              value={age}
              type="text"
              name="age"
              id="age"
              placeholder="Enter your age"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
              Location
            </label>
            <input
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              required
              type="text"
              name="location"
              id="location"
              placeholder="Enter your location"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Commute Info */}
          <div className="mb-4">
            <label htmlFor="commute" className="block text-gray-700 text-sm font-bold mb-2">
              Commute Information
            </label>
            <textarea
              onChange={(e) => setCommute(e.target.value)}
              value={commute}
              required
              name="commute"
              id="commute"
              placeholder="Enter commute info"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Misc Info */}
          <div className="mb-4">
            <label htmlFor="misc" className="block text-gray-700 text-sm font-bold mb-2">
              Miscellaneous Information
            </label>
            <textarea
              onChange={(e) => setMisc(e.target.value)}
              value={misc}
              name="misc"
              id="misc"
              placeholder="Other details"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded"
          >
            Update Profile
          </button>
          <button
            onClick={handleSignOut}
            className="w-full bg-red-500 mt-4 text-white font-semibold py-2 rounded"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
