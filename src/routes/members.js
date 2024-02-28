const express = require('express');

const { getAll } = require('../controllers/members');

const router = express.Router();

router.get('/members', getAll);

module.exports = router;