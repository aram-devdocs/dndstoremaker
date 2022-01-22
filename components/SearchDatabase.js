import { useEffect, useState } from "react";
export default function SearchDatabase(props) {
  console.log(props);
  let categories = {};
  let items = {};
  useEffect(() => {
    (async () => {
      // Populate categories for Side menu
      for (let i in props.results) {
        let result = props.results[i];
        // console.log(result);
        categories[result.index] = await fetch(
          `https://www.dnd5eapi.co${result.url}`
        ).then((e) => {
          return e.json();
        });
      }

      console.log(categories);

      // Populating Item collections
      for (let i in categories) {
        let category = categories[i];

        items[i] = [];
        for (let x in category.equipment) {
          let item = category.equipment[x];
          items[i].push(
            await fetch(`https://www.dnd5eapi.co${item.url}`).then((e) => {
              return e.json();
            })
          );
        }

        console.log(items);
      }
    })();
  }, []);
  return (
    <div>
      <h1>Search Database</h1>
    </div>
  );
}
