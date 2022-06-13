import { atomWithStorage } from 'jotai/utils';
import { AuthToken } from './api';

// NOTE: This file is for _shared_ state - State that is relevant to the entire
// application. Preference native React useState for component state, and local
// atoms for state shared across just a few components.

const PERSISTENCE_PREFIX = 'venat:';

// NOTE: this should be updated with finalised API types &c.
export const authTokenAtom = atomWithStorage<AuthToken | undefined>(
  PERSISTENCE_PREFIX + 'authToken',
  undefined,
);
