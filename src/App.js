import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TableOfProducts from "./components/TableOfProducts";
import AddToCart from "./components/AddToCart";
function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<TableOfProducts />} />
            <Route exact path="/addtocart" element={<AddToCart />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
