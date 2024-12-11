import "../../styles/User.css";
import Account from "./Account";
import UsersByDepartmentId from "./UsersByDepartmentId";
import Transfers from "./Transfers";
import Requests from "./RequestsUF.jsx";
import Support from "./Support";
import GetItems from "./GetItemsStuff.jsx";
import Home from "./Home";
import UsersList from "./UsersListAdmin.jsx";
import GetItemsUser from "./GetItemsUser";
import BackupSettings from "./Settings.jsx";
import GetItemsFaculty from "./GetItemsFaculty.jsx";
import RequestManager from "./RequestManager.jsx";
import RequestStaff from "./RequestStaff.jsx";
import ReceivedItems from "./ReceivedItems.jsx";
import GetItemsStuff from "./GetItemsStuff.jsx";
import UsersListAdmin from "./UsersListAdmin.jsx";
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

const UsersLists = () => {
  return (
    <div>
      <UsersList />
    </div>
  );
};

export {
  Home,
  Accounts,
  Inventory,
  Report,
  Request,
  Supports,
  Transfer,
  UsersByDepartments,
  UsersLists,
  BackupSettings,
  GetItemsUser,
  GetItemsFaculty,
  RequestManager,
  RequestStaff,
  ReceivedItems,
  GetItemsStuff,
  UsersListAdmin,
};
