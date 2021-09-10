import React from "react";

/* REACT BOOTSTRAP */
import { Pagination } from "react-bootstrap";

/* REACT ROUTER BOOTSTRAP */
import { LinkContainer } from "react-router-bootstrap";

function Paginate({ page, pages, keyword = "", isAdmin = false }) {
  /* isAdmin IS SET TO FALSE BY DEFAULT, ONLY IN ADMIN ProductList PAGE IS WILL BE SET TO TRUE */

  if (keyword) {
    keyword = keyword.split("?keyword=")[1].split("&")[0];
  }

  /* 
  console.log("KEYWORD", keyword);
  output: ?keyword=iPhone&page=1 => iPhone&page=1 => iPhone
  */

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? `/?keyword=${keyword}&page=${x + 1}`
                : `/admin/productlist//?keyword=${keyword}&page=${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
}

export default Paginate;
