"use client";

import PostFeed from './components/post_feed';
import Action from './components/action';
import { fetchPosts, fetchMostRecentAction } from '../firebase/firestore';
import { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import { getAuth, onAuthStateChanged } from "firebase/auth";


function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  return currentUser;
}


export default function Home() {
  const currentUser = useCurrentUser();

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function loadPosts() {
      const loadedPosts = await fetchPosts();
      setPosts(loadedPosts);
    }
    loadPosts();
  }, []);

  const [action, setAction] = useState({});
  useEffect(() => {
    if (currentUser) { // Only fetch action if there's a current user
      async function loadAction() {
        const loadedAction = await fetchMostRecentAction(currentUser?.email);
        setAction(loadedAction);
      }
      loadAction()
    }
  }, [currentUser]);

  return (
    <div className="flex flex-col items-center justify-between w-full">
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-4">

        <div className="mb-32 text-center lg:text-left flex flex-col">
          <div>
            {currentUser ? (
              <>
                <h3 className="mb-2 text-2xl font-bold">Your action for today</h3>
                <Action action={action} />
              </>
            ) : (
              <h3 className="mb-2 text-2xl font-bold">Login/Register to get your action!</h3>
            )}
          </div>
          <div>
            <h3 className="mb-2 text-2xl font-bold">Posts</h3>
            <PostFeed posts={posts} />
          </div>
        </div>
      </main>
    </div>
  )
}
