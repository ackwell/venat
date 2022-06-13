import { Outlet } from 'react-router-dom';

export function Layout() {
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
