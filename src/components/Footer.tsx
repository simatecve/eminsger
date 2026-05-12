import { Link } from 'react-router-dom';
import { Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import logo1 from '../logo1.jpeg';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img src={logo1} alt="One World Group Emingser Logo" className="h-10 object-contain" />
            </div>
            <p className="text-slate-600 font-sans leading-relaxed max-w-md mb-6">
              Soluciones integrales de ingeniería diseñadas para optimizar, proteger y potenciar la infraestructura crítica de su empresa con los más altos estándares de calidad.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-industrial-cyan hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-industrial-cyan hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-carbon mb-6 uppercase tracking-wider text-sm">Enlaces Rápidos</h4>
            <ul className="space-y-3 font-sans text-slate-600">
              <li><Link to="/" className="hover:text-industrial-cyan transition-colors">Inicio</Link></li>
              <li><Link to="/nosotros" className="hover:text-industrial-cyan transition-colors">Nosotros</Link></li>
              <li><Link to="/servicios" className="hover:text-industrial-cyan transition-colors">Servicios</Link></li>
              <li><Link to="/proyectos" className="hover:text-industrial-cyan transition-colors">Proyectos</Link></li>
              <li><Link to="/sucursales" className="hover:text-industrial-cyan transition-colors">Sucursales</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-carbon mb-6 uppercase tracking-wider text-sm">Contacto</h4>
            <ul className="space-y-4 font-sans text-slate-600">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-industrial-cyan shrink-0 mt-0.5" />
                <span>República Dominicana</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-industrial-cyan shrink-0" />
                <span>+1 (809) 000-0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-industrial-cyan shrink-0" />
                <span>info@groupemingser.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-mono text-slate-500">
          <p>© {new Date().getFullYear()} Group Emingser S.R.L. | One World Engineering. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-industrial-cyan transition-colors">Términos</a>
            <a href="#" className="hover:text-industrial-cyan transition-colors">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
