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
