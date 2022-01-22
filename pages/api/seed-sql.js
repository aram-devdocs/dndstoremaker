// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { generatePassword } from "../../helpers/handleLogin";
import _escapeString from "../../helpers/_escapeString";
import { addRowToTable, selectAllFromTable } from "../../middleware/database";
export default async function handler(req, res) {
  //   let result = await addRowToTable("user", {
  // //     username: "demo",
  // //     password:
  // //       "$argon2i$v=19$m=4096,t=3,p=1$Lz2spnb+CnTjqdlVucIn8Q$kS8VUp9+p+hTIujzGeERCCGgDRUv3TFukypvHotlflw",
  // //     email: "aram.devdocs@gmail.com",
  // //   });

  // //   console.log(result);
  let obj = await selectAllFromTable("category");
  // console.log(obj);

  console.log("new");
  // let categories = {};
  // let items = {};
  // (async () => {
  //   let dnd_categories = await fetch(
  //     "https://www.dnd5eapi.co/api/equipment-categories/"
  //   ).then((e) => {
  //     return e.json();
  //   });

  //   // console.log(dnd_categories.results);
  //   // Populate categories for Side menu
  //   for (let i in dnd_categories.results) {
  //     let result = dnd_categories.results[i];
  //     // console.log(result);
  //     categories[result.index] = await fetch(
  //       `https://www.dnd5eapi.co${result.url}`
  //     ).then((e) => {
  //       return e.json();
  //     });
  //   }

  //   // console.log(categories);

  //   // return;

  //   let ind = 0;
  //   let items_num = 0;
  //   // Populating Item collections
  //   for (let i in categories) {
  //     let category = categories[i];

  //     ind++;
  //     // let debug = await addRowToTable("category", { name: i });
  //     // console.log(debug);

  //     // items[i] = [];
  //     for (let x in category.equipment) {
  //       let item = category.equipment[x];
  //       items++;

  //       let data = await fetch(`https://www.dnd5eapi.co${item.url}`).then(
  //         (e) => {
  //           return e.json();
  //         }
  //       );
  //       // items[i].push(data);
  //       // let debug = await addRowToTable("item", {
  //       //   name: data.name,
  //       //   category_id: ind,
  //       //   url: data.url,
  //       // });
  //       // console.log(debug);
  //     }
  //   }
  //   console.log(items_num);
  // })();

  let items = await selectAllFromTable("item_details");
  // for (let i in items) {
  //   let item = items[i];

  //   // let debug = await addRowToTable("item_details", {
  //   //   item_id: item.item_id,
  //   //   details: _escapeString(
  //   //     JSON.stringify(
  //   //       await fetch(`https://www.dnd5eapi.co${item.url}`).then((e) => {
  //   //         return e.json();
  //   //       })
  //   //     )
  //   //   ),
  //   // });

  //   // console.log(debug);
  // }
  res.status(200).json(items[0].details);

  //   let password = await generatePassword("demopassword");
}
