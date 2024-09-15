import { createSlice } from "@reduxjs/toolkit";

// Read initial users from localStorage
const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
const initialState = {
    users: storedUsers, // An array to store multiple users
  };
export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        signupUser:(state, action)=>{
            state.users.push(action.payload);
            // console.log(state[0])
            localStorage.setItem("users", JSON.stringify(state.users)); // Update localStorage
        },
        logOut:(state)=>{
            state.users.forEach(user => {

                if (user.isAuthenticated) {
                  user.isAuthenticated = false;
                }
              });

            localStorage.setItem("users", JSON.stringify(state.users))
        },
        login:(state,action)=>{
            console.log(action.payload)

            state.users.forEach(user => {
                if (user.email === action.payload) {
                  user.isAuthenticated = true;
                  console.log(user)
                }
              });

            localStorage.setItem("users", JSON.stringify(state.users))

        }
        
    }

});
export const {signupUser, login, logOut} = authSlice.actions;
export default authSlice.reducer;