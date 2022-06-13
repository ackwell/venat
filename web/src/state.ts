import { atomWithStorage } from 'jotai/utils';

// NOTE: This file is for _shared_ state - State that is relevant to the entire
// application. Preference native React useState for component state, and local
// atoms for state shared across just a few components.

const PERSISTENCE_PREFIX = 'venat:';

// NOTE: this should be updated with finalised API types &c.
type AuthToken = string;
export const authTokenAtom = atomWithStorage<AuthToken | undefined>(
  PERSISTENCE_PREFIX + 'authToken',
  undefined,
);
