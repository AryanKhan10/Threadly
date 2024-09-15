import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../redux/slice/authSlice';
import Input from './Input';
import Button from './Button';

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // State to manage user credentials
  const [cred, setCred] = useState(true);
  
  // State to manage form data
  const [userData, setUserData] = useState({
    email: "", 
    password: "",
    isAuthenticated: false
  });

  // Handle form data changes
  const handleFormData = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.length > 0) {
      const userExists = users.some(
        (user) => user.email === userData.email && user.password === userData.password
      );

      if (userExists) {
        // Set authenticated to true
        dispatch(login(userData.email));
        setUserData((prev) => ({
          ...prev,
          isAuthenticated: true
        }));
        navigate('/feed');
      } else {
        // If credentials are invalid
        setCred(false);
      }
    } else {
      // If there are no users in localStorage
      setCred(false);
    }
  };

  return (
    <section className="rounded-md mt-24 mb-14">
      <div className="flex items-center justify-center my-3">
        <div className="bg-white xl:mx-auto shadow-md p-4 xl:w-full xl:max-w-sm 2xl:max-w-md rounded-lg hover:scale-105 ease-in-out duration-200">
          
          {/* Show error message if credentials are invalid */}
          {!cred && (
            <div className="text-red-600 text-sm mb-3">Invalid Credentials</div>
          )}

          <form onSubmit={handleSubmit} className="mt-5">
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Login to see posts</h2>

              <div>
                <Input
                  label="Email"
                  placeholder="Email"
                  type="email"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                  name="email"
                  value={userData.email}
                  onChange={handleFormData}
                />
              </div>

              <div>
                <Input
                  label="Password"
                  placeholder="Password"
                  type="password"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  name="password"
                  required
                  value={userData.password}
                  onChange={handleFormData}
                />
              </div>

              <div>
                <Button
                  children="Sign In"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-[#525252]"
                  type="submit"
                />
                <p className="flex justify-center space-x-1 my-2 ">
                  <span className="text-slate-700">Don't have an account?</span>
                  <Link className="text-blue-500 hover:underline" to="/signup">Sign Up</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
