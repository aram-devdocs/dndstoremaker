// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { deleteRowInTableWhere } from "../../middleware/database";
export default function handler(req, res) {
  let body = JSON.parse(req.body);
  deleteRowInTableWhere("store", "store_id", body.store_id);

  res.status(200).json({ name: "Store Deleted" });
}
