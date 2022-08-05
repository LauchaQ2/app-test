import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { Circles, Bars } from 'react-loader-spinner'
import { Routes, BrowserRouter, Route, } from 'react-router-dom';
import './Profile.css';
import refreshLogo from '../assets/refresh.png'
import Login from '../pages/Login';
import HomePage from '../pages/HomePage';
import AppRouter from './AppRouter';
import InfoProfile from './InfoProfile/InfoProfile';
import ShopHistory from './ShopHistory/ShopHistory';
import Coupons from './Coupons/Coupons';

const Profile = () => {

    const { setNavbar, userLogged, addModal, img, setAddModal, setIsLogin, onChangePicture, refresh, setRefresh, update, someUp, loader, localOk, setLocalOk } = useContext(UserContext);
    let navigate = useNavigate();

    const [optionProfile, setOptionProfile] = useState();


    useEffect(() => {
        if (refresh === true) {
            navigate('/profile')
            setRefresh(false)
            setLocalOk(false)
            setNavbar(true)
            setTimeout(() => {
                setAddModal(false)
            }, 1500);
        }
    }, [localOk]);

    const renderSwitch = (optionProfile) => {
        switch (optionProfile) {
            case 1:
                return <InfoProfile userLogged={userLogged} />
                break;
            case 2:
                return <ShopHistory />
                break;
            case 3:
                return <Coupons />
                break;
            default:
                break;
        }
    }


    const clear = () => {
        setIsLogin(false);
        setNavbar(false)
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
                    <><div className='title-container'>
                        <form className='form-picture' onSubmit={update}>
                            <label className={someUp ? 'label-upload2' : 'label-upload'} for='upload'>📷</label>
                            <input onChange={onChangePicture} id='upload' className='select-file' type="file" />
                            {img !== null ? <button className='update-btn'><img className='img-upload' src={refreshLogo} /></button> : null}
                        </form>

                        <img className='img-profile' src={!userLogged.user.img ? 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' : userLogged.user.img || userLogged.img} />
                        <h1 className='name-profile'>{userLogged.user.name || userLogged.name}</h1>
                    </div>
                        <div className='profile-container'>
                            <div className='box-left'>
                                <ul>
                                    <li className='item-menu-profile' onClick={()=>{setOptionProfile(1)}}>Mi información</li>
                                    <li className='item-menu-profile' onClick={()=>{setOptionProfile(2)}}>Mi historial de compras</li>
                                    <li className='item-menu-profile' onClick={()=>{setOptionProfile(3)}}>Cupones</li>
                                    <li className='item-menu-profile' onClick={clear}>Cerrar sesión</li>
                                </ul>
                            </div><div className='box-right'>
                                {renderSwitch(optionProfile)}
                            </div>
                        </div>
                    </>
            }
            <div className={addModal ? 'modal-open' : 'modal-close'}>
                <div className='modal-header'>
                    <button onClick={() => { setAddModal(false) }}>X</button>
                </div>
                <div className='modal-body'>
                    <Circles />
                </div>
            </div>

        </div>
        </div>)
}

export default Profile