import { useAtom, useAtomValue } from 'jotai';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { authTokenAtom } from '../state';

export function Auth() {
  const location = useLocation();
  const from = (location.state as { from?: Location } | undefined)?.from;

  const [authToken, setAuthToken] = useAtom(authTokenAtom);
  // TODO: Actual auth flow. Use a callback if the UI becomes non-trivial.
  const authenticate = () => {
    setAuthToken('FAKEAUTHENTICATION');
  };

  return authToken != null ? (
    <Navigate to={from ?? '/'} replace />
  ) : (
    // TODO: move into a seperate UI component if non-trivial
    <>
      <h1>auth</h1>
      <button onClick={authenticate}>press to authenticate</button>
    </>
  );
}

export function RequiresAuth() {
  const authToken = useAtomValue(authTokenAtom);
  const location = useLocation();

  return authToken == null ? (
    <Navigate to="/auth" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}
