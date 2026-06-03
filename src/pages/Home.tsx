import FloatingDashboard from '../components/FloatingDashboard';
import StatusTerminal from '../components/StatusTerminal';
import MagneticButton from '../components/MagneticButton';
import ServiceProtocols from '../components/ServiceProtocols';
import DiagnosticDeck from '../components/DiagnosticDeck';
import FeaturesSection from '../components/FeaturesSection';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useCmsContent } from '../hooks/useCmsContent';

export default function Home() {
  const cms = useCmsContent();
  const hero = cms.block('home.hero')?.content ?? {};
  const heroMedia = cms.items('home.heroMedia').map((item) => item.content).filter((item) => item.url);
  const statusMessages = cms.items('home.statusMessages').map((item) => item.content.text).filter(Boolean);
  const metrics = cms.block('home.metrics')?.content ?? {};
  const featuresIntro = cms.block('home.featuresIntro')?.content ?? {};
  const features = cms.items('home.features').map((item) => item.content);
  const specialtiesIntro = cms.block('home.specialtiesIntro')?.content ?? {};
  const specialties = cms.items('home.specialties').map((item) => item.content);
  const [heroVideoIndex, setHeroVideoIndex] = useState(0);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const activeMedia = heroMedia[heroVideoIndex] ?? heroMedia[0];

  useEffect(() => {
    if (activeMedia?.type !== 'video') return;
    const video = heroVideoRef.current;
    if (!video) return;
    video.load();
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  }, [heroVideoIndex, activeMedia?.type, activeMedia?.url]);

  const handleHeroVideoEnded = () => {
    setHeroVideoIndex((prev) => (prev + 1) % Math.max(heroMedia.length, 1));
  };

  return (
    <>
      <FloatingDashboard content={metrics} />

      {/* Hero Section */}
      <section className="relative h-[100dvh] w-full flex items-end pb-[15vh] px-6 md:px-12 lg:px-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          {activeMedia?.type === 'image' ? (
            <img src={activeMedia.url} alt="" className="w-full h-full object-cover" />
          ) : (
            <video
              ref={heroVideoRef}
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={handleHeroVideoEnded}
              className="w-full h-full object-cover"
            >
              <source src={activeMedia?.url} type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-gradient-to-tr from-hyundai-navy/80 via-carbon/70 to-industrial-cyan/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex justify-between items-end">
          <div className="w-full lg:w-[60%]">
            <div className="mb-8">
              <StatusTerminal messages={statusMessages} />
            </div>
            
            <h1 className="flex flex-col mb-8">
              <span className="font-display font-normal text-4xl md:text-5xl lg:text-6xl text-white/90 tracking-tight">
                {hero.titlePrefix || 'Ingenieria que'}
              </span>
              <span className="font-serif italic font-bold text-6xl md:text-8xl lg:text-[96px] text-white drop-shadow-2xl leading-[0.9] mt-2">
                {hero.titleMain || 'Transforma Industrias'}
              </span>
            </h1>
            
            <p className="font-sans text-lg md:text-xl text-white/80 max-w-[600px] leading-relaxed mb-12">
              {hero.description || 'Representantes exclusivos de Hyundai Marine Solutions. Desarrollo de proyectos de generacion electrica, energia solar e infraestructura industrial con respaldo tecnico certificado.'}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <MagneticButton variant="primary">
                {hero.primaryCta || 'Explorar Soluciones'}
                <ArrowRight className="w-5 h-5" />
              </MagneticButton>
              <Link to="/proyectos">
                <MagneticButton variant="outline">
                  {hero.secondaryCta || 'Ver Proyectos'}
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
      <FeaturesSection intro={featuresIntro} items={features} />

      {/* Service Highlights Cards */}
      <ServiceProtocols intro={specialtiesIntro} items={specialties} />
    </>
  );
}
