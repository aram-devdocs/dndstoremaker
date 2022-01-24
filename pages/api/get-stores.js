import {
  selectAllFromTable,
  selectRowFromTableWithMatch,
} from "../../middleware/database";
import { getCookie, getServerSideCookie } from "./../../helpers/cookieHandler";
export default async function handler(req, res) {
  let categories;
  try {
    let user_id = await getServerSideCookie({ req, res }, "user_id");
    user_id = user_id.user_id;
    // console.log(user_id);
    categories = await selectRowFromTableWithMatch("store", "user_id", user_id);
    // console.log(categories);
  } catch (error) {
    categories = await selectAllFromTable("store");
  }

  res.status(200).json(categories);
}
