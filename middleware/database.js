import mysql from "serverless-mysql";
const db = mysql({
  config: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});

/* 
MIDDLEWARE USE INSTRUCTIONS
----------------------------
import executeQuery for raw call, pass an object with a string for Query with the mySQL selector,
and values for dynamic content.
*/

// TODO: ADD SQL QUERY VALIDATION

// DEFAULT
export default async function excuteQuery({ query, values }) {
  // Raw Query
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}

// GET
export async function selectAllFromTable(table) {
  // Pass table name as string
  let message = await excuteQuery({
    query: `SELECT * from ${table}`,
    values: [],
  });

  return message;
}

export async function selectRowFromTableWithMatch(table, key, match) {
  // Pass table name as string
  let message = await excuteQuery({
    query: `SELECT * from ${table} WHERE ${key}='${match}'`,
    values: [],
  });

  return message;
}

export async function addRowToTable(table, data) {
  // Table parm must be string, data must be object

  let keys = [];
  let values = [];

  for (let i in data) {
    keys.push(i);
    values.push(data[i]);
  }

  let message = await excuteQuery({
    query: `INSERT INTO ${table} (${keys}) VALUES ("${values.join('", "')}")`,
    values: [],
  });

  return message;
}

// POST / PUT
export async function updateRowInTable(table, data, id) {
  // Table parm must be string, data must be object, must pass ID
  // If no ID is passed, try to gather ID from data object
  try {
    if (id == undefined) id = data.slug;
  } catch (error) {
    return error;
  }

  let set = [];

  for (let i in data) {
    set.push(`${i} = '${data[i]}'`);
  }
  let message;
  if (table == "content") {
    // Default exception for content to find slug
    message = await excuteQuery({
      query: `UPDATE ${table} SET ${set} WHERE ${table}.slug = '${id}'`,
      values: [],
    });
  } else {
    message = await excuteQuery({
      query: `UPDATE ${table} SET ${set} WHERE ${table}.id = ${id}`,
      values: [],
    });
  }

  return message;
}

// DELETE
export async function deleteRowInTable(table, id) {
  // Pass row ID and table
  let message;
  if (table == "content") {
    message = await excuteQuery({
      query: `DELETE FROM ${table} WHERE slug = '${id}'`,
      values: [],
    });
  } else {
    message = await excuteQuery({
      query: `DELETE FROM ${table} WHERE id = ${id}`,
      values: [],
    });
  }

  return message;
}

export async function deleteRowInTableWhere(table, key, match) {
  // Pass table, key, and match
  let message;
  message = await excuteQuery({
    query: `DELETE FROM ${table} WHERE ${key}='${match}'`,
    values: [],
  });

  return message;
}

// selectAllFromTable("content");
