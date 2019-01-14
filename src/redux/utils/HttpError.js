export class HttpError extends Error {
  status;

  constructor(props) {
    super(props.message);

    this.status = props.status;
  }
}
