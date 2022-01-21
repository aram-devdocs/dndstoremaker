export default function clearForm(arr) {
  for (let i in arr) {
    arr[i].value = '';
  }
}
