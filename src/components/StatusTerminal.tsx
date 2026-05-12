import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const messages = [
  "Escaneando sistema eléctrico...",
  "Calculando carga térmica...",
  "Optimizando parámetros de red...",
  "Verificando protocolos de seguridad..."
];

export default function StatusTerminal() {
  const [text, setText] = useState('');
  const [msgIndex, setMsgIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentMsg = messages[msgIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setText(currentMsg.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setMsgIndex((prev) => (prev + 1) % messages.length);
        }
      }, 30);
    } else {
      timeout = setTimeout(() => {
        setText(currentMsg.substring(0, text.length + 1));
        if (text.length === currentMsg.length) {
          timeout = setTimeout(() => setIsDeleting(true), 2000);
        }
      }, 50);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, msgIndex]);

  return (
    <div className="flex flex-wrap items-center gap-3 font-mono text-sm">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-energy-red animate-pulse" />
        <span className="text-energy-red text-xs font-bold tracking-widest">EN VIVO</span>
      </div>
      <div className="hidden sm:block w-px h-4 bg-white/20" />
      <span className="text-white/80">
        {text}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-2 h-4 bg-energy-red ml-1 align-middle"
        />
      </span>
    </div>
  );
}
