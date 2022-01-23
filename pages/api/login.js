// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  deleteServerSideCookie,
  setServerSideCookie,
} from "../../helpers/cookieHandler";
import { checkPassword } from "../../helpers/handleLogin";
import { selectRowFromTableWithMatch } from "../../middleware/database";
export default async function handler(req, res) {
  let response = { status: 404, message: "" };
  let body = JSON.parse(req.body);
  let match = await selectRowFromTableWithMatch(
    "user",
    "username",
    body.username
  );

  if (match.length == "0") {
    response.message = "No User Found";
    res.status(200).json(response);
    return;
  }

  let user = match[0];

  deleteServerSideCookie({ req, res }, "last_app");

  if (await checkPassword(user.password, body.password)) {
    response.status = 200;
    response.message = "Password match";
    response.user_id = user.id;
  } else {
    response.status = 402;
    response.message = "Password incorrect";
  }

  res.status(200).json(response);
}
