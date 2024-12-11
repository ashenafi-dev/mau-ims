import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import api from "../../services/api"; // Adjust the path as needed
import { AuthContext } from "../../contexts/AuthContext";

const GetItemsFaculty = ({ searchQuery }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const userId = user.userId;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get("/items/getItemsFaculty");
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching items:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleRequestClick = async (itemId) => {
    try {
      const response = await api.post("/requests/submit", {
        user_id: userId,
        item_id: itemId,
        quantity: 1, // Adjust the quantity as needed
        request_status: "Pending", // Set the initial status to "Pending"
      });
      if (response.status === 200) {
        alert("Request submitted successfully!");
      } else {
        throw new Error("Failed to submit request");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit request. Please try again.");
    }
  };

  const filterItems = (items, query) => {
    if (!query) return items;

    return items.filter((item) => {
      const itemName = item.name.toLowerCase();
      const itemDescription = item.description.toLowerCase();
      const itemCategory = item.category.toLowerCase();
      const searchText = query.toLowerCase();

      return (
        itemName.includes(searchText) ||
        itemDescription.includes(searchText) ||
        itemCategory.includes(searchText)
      );
    });
  };

  const filteredItems = React.useMemo(
    () => filterItems(items, searchQuery),
    [items, searchQuery]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="cards">
      {filteredItems.map((item, index) => (
        <div className="card" key={index}>
          <div className="card--image">
            <img src="../../../src/assets/treeScissors.jpg" alt="Item" />
          </div>
          <div className="card--name">{item.name}</div>
          <div className="card--description">{item.description}</div>
          <div className="card--button">
            <button onClick={() => handleRequestClick(item.item_id)}>
              Request
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

GetItemsFaculty.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default GetItemsFaculty;
