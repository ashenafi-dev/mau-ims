import { useState } from "react";
import PropTypes from "prop-types";
import api from "../../services/api"; // Adjust the path as needed

const NewItemForm = ({ onItemCreated }) => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Durable");
  const [price, setPrice] = useState("");
  const [stockLevel, setStockLevel] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [eligibilityTag, setEligibilityTag] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [measurmentUnit, setMeasurmentUnit] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [modelNumber, setModelNumber] = useState("");

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formattedExpirationDate =
        category === "Durable" ? null : formatDate(expirationDate);
      await api.post("/items/items", {
        name: itemName,
        description,
        category,
        price,
        stock_level: stockLevel,
        expiration_date: formattedExpirationDate,
        eligibility_tag: eligibilityTag,
        media_url: mediaUrl,
        measurment_unit: measurmentUnit,
        manufacturer,
        model_number: modelNumber,
      });
      onItemCreated();
      alert("Item added successfully");
    } catch (err) {
      console.error("Error adding item:", err);
      alert("Error adding item. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Item</h2>
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
      {category !== "Durable" && (
        <div>
          <label>Expiration Date:</label>
          <input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </div>
      )}
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
      <button type="submit">Add Item</button>
    </form>
  );
};

NewItemForm.propTypes = {
  onItemCreated: PropTypes.func.isRequired,
};

export default NewItemForm;
