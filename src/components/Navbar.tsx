import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin, Mail, ArrowRight, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import logo2 from '../logo2.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Proyectos', path: '/proyectos' },
    { name: 'Sucursales', path: '/sucursales' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md flex items-center justify-between px-6 py-4 text-hyundai-navy"
      >
        <Link to="/" className="flex items-center gap-4 z-50">
          <div className="rounded px-2 flex items-center justify-center">
            <img 
              src={logo2} 
              alt="One World Group Emingser Logo" 
              className="h-25 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<span class="font-display font-bold text-xl tracking-tight">ONE WORLD</span> <span class="font-serif italic text-xl ml-2 text-hyundai-navy">EMINGSER</span>';
              }}
            />
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8 font-medium text-sm">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path || (location.pathname + location.hash) === item.path;
            return (
              <Link 
                key={item.name} 
                to={item.path} 
                className={clsx(
                  "transition-opacity hover:opacity-100",
                  isActive ? "opacity-100 font-bold" : "opacity-70"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
            <Mail className="w-5 h-5" />
          </a>
          <button className={clsx(
            "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all group",
            scrolled ? "bg-hyundai-navy text-white hover:bg-industrial-cyan" : "bg-white text-hyundai-navy hover:bg-industrial-cyan hover:text-white"
          )}>
            Solicitar Propuesta
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <button 
          className="lg:hidden z-50 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-hyundai-navy" />
          ) : (
            <Menu className="w-6 h-6 text-hyundai-navy" />
          )}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-carbon flex flex-col items-center justify-center pt-20 px-6"
          >
            <div className="flex flex-col items-center gap-8 w-full max-w-sm">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.path || (location.pathname + location.hash) === item.path;
                return (
                  <Link 
                    key={item.name} 
                    to={item.path} 
                    className={clsx(
                      "text-2xl font-display font-bold transition-colors",
                      isActive ? "text-industrial-cyan" : "text-white hover:text-industrial-cyan"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
              
              <div className="w-full h-px bg-white/10 my-4" />
              
              <div className="flex items-center gap-6 mb-8">
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </div>

              <button className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full text-base font-medium bg-industrial-cyan text-white hover:bg-industrial-cyan/80 transition-all">
                Solicitar Propuesta
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
