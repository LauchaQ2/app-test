import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Item from '../Item/Item';
import ItemDetail from '../ItemDetail/ItemDetail';

const ItemDetailContainer = () => {

  const { products, setProducts } = useContext(UserContext);
  const {id} = useParams();
  localStorage.setItem('id', id)
  var ide = localStorage.getItem('id')
  var product = products.find(prod => prod._id === ide)
  localStorage.setItem('product', JSON.stringify(product))
  product = JSON.parse(localStorage.getItem('product'))
  const relatedProduct = products.filter(prod => prod._id !== ide)
  console.log(product)
  console.log(relatedProduct)


  return (
    <div>
      <ItemDetail product={product}/>
      <h2  className='center'>Otros productos que podrian interesarte...</h2>
      <div className='list-products'>
        {relatedProduct.map(product=>{
          return (
            <Item product={product}/>
            )
        })}
      </div>
    </div>
  )
}

export default ItemDetailContainer