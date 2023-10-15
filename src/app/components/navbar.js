import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

export default function Navbar() {
    const [currentUser, setCurrentUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        const usr = auth.currentUser;
        setCurrentUser(usr);
    }, [auth]);

    return (
        <div className="z-10 w-full flex items-center justify-between font-mono text-sm bg-green-900 py-4 px-4 md:px-8">

            {currentUser ? (
                <div className='px-2'></div>
            ) : (
                <div className='px-4'></div>
            )}

            {/* Logo */}
            <div className="flex flex-col items-center justify-center">
                <Image
                    src="/besus-logo.png"
                    alt="Besus Logo"
                    width={150}
                    height={200}
                />
            </div>

            {/* Profile Icon or Sign in & Sign up icons */}
            <div className="flex items-center">
                {currentUser ? (
                    <Link href="/profile">
                        <FontAwesomeIcon icon={faUser} />
                    </Link>
                ) : (
                    <>
                        <Link href="/signin">
                            <FontAwesomeIcon icon={faSignInAlt} className="mr-4" />
                        </Link>
                        <Link href="/signup">
                            <FontAwesomeIcon icon={faUserPlus} />
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
