import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Adjust the path as needed

const GetItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

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

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedItems = React.useMemo(() => {
    if (!sortConfig.key) return items;

    const sorted = [...items].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sorted;
  }, [items, sortConfig]);

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
          <th onClick={() => handleSort("item_id")}>Item ID</th>
          <th onClick={() => handleSort("name")}>Name</th>
          <th onClick={() => handleSort("description")}>Description</th>
          <th onClick={() => handleSort("category")}>Category</th>
          <th onClick={() => handleSort("price")}>Price</th>
          <th onClick={() => handleSort("stock_level")}>Stock Level</th>
          <th onClick={() => handleSort("expiration_date")}>Expiration Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {sortedItems.map((item) => (
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
