import Header from "./Header";
import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
export default function Parent(props) {
  // DEBUG
  // console.log(props.props);

  // View Handler
  const [appBody, setAppBody] = useState(<Dashboard />);

  return (
    <div className="parent_wrapper">
      <Header props={props.props} manage_body={setAppBody} />
      <div className="parent_body">{appBody}</div>
    </div>
  );
}

// props.dnd_categories.results;
