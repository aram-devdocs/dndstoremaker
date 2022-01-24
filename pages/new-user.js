export default function NewUser() {
  return (
    <form
      className="w3-container w3-blue w3-center"
      action="/api/post-new-user"
      method="POST"
    >
      <input
        className="w3-input w3-white new_user_input "
        type={"text"}
        name="username"
        id="username"
        placeholder="username"
      />
      <input
        className="w3-input w3-white new_user_input "
        type={"email"}
        name="email"
        id="email"
        placeholder="email"
      />
      <input
        className="w3-input w3-white new_user_input "
        type={"password"}
        name="password"
        id="password"
        placeholder="password"
      />

      <input
        className="w3-input w3-white new_user_input "
        type={"submit"}
        value={"Create New User"}
      />
    </form>
  );
}
