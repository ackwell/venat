import { useCallback } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthenticate, useProfile } from '../api';

export function Auth() {
  const location = useLocation();
  const from = (location.state as { from?: Location } | undefined)?.from;

  const profile = useProfile();
  const authenticate = useAuthenticate();

  const onSubmit = useCallback(() => {
    authenticate.mutate({
      username: 'example',
      password: 'example',
    });
  }, [authenticate]);

  return profile != null ? (
    <Navigate to={from ?? '/'} replace />
  ) : (
    // TODO: move into a seperate UI component if non-trivial
    <>
      <h1>auth</h1>
      <button onClick={onSubmit}>press to authenticate</button>
    </>
  );
}

export function RequiresAuth() {
  const profile = useProfile();
  const location = useLocation();

  return profile == null ? (
    <Navigate to="/auth" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}
