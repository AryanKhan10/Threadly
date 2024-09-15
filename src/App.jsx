import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import PostForm from './components/postForm/PostForm'
import { useSelector } from 'react-redux'
import PostCard from './components/PostCard'
import Profile from './pages/Profile'
import Protected from './components/Protected'
import Feed from './pages/Feed'
function App() {
  const data = useSelector((state)=>state.auth.users)
  console.log(data)


  return (
    <>
      <Header/>
        <main>

          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route element={<Protected/>}>
              <Route path='/Feed' element={<Feed/>}/>
              <Route path='/add-post' element={<PostForm/>}/>
              <Route path='/update-post/:id' element={<PostForm/>}/>
              <Route path='/profile' element={<Profile />}/>
              <Route path='/post/:id' element={<PostCard/>}/>
            </Route>
          </Routes>

        </main>
      <Footer/>
    </>
  )
}

export default App
