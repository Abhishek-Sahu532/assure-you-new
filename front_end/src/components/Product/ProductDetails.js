import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import Metadata from "../Metadata.js";
import { addItemsToCart } from "../../actions/cartAction.js";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constaints/productConstant.js";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ProductDetails = () => {
  const { id } = useParams();
  //  console.log('id', id)
  const alert = useAlert();

  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  // console.log(product)

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQty = () => {
    if (product.stock <= quantity) {
      //will not increase greater than the product stock
      return;
    }
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    if (1 >= quantity) {
      return;
    }
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const options = {
    size: "medium",
    value: product.ratings || 0,
    readOnly: true,
    precision: 0.5,
    name: "customized-color",
    // getLabelText :  product.ratings || 0,
  };

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });
  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    let isMounted = true;

    const cleanUp = () => {
      isMounted = false;
      // dispatch(clearErrors());
    };
    if (isMounted) {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      if (reviewError) {
        alert.error(reviewError);
      }
      if (success) {
        alert.success("Review Submitted Successfully");
        dispatch({ type: NEW_REVIEW_RESET });
      }
      dispatch(getProductDetails(id));
    }
    return cleanUp;
  }, [dispatch, id, alert, error, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={`${product.name} --Ecommerce`} />
          <div className="ProductDetails">
            <div>
              <Carousel className="productDetailsCarousel"
                navButtonsProps={{
                  style: { backgroundColor: "transparent", borderRadius: 0 },
                }}
                NextIcon={<ArrowRightIcon />}
                PrevIcon={<ArrowLeftIcon />}
                autoPlay="true"
                animation="fade"
              >
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                {/* <p> Product # {product._id}</p> */}
              </div>

              <div className="detailsBlock-2">
                <StyledRating
                  {...options}
                  icon={<FavoriteIcon fontSize="inherit" />}
                  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                />
                <span className="detailsBlock-2-span">
                  ({product.numOfReviews} Reviews){" "}
                </span>
              </div>

              <div className="detailsBlock-3">
                <h3>₹ {product.price} </h3>
                <div className="detailsBlock-3-1">
                  <div className="detailsblock-3-1-1">
                    <button onClick={decreaseQty}>-</button>
                    <input readOnly name="qty" value={quantity} type="number" />
                    <button onClick={increaseQty}>+</button>
                  </div>
                  <button onClick={addToCartHandler}>Add to Cart</button>
                </div>
                <p>
                  Status :
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description} </p>
              </div>
              <button className="submitReview" onClick={submitReviewToggle}>
                Submit Review
              </button>
            </div>
          </div>

          {/* REVIEW PART */}

          <h3 className="reviewHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => Number(setRating(e.target.value))}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              >
                {" "}
              </textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                {" "}
                Cancel
              </Button>
              <Button color="primary" onClick={reviewSubmitHandler}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review, i) => <ReviewCard     key={i} review={review} />)}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

// ProductDetails.whyDidYouRender = true
export default ProductDetails;
