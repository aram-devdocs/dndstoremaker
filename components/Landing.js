import { getCookie, setCookie } from "./../helpers/cookieHandler";
import { useState, useEffect } from "react";
export default function Landing() {
  let [errorMessage, setErrorMessage] = useState([]);

  useEffect(() => {}, [errorMessage]);

  return (
    <div className="w3-container w3-center ">
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />

      <form>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" required />
        <br />
        <label htmlFor="password">password</label>
        <input id="password" name="password" type="password" required />
        <br />
        <input
          type="submit"
          value="login"
          onClick={async (e) => {
            e.preventDefault();
            console.log(e.target.form);
            let username = document.getElementById("username").value;
            let res = await fetch("/api/login", {
              method: "POST",
              body: JSON.stringify({
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
              }),
            });

            res = await res.json();
            console.log(res);
            if (res.status == 200) {
              setCookie("log", { status: true }); // TODO - set JWT
              setCookie("user_id", { user_id: res.user_id });
              window.location.reload();
            } else {
              setErrorMessage(<div>{res.message}</div>);
            }
          }}
        />
      </form>
      {errorMessage}
    </div>
  );
}
