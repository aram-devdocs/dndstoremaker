const KEY = process.env.TRELLO_API_KEY;
const TOKEN = process.env.TRELLO_API_TOKEN;
const APP_LIST = process.env.TRELLO_APPINPUT_ID;

//  DOCUMENTATION: https://developer.atlassian.com/cloud/trello/rest/api-group-cards/#api-cards-post

export async function createNewTicket(obj) {
  console.log(KEY);
  await fetch(
    `https://api.trello.com/1/cards?name=${obj.title}&idList=${APP_LIST}&key=${KEY}&token=${TOKEN}&desc=${obj.desc}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }
  )
    .then((response) => {
      console.log(`Response: ${response.status} ${response.statusText}`);
      return response.text();
    })
    .then((text) => console.log(text))
    .catch((err) => console.error(err));
}
