import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Bars } from 'react-loader-spinner'
import './Profile.css';

const Profile = () => {

    const { userLogged, setUserLogged, setIsLogin, onChangePicture, refresh, setRefresh, update, someUp, loader, localOk, setLocalOk } = useContext(UserContext);
    let navigate = useNavigate();



    useEffect(() => {
        if (refresh === true) {
            navigate('/profile')
            setRefresh(false)
            setLocalOk(false)
        }
    }, [localOk]);

    const clear = () => {
        setIsLogin(false);
        console.log(userLogged)
        localStorage.clear();
        navigate('/');
    }

    return (
        <div className='center'><div className='profile'>
            {
                loader
                    ?
                    <Bars />
                    :
                    <><div className='box-left'>
                        <img src={!userLogged.user.img ? 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' : userLogged.user.img || userLogged.img} />
                        <form className='form-picture' onSubmit={update}>
                            <label className={someUp ? 'label-upload2' : 'label-upload'} for='upload'>Seleccionar imagen</label>
                            <input onChange={onChangePicture} id='upload' className='select-file' type="file" />
                            <button className='update-btn'>Actualizar</button>
                        </form>
                    </div><div className='box-right'>
                            <h1>{userLogged.user.name || userLogged.name}</h1>
                            <h3>{userLogged.user.email || userLogged.email}</h3>
                        </div></>
            }

        </div>
            <button onClick={clear}>Cerrar sesión</button></div>)
}

export default Profile