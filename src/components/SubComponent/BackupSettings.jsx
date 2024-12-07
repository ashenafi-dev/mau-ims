import { useState, useEffect } from "react";

const BackupSettings = () => {
  const [schedule, setSchedule] = useState("daily");
  const [time, setTime] = useState("02:00");
  const [retention, setRetention] = useState(30);
  const [location, setLocation] = useState("local");
  const [encryption, setEncryption] = useState(false);
  const [compression, setCompression] = useState(true);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch backup logs here
    setLogs([]);
  }, []);

  const handleScheduleChange = (e) => {
    setSchedule(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleRetentionChange = (e) => {
    setRetention(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleEncryptionChange = (e) => {
    setEncryption(e.target.checked);
  };

  const handleCompressionChange = (e) => {
    setCompression(e.target.checked);
  };

  return (
    <div>
      <h2>Backup Settings</h2>
      <div>
        <label>Backup Schedule:</label>
        <select value={schedule} onChange={handleScheduleChange}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <div>
        <label>Backup Time:</label>
        <input type="time" value={time} onChange={handleTimeChange} />
      </div>
      <div>
        <label>Backup Retention (days):</label>
        <input
          type="number"
          value={retention}
          onChange={handleRetentionChange}
        />
      </div>
      <div>
        <label>Backup Location:</label>
        <select value={location} onChange={handleLocationChange}>
          <option value="local">Local</option>
          <option value="remote">Remote</option>
          <option value="external">External</option>
        </select>
      </div>
      <div>
        <label>Enable Encryption:</label>
        <input
          type="checkbox"
          checked={encryption}
          onChange={handleEncryptionChange}
        />
      </div>
      <div>
        <label>Enable Compression:</label>
        <input
          type="checkbox"
          checked={compression}
          onChange={handleCompressionChange}
        />
      </div>
      <h3>Backup Logs</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Status</th>
            <th>Size</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.date}</td>
              <td>{log.type}</td>
              <td>{log.status}</td>
              <td>{log.size}</td>
              <td>{log.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BackupSettings;
