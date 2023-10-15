import Link from 'next/link';
import Image from 'next/image';

export default function Navbar({ user }) {
    return (
        <div className="z-10 w-full flex items-center justify-center font-mono text-sm bg-green-900 py-4">
            {/* Logo */}
            <div className="flex flex-col items-center justify-center">
                <Image
                    src="/besus-logo.png"
                    alt="Besus Logo"
                    width={150}
                    height={200}
                />
            </div>
        </div>
    );
}
