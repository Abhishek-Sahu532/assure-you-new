import React from "react";
import profilePng from "../../assets/images/Profile.png";
import { Rating } from "@material-ui/lab";
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const ReviewCard = ({ review }) => {
  const options = {
    size: 'medium',
    value: review.rating || 0,
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

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <StyledRating
                  {...options}
                  icon={<FavoriteIcon fontSize="inherit" />}
                  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                />
      <span className="reviewCard-span">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
