import React from 'react'
import './ShopHistory.css'

const ShopHistory = ({shoppings}) => {

  return (
    <div className='container-full'>
      <h2>TU HISTORIAL DE COMPRAS</h2>
      <h4>Total de compras: {shoppings.total}</h4>
      {shoppings.shoppings.map(shopping=>{
        return <><div className='cont-shopping'>
          <h3>Código de compra: {shopping._id}</h3>
          <div className='badge-shopping'>
            {shopping.products.map(product => {
              return (
                <div className='badge-product'><h3>Producto: {product.name}</h3><h3>Cantidad: {product.quantity}</h3></div>
              )
            })}
          </div>
        </div>
        <hr/>
        </>
      })}
    </div>
  )
}

export default ShopHistory