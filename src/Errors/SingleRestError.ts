import { StatusCodesType } from '../Enums/statusCodes';
import { ErrorReason } from './ErrorReason';
import { RestError } from './RestError';

export class SingleRestError extends RestError {
  constructor(
    public readonly title: ErrorReason,
    public readonly status: StatusCodesType,
    public readonly error: string
  ) {
    super(title, status, [error]);
  }
}
