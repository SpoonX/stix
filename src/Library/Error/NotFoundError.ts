export class NotFoundError extends Error {
  constructor(error: string) {
    super(error);

    // Set the prototype explicitly for some reason.
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
