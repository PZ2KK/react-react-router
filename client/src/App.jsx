import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ViewProductPage from "./pages/ViewProductPage";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductForm from "./pages/EditProductPage"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/product/view/:productId"
            element={<ViewProductPage />}
          />
          <Route path="/product/create" element={<CreateProductPage />} />
          <Route path="/product/edit/:productId" element={<EditProductForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
