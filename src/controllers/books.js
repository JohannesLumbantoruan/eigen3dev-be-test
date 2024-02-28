const crypto = require('crypto');
const prisma = require("../data/prisma-client");
const handleError = require("../utils/handle-error");

exports.getAll = async (req, res, next) => {
  try {
    const books = await prisma.book.findMany();

    res.status(200).json({
      success: true,
      books
    });
  } catch (error) {
    handleError(error, res);
  }
};

exports.store = async (req, res, next) => {
  const { title, author, stock } = req.body;

  try {
    const code = 'book-' + crypto.randomUUID();

    const book = await prisma.book.create({
      data: {
        code,
        title,
        author,
        stock
      }
    });

    res.status(201).json({
      success: true,
      book
    });
  } catch (error) {
    handleError(error, res);
  }
};

exports.getById = async (req, res, next) => {
  const { code } = req.params;

  try {
    const book = await prisma.book.findFirst({
      where: {
        code
      }
    });

    if (!book) {
      const error = new Error('Book not found!');
      error.code = 404;

      throw error;
    }

    res.status(200).json({
      success: true,
      book
    });
  } catch (error) {
    handleError(error, res);
  }
};

exports.borrow = async (req, res, next) => {
  const { code } = req.params;

  try {
    const book = await prisma.book.findFirst({
      where: {
        code
      }
    });

    if (!book) {
      const error = new Error('Book not found!');
      error.code = 404;

      throw error;
    }

    if (book.stock === 0) {
      const error = new Error('All book already borrowed!');
      error.code = 400;

      throw error;
    }

    const { code: userId } = req.member;

    const penalty = await prisma.penalty.findFirst({
      where: {
        memberId: userId
      }
    });

    if (new Date(penalty?.penaltyEnd).getTime() > Date.now()) {
      const error = new Error('Can\'t borrow, you are still penalized!');
      error.code = 400;

      throw error;
    }

    const bookLoans = await prisma.bookLoans.findMany({
      where: {
        memberId: userId,
        returned: false
      }
    });

    if (bookLoans.length === 2) {
      const error = new Error('You can\'t borrow more than 2 books!');
      error.code = 400;

      throw error;
    }

    const id = 'bl-' + crypto.randomUUID();
    const dateBorrowed = new Date();
    const dateDue = new Date(dateBorrowed.getTime() + (1000 * 60 * 60 * 24 * 7));

    const bookLoan = await prisma.bookLoans.create({
      data: {
        id,
        memberId: userId,
        bookId: code,
        dateBorrowed,
        dateDue
      }
    });

    await prisma.book.update({
      where: {
        code
      },
      data: {
        stock: book.stock - 1
      }
    });

    res.status(201).json({
      success: true,
      bookLoan
    });
  } catch (error) {
    handleError(error, res);
  }
};

exports.returnBook = async (req, res, next) => {
  const { code, loanId } = req.params;

  try {
    const book = await prisma.book.findFirst({
      where: { code }
    });

    if (!book) {
      const error = new Error('Book not found!');
      error.code = 404;

      throw error;
    }

    const bookLoan = await prisma.bookLoans.findFirst({
      where: {
        id: loanId
      }
    });

    if (!bookLoan) {
      const error = new Error('Book loan not found!');
      error.code = 404;

      throw error;
    }

    const { code: userId } = req.member;

    if (new Date(bookLoan.dateDue).getTime() > Date.now()) {
      const id = 'penalty-' + crypto.randomUUID();
      const penaltyStart = new Date();
      const penaltyEnd = new Date(Date.now() + 1000 * 60 * 60 * 24 * 3);
      await prisma.penalty.create({
        data: {
          id,
          memberId: userId,
          penaltyStart,
          penaltyEnd
        }
      });
    }

    await prisma.bookLoans.update({
      where: { id: loanId },
      data: { returned: true }
    });

    await prisma.book.update({
      where: { code },
      data: { stock: book.stock + 1 }
    });

    res.status(200).json({
      success: true,
      message: 'Book successfully returned!'
    });
  } catch (error) {
    handleError(error, res);
  }
};