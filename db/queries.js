import pool from "./pool.js";

async function insertNewUser(
  firstname,
  lastname,
  username,
  password,
  membership,
) {
  // we need to check if the two passwords are the same
  await pool.query(
    "INSERT INTO members (firstname, lastname, username, password, membership) VALUES ($1, $2, $3, $4, $5);",
    [firstname, lastname, username, password, membership],
  );
}

export default { insertNewUser };
