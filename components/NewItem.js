import SearchDatabase from "./SearchDatabase";

export default function NewItem() {
  return (
    <div>
      <h1>Add Item</h1>
      <SearchDatabase mode="new" />
    </div>
  );
}
