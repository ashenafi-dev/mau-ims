import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../services/api"; // Adjust the path as needed
import { profileImage } from "../Svg";

const Account = ({ userId }) => {
  const [userAccount, setUserAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserAccount = async () => {
      try {
        const response = await api.get(`/users/${userId}`);
        setUserAccount(response.data);
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setEmail(response.data.email);
        setUsername(response.data.username);
        setPhone(response.data.phone);
        setPassword("**************");
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user account information:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchUserAccount();
  }, [userId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedUser = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: username,
        phone: phone,
        password: password,
      };

      await api.put(`/users/self/${userId}`, updatedUser);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating user account information:", err);
      setError(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userAccount) {
    return <div>No user account information found.</div>;
  }

  return (
    <div className="account--div">
      <div className="profile-image">{profileImage}</div>
      <div className="user-account">
        <div className="field--container">
          <div className="field">
            <p>First Name</p>
            <input
              type="text"
              value={firstName}
              readOnly={!isEditing}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="field">
            <p>Last Name</p>
            <input
              type="text"
              value={lastName}
              readOnly={!isEditing}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="field">
            <p>Email</p>
            <input
              type="text"
              value={email}
              readOnly={!isEditing}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <p>Username</p>
            <input
              type="text"
              value={username}
              readOnly={!isEditing}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="field">
            <p>Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              readOnly={!isEditing}
            />
          </div>
          <div className="field">
            <p>Phone</p>
            <input
              type="text"
              value={phone}
              readOnly={!isEditing}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="field--bio">
          <p>Bio</p>
          <p className="bio--text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia a
            reprehenderit sint incidunt qui, autem repellat, repellendus, ullam
            tenetur exercitationem possimus atque architecto rem accusantium
            veniam. Tenetur exercitationem possimus atque architecto rem
            accusantium veniam.
          </p>
        </div>
      </div>
      <div className="account--btn">
        <button className="edit" onClick={handleEdit} disabled={isEditing}>
          Edit
        </button>
        <button className="save" onClick={handleSave} disabled={!isEditing}>
          Save
        </button>
      </div>
    </div>
  );
};

Account.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default Account;
