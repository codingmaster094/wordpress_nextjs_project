'use client';
import Head from "next/head";
import SiteHeader from "component/Siteheader";
import SiteFooter from "component/Sitefooter";
import { getSinglepage } from "lib/pages";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

// Ensure the component name starts with an uppercase letter
export default function Page() {
  const { Pageslug } = useParams(); // Extract the page slug using useParams
  const [pageData, setPageData] = useState(null);

  // Fetch page data when Pageslug changes
  useEffect(() => {
    async function fetchPageData() {
      if (Pageslug) {
        const data = await getSinglepage(Pageslug);
        setPageData(data);
      }
    }

    fetchPageData();
  }, [Pageslug]);

  // Display a loading message while data is being fetched
  if (!pageData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{pageData.title}</title>
      </Head>
      <section className="bg-slate-700">
        <SiteHeader className="header-blog-home z-10 relative" />
      </section>
      <section className="content-area py-8">
        <article>
          <h1 className="text-6xl text-center text-slate-700 py-8">{pageData.title}</h1>
          <div 
            dangerouslySetInnerHTML={{ __html: pageData.content }} 
            className="post-content container mx-auto lg:max-w-4xl" 
          />
        </article>
      </section>
      <section>
        <SiteFooter/>
      </section>
    </>
  );
}
