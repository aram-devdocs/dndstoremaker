import {
  selectAllFromTable,
  selectRowFromTableWithMatch,
} from "../../middleware/database";
export default async function handler(req, res) {
  let body = JSON.parse(req.body);

  let items = JSON.parse(body.items_arr);

  console.log(items);
  let item_data = [];
  for (let i in items) {
    let id = items[i];
    let item = await selectRowFromTableWithMatch("item", "item_id", id);
    item = item[0];
    let item_desc = await selectRowFromTableWithMatch(
      "item_details",
      "item_id",
      id
    );
    item_desc = item_desc[0];
    // item_desc = JSON.parse(item_desc.details);

    item_data.push({
      name: item.name,
      id: id,
      details: item_desc.details,
    });
  }
  res.status(200).json(item_data);
}
