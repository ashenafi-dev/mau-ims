import "../../styles/User.css";
import Account from "./Account";
import UsersByDepartmentId from "./UsersByDepartmentId";
import Transfers from "./Transfers";
import Requests from "./Requests";
import Support from "./Support";
import GetItems from "./GetItems";
import { getUser, getUserID } from "../../services/userUtils";

// components
const Accounts = () => {
  const userId = getUserID(); // Ensure this function returns the correct user ID
  return (
    <div>
      <Account userId={userId} />
    </div>
  );
};

const Inventory = () => {
  return (
    <div>
      <GetItems />
    </div>
  );
};

const Report = () => {
  return <div>Report Content</div>;
};

const Request = () => {
  return (
    <div>
      <Requests id={getUserID()} />
    </div>
  );
};

const Supports = () => {
  return (
    <div>
      <Support />
    </div>
  );
};

const Transfer = () => {
  return (
    <div>
      <Transfers id={getUserID()} />
    </div>
  );
};

const UsersByDepartments = () => {
  return (
    <div>
      <UsersByDepartmentId department_id={getUser().department_id} />
    </div>
  );
};

export {
  Accounts,
  Inventory,
  Report,
  Request,
  Supports,
  Transfer,
  UsersByDepartments,
};
