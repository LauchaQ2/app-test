import React from 'react'
import './ItemDetail.css'
import { Bars } from 'react-loader-spinner';


const ItemDetail = ({ product, loader }) => {

    return (
        <div className='product-container'>
            <div className='name-product'>
                <h2>{product.name}</h2>
            </div>
            <div className='box-product'>
                <div className='col-img-product'>
                <img className='img-detail-product' src={loader ? 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' : product.img}/>
                </div>
                <div className='col-detail-product'>
                    <h1>${product.price}ARS</h1>
                    <div className='add-buttons'>
                        <input className='count' type='number'/>
                        <button className='btn-add'>AGREGAR AL CARRITO</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail