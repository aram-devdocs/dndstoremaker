import { selectAllFromTable } from "../../middleware/database";
export default async function handler(req, res) {
  let categories = await selectAllFromTable("item");
  res.status(200).json(categories);
}
