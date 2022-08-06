import React, {useEffect, useContext} from 'react'
import './Cart.css'
import UserContext from '../../context/UserContext';

const Cart = () => {

    const {productCarts, totalPrice} = useContext(UserContext)


  return (
    <div className='list-container'>
        {productCarts.length === 0 
        ?
        <h1>No hay productos en el carrito</h1>
        :
        <div className='container-cart'>
        <div className='cart-item-row'>
                    <ul className='cart-list-group'>
                        <li className='row-title first'>Nombre</li>
                        <li className='row-title second'>Precio</li>
                        <li className='row-title third'>Cantidad</li>
                    </ul>
                </div>
        {productCarts.map(product =>{
            return(
                <div className='cart-item-row'>
                    <ul className='cart-list-group'>
                        <li className='first'>{product.name}</li>
                        <li className='second'>${product.price}</li>
                        <li className='third'>{product.quantity}</li>
                    </ul>
                </div>
            )
        })}
        </div>
        }
    </div>
  )
}

export default Cart