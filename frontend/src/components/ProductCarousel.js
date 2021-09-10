import React, { useEffect } from "react";

/* REACT BOOTSTRAP */
import { Carousel, Image } from "react-bootstrap";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* COMPONENTS */
import Loader from "./Loader";
import Message from "./Message";

/* ACTION TYPES */
import { listTopProducts } from "../actions/productActions";

function ProductCarousel() {
  const dispatch = useDispatch();

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE IN THE REDUX STORE */
  const productTopRated = useSelector((state) => state.productTopRated);
  const { error, loading, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />

            <Carousel.Caption className="carousel.caption">
              <h4>
                {product.name} (₹{product.price})
              </h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
