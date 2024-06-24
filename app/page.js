import SiteFooter from "component/Sitefooter";
import SiteHeader from "component/Siteheader";
import SideHeader from "component/Siteheader";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title key="pagetitle">Welcome to CoolNomad Travel Blog</title>
        <meta
          name="description"
          content="Coolnomad travel blog - read our travel stories"
          key="metadescription"
        />
      </Head>
      <section className="bg-slate-700 bg-opacity-70 absolute w-full z-20">
        <SiteHeader className="header-blog-home z-10 relative" />
      </section>
      <div className="bg-cover min-h-screen bg-[url('/home.jpg')] relative">
        <div className="absolute bg-slate-900 inset-0 z-0 opacity-40"></div>
        <main className="min-h-[100vh] flex flex-col items-center justify-center z-10 relative">
        <h1 className="text-3xl lg:text-6xl text-center text-slate-100">
  Welcome to <span className="text-yellow-400">CoolNomad</span> Travel Blog
</h1>
          <div className="mt-20">
            <Link
              href="/Blog"
              className="text-1xl text-slate-100 border rounded-md py-2 px-3 lg:py-3 lg:px-4 hover:bg-yellow-300 hover:text-slate-800  hover:border-yellow-300 transition"
            >
              Read Blog
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
