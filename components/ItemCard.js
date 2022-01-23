import { getCookie } from "../helpers/cookieHandler";
import _escapeString from "./../helpers/_escapeString";

export default function ItemCard(props) {
  // console.log(props);

  let element_arrays = [];

  // Iterate through data to push onto DOM

  if (props.mode == "view") {
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

      console.log(new_item);
    }
    element_arrays.push(
      <input
        key="submit_new_item"
        type={"submit"}
        value={"New Item"}
        onClick={submitNewItem}
      />
    );
  } else if (props.mode == "add") {
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

    // Add button for adding item to store template
    element_arrays.push(
      <input
        type={"submit"}
        value={"Add to store"}
        onClick={(e) => {
          e.preventDefault();
          // console.log(props);
          let setList = props.set_item_list;
          setList(<li id={props.item_id}>{props.data.name}</li>);
        }}
      />
    );
  }

  return (
    <div className="item-card">
      {/* <table></table> */}
      <ul />
      <div id="detail_block">{element_arrays}</div>
    </div>
  );
}
