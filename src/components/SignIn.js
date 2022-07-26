import React, { useContext, useEffect } from 'react'
import { Link, useNavigate  } from 'react-router-dom';
import UserContext from '../context/UserContext';

const SignIn = () => {

  const {createUser,handleChangeForm, isLogin, setLocalOk, localOk} = useContext(UserContext);

  let navigate = useNavigate();
    
  useEffect(() => {
    if(isLogin === true){
      navigate('/profile')
      setLocalOk(false)
      }
  }, [localOk]);


  return (
    <div className='containerform'><h1>Crear usuario</h1><form className='form' onSubmit={createUser}>
      <input className='input-forms' aria-errormessage='' type='text' name='name' placeholder='Nombre' onChange={handleChangeForm} />
      <input className='input-forms' type='email' name='email' placeholder='E-mail' onChange={handleChangeForm} />
      <input className='input-forms' type='password' name='password' placeholder='Contraseña' onChange={handleChangeForm} />
      <button>Sign in</button>
      <Link to='/'>
      <p>¿Ya tenés cuenta? Logueate!</p>
      </Link>
    </form></div>)

}

export default SignIn