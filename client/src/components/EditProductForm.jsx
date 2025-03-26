import { useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function EditProductForm({productId}) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async() => {
      try {
        const response = await axios.get(`http://localhost:4001/products/${productId}`);
        setName(response.data.data.name)
        setUrl(response.data.data.image)
        setPrice(response.data.data.price)
        setDescription(response.data.data.description)
      } catch(error) {
        console.log(error)
      }
    };
    fetchProduct();
  }, []);

  const handleUpdate = async(e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:4001/products/${productId}`,
      {
        name: name,
        price: price,
        image: url,
        description: description
      });
      navigate("/")
    } catch(error) {
      console.log(error);
    } 
  };

  return (
    <form className="product-form" onSubmit={handleUpdate}>
      <h1>Edit Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name here"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={url}
            onChange={(e) => setUrl(e.target.value)}
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            cols={30}
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">Update</button>
      </div>
    </form>
  );
}

export default EditProductForm;
