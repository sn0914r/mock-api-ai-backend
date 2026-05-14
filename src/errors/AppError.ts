class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public errorCode: string,
    public errors: string[] | string | null = null,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.errors = errors;
    
    // INFO:  This ensures 'AppError' is correctly identified in stack traces
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export default AppError;
