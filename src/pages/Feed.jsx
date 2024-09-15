import React from 'react'
import { useSelector } from 'react-redux'
import Post from '../components/Post'

function Feed() {

    const posts= useSelector((state)=>state.post.posts)
    // console.log(posts)

  return (

    <div className=' mt-24 mb-10 mx-3 min-h-screen'>
        <h1 className='text-center text-3xl font-bold mt-10'>Feed</h1>
        <div className='border-b-[3px] border-b-orange-900 w-14 mx-auto mb-10'></div>
      <div className="flex flex-wrap gap-5 justify-center max-w-6xl w-full mx-auto">
        {posts && posts.length>0 ? (posts.map((post) => (
        <div key={post.id}  className="flex flex-col justify-between w-64 border rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <Post post={post}/>
          </div>
          ))):( <div className='flex justify-center items-center text-xl font-semibold my-20'>Nothing here...</div> )}

    </div>
    </div>
  )
}

export default Feed
