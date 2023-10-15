'use client';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import firebase_app from '@/firebase/config';

function ImagePostPage() {
    const [image, setImage] = useState(null);
    const [actionSuggestion, setActionSuggestion] = useState('');
    const [uploading, setUploading] = useState(false);
    const router = useRouter();
    const auth = getAuth(firebase_app);
    const db = getFirestore(firebase_app);
    const storage = getStorage(firebase_app);

    const currentUserEmail = auth.currentUser?.email || '';

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

                const storageRef = ref(storage, 'posts/' + image.name);
                await uploadBytes(storageRef, image);

                const imageUrl = await getDownloadURL(storageRef);

                await addDoc(collection(db, 'posts'), {
                    imageUrl,
                    time: new Date(),
                    user: currentUserEmail,
                    description: actionSuggestion
                });

                router.push('/');
            } catch (error) {
                console.error('Error uploading image: ', error);
            } finally {
                setUploading(false);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-full max-w-xs">
                <form onSubmit={handleUpload} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-3xl font-bold mb-6 text-black">Upload a New Image</h1>
                    <div className="mb-4">
                        <input type="file" onChange={handleImageChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="actionSuggestion" className="block text-gray-700 text-sm font-bold mb-2">
                            Post Text
                        </label>
                        <textarea
                            id="actionSuggestion"
                            value={actionSuggestion}
                            onChange={(e) => setActionSuggestion(e.target.value)}
                            placeholder="Put a message along with your post..."
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={uploading}
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded"
                    >
                        {uploading ? 'Uploading...' : 'Upload Image'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ImagePostPage;