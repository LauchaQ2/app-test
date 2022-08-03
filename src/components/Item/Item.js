import React from 'react'
import './Item.css'

const Item = ({product}) => {
  return (
    <div className='card-product'>
        <h3 className='title-product'>{product.name}</h3>
        <img className='img-product' src={product.img}/>
        <p className='price-product'>${product.price}</p>
    </div>
  )
}

export default Item