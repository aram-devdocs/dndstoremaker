// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { generatePassword } from "../../helpers/handleLogin";
import { addRowToTable, selectAllFromTable } from "../../middleware/database";
export default async function handler(req, res) {
  //   let result = await addRowToTable("user", {
  //     username: "demo",
  //     password:
  //       "$argon2i$v=19$m=4096,t=3,p=1$Lz2spnb+CnTjqdlVucIn8Q$kS8VUp9+p+hTIujzGeERCCGgDRUv3TFukypvHotlflw",
  //     email: "aram.devdocs@gmail.com",
  //   });

  //   console.log(result);
  let obj = await selectAllFromTable("user");
  console.log(obj);

  //   let password = await generatePassword("demopassword");
  res.status(200).json(obj);
}
