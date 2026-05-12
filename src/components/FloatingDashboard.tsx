import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Activity, ShieldCheck } from 'lucide-react';

export default function FloatingDashboard() {
  const [time, setTime] = useState('');
  const [temp, setTemp] = useState(24.5);
  
  // Counters
  const [projects, setProjects] = useState(0);
  const [mw, setMw] = useState(0);
  const [clients, setClients] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setTime(d.toLocaleTimeString('en-US', { hour12: false }) + '.' + d.getMilliseconds().toString().padStart(3, '0').slice(0, 2));
      setTemp(prev => prev + (Math.random() * 0.2 - 0.1));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simple counter animation
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setProjects(Math.floor((47 / steps) * currentStep));
      setMw(Math.floor((1240 / steps) * currentStep));
      setClients(Math.floor((120 / steps) * currentStep));

      if (currentStep >= steps) {
        clearInterval(interval);
        setProjects(47);
        setMw(1240);
        setClients(120);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Top Right - Plant Indicator */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="fixed top-24 right-6 z-30 glass-panel-dark rounded-full px-4 py-2 hidden md:flex items-center gap-4 text-xs font-mono"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
          <span className="text-white/80">ONLINE</span>
        </div>
        <div className="w-px h-4 bg-white/20" />
        <span className="text-industrial-cyan">{temp.toFixed(1)}°C</span>
        <div className="w-px h-4 bg-white/20" />
        <span className="text-white/60">{time}</span>
      </motion.div>

      {/* Bottom Left - Telemetry Hub */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="fixed bottom-6 left-6 z-30 glass-panel-dark rounded-2xl p-5 w-72 hidden md:block"
      >
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-4 h-4 text-industrial-cyan" />
          <h3 className="font-mono text-[10px] tracking-wider text-industrial-cyan">MÉTRICAS EN VIVO</h3>
        </div>
        
        <div className="space-y-3 font-mono text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-white/60">Proyectos Activos</span>
            <span className="text-white">{projects}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">MW Instalados</span>
            <span className="text-white">{mw}+</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Clientes</span>
            <span className="text-white">{clients}+</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-mono text-white/60">
            <span>Eficiencia del sistema</span>
            <span className="text-industrial-cyan">98.7%</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '98.7%' }}
              transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
              className="h-full bg-industrial-cyan" 
            />
          </div>
        </div>
      </motion.div>

      {/* Bottom Right - Certified Ecosystem */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="fixed bottom-6 right-6 z-30 glass-panel-dark rounded-full p-2 pr-4 hidden md:flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
          <span className="text-hyundai-navy font-bold text-xs">HMS</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-white">Hyundai Marine Solutions</span>
          <span className="text-[10px] text-white/60">Partner Oficial Rep. Dom.</span>
        </div>
        <div className="ml-2 pl-3 border-l border-white/10 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-industrial-cyan" />
          <span className="text-[10px] font-mono text-industrial-cyan">ISO 9001</span>
        </div>
      </motion.div>
    </>
  );
}
