import React, {useEffect, useContext} from 'react'
import './CartWidget.css'
import UserContext from '../../context/UserContext';

const CartWidget = ({size}) => {

    const {productCarts} = useContext(UserContext)

    const totalProducts = productCarts.map(productCart => productCart.quantity).reduce((prev, curr) => prev + curr, 0);

    

    return(
        <div className='cart-widget'>
        {totalProducts}
        </div>
    )
}

export default CartWidget