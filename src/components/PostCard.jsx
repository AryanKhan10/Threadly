import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams,Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { deletePost } from '../redux/slice/postSlice';

function PostCard() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Id = Number(id); // Correctly parse the id from useParams
  // console.log(typeof(Id))
  const posts = useSelector((state) => state.post.posts); // Correctly reference posts array
  const matchedPost = posts.find((item) => item.id === Id);

  // Check if matchedPost is defined before rendering its content
  if (!matchedPost) {
    return <div>No post found.</div>;
  }

  return (
    <div className=" mt-24 mb-10">

          <div className='flex gap-4 justify-center w-full my-4'>
            <Link to="/add-post/">
              <Button children="Add Post" className='mx-4 w-64 bg-[#44403c] hover:bg-black ease-in-out duration-150 '/>
            </Link>
          </div>

      <div className="mx-auto flex flex-col justify-between w-64 border rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        {/* Render post image if it exists */}
        {matchedPost.pictureData && (
          <img
            src={matchedPost.pictureData} // Use matchedPost instead of post
            alt={matchedPost.title}
            className="w-full h-[280px] rounded-t-md"
          />
        )}
        <div className="p-4">
          <h2 className="text-md font-bold truncate capitalize text-slate-600">
            {matchedPost.title}
          </h2>
          <p className="text-xs font-medium text-cyan-600 ">
            {matchedPost.content}
          </p>
        </div>
        <div className="flex justify-end gap-3 m-2">
                <Link to="/profile">
                <Button onClick={()=>dispatch(deletePost(matchedPost.id))} className='bg-[#44403c] hover:bg-black ease-in-out duration-150 hover:scale-105' children='Delete'/>
                </Link>
                <Button onClick={()=>navigate((`/update-post/${matchedPost.id}`))} className='bg-[#44403c] hover:bg-black ease-in-out duration-150 hover:scale-105' children='Update'/>
            </div>
      </div>
    </div>
  );
}

export default PostCard;
