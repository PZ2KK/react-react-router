import EditProductForm from "../components/EditProductForm";
import { useNavigate, useParams } from "react-router-dom";

function EditProductPage() {
  const navigate = useNavigate();
  const {productId} = useParams();
  
  return (
    <div>
      <h1>Edit Product Page</h1>
      <EditProductForm productId={productId}/>
      <button
        onClick={() => navigate("/")}
        >
          Back to Home
      </button>
    </div>
  );
}

export default EditProductPage;
