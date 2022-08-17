import { faVenusMars } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import './CartModal.css'

const CartModal = ({ handleCartClose }) => {

    const { productCarts, totalPrice, removeItem, addItem, clearCart, userLogged } = useContext(UserContext)
    const [preferenceId, setPreferenceId] = useState()
    let navigate = useNavigate();
    const [shoppingOption, setShoppingOption] = useState(0);


    const buy = async () => {
        const response = await axios.post('https://restserver-lautaro-quevedo.herokuapp.com/api/products/payment', productCarts)
            .then(res => {
                var ids = res.data.preferenceId;
                setPreferenceId(ids)
                console.log(ids)
                // The source domain must be completed according to the site for which you are integrating.
                // For example: for Argentina ".com.ar" or for Brazil ".com.br".
                var script = document.createElement("script");
                var h1 = document.createElement("h3")
                script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
                script.type = "text/javascript";
                script.setAttribute('data-preference-id', ids);;
                document.getElementById("button-mp").innerHTML = "";
                var y = document.createTextNode("Serás direccionado a MercadoPago...");
                h1.appendChild(y)
                document.querySelector("#button-mp").appendChild(h1);
                document.querySelector("#button-mp").appendChild(script);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const renderSwitchCart = (shoppingOption) => {
        switch (shoppingOption) {
            case 0:
                return (
                    <div id='page-content' className='body-modal'>
                        {productCarts.length === 0 ? <h1 className='title-not-product'>No hay productos en el carrito</h1> : <>
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
                        {productCarts.length !== 0 && <div className='footer-modal'>
                            <div className='d-flex justify-content-around'>
                            <p>TOTAL: ${totalPrice}</p>
                            <button className='btn-clear' onClick={()=>{clearCart()}}>Limpiar carrito</button>
                            </div>
                            <div id='button-mp'>
                                <button onClick={() => { shopping() }}>
                                    FINALIZAR COMPRA
                                </button>
                            </div>
                        </div>}
                    </div>
                )
                break;
            case 1:
                return <h1>Hola</h1>
                break;
            default:
                break;
        }
    }

    const shopping = async () => {
        var prod = productCarts.map(product => {
            return { ...product, _id: product.id }
        })
        console.log(prod)
        const data = {
            products: prod,
        }
        const headers = {
            "Content-Type": "application/json",
            'x-token': userLogged.token
        }
        const response = await axios.post('https://restserver-lautaro-quevedo.herokuapp.com/api/shopping', data, { headers })
            .then(res => {
                console.log(res)
                setShoppingOption(1)
                clearCart()
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
            {renderSwitchCart(shoppingOption)}
        </div></>
    )
}

export default CartModal