import Link from "next/link";

export default function SiteFooter() {
  return (
    <>
      <footer id="site-footer" className="bg-slate-700 text-slate-200">
  <div className="top_footer container mx-auto py-3 px-4 md:px-8 lg:max-w-5xl">
    <div className="py-3 text-center md:text-left">&copy; 2023 - 2024 CoolNomad</div>
    <ul className="botom_footer  md:gap-6 py-3 text-sm lg:text-lg">
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
        <Link href="/contact">CONTACT</Link>
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
