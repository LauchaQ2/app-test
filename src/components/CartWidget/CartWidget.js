import React, {useEffect, useContext, useState} from 'react'
import './CartWidget.css'
import UserContext from '../../context/UserContext';
import CartModal from '../CartModal/CartModal';

const CartWidget = () => {

    const {productCarts,handleCartOpen} = useContext(UserContext)

    const totalProducts = productCarts.map(productCart => productCart.quantity).reduce((prev, curr) => prev + curr, 0);

    return(
        <>
        <div onClick={()=>{handleCartOpen()}} className='cart-widget'>
        {totalProducts}
        </div>
        </>
    )
}

export default CartWidget