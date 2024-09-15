import React from 'react'
import { useDispatch } from 'react-redux';

function Post({post}) {

    const dispatch = useDispatch()
    console.log(post.id)
  return (
    <div>
      {post.pictureData && (
              <img 
              src={post.pictureData} 
              alt={post.title} 
              className=" w-full h-[280px] rounded-t-md"
              />
            )}
            <div className="p-4">
              <span className='text-xs flex justify-end pb-2'>Posted by
                 <p className='text-blue-500 pl-1 font-medium capitalize'>{" "}{post.username}</p>

              </span>
            <h2 className="text-md font-bold truncates capitalize text-slate-600">{post.title}</h2>
            <p className='text-xs font-medium text-cyan-600' >{post.content.split(" ").slice(0,13).join(" ")+".."}</p>
            </div>
            <div className=" m-2 flex justify-end gap-2">
            
            </div>
    </div>
  )
}

export default Post
