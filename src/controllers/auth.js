const bcrypt = require('bcryptjs');
const prisma = require('../data/prisma-client');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const handleError = require('../utils/handle-error');

exports.register = async (req, res, next) => {
  const { name, username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);
  const code = 'member-' + crypto.randomUUID();

  try {
    const isExist = await prisma.member.findFirst({
      where: {
        username
      }
    });

    if (isExist) {
      const error = new Error('Username already exist!');
      error.code = 400;

      throw error;
    }

    const member = await prisma.member.create({
      data: {
        code,
        name,
        username,
        password: hashedPassword
      },
      select: {
        code: true,
        name: true,
        username: true
      }
    });

    res.status(201).json({
      success: true,
      member
    });
  } catch (error) {
    handleError(error, res);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const member = await prisma.member.findFirst({
      where: {
        username
      }
    });

    if (!member) {
      const error = new Error('Member not found!');
      error.code = 404;

      throw error;
    }

    const isValid = await bcrypt.compare(password, member.password);

    if (!isValid) {
      const error = new Error('Wrong credentials!');
      error.code = 401;

      throw error;
    }

    const token = jwt.sign({
      code: member.code,
      name: member.name,
      username: member.username,
    }, process.env.JWT_SECRET, { expiresIn: '3h' });

    res.status(201).json({
      success: true,
      token
    });
  } catch (error) {
    handleError(error, res);
  }
};