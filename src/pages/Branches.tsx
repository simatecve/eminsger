import { motion } from 'motion/react';
import { MapPin, Mail, Phone, User, Globe } from 'lucide-react';
import { useEffect } from 'react';

const branches = [
  {
    country: "República Dominicana",
    flag: "🇩🇴",
    address: "Avenida 27 de Febrero #529 Plaza Don Jose, Local 1D, Santo Domingo 10510",
    contact: "Priscila Villafranco",
    email: "info@emingser.com",
    phone: "+1 (809) 403 3224"
  },
  {
    country: "Panamá",
    flag: "🇵🇦",
    address: "Ave. Aquilino de la Guardia y calle 47E, Edificio Torre Banco General, Piso 20. Urbanización Marbella. Panamá, República de Panamá.",
    contact: "Priscila Villafranco",
    email: "info@emingser.com",
    phone: "+1 (849) 403 3224"
  },
  {
    country: "Nicaragua",
    flag: "🇳🇮",
    address: "Plaza Santa Monica, Iglesia las Sierras 200 mts Norte, 2do Piso. Managua Nicaragua.",
    contact: "Lisseth Rojas",
    email: "info@emingser.com",
    phone: "+1 (505) 581 2178"
  },
  {
    country: "Ecuador",
    flag: "🇪🇨",
    address: "Pasaje OE10-67, S11 Chilibulo 170608, Ciudad de Quito.",
    contact: "Carlos Ugalde",
    email: "c.ugalde@emingser.com",
    phone: "+593 93 988 4494"
  },
  {
    country: "United States Of America",
    flag: "🇺🇸",
    address: "6136 Delmar Blvd. Saint Louis, Missouri 63112, United States.",
    contact: "Bassam Rammaha",
    email: "Info@oneworldusagroup.com",
    website: "www.oneworldusagroup.com",
    phone: "+1 (314) 800 8225"
  }
];

export default function Branches() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Dark Header */}
      <section className="bg-carbon pt-32 pb-20 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-hyundai-navy/50 to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-display font-bold text-5xl md:text-7xl mb-6 text-white tracking-tight">
              Nuestras <span className="font-serif italic text-industrial-cyan">Sucursales</span>
            </h1>
            <p className="font-sans text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Presencia internacional para brindar soporte técnico y soluciones de ingeniería de clase mundial en toda la región.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branches.map((branch, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass-panel p-8 rounded-3xl border border-slate-200 hover:shadow-2xl transition-shadow duration-500 flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
                <span className="text-4xl">{branch.flag}</span>
                <h2 className="font-display font-bold text-2xl text-carbon leading-tight">
                  {branch.country}
                </h2>
              </div>
              
              <div className="space-y-5 flex-grow font-sans text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-industrial-cyan shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{branch.address}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-industrial-cyan shrink-0" />
                  <span className="font-medium text-carbon">{branch.contact}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-industrial-cyan shrink-0" />
                  <a href={`mailto:${branch.email}`} className="hover:text-industrial-cyan transition-colors break-all">
                    {branch.email}
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-industrial-cyan shrink-0" />
                  <a href={`tel:${branch.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-industrial-cyan transition-colors">
                    {branch.phone}
                  </a>
                </div>

                {branch.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-industrial-cyan shrink-0" />
                    <a href={`https://${branch.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-industrial-cyan transition-colors">
                      {branch.website}
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
