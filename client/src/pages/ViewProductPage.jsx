import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ViewProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

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

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <h1>View Product Page</h1>
      {isLoading && <h2>Loading...</h2>}
      {isError && <h2>Error fetching product...</h2>}
      {product && (
        <div className="view-product-container">
          <h2>{product.name}</h2>
          <p>{product.price} THB</p>
          <p>{product.description}</p>
        </div>
      )}
      <Link to={"/"}>
        <button>Back to Home</button>
      </Link>
    </div>
  );
}

export default ViewProductPage;
