import { useState, useEffect, useContext } from "react";
import api from "../../services/api"; // Adjust the path as needed
import { AuthContext } from "../../contexts/AuthContext";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext); // Added user to the context
  const userId = user.userId;

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const response = await api.get(`/requests/${userId}/status`);
        console.log("Fetched User Requests:", response.data); // Debug log
        setRequests(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user requests:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchUserRequests();
  }, [userId]);

  const handleRemoveRequest = async (requestId) => {
    try {
      await api.delete(`/requests/${requestId}`);
      setRequests(
        requests.filter((request) => request.request_id !== requestId)
      );
    } catch (err) {
      console.error("Error removing request:", err);
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
      <h1>User Requests</h1>
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
            <th>Actions</th>
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
              <td>
                <button onClick={() => handleRemoveRequest(request.request_id)}>
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

export default Requests;
