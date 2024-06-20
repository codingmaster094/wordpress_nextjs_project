'use client'
import { getPostList } from "lib/posts";
import { useState } from "react";
export default function LoadMore({ posts, setPosts , taxonomy = null}) {
    const [Butontext , setButtonText] = useState('Load More Post')
    const [ButonDisabled , setButonDisabled] = useState(false)
  const handleOnClick = async () => {
    setButtonText('Loading...')
    setButonDisabled(true)
    const morePosts = await getPostList(posts.pageInfo.endCursor , taxonomy);
    setPosts((prevPosts) => ({
      ...prevPosts,
      pageInfo: morePosts.pageInfo,
      nodes: [...prevPosts.nodes, ...morePosts.nodes],
    }));

    if(morePosts.pageInfo.hasNextPage){
        setButtonText('Load More Post')
        setButonDisabled(false)
    }else{
        setButtonText('No More Post To Load')
        setButonDisabled(true)
    }
  };

  return (
    <button onClick={handleOnClick} disabled={ButonDisabled} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
  { Butontext}
</button>
  );
}
