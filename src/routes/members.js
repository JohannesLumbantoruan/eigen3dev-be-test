/**
 * @openapi
 * components:
 *  schemas:
 *    Members:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *          example: true
 *        members:
 *          type: object
 *          properties:
 *            code:
 *              type: string
 *              example: user-12345
 *            name:
 *              type: string
 *              example: John Doe
 *            _count:
 *              type: object
 *              properties:
 *                bookLoans:
 *                  type: integer
 *                  format: int64
 *                  example: 2
 * tags:
 *  - name: members
 *    description: Get the liss and details of members
 * /members:
 *  get:
 *    tags:
 *      - members
 *    summary: Get list of members
 *    description: Get all members and total book borrowed
 *    responses:
 *      200:
 *        description: Get the list of members and total book being borrowed
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Members'
 */

const express = require('express');

const { getAll, getById } = require('../controllers/members');

const router = express.Router();

router.get('/members', getAll);
router.get('/members/:id', getById)

module.exports = router;