import React, { useContext } from 'react'
import './Item.css'
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';
import UserContext from '../../context/UserContext';


const Item = ({ product }) => {

  const { addProducts } = useContext(UserContext);


  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const itemCart = {
    name: product.name,
    id: product._id,
    price: product.price,
    img: product.img,
    quantity: 1,
}

const onAdd = (quantity) => {
  addProducts(itemCart, quantity)}

  return (
    <div className='card-product'>
      <Link onClick={() => { goToTop() }} className='link-routes' to={`/products/${product._id}`}>
        <img className='img-product' src={product.img} />
      </Link>
      <h3 className='title-product'>{product.name}</h3>
      <p className='price-product'>${product.price} ARS</p>
      <ItemCount onAdd={onAdd}/>
    </div>

  )
}

export default Item