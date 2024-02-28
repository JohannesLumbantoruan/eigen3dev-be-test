function handleError(error, res) {
  console.log(error);

  let message = 'Interval Server Error';
  let code = 500;

  if (error.message) {
    message = error.message;
  }

  if (error.code >= 100 && error.code < 600) {
    code = error.code;
  }

  res.status(code).json({
    success: false,
    message
  });
}

module.exports = handleError;