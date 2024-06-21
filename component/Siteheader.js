import Link from "next/link";
import Image from "next/image";

export default function SiteHeader({ className }) {
    return (
        <>

        <header className={`${className} container mx-auto lg:max-w-4xl flex items-center justify-between`} style={{display:'flex' , justifyContent: "space-between"}}>
            <div className="logo-area">
                <Link href="/" className="flex justify-center">
                    <Image src="/CoolNomad.svg" alt="CoolNomad" width="90" height="70" />
                </Link>
            </div>
            <nav className="text-slate-200">
                <ul className="flex justify-center gap-3 [&>li>a]:px-5 [&>li>a]:py-3 [&>li>a:hover]:text-yellow-400 [&>li>a]:transition text-md" style={{ gap:'10px'}}>
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