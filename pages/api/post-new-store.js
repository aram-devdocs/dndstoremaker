import { makeid } from "../../helpers/makeid";
import { addRowToTable, updateRowInTable } from "../../middleware/database";

export default async function handler(req, res) {
  let body = JSON.parse(req.body);

  // Step One: Add row to [item]
  let response = await addRowToTable("store", {
    name: body.name,
    user_id: body.user_id,
    slug: makeid(10),
    items_arr: body.item_arr,
  });

  console.log(response);

  if (response.error) {
    // Try again
    response = await addRowToTable("store", {
      name: body.name,
      user_id: body.user_id,
      slug: makeid(10),
      items_arr: body.item_arr,
    });
  }

  res.status(200).json("Item Added"); // TODO - Add proper response
}
