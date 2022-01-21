import Header from "./Header";
import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
export default function Parent() {
  // View Handler
  const [appBody, setAppBody] = useState(<Dashboard />);

  return (
    <div className="parent_wrapper">
      <Header manage_body={setAppBody} />
      <div className="parent_body">{appBody}</div>
    </div>
  );
}
