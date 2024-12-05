import api from "../../services/api"; // Import the configured Axios instance
import { useEffect, useState } from "react";
import "./User.css";
import PropTypes from "prop-types";
// import { AuthContext } from "../../contexts/AuthContext";
import { getToken } from "../../services/tokenService";
import { jwtDecode } from "jwt-decode";

const GetUser = () => {
  const token = getToken();
  const user = jwtDecode(token);
  console.table(user);
  return user.id;
};

const Transfers = ({ id }) => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(`this is the user.id ${id}`);

  // Decode the token to get user details

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
  user: PropTypes.number.isRequired,
};

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

Transfers.propTypes = {
  id: PropTypes.number.isRequired,
};

const GetItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get("/getItems");
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
    <div className="items">
      {items.map((item) => (
        <div className="item--card" key={item.name}>
          <img src="src/components/SubComponent/image.jpeg"></img>
          <p>{item.name}</p>
          <button>request</button>
        </div>
      ))}
    </div>
  );
};

const Home = () => {
  return <div>Dashboard Content</div>;
};

const Account = () => {
  return <div>Account Content</div>;
};

const Inventory = () => {
  return (
    <div>
      <GetItems />
    </div>
  );
};

const Report = () => {
  return <div>Report Content</div>;
};

const Request = () => {
  return (
    <div>
      <Requests id={GetUser()} />
    </div>
  );
};

const Support = () => {
  return <div>Support Content</div>;
};

const Transfer = () => {
  return (
    <div>
      <Transfers id={GetUser()} />
    </div>
  );
};

export { Home, Account, Inventory, Report, Request, Support, Transfer };
