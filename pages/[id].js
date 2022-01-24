import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ItemCard from "../components/ItemCard";
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

export default function PublicStore(props) {
  let page = props.pages;
  // console.log(page);
  let items = JSON.parse(page.items_arr);
  // console.log(items);

  let [storeBody, setStoreBody] = useState(<Loader />);
  let [item_description, setItemDesc] = useState([]);

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

      // console.log(item_list);

      // Populate item list

      async function showDetails(e) {
        e.preventDefault();
        let id = e.target.id;

        let description = await fetch("/api/get-item-description", {
          method: "POST",
          body: JSON.stringify({
            item_id: id,
          }),
        }).then((e) => {
          return e.json();
        });

        description = description[0];
        // console.log(description);
        setItemDesc(
          <ItemCard mode="view" data={JSON.parse(description.details)} />
        );
      }

      let store_body = [];
      for (let i in item_list) {
        let item_local = item_list[i];
        let details = JSON.parse(item_local.details);
        store_body.push(
          <tr
            key={i}
            id={item_local.id}
            onClick={showDetails}
            className="w3-hoverable w3-hover-blue w3-animate-bottom	"
          >
            <td id={item_local.id}>{item_local.name}</td>
            <td id={item_local.id}>{item_local.id}</td>
          </tr>
        );
      }

      setStoreBody(store_body);
    })();
  }, []);

  return (
    <div>
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />

      <h1 className="w3-center">{page.name}</h1>

      <table className="w3-table w3-mobile  w3-border  w3-container w3-bordered w3-centered  w3-table-all w3-half">
        <thead>
          <tr>
            <th>Item</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>{storeBody}</tbody>
      </table>
      <div className="w3-half w3-mobile  w3-border  w3-container w3-bordered w3-centered">
        {item_description}
      </div>
    </div>
  );
}
