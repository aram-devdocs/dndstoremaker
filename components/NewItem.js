import SearchDatabase from "./SearchDatabase";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "../helpers/cookieHandler";

export default function NewItem() {
  useEffect(() => {}, []);
  let [errorMessage, setErrorMessage] = useState([]);

  try {
    (async () => {
      let cookie = await getCookie("new_item");

      if (cookie) {
        console.log("error caught");
        setErrorMessage(<h3>{`Item added to "custom-item" category.`}</h3>);
        deleteCookie("new_item");
      }
    })();
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <h1>Add Item</h1>
      {errorMessage}

      <SearchDatabase mode="new" />
    </div>
  );
}
