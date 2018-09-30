export class InvalidArgumentError extends Error {
  constructor (error: string) {
    super(error);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, InvalidArgumentError.prototype);
  }
}
