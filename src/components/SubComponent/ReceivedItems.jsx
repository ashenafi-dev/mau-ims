import { useState, useEffect, useContext } from "react";
import api from "../../services/api"; // Adjust the path as needed
import { AuthContext } from "../../contexts/AuthContext";

const ReceivedItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext); // Added user to the context
  const userId = user.userId;

  useEffect(() => {
    const fetchReceivedItems = async () => {
      try {
        const response = await api.get(`/items/useritems/${userId}`);
        console.log("Fetched Received Items:", response.data); // Debug log
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching received items:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchReceivedItems();
  }, [userId]);

  const handleRemoveItem = async (itemId) => {
    try {
      await api.delete(`/items/${itemId}`);
      setItems((prevItems) =>
        prevItems.filter((item) => item.user_item_id !== itemId)
      );
    } catch (err) {
      console.error("Error removing item:", err);
      setError(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Description</th>
            <th>Item Category</th>
            <th>Item Price</th>
            <th>Quantity</th>
            <th>Acquired Date</th>
            <th>Measurement Unit</th>
            <th>Manufacturer</th>
            <th>Model Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.item_name}</td>
              <td>{item.item_description}</td>
              <td>{item.item_category}</td>
              <td>${item.item_price}</td>
              <td>{item.quantity}</td>
              <td>{new Date(item.acquired_date).toLocaleDateString()}</td>
              <td>{item.measurment_unit}</td>
              <td>{item.manufacturer}</td>
              <td>{item.model_number}</td>
              <td>
                <button onClick={() => handleRemoveItem(item.user_item_id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReceivedItems;
