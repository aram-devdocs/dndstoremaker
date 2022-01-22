import { getServerSideCookie } from "../helpers/cookieHandler";
import Landing from "../components/Landing";
import Parent from "../components/Parent";

export async function getServerSideProps({ req, res }) {
  let logged;

  // Check to see if logged in.
  try {
    logged = getServerSideCookie({ req, res }, "log");
  } catch (error) {
    logged = { status: false };
  }
  // console.log(logged);

  // If logged in, fetch proper data as needed.
  if (logged.status) {
    return {
      props: {
        status: true,
        dnd_categories: await fetch(
          "https://www.dnd5eapi.co/api/equipment-categories/"
        ).then((e) => {
          return e.json();
        }),
      },
    };
  } else {
    return { props: { status: false } };
  }
}

// Main Deployment
export default function Home(props) {
  // debugWorker();
  if (!props.status) {
    return <Landing />;
  }

  return (
    <div className="main">
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
      <Parent props={props} />
    </div>
  );
}
