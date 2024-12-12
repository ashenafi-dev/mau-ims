import { useState, useEffect } from "react";
import axios from "axios";

const StaffTransfer = () => {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    // Fetch transfers pending approval
    axios.get("/api/transfers/pending").then((response) => {
      setTransfers(response.data);
    });
  }, []);

  const handleRecord = (transferId, senderId, receiverId, itemId) => {
    axios
      .post("/api/transfers/record", {
        transferId,
        senderId,
        receiverId,
        itemId,
      })
      .then((response) => {
        setTransfers((prevTransfers) =>
          prevTransfers.filter((transfer) => transfer.id !== transferId)
        );
      });
  };

  return (
    <div className="staff-transfer">
      <h2>Transfers Pending Approval</h2>
      <ul>
        {transfers.map((transfer) => (
          <li key={transfer.id}>
            <div>
              <p>{transfer.details}</p>
              <button
                onClick={() =>
                  handleRecord(
                    transfer.id,
                    transfer.senderId,
                    transfer.receiverId,
                    transfer.itemId
                  )
                }
              >
                Record
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StaffTransfer;
