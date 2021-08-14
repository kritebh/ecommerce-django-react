import React, { useEffect } from "react";

/* REACT-BOOTSTRAP */
import { Row, Col } from "react-bootstrap";

/* COMPONENTS */
import Product from "../components/Product";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { listProducts } from "../actions/productActions";

function HomeScreen() {
  const dispatch = useDispatch();

  /* PULLING A PART OF STATE FROM THE ACTUAL STATE */
  const productList = useSelector((state) => state.productList);

  const { products, loading, error } = productList;

  /* FIRING OFF THE ACTION CREATORS USING DISPATCH */

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Latest Products</h1>

      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
