import React, { useState } from "react";

/* REACT BOOTSTRAP */
import { Button, Form } from "react-bootstrap";

/* REACT ROUTER DOM */
import { useHistory } from "react-router-dom";

function SearchBox() {
  /* STATE */
  const [keyword, setKeyword] = useState("");

  let history = useHistory();

  /* HANDLER */
  const submitHandler = (e) => {
    e.preventDefault();

    // WHEN USER HITS SUBMIT, REDIRECT TO HOME PAGE TO SEE PRODUCTS AND APPEND ?keyword=...IN URL
    if (keyword) {
      history.push(`/?keyword=${keyword}`);
    } else {
      // IF WE HIT SUBMIT WITHOUT KEYWORD, WE DON'T WANT THE USER TO GET REDIRECTED IN THAT CASE RATHER STAY ON WHATEVER PAGE HE WAS
      history.push(history.push(history.location.pathname));
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2-ml-sm-5"
      />

      <Button type="submit" variant="outline-success" className="p-2">
        Submit
      </Button>
    </Form>
  );
}

export default SearchBox;
