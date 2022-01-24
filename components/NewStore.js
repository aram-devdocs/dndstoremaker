import SearchDatabase from "./SearchDatabase";
import { useEffect, useState } from "react";
import { getCookie } from "./../helpers/cookieHandler";
import _escapeString from "../helpers/_escapeString";
import Loader from "./Loader";
export default function NewStore() {
  let [itemList, setItemList] = useState([]);
  let [domList, setDomList] = useState([]);

  let old_item = [];
  useEffect(() => {
    setDomList((domList) => [...domList, itemList]);
  }, [itemList]);

  let item_list = (
    <div className="w3-border w3-quarter" id="item_list">
      <ul />
      <h4>Item Inventory</h4>
      <input id="store_name" type={"text"} placeholder="Store Name" />
      {domList}
      <input
        type="button"
        value="Save Store"
        onClick={async (e) => {
          e.preventDefault();
          let item_arr = [];
          for (let i in domList) {
            if (i == 0) continue; // Skip first empty array
            item_arr.push(domList[i].props.id);
            // TODO - Instead of pushing just the item_id, push an object to the array with the item_id and quantity
          }

          console.log(item_arr);

          // Get User ID from cookie
          let user_id = await getCookie("user_id");
          user_id = user_id.user_id;

          // Get Name
          let name = document.getElementById("store_name").value;

          await fetch("/api/post-new-store", {
            method: "POST",
            body: JSON.stringify({
              name: name,
              user_id: user_id,
              slug: name.replace(/\s+/g, ""),
              item_arr: _escapeString(JSON.stringify(item_arr)),
            }),
          });

          // TODO - Check for validation and response
          window.location.reload();
        }}
      />
    </div>
  );

  return (
    <div>
      <h1>Add Store</h1>
      <SearchDatabase
        view_size="w3-quarter"
        item_list={item_list}
        set_item_list={setItemList}
        mode="add"
      />
      {/* <div className="w3-container w3-quarter" id="item_list">
        <ul />
        <h4>Item Inventory</h4>
        <input id="store_name" type={"text"} placeholder="Store Name" />
        {domList}
        <input
          type="button"
          value="Save Store"
          onClick={async (e) => {
            e.preventDefault();
            let item_arr = [];
            for (let i in domList) {
              if (i == 0) continue; // Skip first empty array
              item_arr.push(domList[i].props.id);
              // TODO - Instead of pushing just the item_id, push an object to the array with the item_id and quantity
            }

            console.log(item_arr);

            // Get User ID from cookie
            let user_id = await getCookie("user_id");
            user_id = user_id.user_id;

            // Get Name
            let name = document.getElementById("store_name").value;

            await fetch("/api/post-new-store", {
              method: "POST",
              body: JSON.stringify({
                name: name,
                user_id: user_id,
                slug: name.replace(/\s+/g, ""),
                item_arr: _escapeString(JSON.stringify(item_arr)),
              }),
            });

            // TODO - Check for validation and response
            window.location.reload();
          }}
        />
      </div> */}
    </div>
  );
}
