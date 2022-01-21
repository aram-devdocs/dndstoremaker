import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
