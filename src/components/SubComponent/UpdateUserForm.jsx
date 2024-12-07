import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../services/api"; // Adjust the path as needed

const UpdateUserForm = ({ userId, onClose, onUpdate }) => {
  console.log(onClose);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [roleId, setRoleId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${userId}`);
        const user = response.data;
        setUsername(user.username);
        setEmail(user.email);
        setPhone(user.phone);
        setProfileImage(user.profile_image);
        setDepartmentId(user.department_id);
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setRoleId(user.role_id);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedUser = {
      username,
      password,
      email,
      phone,
      profile_image: profileImage,
      department_id: departmentId,
      first_name: firstName,
      last_name: lastName,
      role_id: roleId,
    };

    try {
      await api.put(`/users/${userId}`, updatedUser);
      alert("User information updated successfully");
      onUpdate(); // Call the callback function to refresh the user list
    } catch (error) {
      console.error("Error updating user information:", error);
      alert("Error updating user information. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        required
      />
      <input
        type="text"
        value={profileImage}
        onChange={(e) => setProfileImage(e.target.value)}
        placeholder="Profile Image URL"
      />
      <input
        type="text"
        value={departmentId}
        onChange={(e) => setDepartmentId(e.target.value)}
        placeholder="Department ID"
        required
      />
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        required
      />
      <input
        type="text"
        value={roleId}
        onChange={(e) => setRoleId(e.target.value)}
        placeholder="Role ID"
        required
      />
      <button type="submit">Update User</button>
    </form>
  );
};

UpdateUserForm.propTypes = {
  userId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default UpdateUserForm;
