import React from 'react'
import PopularProductCard from './PopularProductCard'
import './PopularProducts.css'
import shoe4 from '../../assets/images/shoe4.svg'
import kaliniSuts from '../../assets/images/kalini suts.png'
import noise from '../../assets/images/noise.png'
import roadsterShirt from '../../assets/images/roadster shirt.png'


const PopularProducts = () => {
    const products = [
        {
            imgURL: shoe4,
            name: "Nike Air Jordan-01",
            price: "₹ 200",
        },
        {
            imgURL: kaliniSuts,
            name: "Shibori Dyed Regular Kurta with Trousers",
            price: "₹ 869",
        },
        {
            imgURL: noise,
            name: "Buds VS102 Plus",
            price: "₹ 660",
        },
        {
            imgURL: roadsterShirt,
            name: "Men Black & Grey Checked Pure Cotton Casual Shirt",
            price: "₹ 649",
        },
    ];
    return (
        <section id="products" >
            <div className="productDesc">

                <h2 className=''>Our <span>Popular</span>  Products</h2>
                <p>Experience top-notch quality and style with our sought-after selections,. Discover a world of comfort, design, and value</p>

            </div>


            <div className='productDiv'>

                {products.map((product) => (
                    <PopularProductCard key={product.name} {...product} />
                ))}

            </div>
        </section>

    )
}

export default PopularProducts