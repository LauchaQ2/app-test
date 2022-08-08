import React, { useContext } from 'react'
import UserContext from '../../context/UserContext'
import './CartModal.css'

const CartModal = ({ handleCartClose }) => {

    const { productCarts, totalPrice, removeItem, addItem, clearCart } = useContext(UserContext)


    return (
        <><div className='shade'></div><div className='cart-container'>
            <div className='header-modal'>
                <span>Carrito de compras</span>
                <span className='btn-close' onClick={() => { handleCartClose() }}>X</span>
            </div>
            <div className='body-modal'>
                {productCarts.length === 0 ? <h1>No hay productos en el carrito</h1> : <>
                    <ul className='cart-title-group'>
                        <li className='row-title'>Producto</li>
                    </ul></>}
                {productCarts.map(product => {
                    return (
                        <div className='card-cart-product'>
                            <div className='card-img-product'>
                                <img src={product.img} />
                            </div>
                            <div className='card-detail-product'>
                                <p>{product.name}</p>
                                <p>Subtotal: ${product.price * product.quantity} ARS</p>
                                <div className='group-btn '>
                                    <button onClick={() => { removeItem(product.id, product.quantity) }} className="count-mobile">-</button>
                                    <input type="text" className="count-mobile" value={product.quantity} readOnly />
                                    <button onClick={() => { addItem(product.id, product.quantity) }} className="count-mobile">+</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className='footer-modal'>
                {productCarts.length !== 0 && <p>TOTAL: {totalPrice}</p>}
                </div>
            </div>
        </div></>
    )
}

export default CartModal