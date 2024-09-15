import React, { useEffect, useRef, useState } from "react";
import Input from "../Input";
import TextArea from "../TextArea";
import Button from "../Button";
import { addPost, updatePost } from "../../redux/slice/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function PostForm() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const paraid= params.id;
  const updatedPostId = Number(paraid);
  console.log(params);

  const posts = useSelector((state) => state.post.posts);
  const toBeUpdate = posts.find((post) => post.id === updatedPostId);
  console.log(toBeUpdate);

  const users = useSelector((state) => state.auth.users);
  const {id,userName} = users.find((user)=>user.isAuthenticated === true);
  console.log(userName)
  const userId=id
  console.log(userId)
  console.log(posts);
  console.log(toBeUpdate);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [postData, setPostData] = useState({
    username:toBeUpdate ? toBeUpdate.username : "",
    uId:toBeUpdate?toBeUpdate.id:userId,
    id: Date.now(),
    title: toBeUpdate ? toBeUpdate.title : "",
    content: toBeUpdate ? toBeUpdate.content : "",
    picture: toBeUpdate ? toBeUpdate.picture : null,
    pictureName: toBeUpdate ? toBeUpdate.pictureName : "",
  });
  // const newId = Date.now();
  console.log(postData);

  useEffect(() => {
    if (updatedPostId) {
      // console.log(updatedPostId);

      const updatePost = posts.find((post) => post.id === updatedPostId);
      if (updatePost) {
        setPostData(updatePost);
        setPreviewUrl(updatePost.pictureData);
      }
    }
  }, [updatedPostId, posts]);

  const handleChange = (e) => {
    const { type, name, value, files } = e.target;
    if (type === "file") {
      const file = files[0];

      setPostData((prev) => ({
        ...prev,
        picture: file,
        pictureName: file.name,
      }));
      // Create a preview URL for the image
      const reader = new FileReader(); //This line creates a new FileReader object. The FileReader is a built-in JavaScript API that allows web applications to asynchronously read the contents of files (or raw data buffers) stored on the user's computer.
      reader.onloadend = () => {
        //The 'loadend' event is fired when the read operation is completed, whether it was successful or not.
        setPreviewUrl(reader.result); // `reader.result` contains the contents of the file that was read
      };
      reader.readAsDataURL(file); //Reads the file and returns a data URL (commonly used for images) will be string
    } else {
      setPostData((prev) => ({
        ...prev,
        username:userName,
        [name]: value,
      }));
console.log(postData)

    }
  };
  console.log(postData.id);

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (postData.picture) {
      // console.log(postData.picture);

      const reader = new FileReader();

      reader.onloadend = () => {
        const pictureData = reader.result;
        // Here, we're sending serializable data to Redux
        const serializablePostData = {
          username:postData.username,
          uId:postData.uId,
          id: postData.id,
          title: postData.title,
          content: postData.content,
          pictureName: postData.pictureName,
          pictureData: pictureData, // data url
        };
        if (updatedPostId) {
          dispatch(updatePost(serializablePostData));
        } else {
          dispatch(addPost({ postData: serializablePostData}));
        }
        
      };
      reader.readAsDataURL(postData.picture);
    } else {
      // If no picture, dispatch without pictureData
      const serializablePostData = {
        ...postData,
        pictureName: "",
        pictureData: postData.pictureData,
      };
      if (updatedPostId) {
        dispatch(updatePost(serializablePostData));
      } else {
        dispatch(addPost({ postData: serializablePostData}));
      }

    }
      navigate(`/post/${postData.id}`);
  };
  return (
      
      <section className=" mt-20 p-2 ">
        <div className="flex items-center justify-center my-3">
          <div className="bg-white xl:mx-auto shadow-md p-4 xl:w-full xl:max-w-sm 2xl:max-w-md rounded-lg">
            <div className="mb-2"></div>
            <h2 className="text-2xl font-bold leading-tight">Add a post</h2>
            <form onSubmit={submitHandler} className="mt-5">
              <div className="space-y-4">
                <div>
                  <Input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    label="Title"
                    placeholder="title"
                    name="title"
                    value={postData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <TextArea
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    label="Content"
                    placeholder="write your content here..."
                    required
                    name="content"
                    value={postData.content}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Input
                    label="Picture"
                    type="file"
                    name="picture"
                    onChange={handleChange}
                  />
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="mt-2 max-w-xs rounded-md"
                    />
                  )}
                </div>
                <div>
                  <Button
                    type="submit"
                    children={updatedPostId ? "Update" : "Post"} 
                    className="w-full bg-[#44403c] hover:bg-black ease-in-out duration-150"
                  />{" "}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
  );
}

export default PostForm;
