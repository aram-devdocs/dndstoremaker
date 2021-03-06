import { useEffect, useState } from "react";
import Loader from "./Loader";
export default function ManageCustomItems() {
  let [delete_item_table_body, setDeleteItemTableBody] = useState(<Loader />);
  let [delete_store_table_body, setDeleteStoreTableBody] = useState(<Loader />);

  useEffect(() => {
    (async () => {
      let items = await fetch("/api/get-categorized-items", {
        method: "POST",
        body: JSON.stringify({
          category_id: 90,
        }),
      }).then((e) => {
        return e.json();
      });

      let stores = await fetch("/api/get-stores").then((e) => {
        return e.json();
      });

      // Set Delete Item Table
      let delete_item_table_array = [];
      for (let i in items) {
        let item = items[i];
        delete_item_table_array.push(
          <tr>
            <td>{item.name}</td>
            <td>{item.item_id}</td>
            <td>{item.user_id}</td>
            <td>
              <input
                type={"button"}
                value={"Delete"}
                onClick={async () => {
                  await fetch("/api/delete-custom-item", {
                    method: "POST",
                    body: JSON.stringify({ item_id: item.item_id }),
                  });
                  window.location.reload();
                }}
              />
            </td>
          </tr>
        );
      }

      setDeleteItemTableBody(delete_item_table_array);

      // Set Delete Store Table
      let delete_store_table_array = [];
      for (let i in stores) {
        let store = stores[i];
        delete_store_table_array.push(
          <tr>
            <td>{store.name}</td>
            <td>{store.store_id}</td>
            <td>{store.user_id}</td>
            <td>
              <input
                type={"button"}
                value={"Delete"}
                onClick={async () => {
                  await fetch("/api/delete-store", {
                    method: "POST",
                    body: JSON.stringify({ store_id: store.store_id }),
                  });
                  window.location.reload();
                }}
              />
            </td>
          </tr>
        );
      }

      setDeleteStoreTableBody(delete_store_table_array);
    })();
  }, []);
  return (
    <div>
      <h1>Manage Custom Items</h1>

      <h2>Delete Items</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Item ID</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{delete_item_table_body}</tbody>
      </table>

      <h2>Delete Stores</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Store ID</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{delete_store_table_body}</tbody>
      </table>
    </div>
  );
}
