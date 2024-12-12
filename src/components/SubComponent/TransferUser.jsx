import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import api from "../../services/api"; // Adjust the path as needed
import Modal from "./Modal"; // Ensure this path is correct
import "./TransferUser.css"; // Add this file for custom styles
import { getUserID } from "../../services/userUtils";

const TransferUser = () => {
  const id = getUserID();
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [targetUserId, setTargetUserId] = useState("");
  const [itemId, setItemId] = useState("");
  const [userItems, setUserItems] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchTransfers = useCallback(async () => {
    try {
      const response = await api.get(`/transfers/${id}`);
      setTransfers(response.data);
    } catch (err) {
      console.error("Error fetching transfers:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTransfers();
  }, [fetchTransfers, id]);

  const fetchUserItems = async () => {
    try {
      const response = await api.get(`/transfers/useritems/${id}`);
      setUserItems(response.data);
    } catch (err) {
      console.error("Error fetching user items:", err);
      setError(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
    fetchUserItems();
    fetchUsers();
    console.table(transfers);
  };

  const closeModal = () => setModalIsOpen(false);

  const handleTransfer = async () => {
    try {
      const selectedItem = userItems.find(
        (item) => item.user_item_id == itemId
      );
      if (!selectedItem) {
        throw new Error("Selected item not found");
      }

      const response = await api.post("/transfers/handletransfers", {
        userId: id,
        targetUserId,
        itemId,
      });

      closeModal();
      setTransfers((prevTransfers) => [
        ...prevTransfers,
        {
          id: response.data.transferId,
          requested_at: new Date().toISOString(),
          transfer_status: "Pending",
          item_name: selectedItem.name,
          item_description: selectedItem.description,
          item_price: selectedItem.price,
          transfer_from: id,
          transfer_to: targetUserId,
        },
      ]);
    } catch (err) {
      console.error("Error initiating transfer:", err);
      setError(err);
    }
  };

  const handleRemove = async (transferId) => {
    try {
      await api.delete(`/transfers/remove/${transferId}`);
      fetchTransfers(); // Re-fetch the list of transfers after removal
    } catch (err) {
      console.error("Error removing transfer:", err);
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
      <table>
        <thead>
          <tr>
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
                {transfer.to_user_first_name + " " + transfer.to_user_last_name}
              </td>
              <td>
                <button onClick={() => handleRemove(transfer.transfer_id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="7"></td>
            <td colSpan="2">
              <button onClick={openModal}>Add Request</button>
            </td>
          </tr>
        </tbody>
      </table>
      <Modal show={modalIsOpen} onClose={closeModal}>
        <h2>Initiate Transfer</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleTransfer();
          }}
        >
          <label>
            Item:
            <select
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              required
            >
              <option value="">Select Item</option>
              {userItems.map((item) => (
                <option key={item.user_item_id} value={item.user_item_id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Target User:
            <select
              value={targetUserId}
              onChange={(e) => setTargetUserId(e.target.value)}
              required
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.user_id} value={user.user_id}>
                  {user.first_name} {user.last_name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Submit</button>
        </form>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

TransferUser.propTypes = {
  id: PropTypes.number.isRequired,
};

export default TransferUser;
