import { deleteCookie, setCookie } from "../helpers/cookieHandler";
import Dashboard from "./Dashboard";
import ManageCustomItems from "./ManageCustomItems";
import NewItem from "./NewItem";
import NewStore from "./NewStore";
import SearchDatabase from "./SearchDatabase";
export default function Header(props) {
  // Menu
  //   console.log(props);
  let setAppBody = props.manage_body;

  // Navigation Functions

  function setDash(e) {
    e.preventDefault();
    setCookie("last_app", "dashboard");

    setAppBody(<Dashboard />);
  }

  function setNewItem(e) {
    e.preventDefault();
    setCookie("last_app", "newitem");
    setAppBody(<NewItem />);
  }

  function setNewStore(e) {
    e.preventDefault();
    setCookie("last_app", "newstore");
    setAppBody(<NewStore />);
  }

  function setSearchDatabase(e) {
    e.preventDefault();
    setCookie("last_app", "search");
    setAppBody(<SearchDatabase />);
  }

  function setManageCustomItems(e) {
    e.preventDefault();
    setCookie("last_app", "manage");
    setAppBody(<ManageCustomItems />);
  }

  async function loggout(e) {
    e.preventDefault();
    await deleteCookie("log");
    window.location.reload();
  }

  return (
    <div className="w3-bar w3-black">
      <a onClick={setDash} className="w3-bar-item w3-button w3-mobile">
        Dashboard
      </a>
      <a onClick={setNewItem} className="w3-bar-item w3-button w3-mobile">
        New Item
      </a>
      <a onClick={setNewStore} className="w3-bar-item w3-button w3-mobile">
        New Store
      </a>
      <a
        onClick={setSearchDatabase}
        className="w3-bar-item w3-button w3-mobile"
      >
        Search
      </a>
      <a
        onClick={setManageCustomItems}
        className="w3-bar-item w3-button w3-mobile"
      >
        Manage
      </a>
      <a onClick={loggout} className="w3-bar-item w3-button w3-mobile">
        Logout
      </a>
    </div>
  );
}
