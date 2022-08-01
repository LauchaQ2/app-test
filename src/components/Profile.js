import React, { useContext, useEffect } from 'react'
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {

    const { userLogged, setUserLogged, setIsLogin, onChangePicture,refresh, setRefresh,update,someUp} = useContext(UserContext);
    let navigate = useNavigate();

    useEffect(() => {
        if(refresh === true){
          navigate('/profile')
          setRefresh(false)
          }
      }, [userLogged]);

    const clear = () => {
        setUserLogged({});
        setIsLogin(false);
        console.log(userLogged)
        navigate('/');
    }

    return (
        <div className='center'><div className='profile'>
            <div className='box-left'>
                <img src={!userLogged.user.img ? 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' : userLogged.user.img || userLogged.img} />
                <form className='form-picture' onSubmit={update}>
                <label className={someUp ? 'label-upload2' : 'label-upload'} for='upload'>Edit image</label>
                <input onChange={onChangePicture} id='upload' className='select-file' type="file"/>
                <button>Actualizar imagen</button>
                </form>
            </div>

            <div className='box-right'>
                <h1>{userLogged.user.name || userLogged.name}</h1>
                <h3>{userLogged.user.email || userLogged.email}</h3>
                <h3></h3>
            </div>
        </div>
            <button onClick={clear}>Logout</button></div>)
}

export default Profile