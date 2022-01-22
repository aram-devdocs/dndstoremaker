import { addRowToTable, updateRowInTable } from "../../middleware/database";

export default async function handler(req, res) {
  let body = JSON.parse(req.body);

  // Step One: Add row to [item]
  let response = await addRowToTable("item", {
    name: body.name,
    category_id: 90,
    url: body.url,
    user_id: body.user_id || null, // TODO - Add hook for 'global' items added by admin
  });

  console.log(response);

  // Step Two: Add row to [item_details] using response packet from step one
  let item_id = response.insertId;

  let response2 = await addRowToTable("item_details", {
    item_id: item_id,
    details: body.details,
  });

  console.log(response2);

  res.status(200).json("Item Added"); // TODO - Add proper response
}
