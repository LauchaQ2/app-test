import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Bars } from 'react-loader-spinner';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Item from '../Item/Item';
import ItemDetail from '../ItemDetail/ItemDetail';

const ItemDetailContainer = () => {

  const { } = useContext(UserContext);
  
  const [products, setProducts] =useState({})
  const [product, setProduct] =useState({})
  const [relatedProducts, setRelateProducts] = useState({});
  const [loader, setLoader] = useState(true);
  const {id} = useParams();
  let navigate = useNavigate();
  localStorage.setItem('id', id)

  const getProducts = async() => {
    const res = await axios.get(`https://restserver-lautaro-quevedo.herokuapp.com/api/products?limit=20`)
    const res2= await axios.get(`https://restserver-lautaro-quevedo.herokuapp.com/api/products/${id}`)
    const data = res.data.products
    const produc = res2.data
    setProduct(produc)
    console.log(product)
    const related = data.filter(prod => prod._id !== id)
    setRelateProducts(related)
    console.log(relatedProducts)
  }


  useEffect(() => {
    getProducts()
      setTimeout(() => {
        setLoader(false)
      }, 2000);
  }, [id]);


  return (
    <div>
    {loader?
      <div className='cont-loader'>
      <Bars/>
      </div>
      :
    <>
      <ItemDetail loader={loader} product={product}/>
      <h2  className='center'>Otros productos que podrian interesarte...</h2>
      <div className='list-products'>
        {relatedProducts.map(product=>{
          return (
            <Item key={product._id} product={product}/>
            )
        })}
      </div>
      </>
    }

    
    </div>
  )
}

export default ItemDetailContainer