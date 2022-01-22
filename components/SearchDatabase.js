import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
export default function SearchDatabase(props) {
  // Dtates
  let [category_options, setCategoryOptions] = useState([]);
  let [item_options, setItemOptions] = useState([]);
  let [item_details, setItemDetails] = useState([]);

  // Run On component Load
  useEffect(() => {
    (async () => {
      let categories = await fetch("/api/get-categories").then((e) => {
        return e.json();
      });

      // Populate Category Options
      let arr = [];
      for (let i in categories) {
        let c = categories[i];
        arr.push(
          <option id={`category_${c.category_id}`} key={c.category_id}>
            {c.name}
          </option>
        );
      }

      setCategoryOptions(arr);
    })();
  }, []);

  // Helper functions
  async function showItems(e) {
    e.preventDefault();
    // console.log(e.target.options[1].id);
    let id;
    for (let i in e.target.options) {
      if (e.target.options[i].innerText == e.target.value) {
        id = e.target.options[i].id;
      }
    }
    // console.log(id);
    id = id.slice(9);
    // console.log(id);
    // console.log(document.getElementById("categories").id);

    let items = await fetch("/api/get-categorized-items", {
      method: "POST",
      body: JSON.stringify({
        category_id: id,
      }),
    }).then((e) => {
      return e.json();
    });

    console.log(items);
    let arr = [];
    for (let i in items) {
      let c = items[i];
      arr.push(
        <option id={`item_${c.item_id}`} key={`item_${c.item_id}`}>
          {c.name}
        </option>
      );
    }

    setItemOptions(arr);
    setItemDetails([]);
    // Populate Item Select
  }

  async function selectItemDescription(e) {
    e.preventDefault();
    // console.log(e.target.options[1].id);
    let id;
    for (let i in e.target.options) {
      if (e.target.options[i].innerText == e.target.value) {
        id = e.target.options[i].id;
      }
    }
    // console.log(id);
    id = id.slice(5);
    // console.log(id);
    // console.log(document.getElementById("categories").id);

    let items = await fetch("/api/get-item-description", {
      method: "POST",
      body: JSON.stringify({
        item_id: id,
      }),
    }).then((e) => {
      return e.json();
    });

    let details = JSON.parse(items[0].details);
    // console.log(items);
    // TODO - Filter through details

    let str = JSON.stringify(details, null, 1);
    setItemDetails(
      <div key="preview">
        <ItemCard data={details} />
        {/* <pre>{str}</pre> */}
      </div>
    );
  }
  // Return App
  return (
    <div>
      <h1>Search Database</h1>

      <label htmlFor="categories">Categories</label>
      <select name="categories" onChange={showItems}>
        <option>....</option>
        {category_options}
      </select>
      <br />
      <label htmlFor="items">Items</label>
      <select name="items" onChange={selectItemDescription}>
        <option>....</option>
        {item_options}
      </select>
      <br />

      <label htmlFor="details">Details</label>
      <div className="w3-container w3-mobile w3-half text-wrap">
        {item_details}
      </div>
    </div>
  );
}
