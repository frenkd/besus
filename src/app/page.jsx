"use client";

import PostFeed from './components/post_feed';
import Action from './components/action';
import { fetchPosts, fetchMostRecentAction } from '../firebase/firestore';
import { useEffect, useState } from 'react';
import Navbar from './components/navbar';

export default function Home() {

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
    async function loadAction() {
      const loadedAction = await fetchMostRecentAction();
      setAction(loadedAction);
    }
    loadAction()
  }, []);

  const [user, setUser] = useState({});

  return (
    <div className="flex flex-col items-center justify-between w-full">
      <Navbar user={user} />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">

        <div className="mb-32 text-center lg:text-left flex flex-col">
          <div>
            <h3 className="mb-2 text-2xl font-bold">Your action for today</h3>
            <Action action={action} />
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