export class HttpError extends Error {
  status: number;

  constructor(props: { status: number, message: string }) {
    super(props.message);

    this.status = props.status;
  }
}
