import { GenericApiResponse } from './GenericApiResponse';
import { HeldItemVersion } from './HeldItemVersion';

export type HeldItem = {
  item: GenericApiResponse;
  version_details: Array<HeldItemVersion>;
};
