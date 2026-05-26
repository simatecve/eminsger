import FloatingDashboard from '../components/FloatingDashboard';
import StatusTerminal from '../components/StatusTerminal';
import MagneticButton from '../components/MagneticButton';
import ServiceProtocols from '../components/ServiceProtocols';
import DiagnosticDeck from '../components/DiagnosticDeck';
import FeaturesSection from '../components/FeaturesSection';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const heroVideos = [
    'https://res.cloudinary.com/dah8wmc2g/video/upload/v1779827344/Hyundai_generator_assembling_in___202605261528_r2ekan.mp4',
    'https://res.cloudinary.com/dah8wmc2g/video/upload/v1779828611/9294c057-58f2-4914-9a90-c8cfc950cc62_1_kowryd.mp4',
  ];

  const [heroVideoIndex, setHeroVideoIndex] = useState(0);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    video.load();
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  }, [heroVideoIndex]);

  const handleHeroVideoEnded = () => {
    setHeroVideoIndex((prev) => (prev + 1) % heroVideos.length);
  };

  return (
    <>
      <FloatingDashboard />

      {/* Hero Section */}
      <section className="relative h-[100dvh] w-full flex items-end pb-[15vh] px-6 md:px-12 lg:px-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <video 
            ref={heroVideoRef}
            autoPlay 
            muted 
            playsInline
            preload="auto"
            onEnded={handleHeroVideoEnded}
            className="w-full h-full object-cover"
          >
            <source src={heroVideos[heroVideoIndex]} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-tr from-hyundai-navy/80 via-carbon/70 to-industrial-cyan/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex justify-between items-end">
          <div className="w-full lg:w-[60%]">
            <div className="mb-8">
              <StatusTerminal />
            </div>
            
            <h1 className="flex flex-col mb-8">
              <span className="font-display font-normal text-4xl md:text-5xl lg:text-6xl text-white/90 tracking-tight">
                Ingeniería que
              </span>
              <span className="font-serif italic font-bold text-6xl md:text-8xl lg:text-[96px] text-white drop-shadow-2xl leading-[0.9] mt-2">
                Transforma Industrias
              </span>
            </h1>
            
            <p className="font-sans text-lg md:text-xl text-white/80 max-w-[600px] leading-relaxed mb-12">
              Representantes exclusivos de Hyundai Marine Solutions. Desarrollo de proyectos de generación eléctrica, energía solar e infraestructura industrial con respaldo técnico certificado.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <MagneticButton variant="primary">
                Explorar Soluciones
                <ArrowRight className="w-5 h-5" />
              </MagneticButton>
              <Link to="/proyectos">
                <MagneticButton variant="outline">
                  Ver Proyectos
                </MagneticButton>
              </Link>
            </div>
          </div>

          <div className="hidden lg:block w-[35%] pb-12">
             <DiagnosticDeck />
          </div>
        </div>
      </section>

      {/* Features Section (Nos caracterizamos por...) */}
      <FeaturesSection />

      {/* Service Highlights Cards */}
      <ServiceProtocols />
    </>
  );
}
