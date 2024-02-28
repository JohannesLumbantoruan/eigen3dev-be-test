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
