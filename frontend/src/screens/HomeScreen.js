import React, { useState, useEffect } from "react";

/* REACT-BOOTSTRAP */
import { Row, Col } from "react-bootstrap";

/* AXIOS */
import axios from "axios";

/* COMPONENTS */
import Product from "../components/Product";

function HomeScreen() {
  // State
  const [products, setProducts] = useState([]);

  //UseEffect

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await axios.get("/api/products/");
      setProducts(data);
    }

    fetchProducts();
  }, []);

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
