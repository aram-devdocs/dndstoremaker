import excuteQuery, {
  selectAllFromTable,
  selectRowFromTableWithMatch,
} from "../../middleware/database";

import { getServerSideCookie } from "../../helpers/cookieHandler";
export default async function handler(req, res) {
  // let categories = await selectAllFromTable("item");

  let user_id = await getServerSideCookie({ req, res }, "user_id");
  user_id = user_id.user_id;
  let items = await excuteQuery({
    query: `SELECT * from item WHERE category_id!='90'`,
    values: [],
  });

  // console.log(items);

  let custom = await excuteQuery({
    query: `SELECT * from item WHERE category_id='90' AND user_id='${user_id}'`,
    values: [],
  });

  console.log(custom);

  let response = items.concat(custom);
  res.status(200).json(response);
}
