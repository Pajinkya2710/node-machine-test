interface Error {
  statusCode: number;
  message: any;
  isOperational?: boolean;
  stack?: string;
}

class ApiError extends Error {
  statusCode: any;
  isOperational: any;

  constructor(
    statusCode: number,
    message: any,
    isOperational: boolean = true,
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode as any;
    this.isOperational = isOperational as any;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
