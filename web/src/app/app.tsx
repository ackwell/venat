import { Route, Routes } from 'react-router-dom';
import { Auth, RequiresAuth } from './auth';
import { Guilds } from './guilds';
import { Home } from './home';
import { Layout } from './layout';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Auth />} />
        <Route element={<RequiresAuth />}>
          <Route path="guilds" element={<Guilds />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function NotFound() {
  return <>page not found</>;
}
