import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "./Loader";
export default function Dashboard() {
  let [storeList, setStoreList] = useState(<Loader />);
  let [itemList, setItemList] = useState(<Loader />);

  useEffect(() => {
    (async () => {
      // Set store data
      // TODO: Switch to pulling from user_id
      let stores = await fetch("/api/get-stores").then((e) => {
        return e.json();
      });

      let store_arr = [];
      for (let i in stores) {
        let store = stores[i];
        let str = `${store.name}: ${process.env.NEXT_PUBLIC_LOCAL_API_PATH}/${store.slug}`;

        store_arr.push(
          <li className="w3-card" key={"store_" + i}>
            <Link href={`/${store.slug}`}>{str}</Link>
          </li>
        );
      }
      setStoreList(store_arr);

      // Set unique item data

      let items = await fetch("/api/get-categorized-items", {
        method: "POST",
        body: JSON.stringify({
          category_id: 90,
        }),
      }).then((e) => {
        return e.json();
      });

      let items_arr = [];
      for (let i in items) {
        let item = items[i];
        items_arr.push(
          <li className="w3-card" key={`item_${i}`}>
            {item.name}
          </li>
        );
      }
      setItemList(items_arr);
    })();
  }, []);
  return (
    <div>
      <div className="w3-container">
        <h1>Stores</h1>
        <ul />
        {storeList}
      </div>

      <div className="w3-container">
        <h1>Items</h1>
        <ul />
        {itemList}
      </div>
    </div>
  );
}
