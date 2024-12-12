import {
  home,
  transfer,
  support,
  profile,
  request,
  report,
  users,
  system,
  items,
} from "./Svg";
const userMenuList = [
  { icon: home, name: "inventory", id: "userInventory" },
  { icon: request, name: "request", id: "request" },
  { icon: transfer, name: "transfer", id: "transferUser" },
  { icon: items, name: "items", id: "receivedItems" },
  { icon: profile, name: "account", id: "account" },
  { icon: support, name: "support", id: "support" },
];

const staffMenuList = [
  { icon: home, name: "inventory", id: "staffInventory" },
  { icon: request, name: "request", id: "requestStaff" },
  { icon: profile, name: "account", id: "account" },
  { icon: support, name: "support", id: "support" },
];

const adminMenuList = [
  { icon: users, name: "All Users", id: "usersA" },
  { icon: system, name: "System", id: "system" },
  { icon: profile, name: "Account", id: "account" },
  { icon: support, name: "Support", id: "support" },
];

const managerMenuList = [
  { icon: request, name: "Request", id: "requestManager" },
  { icon: report, name: "Reports", id: "Reports" },
  { icon: profile, name: "Account", id: "account" },
  { icon: support, name: "Support", id: "support" },
];

const faculityMenuList = [
  { icon: home, name: "Inventory", id: "facultyInventory" },
  { icon: request, name: "Request", id: "request" },
  { icon: users, name: "Users", id: "usersF" },
  { icon: items, name: "Items", id: "receivedItems" },
  { icon: profile, name: "Account", id: "account" },
  { icon: support, name: "Support", id: "support" },
];

export {
  userMenuList,
  staffMenuList,
  adminMenuList,
  managerMenuList,
  faculityMenuList,
};
