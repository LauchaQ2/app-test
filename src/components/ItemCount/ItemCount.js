import React, { useState } from 'react';
import '../ItemCount/ItemCount.css';


export default function ItemCount({ onAdd }) {



    const [counter, setCounter] = useState(1);
    const [added, setAdded] = useState("hidden added-to-cart");
    const [addedMobile, setAddedMobile] = useState("hidden added-to-cart-mobile");

    const handleAdded = () => {
        setAdded("visible added-to-cart");
        setAddedMobile("visible added-to-cart-mobile")
        setTimeout(() => {
            setAdded("hidden added-to-cart")
            setAddedMobile("hidden added-to-cart-mobile")
        }, 1500);
    }

    const addAmount = () => {
        setCounter(counter + 1);
    }
    const subAmount = () => {
        if (counter === 1) {
            return
        }
        setCounter(counter - 1);
    }


    return (
        <div className='container-btn-count'>
            <div className="group-btn">
                <button onClick={subAmount} className="count-mobile">-</button>
                <input type="text" className="count-mobile" readOnly value={counter} />
                <button onClick={addAmount} className="count-mobile">+</button>
            </div>
            <div className='d-flex f justify-content-center center'>
                <button className="btn chart border" onClick={() => { onAdd(counter); }}>
                    AÑADIR AL CARRITO
                </button>
            </div>
        </div>

    )
}