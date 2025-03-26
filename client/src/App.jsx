import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductPage from "./pages/EditProductPage";
import ViewProductPage from "./pages/ViewProductPage";

function App() {
  return <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/products/create" element={<CreateProductPage/>}/>
        <Route path="/products/edit/:productId" element={<EditProductPage/>}/>
        <Route path="/products/view/:productId" element={<ViewProductPage/>}/>
      </Routes>
    </Router>
    </div>;
}

export default App;
