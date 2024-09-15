import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

function Protected() {
  const users = useSelector((state)=>state.auth.users)
  const allow= users.some((user)=>user.isAuthenticated===true)
  //  console.log(allow)

  return allow ? <Outlet/> : <Navigate to={'/login'} />
  
}

export default Protected
