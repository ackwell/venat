import {
  Location,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { useAtom, useAtomValue } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const PERSISTENCE_PREFIX = 'venat:';

// NOTE: this should be updated with finalised API types &c.
type AuthToken = string;
const authTokenAtom = atomWithStorage<AuthToken | undefined>(
  PERSISTENCE_PREFIX + 'authToken',
  undefined,
);

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Auth />} />
        <Route element={<RequiresAuth />}>
          <Route path="guilds" element={<GuildList />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

function Header() {
  return (
    <header>
      header
      <nav>
        <ul>
          <li>link</li>
          <li>link</li>
          <li>link</li>
        </ul>
      </nav>
    </header>
  );
}

// TODO: should authed users be nav'd to guilds instead of landing on home?
function Home() {
  return <>home</>;
}

function Auth() {
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

function RequiresAuth() {
  const authToken = useAtomValue(authTokenAtom);
  const location = useLocation();

  return authToken == null ? (
    <Navigate to="/auth" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

function GuildList() {
  return (
    <ul>
      <li>
        <Guild />
      </li>
      <li>
        <Guild />
      </li>
      <li>
        <Guild />
      </li>
      <li>
        <Guild />
      </li>
    </ul>
  );
}

function Guild() {
  return <>guild</>;
}

function NotFound() {
  return <>page not found</>;
}
