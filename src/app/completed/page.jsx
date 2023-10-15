'use client';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebase_app from '@/firebase/config'; // Assuming you have a config file for Firebase setup
import { getFirestore, addDoc, collection } from 'firebase/firestore';

function ImagePostPage() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const db = getFirestore(firebase_app);
  const storage = getStorage(firebase_app);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (image) {
      try {
        setUploading(true);

        // Uploading image to Firebase Storage
        const storageRef = ref(storage, 'posts/' + image.name);
        await uploadBytes(storageRef, image);

        // Getting URL of uploaded image
        const imageUrl = await getDownloadURL(storageRef);

        // Saving post data in Firestore
        await addDoc(collection(db, 'posts'), {
          imageUrl,
          timestamp: new Date(),
          // Add other post data as needed
        });

        // Navigate to another page or reset state as needed
        router.push('/somewhere');
      } catch (error) {
        console.error('Error uploading image: ', error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload a New Image</h1>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleImageChange} />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>
    </div>
  );
}

export default ImagePostPage;
