import React, { useContext, useEffect, useState } from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import CartWidget from '../CartWidget/CartWidget';
import CartModal from '../CartModal/CartModal';
import logo from '../../assets/Mangavedo.png'


const NavBar = () => {

    const { userLogged, localOk, navbar, setNavbar, cartOpen, handleCartOpen, handleCartClose } = useContext(UserContext);
    const [toogle, setToogle] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [size, setSize] = useState(window.innerWidth);

    useEffect(() => {
        const handleSize = () => {
            setSize(window.innerWidth);
        }
        window.addEventListener("resize", handleSize)
    }, [])

    useEffect(() => {
        setNavbar(localStorage.getItem('nav'))
        console.log(navbar)

    }, [localOk])

    const menuBtn = document.querySelector('.menu-btn');

    const handleMenuOpen = () => {
        setMenuOpen(!menuOpen)
        setToogle(!toogle)
    }




    return (
        <div>
            <nav id="navbarr" className="navbarr">
                <div id="logo-container" className="logo-container">
                    <Link to='/'>
                        <img id="brand-logo" src={logo} alt="ac-brand" className="brand" />
                    </Link>
                </div>
                {size < 600 && <CartWidget/>}
                <div onClick={handleMenuOpen} className={menuOpen ? "menu-btn open" : 'menu-btn'}>
                    <div className="menu-btn__burgerT"></div>
                    <div className="menu-btn__burger"></div>
                    <div className="menu-btn__burgerB"></div>
                </div>
                <div className={toogle ? "navbar-links active" : "navbar-links"}>
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
                        {size > 600 && <li> <a> <CartWidget /></a> </li>}
                    </ul>
                </div>
            </nav>
            {cartOpen ? <CartModal handleCartClose={handleCartClose} /> : null}
        </div>
    )
}

export default NavBar