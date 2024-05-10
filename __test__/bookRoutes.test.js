const request = require("supertest");
const app = require("../app");
const db = require("../db");
const Book = require("../models/book");

/** POST /auth/register => token  */

describe("book  Routes Test", function () {
  beforeEach(async function () {
    await db.query("DELETE FROM books");
  });

  describe("POST /books/", function () {
    test("can create a book", async function () {
      let response = await request(app).post("/books/").send({
        isbn: "0691161519",
        amazon_url: "http://a.co/eobPtX2",
        author: "Matthew Lane",
        language: "english",
        pages: 200,
        publisher: "Hechete",
        title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
        year: 2017,
      });
      expect(response.body).toEqual({
        book: {
          isbn: "0691161519",
          amazon_url: "http://a.co/eobPtX2",
          author: "Matthew Lane",
          language: "english",
          pages: 200,
          publisher: "Hechete",
          title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
          year: 2017,
        },
      });
    });
  });

  test("Validates Missing language", async function () {
    let response = await request(app).post("/books/").send({
      isbn: "0691161512",
      amazon_url: "http://a.co/eobPtX2",
      author: "Matthew Lane",
      pages: 200,
      publisher: "Hechete",
      title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
      year: 2017,
    });
    expect(response.body).toEqual({
      error: {
        message: ['instance requires property "language"'],
        status: 400,
      },
      message: ['instance requires property "language"'],
    });
  });
});
