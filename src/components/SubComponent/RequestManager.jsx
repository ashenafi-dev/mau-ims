import { useState, useEffect } from "react";
import api from "../../services/api"; // Adjust the path as needed

const RequestManager = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    try {
      const response = await api.get("/requests/pending");
      console.log("Fetched Requests:", response.data); // Debug log
      setRequests(response.data);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log("No requests at the moment."); // Debug log
        setRequests([]);
        setLoading(false);
      } else {
        console.error("Error fetching requests:", err);
        setError(err);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpdateRequestStatus = async (requestId, status) => {
    try {
      await api.put(`/requests/${requestId}`, { request_status: status });
      // Refetch the requests after updating the status
      fetchRequests();
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
      {requests.length === 0 ? (
        <p>No requests at the moment.</p>
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
                          handleUpdateRequestStatus(
                            request.request_id,
                            "Denied"
                          )
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
      )}
    </div>
  );
};

export default RequestManager;
