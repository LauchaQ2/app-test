import React, { StrictMode } from 'react'
import { Routes, BrowserRouter, Route,  } from 'react-router-dom';
import Login from '../pages/Login';
import SignIn from './SignIn';
import { UserProvider } from '../context/UserContext';
import Profile from './Profile';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import HomePage from '../pages/HomePage';
import InfoProfile from '../components/InfoProfile/InfoProfile'
import ShopHistory from '../components/ShopHistory/ShopHistory'
import Coupons from '../components/Coupons/Coupons'



const AppRouter = () => {



  return (
    <div>
    <UserProvider>
    <StrictMode>
        <BrowserRouter>
          <NavBar/>
                <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/profile/information' element={<InfoProfile/>}/>
                <Route path='/profile/shopping' element={<ShopHistory/>}/>
                <Route path='/profile/coupons' element={<Coupons/>}/>
                <Route path='/signin' element={<SignIn/>}/>
                <Route path='/' element ={<HomePage/>}/>
                <Route index element={<HomePage/>}/> 
                </Routes>
                <Footer/>
      </BrowserRouter>
      </StrictMode>
      </UserProvider>
    </div>
  )
}

export default AppRouter