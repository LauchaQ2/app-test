import React, { useEffect, useContext, useState } from 'react'
import './CartWidget.css'
import UserContext from '../../context/UserContext';
import CartModal from '../CartModal/CartModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CartWidget = () => {

    const { productCarts, handleCartOpen } = useContext(UserContext)

    const totalProducts = productCarts.map(productCart => productCart.quantity).reduce((prev, curr) => prev + curr, 0);

    return (
        <div onClick={() => { handleCartOpen() }} className='cont-widget'>  <i class="fa-solid fa-cart-shopping fa-lg"></i>
            <div className='cart-widget'>
                {totalProducts}
            </div>
        </div>
    )
}

export default CartWidget