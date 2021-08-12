import React from "react";

/* REACT-BOOTSTRAP */
import { Card } from "react-bootstrap";

/* COMPONENTS */
import Rating from "./Rating";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <a href={`/products/${product._id}`}>
        <Card.Img src={product.image} />
      </a>

      <Card.Body>
        <a href={`/products/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </a>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
            color={"#f8e825"}
          />
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
