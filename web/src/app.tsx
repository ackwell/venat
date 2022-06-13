import { Outlet, Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="guilds" element={<GuildList />} />
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

// TODO: this will need some level of auth
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
