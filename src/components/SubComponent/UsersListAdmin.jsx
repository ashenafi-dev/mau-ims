import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../services/api"; // Adjust the path as needed
import Modal from "./Modal";
import NewUserForm from "./NewUserForm"; // Import the NewUserForm component
import UpdateUserForm from "./UpdateUserForm"; // Import the UpdateUserForm component
import { addUser, modify, remove } from "../Svg"; // Adjust the SVG imports as needed

const UsersListAdmin = ({ searchQuery }) => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [modalType, setModalType] = useState(""); // To distinguish between Add and Modify modals

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
      setSortedUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSortedUsers(filtered);
  }, [searchQuery, users]); // Re-run when searchQuery or users changes

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...sortedUsers].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSortedUsers(sorted);
  };

  const handleDeleteClick = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      setSortedUsers(sortedUsers.filter((user) => user.user_id !== userId));
      alert(`User with ID ${userId} deleted successfully`);
    } catch (err) {
      console.error("Error deleting user:", err);
      alert(`Error deleting user. Please try again.`);
    }
  };

  const handleModifyClick = (userId) => {
    setSelectedUserId(userId);
    setModalType("modify");
    setShowModal(true);
  };

  const handleAddClick = () => {
    setModalType("add");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUserId(null);
  };

  const handleUserUpdated = () => {
    setShowModal(false);
    fetchUsers(); // Re-fetch users after a user is updated
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {console.table(users)}
      <Modal show={showModal} onClose={handleCloseModal}>
        {modalType === "add" ? (
          <NewUserForm onUserCreated={handleUserUpdated} />
        ) : (
          selectedUserId && (
            <UpdateUserForm
              userId={selectedUserId}
              onClose={handleCloseModal}
              onUpdate={handleUserUpdated}
            />
          )
        )}
      </Modal>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("user_id")}>User ID</th>
            <th onClick={() => handleSort("username")}>Username</th>
            <th onClick={() => handleSort("email")}>Email</th>
            <th onClick={() => handleSort("phone")}>Phone</th>
            <th onClick={() => handleSort("department_name")}>Department</th>
            <th onClick={() => handleSort("first_name")}>First Name</th>
            <th onClick={() => handleSort("last_name")}>Last Name</th>
            <th onClick={() => handleSort("roles")}>Roles</th>
            <th>Modify</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.user_id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.department_name || "N/A"}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.roles}</td>
              <td onClick={() => handleModifyClick(user.user_id)}>{modify}</td>
              <td onClick={() => handleDeleteClick(user.user_id)}>{remove}</td>
            </tr>
          ))}
          {/* Add empty row with "Add" button */}
          <tr>
            <td colSpan="8"></td>
            <td colSpan="2" onClick={handleAddClick}>
              {addUser}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

UsersListAdmin.propTypes = {
  searchQuery: PropTypes.string,
};

export default UsersListAdmin;
