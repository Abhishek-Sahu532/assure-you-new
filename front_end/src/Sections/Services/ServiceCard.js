import React from 'react'

const ServiceCard = ({ imgURL, label, subtext }) => {
    return (
        <div className='ServiceCardDiv'>
            <div>
                <img src={imgURL} alt={label} width={24} height={24} />
            </div>
            <h3 >{label}</h3>
            <p>{subtext}</p>
        </div>
    )
}

export default ServiceCard