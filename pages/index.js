import { getServerSideCookie } from "../helpers/cookieHandler";
import Landing from "../components/Landing";
import Parent from "../components/Parent";

export async function getServerSideProps({ req, res }) {
  let logged;

  // console.log(req);
  // Check to see if logged in.
  logged = getServerSideCookie({ req, res }, "log");

  if (logged == null) {
    logged = { status: false };
  }
  // console.log(logged);

  // If logged in, fetch proper data as needed.
  if (logged.status) {
    return {
      props: {
        status: true,
        last_app: getServerSideCookie({ req, res }, "last_app") || null,
      },
    };
  } else {
    return {
      props: {
        status: false,
        last_app: getServerSideCookie({ req, res }, "last_app") || null,
      },
    };
  }
}

// Main Deployment
export default function Home(props) {
  // debugWorker();
  console.log(props);
  if (!props.status) {
    return <Landing />;
  }

  return (
    <div className="main">
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
      <Parent last_app={props.last_app} props={props} />
    </div>
  );
}
