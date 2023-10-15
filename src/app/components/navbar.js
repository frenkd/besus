import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


export default function Navbar({ user }) {
    return (
        <div className="z-10 w-full flex items-center justify-between font-mono text-sm bg-green-900 py-4 px-4 md:px-8">

            <div className='px-2'></div>

            {/* Logo */}
            <div className="flex flex-col items-center justify-center">
                <Image
                    src="/besus-logo.png"
                    alt="Besus Logo"
                    width={150}
                    height={200}
                />
            </div>

            {/* Profile Icon */}
            <div className="flex items-center">
                <Link href="/profile">
                    <FontAwesomeIcon icon={faUser} />
                </Link>
            </div>
        </div>
    );
}
