// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { addRowToTable, selectAllFromTable } from "../../middleware/database";
export default async function handler(req, res) {
  let result = await addRowToTable("test", { name: "test" });

  console.log(result);
  let obj = await selectAllFromTable("test");
  console.log(obj);
  res.status(200).json(obj);
}
