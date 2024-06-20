"use client";
import Head from "next/head";
import Date from "component/Date";
import { getSinglepost } from "lib/posts";
import SiteHeader from "component/Siteheader";
import SiteFooter from "component/Sitefooter";
import { getComments } from "lib/comments";
import CommentForm from "component/CommentForm";
import { useEffect, useState } from "react";
import { Rubik, Roboto_Slab } from "@next/font/google";
import { useParams } from "next/navigation";


const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
});

const roboto_slab = Roboto_Slab({
  subsets: ['latin'],
  display: 'swap',
});

export default function Post() {
  // Use useParams to get route parameters
  const params = useParams();
  const [SinglePosts, setSinglePosts] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      if (params.postslug) {
        const post = await getSinglepost(params.postslug);
        setSinglePosts(post);

        const { comments, commentCount } = await getComments(params.postslug);
        setComments(comments);
        setCommentCount(commentCount);
      }
    }

    fetchData();
  }, [params.postslug]);

  if (!SinglePosts) {
    return <div>Loading...</div>;
  }

  let featuredImage = "http://headless.local/wp-content/uploads/2022/12/travel_icy-polar_022K.jpg";
  if (SinglePosts.featuredImage?.node?.mediaDetails?.sizes?.[0]?.sourceUrl) {
    featuredImage = SinglePosts.featuredImage.node.mediaDetails.sizes[0].sourceUrl;
  }

  return (
    <>
      <Head>
        <title key={SinglePosts.slug}>{SinglePosts.title}</title>
        <meta
          name="description"
          content={SinglePosts.excerpt}
          key="metadescription"
        />
      </Head>
      <section className="bg-slate-700 bg-opacity-70 absolute w-full z-20">
        <SiteHeader className="header-blog-home z-10 relative" />
      </section>
      <article className={rubik.className}>
        <section
          className="hero-area h-[60vh] min-h-[3rem] bg-no-repeat bg-cover bg-center relative"
          style={{ backgroundImage: `url(${featuredImage})` }}
        >
          <div className="absolute inset-0 bg-slate-900 opacity-40"></div>
          <div className="container mx-auto h-full flex flex-col justify-center lg:max-w-4xl">
            <h1 className={`${roboto_slab.className} text-6xl text-center text-slate-100 relative z-10 py-8 mt-12`}>
              {SinglePosts.title}
            </h1>
            <div className="pb-4 text-slate-100 z-10">
              Posted By Dipak Gawale, Last updated on: <Date dateString={SinglePosts.modified} />
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: SinglePosts.excerpt }}
              className="relative z-10 text-left text-slate-200 text-2xl pl-4 border-l-4 border-lime-200"
            />
          </div>
        </section>
        <section className="content-area py-8">
          <div
            dangerouslySetInnerHTML={{ __html: SinglePosts.content }}
            className="post-content max-w-4xl mx-auto"
          />
        </section>
      </article>

      <div className="container mx-auto lg:max-w-4xl">
        <h3 className="text-xl py-2 my-4 border-l-4 border-l-lime-300 pl-4">
          {commentCount ? commentCount : "No"} comments on this post so far:
        </h3>
        <CommentForm postId={SinglePosts.databaseId} />
      </div>

      <div className="container mx-auto lg:max-w-4xl">
        <section>
          <ul>
            {comments?.nodes?.length ? (
              comments?.nodes?.map((comment) => (
                <li key={comment.id} className="pb-4 border-b">
                  <div className="comment-header flex justify-start items-center">
                    <div className="py-4">
                      <img
                        src={comment.author.node.avatar.url}
                        alt={`Avatar of ${comment.author.node.name}`}
                        width={50}
                        height={50}
                        className="rounded-full max-w-[50px] mr-4"
                      />
                    </div>
                    <div>
                      <div className="font-bold">
                        {comment.author.node.name}
                      </div>
                      <div className="text-sm">
                        <Date dateString={comment.date} />
                      </div>
                    </div>
                  </div>
                  <div className="comment-body pl-[66px]">
                    <div
                      dangerouslySetInnerHTML={{ __html: comment.content }}
                    ></div>
                  </div>
                </li>
              ))
            ) : (
              <li>No comments yet. Be the first to comment!</li>
            )}
          </ul>
        </section>
      </div>

      <section>
        <SiteFooter />
      </section>
    </>
  );
}
