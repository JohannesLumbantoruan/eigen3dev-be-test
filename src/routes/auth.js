/**
 * @openapi
 * components:
 *  schemas:
 *    Login:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          example: johndoe
 *        password:
 *          type: string
 *          example: mypassword
 *    LoginSuccess:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *          example: true
 *        token:
 *          type: string
 *          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoibWVtYmVyLTcwZDY3ODM4LWVhZGMtNDA4Ny04OGU1LWRlYjZmNGUyNTNmMiIsIm5hbWUiOiJKYW5lIERvZSIsInVzZXJuYW1lIjoiamFuZWRvZSIsImlhdCI6MTcwOTA5ODYzNiwiZXhwIjoxNzA5MTA5NDM2fQ.KmZwJtsmfTB6Jl2WaNdmlKkDkr_5oTf9pO6iJxZKf5I
 *    LoginFailed:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *          example: false
 *        message:
 *          type: string
 *          example: Wrong credentials!
 *    LoginNotFound:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *          example: false
 *        message:
 *          type: string
 *          example: Member not found!
 *    Register:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          example: John Doe
 *        username:
 *          type: string
 *          example: johndoe
 *        password:
 *          type: string
 *          example: mypassword
 *    RegisterSuccess:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *          example: true
 *        member:
 *          type: object
 *          properties:
 *            code:
 *              type: string
 *              example: user-12345
 *            name:
 *              type: string
 *              example: John Doe
 *            username:
 *              type: string
 *              example: johndoe
 *    RegisterFailed:
 *      type: object
 *      properties:
 *        success:
 *          type: boolean
 *          example: false
 *        message:
 *          type: string
 *          example: Username already exist!
 * tags:
 *  - name: authentication
 *    description: Register and login for user
 * /login:
 *  post:
 *    tags:
 *      - authentication
 *    summary: Login to get token
 *    description: Login to generate jwt token
 *    requestBody:
 *      description: username and password to login
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Login'
 *      required: true
 *    responses:
 *      201:
 *        description: Successfully get token
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginSuccess'
 *      401:
 *        description: Wrong username or password
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginFailed'
 *      404:
 *        description: Member not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginNotFound'
 * /register:
 *  post:
 *    tags:
 *      - authentication
 *    summary: Register to be a member
 *    description: Register to be a member and able to borrow a book
 *    requestBody:
 *      description: name, username, and password to register
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Register'
 *      required: true
 *    responses:
 *      201:
 *        description: Successfully register
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RegisterSuccess'
 *      400:
 *        description: Failed to register
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RegisterFailed'
 */

const express = require('express');

const { register, login } = require('../controllers/auth');

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

module.exports = router;