import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export const getServerSideProps = async (context) => {
  // console.log(context.query.id);
  let db = await fetch(
    `${process.env.NEXT_PUBLIC_LOCAL_API_PATH}/api/get-stores`
  )
    .then((response) => response.json())
    .then((json) => {
      return json;
    });

  let pages = {};
  for (let i in db) {
    let store = db[i];
    pages[store.slug] = store;
  }
  if (pages[context.query.id] == undefined) {
    // Check to see if the page is in the database as a registered route
    return {
      notFound: true,
    };
  }

  return {
    props: { pages: pages[context.query.id] },
  };
};

export default function DynamicPage(props) {
  let page = props.pages;
  console.log(page);
  let items = JSON.parse(page.items_arr);
  console.log(items);

  let [storeBody, setStoreBody] = useState([]);
  useEffect(() => {
    (async () => {
      let item_list = await fetch("/api/post-retrieve-store-data", {
        method: "POST",
        body: JSON.stringify({
          items_arr: page.items_arr,
        }),
      }).then((e) => {
        return e.json();
      });

      console.log(item_list);

      let store_body = [];
      for (let i in item_list) {
        let item_local = item_list[i];
        let details = JSON.parse(item_local.details);
        store_body.push(
          <tr>
            <td>{item_local.name}</td>
            <td>{item_local.id}</td>
          </tr>
        );
      }

      setStoreBody(store_body);
    })();
  }, []);

  return (
    <div>
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />

      <h1>{page.name}</h1>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>{storeBody}</tbody>
      </table>
    </div>
  );
}
