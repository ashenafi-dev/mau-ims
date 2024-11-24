import { Dashboard } from "../../components/Dashboard";
import { userMenuList } from "../../components/MenuList";

export default function User() {
  return <Dashboard menu={userMenuList} />;
}
