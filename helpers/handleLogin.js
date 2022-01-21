let argon2 = require("argon2");

export async function generatePassword(password) {
  // Create Hash
  return await argon2.hash(password);
}

export async function checkPassword(database_input, user_input) {
  if (await argon2.verify(database_input, user_input)) {
    // password match
    return true;
  } else {
    // password did not match
    return false;
  }
}
