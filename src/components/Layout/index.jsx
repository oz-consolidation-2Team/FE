import { Outlet } from 'react-router-dom';
import Header from '../Header';
import { Footer } from '@/components/Footer';

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="main_container">
        {children}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
