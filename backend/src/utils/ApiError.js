export class ApiError extends Error {
    constructor(
        statusCode,
        message = "Some error here",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.data = null;
        this.success = false;

        if (stack) this.stack = stack;
        else Error.captureStackTrace(this, this.constructor);
    }
}
