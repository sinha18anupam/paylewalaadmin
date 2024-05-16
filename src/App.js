import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllProduct from "./Component/AllProduct";
import Navbar from "./Component/Navbar";
import './App.css'
import Order from "./Component/Order";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<AllProduct />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
