import Header from "./Header";
import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import NewItem from "./NewItem";
import NewStore from "./NewStore";
import SearchDatabase from "./SearchDatabase";
import ManageCustomItems from "./ManageCustomItems";
export default function Parent(props) {
  // DEBUG
  // console.log(props.props);

  // View Handler
  let last_app;
  switch (props.last_app) {
    case "dashboard":
      last_app = <Dashboard />;
      break;

    case "newitem":
      last_app = <NewItem />;
      break;

    case "newstore":
      last_app = <NewStore />;
      break;
    case "search":
      last_app = <SearchDatabase />;
      break;
    case "manage":
      last_app = <ManageCustomItems />;
      break;

    default:
      last_app = <Dashboard />;

      break;
  }
  const [appBody, setAppBody] = useState(last_app);

  useEffect(() => {
    // console.log(window.location.hash);
  }, []);

  return (
    <div className="parent_wrapper">
      <Header props={props.props} manage_body={setAppBody} />
      <div className="parent_body">{appBody}</div>
    </div>
  );
}

// props.dnd_categories.results;
