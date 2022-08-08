import React, { useContext } from 'react'
import './ItemDetail.css'
import { Bars } from 'react-loader-spinner';
import UserContext from '../../context/UserContext';
import ItemCount from '../ItemCount/ItemCount';


const ItemDetail = ({ product, loader }) => {

    const { addProducts } = useContext(UserContext);

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
                        <ItemCount onAdd={onAdd}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail