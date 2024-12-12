import { useState, useEffect } from "react";
import api from "../../services/api"; // Adjust the path as needed
// import "./TransferStaff.css"; // Add this file for custom styles

const TransferStaff = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransfers();
  }, []);

  const fetchTransfers = async () => {
    try {
      const response = await api.get("/transfers/getall");
      setTransfers(response.data);
    } catch (err) {
      console.error("Error fetching transfers:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRecord = (transferId) => {
    console.log(`Record button clicked for transfer ID: ${transferId}`);
    // Add logic to handle recording the transfer
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.table(transfers);

  return (
    <div>
      {transfers.length === 0 ? (
        <p>No approved requests at the moment.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Transfer ID</th>
              <th>Requested At</th>
              <th>Status</th>
              <th>Item Name</th>
              <th>Item Description</th>
              <th>Item Price</th>
              <th>Transfer From</th>
              <th>Transfer To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((transfer, index) => (
              <tr key={index}>
                <td>{transfer.transfer_id}</td>
                <td>{new Date(transfer.requested_at).toLocaleDateString()}</td>
                <td>{transfer.transfer_status}</td>
                <td>{transfer.item_name}</td>
                <td>{transfer.item_description}</td>
                <td>${transfer.item_price}</td>
                <td>
                  {transfer.from_user_first_name +
                    " " +
                    transfer.from_user_last_name}
                </td>
                <td>
                  {transfer.to_user_first_name +
                    " " +
                    transfer.to_user_last_name}
                </td>
                <td>
                  <button onClick={() => handleRecord(transfer.transfer_id)}>
                    Record
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransferStaff;
