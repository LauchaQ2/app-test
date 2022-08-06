import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/UserContext';
import Item from '../Item/Item';
import './ItemList.css'

const ItemList = () => {

  const { products, sortAZ, sorted, setProducts, orderProducts, sortZA, setSorted, sortPriceExp, sortPriceCheap } = useContext(UserContext);

  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    if (sorted === true) {
      setProducts(orderProducts)
      setSorted(false)
    }
  }, [sorted]);

  const handleDropdown = () =>{
    setDropdown(!dropdown)
  }

  return (
    <><div className='list-container'>
      <button className='filter-button' onClick={()=>{handleDropdown()}}>Filtrar</button>
      <div className={dropdown ? 'filter-group' : 'display-none'}>
      <button onClick={() => { sortAZ(); }}>A-Z</button>
      <button onClick={() => { sortZA(); }}>Z-A</button>
      <button onClick={() => { sortPriceExp(); }}>MÁS CARO</button>
      <button onClick={() => { sortPriceCheap(); }}>MÁS BARATO</button>
      </div>
    </div><div className='list-products'>
        {products.map((product, i = 0) => {
          return <Item key={i} product={product} />;
        })}
      </div></>
  )
}

export default ItemList