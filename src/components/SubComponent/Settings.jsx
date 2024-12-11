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

  const handleDeleteBackup = async (filename) => {
    try {
      const response = await api.delete(`/api/backups/${filename}`);
      setStatus(response.data.message);
      fetchBackups(); // Refresh the list of backups
    } catch (error) {
      console.error("Error deleting backup:", error);
      setStatus("Failed to delete backup");
    }
  };

  return (
    <div className="sys--parent">
      <div className="sys--col--1">
        <h2>Database Backups</h2>
        <button onClick={handleBackup}>Trigger Manual Backup</button>
        {status && <p>{status}</p>}
        <h2>Backup Files</h2>
        <ul className="custom-list">
          {backups.map((file, index) => (
            <li key={index} className="custom-list-item">
              <a href={`http://localhost:5000/api/backups/${file}`} download>
                {file}
              </a>
              <button onClick={() => handleDeleteBackup(file)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="sys--col--2">
        <h2>Audit Logs</h2>
        <ul className="audit-list">
          {auditLogs.map((log) => (
            <li key={log.audit_id} className="audit-list-item">
              <span className="custom-bullet">•</span>
              In {log.table_name} table, {log.changed_by} modified record ID{" "}
              {log.record_id} by performing a {log.change_type} This change was
              made on {log.change_date}.
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SysSetting;
