import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import Loader from "./Loader";
export default function SearchDatabase(props) {
  // Dtates
  let [category_options, setCategoryOptions] = useState(<Loader />);
  let [item_options, setItemOptions] = useState([]);
  let [item_details, setItemDetails] = useState([]);
  let [lastHover, setLastHover] = useState({ category: null, item: null });
  let [category_search, setCategorySearch] = useState([]);
  let [item_search, setItemSearch] = useState([]);
  // Run On component Load
  useEffect(() => {
    (async () => {
      // Populate Categories tab
      let categories = await fetch("/api/get-categories").then((e) => {
        return e.json();
      });

      let items = await fetch("/api/get-all-items").then((e) => {
        return e.json();
      });

      // Set Up Search Item Selector
      async function selectSearch(e) {
        e.preventDefault();
        // console.log(e.target.id);
        let category_check = e.target.id[0];
        if (category_check == "c") {
          // Item clicked is category
          let cat = lastHover;
          let id = e.target.id.slice(15);
          id = `category_${id}`;
          document.getElementById(id).click();
        } else {
          // Item clicked is item
          let cat = lastHover;
          let id = e.target.id.slice(11);

          // Find matching Item

          let item_details = items.filter((e) => {
            return e.item_id == id;
          });
          item_details = item_details[0];

          // Find Matching category
          let category = categories.filter((e) => {
            return e.category_id == item_details.category_id;
          });
          category = category[0];
          let cat_id = `category_${category.category_id}`;
          let item_id = `item_${id}`;
          document.getElementById(cat_id).click();

          setTimeout(async () => {
            console.log(item_id);
            await document.getElementById(item_id).click();
          }, 200);
        }

        document.getElementById("search_input").value = "";
        document.getElementById("search_results").hidden = true;
      }
      // Populate Category Options
      let arr = [];
      let cat_search_arr = [];
      for (let i in categories) {
        let c = categories[i];
        arr.push(
          <option
            value={`category_${c.category_id}`}
            id={`category_${c.category_id}`}
            key={c.category_id}
            className="w3-card category_row w3-hover-opacity w3-hover-blue"
            onClick={showItems}
          >
            {c.name}
          </option>
        );

        // Set up Search bar
        cat_search_arr.push(
          <li
            hidden
            onClick={selectSearch}
            className="search_results w3-card w3-hoverable w3-hover-blue"
            id={`category_search${c.category_id}`}
            key={`category_search${c.category_id}`}
          >
            {c.name}
          </li>
        );
      }

      setCategorySearch(cat_search_arr);
      setCategoryOptions(arr);

      // Populate Item Search Bar
      let item_search_arr = [];

      for (let i in items) {
        let item = items[i];

        let category = categories.filter((e) => {
          return e.category_id == item.category_id;
        });
        category = category[0];
        item_search_arr.push(
          <li
            hidden
            onClick={selectSearch}
            className="search_results w3-card w3-hoverable w3-hover-blue"
            id={`item_search${item.item_id}`}
            key={`item_search${item.item_id}`}
          >
            {category.name} {"->"} {item.name}
          </li>
        );
      }

      setItemSearch(item_search_arr);
    })();
  }, []);

  // Helper functions
  async function selectItemDescription(e) {
    e.preventDefault();
    // console.log(e.target.options[1].id);
    let id;
    let options = document.getElementsByClassName("item_row");
    for (let i in options) {
      if (options[i].value == e.target.value) {
        id = options[i].id;
      }
    }
    // console.log(id);
    id = id.slice(5);

    // Hover Item
    let cat = lastHover;
    console.log(cat);
    if (cat.item !== null) {
      document.getElementById(cat.item).classList.remove("w3-blue");
    }
    document.getElementById(e.target.value).classList.add("w3-blue");
    cat.item = e.target.value;
    setLastHover(cat);

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

    if (props.mode == "add") {
      setItemDetails(
        <div key="preview">
          <ItemCard
            item_list={props.item_list}
            set_item_list={props.set_item_list}
            item_id={id}
            mode={props.mode || "view"}
            data={details}
          />
          {/* <pre>{str}</pre> */}
        </div>
      );
    } else {
      setItemDetails(
        <div key="preview">
          <ItemCard mode={props.mode || "view"} data={details} />
          {/* <pre>{str}</pre> */}
        </div>
      );
    }

    // Set local storage object for current item details

    // console.log(typeof items[0].details);
    window.localStorage.setItem("current_item_details", items[0].details);
  }

  async function showItems(e) {
    e.preventDefault();
    // console.log(e.target.options[1].id);
    let id;
    let options = document.getElementsByClassName("category_row");
    options = Array.from(options);

    console.log(e.target.value);
    // return;
    for (let i in options) {
      if (options[i].value == e.target.value) {
        id = options[i].id;
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

    // Hover Category
    let cat = lastHover;
    console.log(cat);
    if (cat.category !== null) {
      document.getElementById(cat.category).classList.remove("w3-blue");
    }
    document.getElementById(e.target.value).classList.add("w3-blue");
    cat.category = e.target.value;
    cat.item = null;
    setLastHover(cat);

    console.log(items);
    let arr = [];
    for (let i in items) {
      let c = items[i];
      arr.push(
        <option
          value={`item_${c.item_id}`}
          id={`item_${c.item_id}`}
          key={`item_${c.item_id}`}
          className="w3-card item_row w3-hover-opacity w3-hover-blue"
          onClick={selectItemDescription}
        >
          {c.name}
        </option>
      );
    }

    setItemOptions(arr);
    setItemDetails([]);
    // Populate Item Select
  }

  // Set item list for New Store mode
  let item_list = [];

  try {
    item_list = props.item_list;
  } catch (error) {}

  // Set view size
  let view_size = "w3-third";
  try {
    view_size = props.view_size;
  } catch (error) {}
  if (view_size == undefined) view_size = "w3-third";

  function searchBar(e) {
    // TODO - Optmize Search Bar
    e.preventDefault();
    let input = e.target.value;
    if (input.length > 0) {
      document.getElementById("search_results").hidden = false;
      let search_results = document.getElementsByClassName("search_results");
      // console.log(search_results[0].innerText);

      search_results = Array.from(search_results);
      for (let i in search_results) {
        try {
          let result = search_results[i];
          let text = search_results[i].innerText;
          if (text.toUpperCase().indexOf(input.toUpperCase()) > -1) {
            result.hidden = false;
          } else {
            result.hidden = true;
          }
        } catch (error) {
          result.hidden = true;
        }
      }
    } else {
      document.getElementById("search_results").hidden = true;
    }
  }

  // Return App
  return (
    <div>
      {/* New Wrapper */}
      <input
        id="search_input"
        type={"search"}
        placeholder="Search"
        onChange={searchBar}
      />
      <div
        id="search_results"
        className=" w3-container w3-border search_results_wrapper"
        hidden
      >
        {category_search} {item_search}
      </div>
      <div id="search_database_wrapper" className="w3-container">
        <div id="category_col" className={view_size + " w3-border "}>
          <div className="w3-card w3-row w3-blue-grey">Categories</div>
          {category_options}
        </div>
        <div id="item_col" className={view_size + " w3-border "}>
          <div className="w3-card w3-row w3-blue-grey">Items</div>
          {item_options}
        </div>
        <div id="final_quarter" className={view_size + " w3-border "}>
          <div className="w3-card w3-row w3-blue-grey">Details</div>
          {item_details}
        </div>
        {item_list}
      </div>
    </div>
  );
}
