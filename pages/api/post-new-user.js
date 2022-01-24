import { addRowToTable, updateRowInTable } from "../../middleware/database";
import { generatePassword } from "../../helpers/handleLogin";
export default async function handler(req, res) {
  // Step One: Add row to [item]
  let response = await addRowToTable("user", {
    username: req.body.username,
    password: await generatePassword(req.body.password),
    email: req.body.email,
  });

  res.status(200).json("User created"); // TODO - Add proper response
}
