import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TrackVisibility from 'react-on-screen';
import "animate.css";
import './Home.css'

const ProductCard = ({ product }) => {

  const options = {
    size: 'medium',
    value: product.ratings || 0,
    readOnly: true,
    precision: 0.5,
    name : "customized-color", 
    // getLabelText :  product.ratings || 0,
  };

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });
  // const imageUrl = product;
  // console.log(imageUrl)
  // console.log(product.images[0].url);
  return (
<TrackVisibility>
{({isVisible})=>(
  <div
  className={
    isVisible ? "animate__animated animate__fadeIn" : ""
  }
>
<Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt='' />
      <p>{product.name}</p>
      <div>
      <StyledRating
       {...options}
        icon={<FavoriteIcon fontSize="inherit" />}  
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
      />
        <span className="productCardSpan" >({product.numOfReviews} Reviews) </span>{" "}
      </div>
      <span>₹ {product.price}</span>
    </Link>

</div>
)}
    
    </TrackVisibility>
  );
};

export default ProductCard;
