import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useProfile } from '../api';
import { Loading } from '../ui';

export function Layout() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}

function Header() {
  return (
    <header>
      <Link to="/">venat</Link>
      <nav>
        <ul>
          <li>
            <Link to="/guilds">guilds</Link>
          </li>
          <li>
            <Profile />
          </li>
        </ul>
      </nav>
    </header>
  );
}

function Profile() {
  return (
    <Suspense fallback={<Loading />}>
      <ProfileInner />
    </Suspense>
  );
}

function ProfileInner() {
  const profile = useProfile();

  return profile == null ? (
    <Link to="/auth">authenticate</Link>
  ) : (
    <>
      <img src={profile.icon} alt="" /> {profile.name}
    </>
  );
}
