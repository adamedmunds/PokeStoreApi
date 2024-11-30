export const ErrorReason = {
  INVALID_POKEMON_ID: 'Invalid Pokemon ID',
  INVALID_POKEMON_NAME: 'Invalid Pokemon Name',
  INVALID_POKEMON_TYPE: 'Invalid Pokemon Type',
  GENERIC_ERROR: 'Generic Error',
  NOT_FOUND: 'Not Found',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  SERVICE_UNAVAILABLE: 'Service Unavailable',
  REQUEST_ERROR: 'Request Error',
} as const;

export type ErrorReason = (typeof ErrorReason)[keyof typeof ErrorReason];
