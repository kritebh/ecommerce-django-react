/* REACT BOOTSTRAP */
import { Alert } from "react-bootstrap";

export default function Message({ variant, children }) {
  return <Alert variant={variant}>{children}</Alert>;
}
