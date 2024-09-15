import React from 'react'
import Button from '../components/Button'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Post from '../components/Post'
function Dashboard() {
    const posts= useSelector((state)=>state.post.posts)
    const users= useSelector((state)=>state.auth.users)
    const {id} = users.find((u)=>u.isAuthenticated === true)
    const allowedPost= posts.filter((f)=>f.uId ===id )

    console.log(allowedPost)
    console.log(id)
  return (
    <div className='m-8 min-h-screen py-16'>

        <div className='flex gap-4 justify-center w-full'>
          <Link to="/add-post/">
            <Button children="Add Post" className='bg-[#44403c] w-64 hover:bg-black ease-in-out duration-150 '/>
          </Link>
        </div>

        <div className="flex flex-wrap gap-5 justify-center w-full my-4">
            {allowedPost && allowedPost.length>0 ? (allowedPost.map((post,index) => (
                <Link  key={index} to={`/post/${post.id}`}>
                    <div className="flex flex-col justify-between w-64 hover:scale-105 ease-in-out duration-100 border rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                    <Post post={post}/>
                </div>
                </Link>
          ))):( <div className='min-h-60 flex items-center text-3xl font-semibold'>You haven't posted yet!</div> )}
      </div>
    </div>
  )
}

export default Dashboard
