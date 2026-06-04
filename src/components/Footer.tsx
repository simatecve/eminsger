import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import logo2 from '../logo2.png';
import { useCmsContent } from '../hooks/useCmsContent';

export default function Footer() {
  const cms = useCmsContent();
  const footer = cms.block('footer.main')?.content ?? {};

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img src={logo2} alt="One World Group Emingser Logo" className="h-10 object-contain" />
            </div>
            <p className="text-slate-600 font-sans leading-relaxed max-w-md mb-6">
              {footer.description || 'Soluciones integrales de ingenieria disenadas para optimizar, proteger y potenciar la infraestructura critica de su empresa con los mas altos estandares de calidad.'}
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-carbon mb-6 uppercase tracking-wider text-sm">Enlaces Rapidos</h4>
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
                <span>{footer.contactCountry || 'Republica Dominicana'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-industrial-cyan shrink-0" />
                <span>{footer.phone || '+1 (809) 000-0000'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-industrial-cyan shrink-0" />
                <span>{footer.email || 'info@groupemingser.com'}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 text-center text-sm font-mono text-slate-500 md:text-left">
          <p>(c) {new Date().getFullYear()} {footer.copyright || 'Group Emingser S.R.L. | One World Engineering. Todos los derechos reservados.'}</p>
        </div>
      </div>
    </footer>
  );
}

