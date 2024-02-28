/**
 * @openapi
 * components:
 *  schemas:
 *    Books:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *          example: true
 *        books:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              code:
 *                type: string
 *                example: book-12345
 *              title:
 *                type: string
 *                example: Twilight
 *              author:
 *                type: string
 *                example: Stephenie Meyer
 *              stock:
 *                type: integer
 *                format: int64
 *                example: 5
 *    CreateBook:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          example: Harry Potter,
 *        author:
 *          type: string
 *          example: J. K. Rowling
 *        stock:
 *          type: integer
 *          format: int64
 *          example: 10
 *    CreateBookSuccess:
 *      allOf:
 *        - type: object
 *          properties:
 *            code:
 *              type: string
 *              example: book-12345
 *        - $ref: '#/components/schemas/CreateBook'
 *    BookDetail:
 *      allOf:
 *        - $ref: '#/components/schemas/CreateBookSuccess'
 *        - type: object
 *          properties:
 *            bookLoans:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  example: bl-12345
 *                memberId:
 *                  type: string
 *                  example: member-12345
 *                bookId:
 *                  type: string
 *                  example: book-12345
 *                dateBorrowed:
 *                  type: string
 *                  example: 2024-02-28T08:25:29.236Z
 *                dateDue:
 *                  type: string
 *                  example: 2024-03-06T08:25:29.236Z
 *                dateReturned:
 *                  type: string
 *                  example: 2024-02-28T08:25:56.136Z
 *                returned:
 *                  type: boolean
 *                  example: true
 * tags:
 *  - name: books
 *    description: All operations for path books
 * /books:
 *  get:
 *    tags:
 *      - books
 *    summary: Get list of the books
 *    description: Get all books and its detail
 *    responses:
 *      200:
 *        description: Get all books
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Books'
 *  post:
 *    tags:
 *      - books
 *    summary: Create a new book
 *    description: Create a new book
 *    requestBody:
 *      description: title, author, and stock to create a new book
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateBook'
 *      required: true
 *    responses:
 *      201:
 *        description: Successfully create a new book
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateBookSuccess'
 * /books/{code}:
 *  get:
 *    tags:
 *      - books
 *    summary: Get book details
 *    description: Get the details of the book
 *    parameters:
 *      - name: code
 *        in: path
 *        description: The code of the book
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successfully get book details
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BookDetail'
 */

const express = require("express");

const authenticate = require("../middlewares/authenticate");
const { getAll, store, getById, borrow, returnBook } = require("../controllers/books");

const router = express.Router();

router.get("/books", getAll);
router.post("/books", authenticate, store);
router.get("/books/:code", getById);
router.post("/books/:code/borrow", authenticate, borrow);
router.put('/books/:loanId/return/', authenticate, returnBook);

module.exports = router;
