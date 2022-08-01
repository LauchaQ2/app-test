import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory  } from 'react-router-dom';

const Login = ( {login, handleChange}) => {
    
let history = useHistory();
    

  return (
    <><h1>Iniciar Sesión</h1><form className='form' onSubmit={login}>
          <input name='email' placeholder='E-mail' onChange={handleChange} />
          <input name='password' placeholder='Contraseña' onChange={handleChange} />
          <button>Login</button>
      </form>
      <p onClick={()=>{setSignOrLogin(false)}}>¿No tenés cuenta? Hacé click y creala!</p>
      </>  
      
      )
}

export default Login