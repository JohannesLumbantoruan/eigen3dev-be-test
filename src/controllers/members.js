const prisma = require('../data/prisma-client');

const handleError = require('../utils/handle-error');

exports.getAll = async (req, res, next) => {
  try {
    const members = await prisma.member.findMany({
      select: {
        code: true,
        name: true,
        _count: {
          select: {
            bookLoans: {
              where: {
                returned: false
              }
            }
          }
        }
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

exports.getById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const member = await prisma.member.findFirst({
      where: { code: id },
      select: {
        code: true,
        name: true,
        username: true,
        bookLoans: true
      }
    });

    if (!member) {
      const error = new Error('Member not found!');
      error.code = 404;

      throw error;
    }

    res.status(200).json({
      success: true,
      member
    });
  } catch (error) {
    handleError(error, res);
  }
};