import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-carbon selection:bg-industrial-cyan selection:text-white">
      <div className="noise-overlay" />
      <div className="tech-grid" />
      
      <Navbar />
      
      <main>
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}
