import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ItemList from '../components/ItemList/ItemList'
import './HomePage.css';

const HomePage = () => {

    const [products, setProducts] = useState([])
      useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get(`https://restserver-lautaro-quevedo.herokuapp.com/api/products`)
            const data = res.data.products
            setProducts(data)
          }
          getProducts()
          console.log(products)
        }, []);

  return (
    <div className='home-page'>
        <ItemList products={products}/>
    </div>
  )
}

export default HomePage