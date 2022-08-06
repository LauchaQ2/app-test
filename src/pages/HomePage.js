import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner';
import ItemList from '../components/ItemList/ItemList'
import './HomePage.css';

const HomePage = () => {

      
  return (
    <div className='home-page'>
    <Banner/>
    </div>
  )
}

export default HomePage