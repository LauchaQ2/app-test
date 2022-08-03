import React, { useContext } from 'react'
import '../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import UserContext from '../context/UserContext';


const Login = () => {
    
    
    const {login,handleChange,isLogin,setLocalOk, localOk} = useContext(UserContext);


    
    let navigate = useNavigate();
    
   
    
    const handleLimit = (e) => {
      var regex = /[^0-9]/g;
      e.target.value = e.target.value.replace(regex, "");
    }
    
    
  
  
  
   
    useEffect(() => {
      if(isLogin === true){
        navigate('/profile')
        setLocalOk(false) 
        }
    }, [localOk]);
    
  
    return (
      <div className="App">
        <div className='containerform'>
        <><h1>Iniciar Sesión</h1><div className='form'>
          <input className='input-forms' name='email' placeholder='E-mail' onChange={handleChange} />
          <input className='input-forms' type='password' name='password' placeholder='Contraseña' onChange={handleChange} />
          <button onClick={login}>Login</button>
      </div>
      <Link to='/signin'>
      <p>¿No tenés cuenta? Hacé click y creala!</p>
      </Link>
      </>  
      </div>
      </div>
    );
  }

export default Login