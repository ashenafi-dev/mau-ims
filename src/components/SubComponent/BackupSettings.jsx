import { useState, useEffect } from "react";
import api from "../../services/api"; // Adjust the path as needed
import "./setting.css";

const SysSetting = () => {
  const [backups, setBackups] = useState([]);
  const [status, setStatus] = useState("");
  const [auditLogs, setAuditLogs] = useState([]);

  useEffect(() => {
    fetchBackups();
    fetchAuditLogs();
  }, []);

  const fetchBackups = async () => {
    try {
      const response = await api.get("/api/backups");
      setBackups(response.data.backups);
    } catch (error) {
      console.error("Error fetching backups:", error);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const response = await api.get("/api/auditlogs");
      setAuditLogs(response.data.auditlogs);
    } catch (error) {
      console.error("Error fetching audit logs:", error);
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
      <div className="sys--col--2">
        <h2>Audit Logs</h2>
        <table>
          <thead>
            <tr>
              <th>Audit ID</th>
              <th>Table Name</th>
              <th>Record ID</th>
              <th>Change Type</th>
              <th>Change Details</th>
              <th>Changed By</th>
              <th>Change Date</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((log) => (
              <tr key={log.audit_id}>
                <td>{log.audit_id}</td>
                <td>{log.table_name}</td>
                <td>{log.record_id}</td>
                <td>{log.change_type}</td>
                <td>{log.change_details}</td>
                <td>{log.changed_by}</td>
                <td>{log.change_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SysSetting;
