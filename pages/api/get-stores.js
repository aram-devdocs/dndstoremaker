import { selectAllFromTable } from "../../middleware/database";
export default async function handler(req, res) {
  let categories = await selectAllFromTable("store");
  res.status(200).json(categories);
}
