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
} from "./Svg";
const userMenuList = [
  { icon: dashboard, name: "dashboard", id: "dashboard" },
  { icon: home, name: "inventory", id: "userInventory" },
  { icon: request, name: "request", id: "request" },
  { icon: transfer, name: "transfer", id: "transfer" },
  { icon: profile, name: "account", id: "account" },
  { icon: support, name: "support", id: "support" },
];

const staffMenuList = [
  { icon: dashboard, name: "dashboard", id: "dashboard" },
  { icon: home, name: "inventory", id: "inventory" },
  { icon: request, name: "request", id: "request" },
  { icon: transfer, name: "transfer", id: "transfer" },
  { icon: profile, name: "account", id: "account" },
  { icon: support, name: "support", id: "support" },
];

const adminMenuList = [
  { icon: dashboard, name: "dashboard", id: "dashboard" },
  { icon: users, name: "users", id: "users" },
  { icon: system, name: "system", id: "system" },
  { icon: profile, name: "account", id: "account" },
  { icon: support, name: "support", id: "support" },
];

const managerMenuList = [
  { icon: dashboard, name: "dashboard", id: "dashboard" },
  { icon: home, name: "inventory", id: "inventory" },
  { icon: request, name: "Request", id: "Request" },
  { icon: report, name: "Reports", id: "Reports" },
  { icon: profile, name: "account", id: "account" },
  { icon: support, name: "support", id: "support" },
];
const technicianMenuList = [
  { icon: home, name: "Faliures", id: "Faliures" },
  { icon: report, name: "Reports", id: "Reports" },
  { icon: profile, name: "account", id: "account" },
  { icon: home, name: "support", id: "support" },
];

const faculityMenuList = [
  { icon: dashboard, name: "dashboard", id: "dashboard" },
  { icon: home, name: "inventory", id: "inventory" },
  { icon: request, name: "request", id: "request" },
  { icon: users, name: "users", id: "users" },
  { icon: profile, name: "account", id: "account" },
  { icon: support, name: "support", id: "support" },
];

export {
  userMenuList,
  staffMenuList,
  adminMenuList,
  managerMenuList,
  technicianMenuList,
  faculityMenuList,
};
