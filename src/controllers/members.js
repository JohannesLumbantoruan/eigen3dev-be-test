const prisma = require('../data/prisma-client');

const handleError = require('../utils/handle-error');

exports.getAll = async (req, res, next) => {
  try {
    const members = await prisma.member.findMany({
      select: {
        code: true,
        name: true,
        bookLoans: true
      }
    });

    res.status(200).json({
      success: true,
      members
    });
  } catch (error) {
    handleError(error, res);
  }
};