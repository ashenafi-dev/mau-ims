import {
  home,
  transfer,
  support,
  profile,
  request,
  report,
  users,
  dashboard,
} from "./Svg";
const userMenuList = [
  { icon: dashboard, name: "dashboard" },
  { icon: home, name: "inventory" },
  { icon: request, name: "request" },
  { icon: transfer, name: "transfer" },
  { icon: profile, name: "account" },
  { icon: support, name: "support" },
];

const staffMenuList = [
  { icon: dashboard, name: "dashboard" },
  { icon: home, name: "inventory" },
  { icon: request, name: "request" },
  { icon: transfer, name: "transfer" },
  { icon: profile, name: "account" },
  { icon: support, name: "support" },
];

const adminMenuList = [
  { icon: dashboard, name: "dashboard" },
  { icon: users, name: "users" },
  { icon: home, name: "inventory" },
  { icon: report, name: "reports" },
  { icon: profile, name: "account" },
  { icon: support, name: "support" },
];

const managerMenuList = [
  { icon: dashboard, name: "dashboard" },
  { icon: home, name: "inventory" },
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
  { icon: dashboard, name: "dashboard" },
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
