import { useState, useEffect, useCallback } from "react";
import api from "../../services/api"; // Adjust the path as needed

const RequestStaff = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApprovedRequests = useCallback(async () => {
    try {
      const response = await api.get("/requests/staff/approved");
      console.log("Fetched Approved Requests:", response.data); // Debug log
      setRequests(response.data);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("No approved requests at the moment."); // Debug log
        setRequests([]);
      } else {
        console.error("Error fetching approved requests:", err);
        setError(err);
      }
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApprovedRequests();
  }, [fetchApprovedRequests]);

  const handleProceedRequest = async (requestId) => {
    try {
      await api.put(`/requests/requests/${requestId}`, {
        request_status: "Received",
      });
      // Update the state to reflect the change immediately
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.request_id !== requestId)
      );
    } catch (err) {
      console.error("Error updating request status to 'Received':", err);
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
      {requests.length === 0 ? (
        <p>No approved requests at the moment.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Request Date</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Item Name</th>
              <th>Item Description</th>
              <th>Requested By</th>
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
                <td>
                  {request.requester_first_name +
                    " " +
                    request.requester_last_name}
                </td>
                <td>${request.item_price}</td>
                <td>{request.item_stock_level}</td>
                <td>
                  {request.request_status === "Approved" && (
                    <button
                      onClick={() => handleProceedRequest(request.request_id)}
                    >
                      Proceed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RequestStaff;
