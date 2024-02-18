import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productAction";
import Loader from "../Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
// import {Metadata} from '../Metadata'


const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const dispatch = useDispatch();
  // const error = useAlert() --  ERROR NOT WORKING - WILL CHECK LATER
  // FOR PAGINATION
  const [currentPage, setCurrentPage] = useState();

  // FOR PRICE SELECTOR
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");

  const [rating, setRating] = useState(0)

  const {
    products,
    loading,
    productsCount,
    resultPerPage,
  } = useSelector((state) => state.products);

  // console.log(error)

  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category, rating));
  }, [dispatch, keyword, currentPage, price, category, rating]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>

          {/* FILTERATION FOR PRODUCT PRICES */}
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              aria-labelledby="range-slider"
              min={0}
              max={25000}
              valueLabelDisplay="auto"
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}{" "}
                </li>
              ))}
            </ul>

            <fieldset>
            <Typography>Ratings</Typography>
              <Typography>
                <Slider
                  value={rating}
                  onChange={(e, newRating) => {
                    setRating(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  min={0}
                  max={5}
                  valueLabelDisplay="auto"
                />
              </Typography>
            </fieldset>
          </div>

          {/* PAGINATION */}
          {resultPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};


// Products.whyDidYouRender = true
export default Products;
