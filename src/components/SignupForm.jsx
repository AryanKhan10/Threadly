import React,{useState,useId} from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {signupUser} from "../redux/slice/authSlice"
import Input from "./Input";

function SignupForm() {

    const id=useId();
    const dispatch= useDispatch();
    const navigate=useNavigate();

    const[userData, setUserData]=useState({
        userName:"", 
        email:"", 
        password:"",
        id,
        isAuthenticated:false
    });

    const handleFormData = (e)=>{

        setUserData(prev=>{
            return{
                ...prev,
                isAuthenticated:true,
            [e.target.name]:e.target.value
            }
        });
        // console.log(userData)

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(userData){
            dispatch(signupUser(userData))
            setUserData('')
            navigate("/feed")
        }


    }
  return (

        <section className="rounded-md mt-24 mb-10 ">
          <div className="flex items-center justify-center my-3">
            <div className="bg-white xl:mx-auto shadow-md p-4 xl:w-full xl:max-w-sm 2xl:max-w-md rounded-lg hover:scale-105 ease-in-out duration-200">
              <div className="mb-2"></div>
              
              <h2 className="text-2xl font-bold leading-tight">
                Sign up to create account
              </h2>

              <p className="mt-2 text-base text-gray-600">
                Already have an account? <Link to='/login' className="text-blue-500 hover:underline">Sign In</Link>
              </p>


              <form  onSubmit={handleSubmit} className="mt-5">
                <div className="space-y-4">
                  <div>
                    <Input label="User Name"
                        placeholder="Full Name"
                        type="text"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        name="userName"
                        value={userData.userName} 
                        required
                        onChange={handleFormData}/>
                  </div>

                  <div>
                    <Input label="Email address"
                        placeholder="Email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        name="email"
                        required
                        value={userData.email} 
                        onChange={handleFormData}/>
                  </div>

                  <div>
                    <Input label="Password"
                        placeholder="Password"
                        type="password"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        name="password"
                        required
                        value={userData.password}
                        onChange={handleFormData}/>
                  </div>

                  <div>
                    <button
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                      type="submit"
                    >
                      Create Account
                    </button>
                  </div>

                </div>
              </form>
            </div>
          </div>
        </section>
  );
}

export default SignupForm;
