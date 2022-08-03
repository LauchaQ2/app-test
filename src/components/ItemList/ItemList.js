import React, { useContext } from 'react'
import UserContext from '../../context/UserContext';
import Item from '../Item/Item';
import './ItemList.css'

const ItemList = ({products}) => {

  return (
    <div className='list-container'>{products.map((product, i=0)=>{
        return <Item key={i} product={product}/>
    })}</div>
  )
}

export default ItemList