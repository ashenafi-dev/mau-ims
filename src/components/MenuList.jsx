import {
  home,
  transfer,
  support,
  profile,
  request,
  report,
  users,
  dashboard,
  system,
  items,
} from "./Svg";
const userMenuList = [
  { icon: home, name: "inventory", id: "userInventory" },
  { icon: request, name: "request", id: "request" },
  { icon: transfer, name: "transfer", id: "transfer" },
  { icon: items, name: "items", id: "receivedItems" },
  { icon: profile, name: "account", id: "account" },
  { icon: support, name: "support", id: "support" },
];

const staffMenuList = [
  { icon: dashboard, name: "dashboard", id: "dashboard" },
  { icon: home, name: "inventory", id: "staffInventory" },
  { icon: request, name: "request", id: "requestStaff" },
  { icon: transfer, name: "transfer", id: "transfer" },
  { icon: profile, name: "account", id: "account" },
  { icon: support, name: "support", id: "support" },
];

const adminMenuList = [
  { icon: dashboard, name: "dashboard", id: "dashboard" },
  { icon: users, name: "users", id: "usersA" },
  { icon: system, name: "system", id: "system" },
  { icon: profile, name: "account", id: "account" },
  { icon: support, name: "support", id: "support" },
];

const managerMenuList = [
  { icon: home, name: "inventory", id: "inventory" },
  { icon: request, name: "Request", id: "requestManager" },
  { icon: report, name: "Reports", id: "Reports" },
  { icon: profile, name: "account", id: "account" },
  { icon: support, name: "support", id: "support" },
];

const faculityMenuList = [
  { icon: home, name: "inventory", id: "facultyInventory" },
  { icon: request, name: "request", id: "request" },
  { icon: users, name: "users", id: "usersF" },
  { icon: items, name: "items", id: "receivedItems" },
  { icon: profile, name: "account", id: "account" },
  { icon: support, name: "support", id: "support" },
];

export {
  userMenuList,
  staffMenuList,
  adminMenuList,
  managerMenuList,
  faculityMenuList,
};
