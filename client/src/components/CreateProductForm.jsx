import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProductForm() {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const createProduct = async (productPayload) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const results = await axios.post(
        "http://localhost:4001/products",
        {
          ...productPayload,
          price: +productPayload.price,
        }
      );
      if (results.status !== 200) throw new Error("Error creating product");
      navigate("/");
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(product);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h1>Create Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name here"
            value={product.name}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Image Url
          <input
            id="image"
            name="image"
            type="text"
            placeholder="Enter image url here"
            value={product.image}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                image: e.target.value,
              }))
            }
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Price
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Enter price here"
            value={product.price}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                price: e.target.value,
              }))
            }
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Description
          <textarea
            id="description"
            name="description"
            type="text"
            placeholder="Enter description here"
            value={product.description}
            onChange={(e) =>
              setProduct((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            rows={4}
            cols={30}
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit" disabled={isLoading}>
          Create
        </button>
      </div>
      {isError && <h2>Error creating product</h2>}
    </form>
  );
}

export default CreateProductForm;
