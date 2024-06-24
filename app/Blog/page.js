"use client"; // Add this line to mark the component as a client component

import Head from "next/head";
import Link from "next/link";
import "../../styles/main.css";
import { useState, useEffect } from "react";
import SiteHeader from "component/Siteheader";
import FeaturedImage from "component/Featuredimage";
import SiteFooter from "component/Sitefooter";
import Date from "component/Date";
import { getPostList } from "lib/posts";
import LoadMore from "component/LoadMore";

async function fetchPosts() {
  return await getPostList();
}
export default function BlogHome({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    };
    fetchInitialPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Our Blog</title>
        <meta name="description" content="Our blog posts" />
      </Head>
      <section className="bg-slate-700 bg-opacity-70 absolute w-full z-20">
        <SiteHeader className="header-blog-home z-10 relative" />
      </section>
      <div className="bg-cover h-[50vh] min-h-[20rem] bg-[url('/home.jpg')] flex justify-center items-center w-full relative">
        <div>
          <div className="absolute bg-slate-900 inset-0 z-0 opacity-40">
            <div className="container lg:max-w-4xl mx-auto"></div>
          </div>
          <h1 className="text-6xl text-center text-slate-100 relative z-10">
            BLOG
          </h1>
          <p className="relative text-center z-10 text-slate-100 text-2xl">
            Read our latest articles
          </p>
        </div>
      </div>
      <main>
        <section className="container mx-auto lg:max-w-5xl post-list mt-4">
          <ul>
            {posts?.nodes?.map((post) => (
              <li
                key={post.slug}
                className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 p-3"
              >
                <div className="md:col-span-2">
                  <FeaturedImage post={post} />
                </div>
                <div className="md:col-span-3">
                  <h2 className="py-4">
                    <Link
                      className="text-blue-400 text-md lg:text-2xl hover:text-blue-600"
                      href={`Blog/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <div className="py-4">
                    Published On: <Date dateString={post.date} />
                  </div>
                  <div
                    className="text-lg"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  ></div>
                  <div className="py-4">
                    posted under{" "}
                    {post.categories.nodes.map((category) => (
                      <Link
                        className="text-blue-400 hover:text-blue-500"
                        href={`category/${category.slug}`}
                        key={category.slug}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="py-4 text-center">
            <LoadMore posts={posts} setPosts={setPosts} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

BlogHome.getInitialProps = async () => {
  const initialPosts = await fetchPosts();
  return { initialPosts };
};
