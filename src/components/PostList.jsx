import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post';

function PostList() {
  const posts = useSelector((state) => state.post.posts);
    // console.log(posts)
  return (
    
    <div className="flex flex-wrap gap-5 justify-center max-w-6xl w-full my-4">
      {posts.map((post) => (
        <div className="flex flex-col justify-between w-64 border rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <Post key={post.id} post={post}/>
        </div>
      ))}
    </div>
  );
}

export default PostList;