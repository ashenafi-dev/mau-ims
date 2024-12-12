import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../services/api"; // Adjust the path as needed

const UpdateItemForm = ({ itemId, onClose, onUpdate }) => {
  console.log(onClose);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Durable");
  const [price, setPrice] = useState("");
  const [stockLevel, setStockLevel] = useState("");
  const [eligibilityTag, setEligibilityTag] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [measurmentUnit, setMeasurmentUnit] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [modelNumber, setModelNumber] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`/items/items/${itemId}`);
        const item = response.data;
        setItemName(item.name);
        setDescription(item.description);
        setCategory(item.category);
        setPrice(item.price);
        setStockLevel(item.stock_level);
        setEligibilityTag(item.eligibility_tag);
        setMediaUrl(item.media_url);
        setMeasurmentUnit(item.measurment_unit);
        setManufacturer(item.manufacturer);
        setModelNumber(item.model_number);
        console.table();
      } catch (err) {
        console.error("Error fetching item:", err);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.put(`/items/items/${itemId}`, {
        name: itemName,
        description,
        category,
        price,
        stock_level: stockLevel,
        eligibility_tag: eligibilityTag,
        media_url: mediaUrl,
        measurment_unit: measurmentUnit,
        manufacturer,
        model_number: modelNumber,
      });
      onUpdate();
      alert("Item updated successfully");
    } catch (err) {
      console.error("Error updating item:", err);
      alert("Error updating item. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Item</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="Durable">Durable</option>
          <option value="Non-durable">Non-durable</option>
        </select>
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Stock Level:</label>
        <input
          type="number"
          value={stockLevel}
          onChange={(e) => setStockLevel(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Eligibility Tag:</label>
        <input
          type="text"
          value={eligibilityTag}
          onChange={(e) => setEligibilityTag(e.target.value)}
        />
      </div>
      <div>
        <label>Media URL:</label>
        <input
          type="text"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
        />
      </div>
      <div>
        <label>Measurement Unit:</label>
        <input
          type="text"
          value={measurmentUnit}
          onChange={(e) => setMeasurmentUnit(e.target.value)}
        />
      </div>
      <div>
        <label>Manufacturer:</label>
        <input
          type="text"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
        />
      </div>
      <div>
        <label>Model Number:</label>
        <input
          type="text"
          value={modelNumber}
          onChange={(e) => setModelNumber(e.target.value)}
        />
      </div>
      <button type="submit">Update Item</button>
    </form>
  );
};

UpdateItemForm.propTypes = {
  itemId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default UpdateItemForm;
