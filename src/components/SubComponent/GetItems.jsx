import { useState, useEffect } from "react";
import api from "../../services/api"; // Adjust the path as needed
import Modal from "./Modal";
// import PropTypes from "prop-types";
import NewItemForm from "./NewItemForm"; // Import the NewItemForm component
import UpdateItemForm from "./UpdateItemForm"; // Import the UpdateItemForm component
import { addItem, modify, remove } from "../Svg"; // Adjust the SVG imports as needed
import "./getItems.css";

const GetItems = () => {
  const [items, setItems] = useState([]);
  const [sortedItems, setSortedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [modalType, setModalType] = useState(""); // To distinguish between Add and Modify modals

  const fetchItems = async () => {
    try {
      const response = await api.get("/items/items/getItemsUser");
      setItems(response.data);
      setSortedItems(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching items:", err);
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...items].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSortedItems(sorted);
  };

  const handleDeleteClick = async (itemId) => {
    try {
      await api.delete(`/items/items/${itemId}`);
      setSortedItems(sortedItems.filter((item) => item.item_id !== itemId));
      alert(`Item with ID ${itemId} deleted successfully`);
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Error deleting item. Please try again.");
    }
  };

  const handleModifyClick = (itemId) => {
    setSelectedItemId(itemId);
    setModalType("modify");
    setShowModal(true);
  };

  const handleAddClick = () => {
    setModalType("add");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItemId(null);
  };

  const handleItemUpdated = () => {
    setShowModal(false);
    fetchItems(); // Re-fetch items after an item is updated
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Modal show={showModal} onClose={handleCloseModal}>
        {modalType === "add" ? (
          <NewItemForm onItemCreated={handleItemUpdated} />
        ) : (
          selectedItemId && (
            <UpdateItemForm
              itemId={selectedItemId}
              onClose={handleCloseModal}
              onUpdate={handleItemUpdated}
            />
          )
        )}
      </Modal>
      <table className="items-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("item_id")}>Item ID</th>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("description")}>Description</th>
            <th onClick={() => handleSort("category")}>Category</th>
            <th onClick={() => handleSort("price")}>Price</th>
            <th onClick={() => handleSort("stock_level")}>Stock Level</th>
            <th onClick={() => handleSort("expiration_date")}>
              Expiration Date
            </th>
            <th>Modify</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item, index) => (
            <tr key={index}>
              <td>{item.item_id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>{item.stock_level}</td>
              <td>{item.expiration_date || "LTU >= 3 years Usage"}</td>
              <td onClick={() => handleModifyClick(item.item_id)}>{modify}</td>
              <td onClick={() => handleDeleteClick(item.item_id)}>{remove}</td>
            </tr>
          ))}
          {/* Add empty row with "Add" button */}
          <tr>
            <td colSpan="7"></td>
            <td colSpan="2" onClick={handleAddClick}>
              {addItem}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GetItems;
