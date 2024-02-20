import React from 'react'
import ServiceCard from './ServiceCard'
import './Services.css'
import truckFast from '../../assets/images/truck-fast.svg'
import shieldTick from '../../assets/images/shield-tick.svg'
import support from '../../assets/images/support.svg'



const Services = () => {
    const services = [
        {
            imgURL: truckFast,
            label: "Free shipping",
            subtext: "Enjoy seamless shopping with our complimentary shipping service."
        },
        {
            imgURL: shieldTick,
            label: "Secure Payment",
            subtext: "Experience worry-free transactions with our secure payment options."
        },
        {
            imgURL: support,
            label: "Love to help you",
            subtext: "Our dedicated team is here to assist you every step of the way."
        },
    ];
    
  return (
    <section className="serviceSection">
{services.map((service)=>(
  <ServiceCard key={service.label} {...service} />
))}
    </section>
  )
}

export default Services