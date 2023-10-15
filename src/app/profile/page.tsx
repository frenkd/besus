'use client';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; // import Firestore functions
import firebase_app from "@/firebase/config"; // Import firebase app
import { useEffect } from "react";


function ProfilePage(): JSX.Element {
  const [location, setLocation] = useState('');
  const [commute, setCommute] = useState('');
  const [misc, setMisc] = useState('');
  const [age, setAge] = useState('');
  const [user, setUser] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      // Assuming the user is already authenticated and you have their UID
      const userUID = "8GX0oGI6DIPsEW82yrMAEvcicdH2"; // Replace with actual UID

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
    };

    fetchData();
  }, []); // The empty dependency array ensures the useEffect runs only once when the component mounts


  const db = getFirestore(firebase_app);

  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Assuming the user is already authenticated and you have their UID
    const userUID = "8GX0oGI6DIPsEW82yrMAEvcicdH2"; // Replace with actual UID

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
          <h1 className="text-3xl font-bold mb-6 text-black">Edit Profile</h1>

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
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
