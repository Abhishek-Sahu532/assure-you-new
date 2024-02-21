import React from 'react'
import star from '../../assets/images/star.svg'
import './PopularProducts.css'


const PopularProductCard = ({ imgURL, name, price }) => {
  return (
    <div className="popularProductCard">
      <img className='productImage' src={imgURL} alt={name} width={280} height={280} />

      <div>
        <img src={star} alt='rating' width={24} height={24} />
        <p className='rating' >4.5</p>
      </div>

      <p className='productname' >{name}</p>
      <p className='price'>{price}</p>
    </div>
  )
}

export default PopularProductCard