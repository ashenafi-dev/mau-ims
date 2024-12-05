import {
  home,
  dashboard,
  transfer,
  support,
  profile,
  request,
  report,
} from "./Svg";
const userMenuList = [
  { icon: dashboard, name: "dashboard" },
  { icon: home, name: "inventory" },
  { icon: request, name: "request" },
  { icon: transfer, name: "transfer" },
  { icon: report, name: "report" },
  { icon: profile, name: "account" },
  { icon: support, name: "support" },
];

const staffMenuList = [
  { icon: dashboard, name: "dashboard" },
  { icon: home, name: "inventory" },
  { icon: request, name: "request" },
  { icon: profile, name: "account" },
  { icon: home, name: "support" },
];

const adminMenuList = [
  { icon: dashboard, name: "Dashboard" },
  { icon: home, name: "Users" },
  { icon: home, name: "Inventory" },
  { icon: report, name: "reports" },
  { icon: profile, name: "Account" },
  { icon: home, name: "Support" },
];

const managerMenuList = [
  { icon: dashboard, name: "Dashboard" },
  { icon: home, name: "Inventory" },
  { icon: request, name: "Request" },
  { icon: report, name: "Reports" },
  { icon: home, name: "Budget" },
  { icon: profile, name: "account" },
  { icon: home, name: "Support" },
];
const technicianMenuList = [
  { icon: dashboard, name: "Dashboard" },
  { icon: home, name: "Faliures" },
  { icon: report, name: "Reports" },
  { icon: home, name: "Guides" },
  { icon: profile, name: "account" },
  { icon: home, name: "Support" },
];

const faculityMenuList = [
  { icon: dashboard, name: "dashboard" },
  { icon: home, name: "Inventory" },
  { icon: request, name: "requests" },
  { icon: report, name: "report" },
  { icon: profile, name: "account" },
  { icon: home, name: "support" },
];

export {
  userMenuList,
  staffMenuList,
  adminMenuList,
  managerMenuList,
  technicianMenuList,
  faculityMenuList,
};
