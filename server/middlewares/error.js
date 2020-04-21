module.exports = (err, req, res, next) => {
  console.log(err)
  let statusCode = 500;
  let message = 'Internal Server Error';

  switch (err.name) {
    case 'SequelizeValidationError':
      statusCode = 400;
      message = err.errors[0].message;
      break;
    case 'SequelizeUniqueConstraintError':
      statusCode = 400;
      message = err.errors[0].message;
      break;
    case 'BadRequestError':
      statusCode = 400;
      message = err.message;
      break;
    case 'NotFoundError':
      statusCode = 404;
      message = err.message;
      break;
  }

  statusCode === 500 && console.log(err.stack);
  res.status(statusCode).json({ message });
};