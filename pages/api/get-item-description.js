import {
  selectAllFromTable,
  selectRowFromTableWithMatch,
} from "../../middleware/database";
export default async function handler(req, res) {
  let body = JSON.parse(req.body);
  let categories = await selectRowFromTableWithMatch(
    "item_details",
    "item_id",
    body.item_id
  );

  console.log(categories);
  res.status(200).json(categories);
}
