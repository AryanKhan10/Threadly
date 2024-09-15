import { createSlice } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const post = JSON.parse(localStorage.getItem("posts")) || [];

const initialState = {
    posts:post
  };

export const postSlice = createSlice({
    name:'post',
    initialState,
    reducers:{
        addPost:(state,action)=>{
            const {username,uId,id, title, content, pictureName, pictureData } = action.payload.postData;

            // console.log(uId)
            state.posts.push({username,uId, id,title, content, pictureName, pictureData })

            // state.userId=action.payload.Uid
            try {
            localStorage.setItem('posts', JSON.stringify(state.posts));
            } catch (error) {
                alert("Stoage full, ",error)
            }
        },
        deletePost:(state,action)=>{

            state.posts=state.posts.filter(post=>post.id!==action.payload)
            localStorage.setItem('posts', JSON.stringify(state.posts));
        },
        updatePost: (state, action) => {
            const index = state.posts.findIndex(post => post.id === action.payload.id);

            if (index !== -1) {
              state.posts[index] = action.payload;
              localStorage.setItem('posts', JSON.stringify(state.posts));
            }
        }
    }
});
export const {addPost,updatePost,deletePost} = postSlice.actions;
export default postSlice.reducer;