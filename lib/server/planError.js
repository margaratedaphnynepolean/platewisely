// An error whose message is safe to show the user, with the HTTP status to send back.
export class PlanError extends Error {
  constructor(friendlyMessage, status = 500) {
    super(friendlyMessage);
    this.status = status;
  }
}
