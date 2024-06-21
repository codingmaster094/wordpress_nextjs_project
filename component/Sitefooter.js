import Link from "next/link";

export default function SiteFooter() {
  return (
    <>
      <footer id="site-footer"  className="flex justify-center bg-slate-700 text-slate-200">
      <div style={{display:'flex' , justifyContent: "space-between"}} className="flex justify-between items-center container mx-auto lg:max-w-5xl">
        <div className="py-3">&copy; 2023 - 2024 CoolNomad</div>
        <ul className="flex " style={{ gap:'10px'}}>
          <li>
            <Link href="/">HOME</Link>
          </li>
          <li>
            <Link href="/Blog">BLOG</Link>
          </li>
          <li>
            <Link href="/about-us">ABOUT</Link>
          </li>
          <li>
            <Link href="/contact">CONATCT</Link>
          </li>
          <li>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </li>
        </ul>
      </div>
      </footer>
    </>
  );
}
