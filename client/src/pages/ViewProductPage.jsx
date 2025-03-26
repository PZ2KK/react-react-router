import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ViewProductPage() {
  const navigate = useNavigate();
  const {productId} = useParams();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios.get(`http://localhost:4001/products/${productId}`);
        setProduct(response.data.data);
      } catch(error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error fetching product</h1>;
  if (!product) return <h1>No product found</h1>;
  
  return (
    <div>
      <h1>View Product Page</h1>
      <div className="view-product-container">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </div>
      <button
        onClick={() => navigate("/")}
        >
          Back to Home
      </button>
    </div>
  );
}

export default ViewProductPage;
