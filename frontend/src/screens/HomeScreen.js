import React from "react";

/* REACT-BOOTSTRAP */
import { Row, Col } from "react-bootstrap";

/* PRODUCTS DATA */
import products from "../products";

/* COMPONENTS */
import Product from "../components/Product";

function HomeScreen() {
  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default HomeScreen;
