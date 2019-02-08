/* tslint:disable:max-classes-per-file */

interface ErrorConstructor {
  new (...args: any[]): Error;
}

/**
 * Workaround for custom errors when compiling typescript targeting 'ES5'.
 * see: https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
 * @param {CustomError} error
 * @param newTarget the value of `new.target`
 * @param {Function} errorType
 */
function fixError(
  error: Error,
  newTarget: ErrorConstructor,
  errorType: ErrorConstructor,
) {
  Object.setPrototypeOf(error, errorType.prototype);

  // when an error constructor is invoked with the `new` operator
  if (newTarget === errorType) {
    error.name = newTarget.name;

    // exclude the constructor call of the error type from the stack trace.
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, errorType);
    } else {
      const stack = new Error(error.message).stack;
      if (stack) {
        error.stack = fixStack(stack, `new ${newTarget.name}`);
      }
    }
  }
}
function fixStack(stack: string, functionName: string) {
  if (!stack) return stack;
  if (!functionName) return stack;

  // exclude lines starts with:  "  at functionName "
  const exclusion: RegExp = new RegExp(`\\s+at\\s${functionName}\\s`);

  const lines = stack.split("\n");
  const resultLines = lines.filter(line => !line.match(exclusion));
  return resultLines.join("\n");
}


/// CUSTOM ERRORS ///


// When no WebLN provider is available
export class MissingProviderError extends Error {
  constructor(message: string) {
    super(message);
    fixError(this, new.target, RejectionError);
  }
}

// When the user rejects a request
export class RejectionError extends Error {
  constructor(message: string) {
    super(message);
    fixError(this, new.target, RejectionError);
  }
}

// When the node can't be connected to (i.e. the app did nothing wrong)
export class ConnectionError extends Error {
  constructor(message: string) {
    super(message);
    fixError(this, new.target, ConnectionError);
  }
}

// The WebLN provider doesn't support this method
export class UnsupportedMethodError extends Error {
  constructor(message: string) {
    super(message);
    fixError(this, new.target, UnsupportedMethodError);
  }
}

// The desired node couldn't be routed to
export class RoutingError extends Error {
  constructor(message: string) {
    super(message);
    fixError(this, new.target, RejectionError);
  }
}

// An argument passed was somehow invalid (e.g. malformed invoice)
export class InvalidDataError extends Error {
  constructor(message: string) {
    super(message);
    fixError(this, new.target, RejectionError);
  }
}

// Something broke in the WebLN provider internally, nothing to do with the app
export class InternalError extends Error {
  constructor(message: string) {
    super(message);
    fixError(this, new.target, RejectionError);
  }
}
