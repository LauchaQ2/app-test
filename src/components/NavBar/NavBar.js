import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom';


const NavBar = () => {
    return (
        <div>
            <nav id="navbarr" class="navbarr">
                <div id="logo-container" class="logo-container">
                    <Link to='/'>
                        <img id="brand-logo" src="https://res.cloudinary.com/dtsh7puzp/image/upload/v1659304572/v1ziflgcqdjv4ld8ws0m.png" alt="ac-brand" class="brand" />
                    </Link>
                </div>
                <div class="menu-btn">
                    <div class="menu-btn__burger"></div>
                </div>
                <div class="navbar-links">
                    <ul>
                        {/* <li><a href="#">INICIO</a></li>
                <li><a href="#logistica">LOGÍSTICA</a></li>
                <li><a href="#nosotros">NOSOTROS</a></li>
                <li><a href="#contacto">CONTACTO</a></li>
                <li><a href="#ubicacion">UBICACIÓN</a></li> */}
                        <Link className='link-routes' to='/login'>
                            <li><a>LOGIN</a></li>
                        </Link>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavBar