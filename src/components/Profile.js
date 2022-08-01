import React, { useContext } from 'react'
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Profile = ({ clearUser }) => {

    const { userLogged, setUserLogged, setIsLogin } = useContext(UserContext);
    let navigate = useNavigate();

    const clear = () => {
        setUserLogged({});
        setIsLogin(false);
        console.log(userLogged)
        navigate('/');
    }

    return (
        <div className='center'><div className='profile'>
            <div className='box-left'>
                <img src={!userLogged.user.img ? 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' : userLogged.user.img} />
            </div>

            <div className='box-right'>
                <h1>{userLogged.user.name}</h1>
                <h3>{userLogged.user.email}</h3>
                <h3></h3>
            </div>
        </div>
            <button onClick={clear}>Logout</button></div>)
}

export default Profile