import React, { useState, useEffect } from "react";
import api from "../../services/api"; // Adjust the path as needed
import { modify, remove, addUser } from "../Svg";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = React.useMemo(() => {
    if (!sortConfig.key) return users;

    const sorted = [...users].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sorted;
  }, [users, sortConfig]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleAddUserClick = () => {
    return 0;
  };
  handleAddUserClick();

  return (
    <div>
      {console.table(users)}
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("user_id")}>UserID</th>
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
              <td>{modify}</td>
              <td>{remove}</td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>

            <td colSpan="2">{addUser}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
