import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditProductForm() {
  const navigate = useNavigate()
  const { productId } = useParams();
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const getProduct = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const results = await axios.get(
        "http://localhost:4001/products" + `/${productId}`
      );
      setProduct(results.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };

  const updateProduct = async (productPayload) => {
    try {
      setIsError(false);
      setIsLoading(true);
      const results = await axios.put(
        "http://localhost:4001/products/" + productId,
        {
          ...productPayload,
          price: +productPayload.price,
        }
      );
      if (results.status !== 200) throw new Error("Error updating product");
      navigate("/");
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(product);
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h1>Edit Product Form</h1>
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
        <button type="submit">Update</button>
      </div>
      {isError && <h2>Error updating product</h2>}
    </form>
  );
}

export default EditProductForm;
