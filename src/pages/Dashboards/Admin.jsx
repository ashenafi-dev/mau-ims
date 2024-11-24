import { Dashboard } from "../../components/Dashboard";
import { adminMenuList } from "../../components/MenuList";

export default function Staff() {
  return <Dashboard menu={adminMenuList} />;
}
