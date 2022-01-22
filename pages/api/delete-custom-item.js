// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { deleteRowInTableWhere } from "../../middleware/database";
export default function handler(req, res) {
  let body = JSON.parse(req.body);
  deleteRowInTableWhere("item", "item_id", body.item_id);
  deleteRowInTableWhere("item_details", "item_id", body.item_id);

  res.status(200).json({ name: "Item Deleted" });
}
