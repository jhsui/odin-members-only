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

async function findUsername(username) {
  const { rows } = await pool.query(
    "SELECT * FROM members WHERE username = $1",
    [username],
  );

  return rows[0];
}

async function findUserID(id) {
  const { rows } = await pool.query("SELECT * FROM members WHERE id = $1", [
    id,
  ]);

  return rows[0];
}

async function updateMembership(id) {
  const result = await pool.query(
    "UPDATE members SET membership = true WHERE id = $1;",
    [id],
  );

  return result.rowCount === 1;
}

export default { insertNewUser, findUsername, findUserID, updateMembership };
