import React, { Fragment, useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import Metadata from "../Metadata.js";
import Carousel from "react-material-ui-carousel";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import banner3 from "../../assets/images/banner3.jpg";
import banner4 from "../../assets/images/banner4.jpg";
import banner5 from "../../assets/images/banner5.jpg";
import banner6 from "../../assets/images/banner6.jpg";
import banner7 from "../../assets/images/banner7.jpg";


const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  const images = [
    {
      name: "banner1",
      link: banner1,
    },
    {
      name: "banner2",
      link: banner2,
    },
    {
      name: "banner3",
      link: banner3,
    },
    {
      name: "banner4",
      link: banner4,
    },
    {
      name: "banner5",
      link: banner5,
    },
    {
      name: "banner6",
      link: banner6,
    },
    {
      name: "banner7",
      link: banner7,
    },
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Assure You" />
          <div className="banner">
            <Carousel className="carousel" indicators={false}>
              {images.map((image, i) => (
                <div key={i}>
                  <img src={image.link} alt="" />
                </div>
              ))}
            </Carousel>
          </div>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product.name} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
