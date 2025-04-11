import { Outlet } from 'react-router-dom';
import Header from '../Header';

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="main_container">
        {children}
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
