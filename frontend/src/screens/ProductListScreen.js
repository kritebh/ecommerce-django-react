import React, { useEffect } from "react";

/* REACT ROUTER BOOTSTRAP */
import { LinkContainer } from "react-router-bootstrap";

/* REACT BOOTSTRAP */
import { Table, Button, Row, Col } from "react-bootstrap";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";

/* ACTION TYPES */
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

function ProductListScreen({ match, history }) {
  const dispatch = useDispatch();

  /* PULLING OUT STATE */
  const productList = useSelector((state) => state.productList);
  const { products, pages, page, loading, error } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    product: createdProduct,
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // GETTING PAGE NUMBER (KEYWORD IS PAGE NUMBER)
  let keyword = history.location.search;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    // WE DON'T WANT NON ADMINS TO ACCESS THIS PAGE SO REDIRECT IF SOMEBODY TRIES TO

    if (!userInfo.isAdmin) {
      history.push("/login");
    }

    // CHECK IF PRODUCT CREATED, IF YES THEN REDIRECT TO EDIT PAGE
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts(keyword));
    }

    // AFTER CREATING PRODUCT, LOAD IN PRODUCTS AGAIN, ADD successCreate IN DEPENDENCIES
    // AFTER DELETING PRODUCT, LOAD IN PRODUCTS AGAIN, ADD successDelete IN DEPENDENCIES
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    keyword,
  ]);

  /* HANDLER */
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product ?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProcutHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>

        <Col className="text-end">
          <Button className="my-3" onClick={createProcutHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>₹{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>

                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Paginate pages={pages} page={page} isAdmin={true} />
        </div>
      )}
    </div>
  );
}

export default ProductListScreen;
