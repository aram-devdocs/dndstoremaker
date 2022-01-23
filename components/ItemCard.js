import { getCookie } from "../helpers/cookieHandler";
import _escapeString from "./../helpers/_escapeString";

export default function ItemCard(props) {
  // console.log(props);

  let element_arrays = [];

  // Iterate through data to push onto DOM

  if (props.mode == "view") {
    // ANCHOR -> Add view for search

    for (let i in props.data) {
      let key = i;
      let value = props.data[i];

      if (typeof value == "object") {
        for (let x in value) {
          let sub_key = x;
          let sub_value = value[x];

          element_arrays.push(
            <li>
              {key + "_" + sub_key}:{" "}
              <input
                type={typeof sub_value}
                disabled
                value={String(sub_value)}
              />
            </li>
          );
        }
      } else {
        element_arrays.push(
          <li>
            {key}: <input type={typeof value} disabled value={String(value)} />
          </li>
        );
      }
    }
  } else if (props.mode == "new") {
    // ANCHOR -> Add view for new item

    // Add instruction block
    let instruction = (
      <p>
        Use this template to create a custom item by changing the values below
        and saving the data.
      </p>
    );

    element_arrays.push(instruction);

    // Add Submit button
    async function submitNewItem(e) {
      e.preventDefault();

      // Get user_id from cookies
      let user_id = await getCookie("user_id");
      user_id = user_id.user_id;

      // Create details JSON object
      let inputs = document.getElementsByClassName("details_input");
      console.log(inputs);

      let details = {};
      for (let i in inputs) {
        let key = inputs[i].id;
        let value = inputs[i].value;
        // if (!value == undefined) {
        details[key] = value;
        // }
      }

      let new_item = await fetch("/api/post-custom-item", {
        method: "POST",
        body: JSON.stringify({
          name: details.name,
          url: details.url,
          user_id: user_id,
          details: _escapeString(JSON.stringify(details)),
        }),
      });

      window.location.reload();
    }

    element_arrays.push(
      <input
        className="w3-hover-opacity w3-hover-blue"
        key="submit_new_item"
        type={"submit"}
        value={"New Item"}
        onClick={submitNewItem}
      />
    );

    for (let i in props.data) {
      let key = i;
      let value = props.data[i];

      if (typeof value == "object") {
        for (let x in value) {
          let sub_key = x;
          let sub_value = value[x];

          element_arrays.push(
            <li key={`${sub_value}_${sub_key}`}>
              {key + "_" + sub_key}:{" "}
              <input
                className="details_input"
                id={`${key}_${sub_key}`}
                type={typeof sub_value}
                defaultValue={String(sub_value)}
              />
            </li>
          );
        }
      } else {
        element_arrays.push(
          <li key={`${value}_${key}`}>
            {key}:{" "}
            <input
              className="details_input"
              id={key}
              type={typeof value}
              defaultValue={String(value)}
            />
          </li>
        );
      }
    }
  } else if (props.mode == "add") {
    // ANCHOR -> Add view for new store

    // Add instruction block
    let instruction = (
      <p>
        Add the item to the list on the right. When you are finished, name the
        store and save it, and get the link on the dashboard
      </p>
    );

    element_arrays.push(instruction);

    // Add button for adding item to store template
    element_arrays.push(
      <input
        type={"submit"}
        value={"Add to store"}
        className="w3-hover-opacity w3-hover-blue"
        onClick={(e) => {
          e.preventDefault();
          // console.log(props);
          let setList = props.set_item_list;
          setList(<li id={props.item_id}>{props.data.name}</li>);
        }}
      />
    );

    // Populate details

    for (let i in props.data) {
      let key = i;
      let value = props.data[i];

      if (typeof value == "object") {
        for (let x in value) {
          let sub_key = x;
          let sub_value = value[x];

          element_arrays.push(
            <li>
              {key + "_" + sub_key}:{" "}
              <input
                type={typeof sub_value}
                disabled
                value={String(sub_value)}
              />
            </li>
          );
        }
      } else {
        element_arrays.push(
          <li>
            {key}: <input type={typeof value} disabled value={String(value)} />
          </li>
        );
      }
    }
  }

  return (
    <div className="item-card">
      <h3>Item Name: {props.data.name}</h3>
      <ul />
      <div id="detail_block">{element_arrays}</div>
    </div>
  );
}
