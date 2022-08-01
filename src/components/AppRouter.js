import React from 'react'
import { Routes, BrowserRouter, Route,  } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SignIn from './SignIn';
import { UserProvider } from '../context/UserContext';
import Profile from './Profile';


const AppRouter = () => {



  return (
    <div>
    <UserProvider>
        <BrowserRouter>
                <Routes>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/signin' element={<SignIn/>}/>
                <Route path='/' element ={<HomePage/>}/>
                <Route index element={<HomePage />}/> 
                </Routes>
      </BrowserRouter>
      </UserProvider>
    </div>
  )
}

export default AppRouter