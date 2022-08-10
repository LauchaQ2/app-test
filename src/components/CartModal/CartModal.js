import { faVenusMars } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../../context/UserContext'
import './CartModal.css'

const CartModal = ({ handleCartClose }) => {

    const { productCarts, totalPrice, removeItem, addItem, clearCart } = useContext(UserContext)
    const [preferenceId, setPreferenceId] = useState()


    const buy = async () => {
        const response = await axios.post('https://restserver-lautaro-quevedo.herokuapp.com/api/products/payment', productCarts)
            .then(res => {
                var ids = res.data.preferenceId;
                setPreferenceId(ids)
                console.log(ids)
                // The source domain must be completed according to the site for which you are integrating.
                // For example: for Argentina ".com.ar" or for Brazil ".com.br".
                var script = document.createElement("script");
                script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
                script.type = "text/javascript";
                script.setAttribute('data-preference-id', ids);;
                document.getElementById("page-content").innerHTML = "";
                document.querySelector("#page-content").appendChild(script);
            })
            .catch(err => {
                console.log(err)
            })
    }




    return (
        <><div className='shade'></div><div className='cart-container'>
            <div className='header-modal'>
                <span>Carrito de compras</span>
                <span className='btn-close' onClick={() => { handleCartClose() }}>X</span>
            </div>
            <div id='page-content' className='body-modal'>
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
                    <button onClick={() => { buy() }}>
                        Pagar
                    </button>

                </div>
            </div>
        </div></>
    )
}

export default CartModal