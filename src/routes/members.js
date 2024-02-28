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
 *              example: member-12345
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
 *    MemberDetails:
 *      type: object
 *      properties:
 *        code:
 *          type: string
 *          example: member-12345
 *        name:
 *          type: string
 *          example: John Doe
 *        username:
 *          type: string
 *          example: johndoe
 *        bookLoans:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *                example: bl-12345
 *              memberId:
 *                type: string
 *                example: member-12345
 *              bookId:
 *                type: string
 *                example: book-12345
 *              dateBorrowed:
 *                type: string
 *                example: 2024-02-28T08:25:29.236Z
 *              dateDue:
 *                type: string
 *                example: 2024-03-06T08:25:29.236Z
 *              dateReturned:
 *                type: string
 *                example: 2024-02-28T08:25:56.136Z
 *              returned:
 *                type: boolean
 *                example: true
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
 * /members/{id}:
 *  get:
 *    tags:
 *      - members
 *    summary: Get members details
 *    description: Get members and book borrowed details
 *    parameters:
 *      - name: id
 *        in: path
 *        description: The id of the member
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successfully get member details
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MemberDetails'
 */

const express = require('express');

const { getAll, getById } = require('../controllers/members');

const router = express.Router();

router.get('/members', getAll);
router.get('/members/:id', getById)

module.exports = router;