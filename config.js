/** Common config for bookstore. */

let database = "";

if (process.env.NODE_ENV === "test") {
  database = "books_test";
} else {
  database = "books";
}

module.exports = { database };
