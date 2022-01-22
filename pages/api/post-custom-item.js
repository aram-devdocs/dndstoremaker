import { addRowToTable } from "../../middleware/database";

export default async function handler(req, res) {
  if (req.method == "POST") {
    let body = JSON.parse(req.body);

    let response = await addRowToTable("item", {
      name: body.name,
      category_id: 90,
      url: body.url,
    });
    res.status(200).json({ name: "John Doe" });
  }
}
