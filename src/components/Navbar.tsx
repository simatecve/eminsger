import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import logo2 from '../logo2.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProposalFormOpen, setIsProposalFormOpen] = useState(false);
  const [proposalForm, setProposalForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const location = useLocation();
  const proposalEmail = 'info@groupemingser.com';

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

  const openProposalForm = () => {
    setIsMobileMenuOpen(false);
    setIsProposalFormOpen(true);
  };

  const handleProposalSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent('Solicitud de propuesta');
    const body = encodeURIComponent(
      [
        `Nombre: ${proposalForm.name}`,
        `Telefono: ${proposalForm.phone}`,
        `Correo electronico: ${proposalForm.email}`,
        '',
        'Mensaje:',
        proposalForm.message,
      ].join('\n'),
    );
    window.location.href = `mailto:${proposalEmail}?subject=${subject}&body=${body}`;
    setIsProposalFormOpen(false);
  };

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
          <button
            onClick={openProposalForm}
            className={clsx(
            "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all group",
            scrolled ? "bg-hyundai-navy text-white hover:bg-industrial-cyan" : "bg-white text-hyundai-navy hover:bg-industrial-cyan hover:text-white"
            )}
          >
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

              <button
                onClick={openProposalForm}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full text-base font-medium bg-industrial-cyan text-white hover:bg-industrial-cyan/80 transition-all"
              >
                Solicitar Propuesta
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isProposalFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-carbon/70 px-4 py-8 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              className="w-full max-w-xl rounded-lg bg-white p-6 shadow-2xl md:p-8"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-carbon">Solicitar Propuesta</h2>
                  <p className="mt-2 text-sm text-slate-600">Cuentanos sobre tu proyecto y te contactaremos.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsProposalFormOpen(false)}
                  className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-carbon"
                  aria-label="Cerrar formulario"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleProposalSubmit} className="space-y-4">
                <div>
                  <label htmlFor="proposal-name" className="mb-2 block text-sm font-medium text-carbon">
                    Nombre
                  </label>
                  <input
                    id="proposal-name"
                    type="text"
                    required
                    value={proposalForm.name}
                    onChange={(event) => setProposalForm((current) => ({ ...current, name: event.target.value }))}
                    className="w-full rounded-md border border-slate-300 px-4 py-3 text-carbon outline-none transition-colors focus:border-industrial-cyan"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="proposal-phone" className="mb-2 block text-sm font-medium text-carbon">
                      Telefono
                    </label>
                    <input
                      id="proposal-phone"
                      type="tel"
                      required
                      value={proposalForm.phone}
                      onChange={(event) => setProposalForm((current) => ({ ...current, phone: event.target.value }))}
                      className="w-full rounded-md border border-slate-300 px-4 py-3 text-carbon outline-none transition-colors focus:border-industrial-cyan"
                    />
                  </div>

                  <div>
                    <label htmlFor="proposal-email" className="mb-2 block text-sm font-medium text-carbon">
                      Correo electronico
                    </label>
                    <input
                      id="proposal-email"
                      type="email"
                      required
                      value={proposalForm.email}
                      onChange={(event) => setProposalForm((current) => ({ ...current, email: event.target.value }))}
                      className="w-full rounded-md border border-slate-300 px-4 py-3 text-carbon outline-none transition-colors focus:border-industrial-cyan"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="proposal-message" className="mb-2 block text-sm font-medium text-carbon">
                    Mensaje
                  </label>
                  <textarea
                    id="proposal-message"
                    required
                    rows={5}
                    value={proposalForm.message}
                    onChange={(event) => setProposalForm((current) => ({ ...current, message: event.target.value }))}
                    className="w-full resize-none rounded-md border border-slate-300 px-4 py-3 text-carbon outline-none transition-colors focus:border-industrial-cyan"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-hyundai-navy px-6 py-3 font-medium text-white transition-colors hover:bg-industrial-cyan"
                >
                  Enviar Solicitud
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
