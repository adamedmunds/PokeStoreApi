import { StatusCodesType } from '../Enums/statusCodes';
import { ErrorReason } from './ErrorReason';

export class RestError extends Error {
  public readonly errors: string[];

  constructor(
    public readonly title: ErrorReason,
    public readonly status: StatusCodesType,
    errors: string[]
  ) {
    super(title);
    this.status = status;
    this.errors = errors;
  }
}
