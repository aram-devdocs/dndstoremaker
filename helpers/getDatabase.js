export default async function getDatabase() {
  let db;

  await fetch(`${process.env.NEXT_PUBLIC_LOCAL_API_PATH}/api/get-local-json`)
    .then((response) => response.json())
    .then((data) => {
      db = data;
    });

  return db;
}
