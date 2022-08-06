import React, { useContext, useEffect, useState } from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';


const NavBar = () => {

    const {userLogged, localOk,navbar, setNavbar} = useContext(UserContext);

    const [toogle, setToogle] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
   
    useEffect(() => {
      setNavbar(localStorage.getItem('nav'))
        console.log(navbar)
      
    }, [localOk])
    
    const menuBtn = document.querySelector('.menu-btn');
  
    const handleMenuOpen = () =>{
      setMenuOpen(!menuOpen)
      setToogle(!toogle)
    }
    



    return (
        <div>
            <nav id="navbarr" className="navbarr">
                <div id="logo-container" className="logo-container">
                    <Link to='/'>
                        <img id="brand-logo" src="https://res.cloudinary.com/dtsh7puzp/image/upload/v1659304572/v1ziflgcqdjv4ld8ws0m.png" alt="ac-brand" className="brand" />
                    </Link>
                </div>
                <div onClick={handleMenuOpen} className={menuOpen ? "menu-btn open" : 'menu-btn'}>
                    <div className="menu-btn__burger"></div>
                </div>
                <div className={toogle ? "navbar-links active":"navbar-links"}>
                    <ul>
                        {/* <li><a href="#">INICIO</a></li>
                <li><a href="#logistica">LOGÍSTICA</a></li>
                <li><a href="#nosotros">NOSOTROS</a></li>
                <li><a href="#contacto">CONTACTO</a></li>
                <li><a href="#ubicacion">UBICACIÓN</a></li> */}
                <Link className='link-routes' to='/products'>
                            <li><a>PRODUCTOS</a></li>
                        </Link>
                        <Link className='link-routes' to={navbar ? '/profile' : '/login'}>
                            <li><a>{navbar ? 'MI CUENTA' : 'LOGIN'}</a></li>
                        </Link>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavBar