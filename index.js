require('dotenv').config();

const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const authRouter = require('./src/routes/auth');
const membersRouter = require('./src/routes/members');
const booksRouter = require('./src/routes/books');

const app = express();

app.use(express.json());

app.use(authRouter);
app.use(membersRouter);
app.use(booksRouter);

app.use((err, req, res, next) => {
  console.log(err);

  let message = 'Interval Server Error';
  let code = 500;

  if (err.message) {
    message = err.message;
  }

  if (err.code >= 100 && err.code < 600) {
    code = err.code;
  }

  res.status(code).json({
    success: false,
    message
  });
});

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library App for Eigen Technical Test',
      version: '1.0.0'
    }
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(process.env.PORT, () => {
  console.log(`App running on http://localhost:${process.env.PORT}`);
});