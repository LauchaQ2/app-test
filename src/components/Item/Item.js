import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom';


const Item = ({ product }) => {

  const goToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};

  return (
    <Link className='link-routes' to={`/products/${product._id}`}>
      <div onClick={()=>{goToTop()}} className='card-product'>
        <img className='img-product' src={product.img} />
        <h3 className='title-product'>{product.name}</h3>
        <p className='price-product'>${product.price} ARS</p>
      </div>
    </Link>

  )
}

export default Item