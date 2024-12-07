import { useState } from "react";
import PropTypes from "prop-types";
import api from "../../services/api"; // Adjust the path as needed

const NewUserForm = ({ onUserCreated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [roleId, setRoleId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = {
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
      await api.post("/users", newUser);
      alert("User created successfully");
      onUserCreated(); // Call the callback function
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user. Please try again.");
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
        required
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
      <button type="submit">Create User</button>
    </form>
  );
};

NewUserForm.propTypes = {
  onUserCreated: PropTypes.func.isRequired,
};

export default NewUserForm;
