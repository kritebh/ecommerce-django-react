/* REACT-BOOTSTRAP */
import { Container } from "react-bootstrap";

/* COMPONENTS */
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <Container>
        <main className="py-3">
          <h1>My App</h1>
        </main>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
