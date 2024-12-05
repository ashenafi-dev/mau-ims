import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../services/api"; // Adjust the path as needed

const Transfers = ({ id }) => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await api.get(`/transfers/${id}`);
        setTransfers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching transfers:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchTransfers();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Transfers List for User ID: {id}</h1>
      <table>
        <thead>
          <tr>
            <th>Requested At</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Item Name</th>
            <th>Item Description</th>
            <th>Item Category</th>
            <th>Item Price</th>
            <th>Item Stock Level</th>
            <th>Approved By</th>
            <th>Approval Date</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((transfer, index) => (
            <tr key={index}>
              <td>{new Date(transfer.requested_at).toLocaleDateString()}</td>
              <td>{transfer.quantity}</td>
              <td>{transfer.transfer_status}</td>
              <td>{transfer.item_name}</td>
              <td>{transfer.item_description}</td>
              <td>{transfer.item_category}</td>
              <td>${transfer.item_price}</td>
              <td>{transfer.item_stock_level}</td>
              <td>{transfer.approved_by_username || "N/A"}</td>
              <td>
                {transfer.approval_date
                  ? new Date(transfer.approval_date).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Transfers.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Transfers;
