export default function ItemCard(props) {
  console.log(props);

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
              <input type={typeof sub_value} defaultValue={String(sub_value)} />
            </li>
          );
        }
      } else {
        element_arrays.push(
          <li key={`${value}_${key}`}>
            {key}: <input type={typeof value} defaultValue={String(value)} />
          </li>
        );
      }
    }

    // Add Submit button
    function submitNewItem(e) {
      e.preventDefault();
      console.log("click");

      //   let data =

      // TODO -
      /*
      user_id
      details
      url
      */
    }
    element_arrays.push(
      <input
        key="submit_new_item"
        type={"submit"}
        value={"New Item"}
        onClick={submitNewItem}
      />
    );
  }

  return (
    <div className="item-card">
      <h3>Item Placeholder</h3>
      {/* <table></table> */}
      <ul />
      {element_arrays}
    </div>
  );
}
