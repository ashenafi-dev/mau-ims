import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../services/api"; // Adjust the path as needed

const UsersByDepartmentId = ({ department_id }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsersByDepartmentId = async () => {
      try {
        const response = await api.get(
          `/users/department/${department_id}/users`
        );
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users by department name:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchUsersByDepartmentId();
  }, [department_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="users-by-department">
      <h1>Users in Department Id: {department_id}</h1>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Profile Image</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.user_id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                {user.profile_image ? (
                  <img src={user.profile_image} alt="Profile" />
                ) : (
                  "N/A"
                )}
              </td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

UsersByDepartmentId.propTypes = {
  department_id: PropTypes.string.isRequired,
};

export default UsersByDepartmentId;
