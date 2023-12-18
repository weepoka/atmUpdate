// Custom Error Classes

class NotFoundError extends Error {
  constructor(message) {
    super(message);

    this.name = "NotFoundError";
    this.status = 404;
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.status = 400;
  }
}
class InvalidEntry extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidEntry";
    this.status = 403;
  }
}

module.exports = {
  NotFoundError,
  BadRequestError,
  InvalidEntry,
};
