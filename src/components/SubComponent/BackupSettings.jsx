import { useState, useEffect } from "react";
import api from "../../services/api"; // Adjust the path as needed

const SysSetting = () => {
  const [backups, setBackups] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchBackups();
  }, []);

  const fetchBackups = async () => {
    try {
      const response = await api.get("/api/backups");
      setBackups(response.data.backups);
    } catch (error) {
      console.error("Error fetching backups:", error);
    }
  };

  const handleBackup = async () => {
    try {
      const response = await api.post("/api/backup");
      setStatus(response.data.message);
      fetchBackups(); // Refresh the list of backups
    } catch (error) {
      console.error("Error triggering backup:", error);
      setStatus("Failed to trigger backup");
    }
  };

  return (
    <div className="sys--parent">
      <div className="sys--col--1">
        <h2>Database Backups</h2>
        <button onClick={handleBackup}>Trigger Manual Backup</button>
        {status && <p>{status}</p>}
        <h2>Backup Files</h2>
        <ul>
          {backups.map((file, index) => (
            <li key={index}>
              <a href={`http://localhost:5000/api/backups/${file}`} download>
                {file}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SysSetting;
