export default function ItemCard(props) {
  console.log(props);

  let element_arrays = [];

  // Iterate through data to push onto DOM

  //   if (props.mode == "view") // TODO - Add Edit Mode with inputs
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
            <input type={typeof sub_value} disabled value={String(sub_value)} />
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
  return (
    <div className="item-card">
      <h3>Item Placeholder</h3>
      {/* <table></table> */}
      <ul />
      {element_arrays}
    </div>
  );
}
