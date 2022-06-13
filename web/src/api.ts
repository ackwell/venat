import { useAtomValue, useSetAtom } from 'jotai';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { authTokenAtom } from './state';

// TODO: Real types for all this.

// TODO: mock a server error concept that can be hooked in with retry logic in query defaults
export enum ErrorType {
  InvalidToken,
}

export class ApiError extends Error {
  type: ErrorType;

  constructor(type: ErrorType, message: string) {
    super(message);
    this.type = type;
  }
}

export type AuthToken = string;

export interface Profile {
  token: AuthToken;
  name: string;
  icon: string;
}

export interface AuthenticateOptions {
  username: string;
  password: string;
}

export function authenticate(options: AuthenticateOptions): Promise<Profile> {
  return delay(FAKE_PROFILE);
}

export function useAuthenticate() {
  const queryClient = useQueryClient();
  const setAuthToken = useSetAtom(authTokenAtom);
  return useMutation(authenticate, {
    onSuccess: (data) => {
      setAuthToken(data.token);
      queryClient.setQueryData(['profile', data.token], data);
    },
  });
}

interface ProfileOptions {
  token: AuthToken;
}

function profile(options: ProfileOptions): Promise<Profile> {
  console.log('api profile', options);
  return options.token === FAKE_PROFILE.token
    ? delay(FAKE_PROFILE)
    : Promise.reject(new ApiError(ErrorType.InvalidToken, 'Invalid token.'));
}

export function useProfile() {
  const token = useAtomValue(authTokenAtom);

  const { data } = useQuery(
    ['profile', token],
    () => profile({ token: token! }),
    { enabled: token != null },
  );

  return data;
}

// TEMP: Fake data
const FAKE_PROFILE: Profile = {
  token: 'EXAMPLETOKEN',
  name: 'Example',
  icon: 'https://picsum.photos/32',
};

// TEMP: Just for simulating network latency with the fake API.
function delay<T>(value: T, time: number = 1000): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), time);
  });
}
