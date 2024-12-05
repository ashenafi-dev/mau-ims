import {
  home,
  transfer,
  support,
  profile,
  request,
  report,
  users,
} from "./Svg";
const userMenuList = [
  { icon: home, name: "inventory" },
  { icon: request, name: "request" },
  { icon: transfer, name: "transfer" },
  { icon: profile, name: "account" },
  { icon: support, name: "support" },
];

const staffMenuList = [
  { icon: home, name: "inventory" },
  { icon: request, name: "request" },
  { icon: profile, name: "account" },
  { icon: support, name: "support" },
];

const adminMenuList = [
  { icon: users, name: "Users" },
  { icon: home, name: "Inventory" },
  { icon: report, name: "reports" },
  { icon: profile, name: "Account" },
  { icon: support, name: "support" },
];

const managerMenuList = [
  { icon: home, name: "Inventory" },
  { icon: request, name: "Request" },
  { icon: report, name: "Reports" },
  { icon: profile, name: "account" },
  { icon: support, name: "support" },
];
const technicianMenuList = [
  { icon: home, name: "Faliures" },
  { icon: report, name: "Reports" },
  { icon: profile, name: "account" },
  { icon: home, name: "support" },
];

const faculityMenuList = [
  { icon: home, name: "inventory" },
  { icon: request, name: "request" },
  { icon: users, name: "users" },
  { icon: profile, name: "account" },
  { icon: support, name: "support" },
];

export {
  userMenuList,
  staffMenuList,
  adminMenuList,
  managerMenuList,
  technicianMenuList,
  faculityMenuList,
};
