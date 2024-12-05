import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../services/api"; // Adjust the path as needed

const Requests = ({ id }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get(`/requests/${id}`);
        setRequests(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchRequests();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Requests List for User ID: {id}</h1>
      <table>
        <thead>
          <tr>
            <th>Request Date</th>
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
          {requests.map((request, index) => (
            <tr key={index}>
              <td>{new Date(request.request_date).toLocaleDateString()}</td>
              <td>{request.quantity}</td>
              <td>{request.request_status}</td>
              <td>{request.item_name}</td>
              <td>{request.item_description}</td>
              <td>{request.item_category}</td>
              <td>${request.item_price}</td>
              <td>{request.item_stock_level}</td>
              <td>{request.approved_by_username || "N/A"}</td>
              <td>
                {request.approval_date
                  ? new Date(request.approval_date).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Requests.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Requests;
