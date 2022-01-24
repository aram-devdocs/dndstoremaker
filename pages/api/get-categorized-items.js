import {
  selectAllFromTable,
  selectRowFromTableWithMatch,
} from "../../middleware/database";
import { getServerSideCookie } from "../../helpers/cookieHandler";
import excuteQuery from "../../middleware/database";
export default async function handler(req, res) {
  let body = JSON.parse(req.body);
  let categories;
  if (body.category_id == "90") {
    let user_id = await getServerSideCookie({ req, res }, "user_id");
    user_id = user_id.user_id;
    categories = await excuteQuery({
      query: `SELECT * from item WHERE category_id='90' AND user_id='${user_id}'`,
      values: [],
    });
  } else {
    categories = await selectRowFromTableWithMatch(
      "item",
      "category_id",
      body.category_id
    );
  }

  // console.log(categories);
  res.status(200).json(categories);
}
