import { useState, useEffect } from "react";
import api from "../../services/api"; // Adjust the path as needed

const GetItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get("/items/getItems");
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <table className="items-table">
      <thead>
        <tr>
          <th>Item ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock Level</th>
          <th>Expiration Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.item_id}>
            <td>{item.item_id}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.category}</td>
            <td>{item.price}</td>
            <td>{item.stock_level}</td>
            <td>{item.expiration_date}</td>
            <td>
              <button
                value={item.item_id}
                onClick={(e) => handleRequestClick(e.target.value)}
              >
                Request
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const handleRequestClick = (id) => {
  console.log(id);
};

export default GetItems;
