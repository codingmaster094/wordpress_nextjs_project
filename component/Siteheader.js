'use client'
import Link from "next/link";
import Image from "next/image";
import { useState } from 'react';
export default function SiteHeader({ className }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
        <header className={`${className}  mx-auto lg:max-w-4xl flex items-center justify-between`} style={{display:'flex' , justifyContent: "space-between" , padding:"10px"}}>
            <div className="logo-area">
                <Link href="/" className="flex justify-center">
                    <Image src="/CoolNomad.svg" alt="CoolNomad" width="90" height="70" />
                </Link>
            </div>
             {/* Responsive Menu Icon */}
             <div className="menu-icon lg:hidden" onClick={handleMenuToggle}>
                    <div className={`${menuOpen ? 'hidden' : 'block'} menu-bar`}></div>
                    <div className={`${menuOpen ? 'hidden' : 'block'} menu-bar`}></div>
                    <div className={`${menuOpen ? 'hidden' : 'block'} menu-bar`}></div>
                </div>
                {/* Responsive Menu */}
            <nav className={`text-slate-200 lg:flex lg:items-center ${menuOpen ? 'block' : 'hidden'}`}>
                <ul className="navbar flex lg:flex-row justify-center gap-3 [&>li>a]:px-5 [&>li>a]:py-3 [&>li>a:hover]:text-yellow-400 [&>li>a]:transition text-md " style={{ gap:'10px'}}>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/Blog">Blog</Link>
                    </li>
                    <li>
                        <Link href="/about-us">About</Link>
                    </li>
                    
                    <li>
                        <Link href="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
        </>
    );
}