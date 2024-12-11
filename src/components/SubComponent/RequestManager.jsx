import { useState, useEffect, useCallback } from "react";
import api from "../../services/api"; // Adjust the path as needed

const RequestManager = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = useCallback(async () => {
    try {
      const response = await api.get("/requests/pending");
      console.log("Fetched Requests:", response.data); // Debug log
      setRequests(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError(err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleUpdateRequestStatus = async (requestId, status) => {
    try {
      await api.put(`/requests/${requestId}`, { request_status: status });
      fetchRequests(); // Refresh the list of requests after updating the status
    } catch (err) {
      console.error(`Error updating request status to ${status}:`, err);
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
      <h1>Manage Requests</h1>
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
              <td>
                {request.request_status === "Pending" && (
                  <>
                    <button
                      onClick={() =>
                        handleUpdateRequestStatus(
                          request.request_id,
                          "Approved"
                        )
                      }
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateRequestStatus(request.request_id, "Denied")
                      }
                    >
                      Deny
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestManager;
