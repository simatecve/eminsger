import { useRef, useState } from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { clsx } from 'clsx';

interface MagneticButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
}

export default function MagneticButton({ children, variant = 'primary', className, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={clsx(
        'relative overflow-hidden rounded-full px-8 py-4 font-medium transition-shadow group',
        variant === 'primary' 
          ? 'bg-industrial-cyan text-white shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]' 
          : 'border border-white/30 bg-transparent text-white hover:border-white',
        className
      )}
      {...props}
    >
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-hyundai-navy translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
