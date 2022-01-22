import { selectAllFromTable } from "../../middleware/database";
export default async function handler(req, res) {
  let categories = await selectAllFromTable("category");
  res.status(200).json(categories);
}
