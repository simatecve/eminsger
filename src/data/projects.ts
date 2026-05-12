export interface Project {
  id: string;
  title: string;
  year: string;
  location: string;
  mainImage: string;
  description: string;
  client: string;
  duration: string;
  scope: string[];
  gallery: string[];
}

export const projects: Project[] = [
  {
    id: 'planta-solar-norte',
    title: 'Planta Solar Fotovoltaica Norte',
    year: '2023',
    location: 'Santiago, República Dominicana',
    mainImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop',
    description: 'Diseño, suministro e instalación de planta solar fotovoltaica de 5MW para complejo industrial. El proyecto incluyó la integración con la red eléctrica existente y sistemas de almacenamiento de energía para garantizar la continuidad operativa.',
    client: 'Consorcio Industrial Norte',
    duration: '8 meses',
    scope: ['Estudios y diseños', 'Construcción', 'Puesta en marcha', 'Fiscalización y supervisión'],
    gallery: [
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  {
    id: 'mantenimiento-turbinas-este',
    title: 'Overhaul de Turbinas de Gas',
    year: '2022',
    location: 'San Pedro de Macorís, RD',
    mainImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
    description: 'Mantenimiento mayor (overhaul) de dos turbinas de gas de 50MW. El servicio abarcó inspección boroscópica, cambio de álabes, calibración de sistemas de control, pruebas de rendimiento y puesta a punto para maximizar la eficiencia térmica.',
    client: 'Generadora del Este',
    duration: '45 días',
    scope: ['Mantenimiento Predictivo', 'Mantenimiento Correctivo', 'Inspección y diagnostico', 'Reacondicionamiento de piezas'],
    gallery: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  {
    id: 'subestacion-electrica-sur',
    title: 'Construcción Subestación 138kV',
    year: '2024',
    location: 'Barahona, República Dominicana',
    mainImage: 'https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=2070&auto=format&fit=crop',
    description: 'Construcción llave en mano de subestación eléctrica de 138kV/12.5kV. Incluye obra civil, estructura metálica, montaje electromecánico, instalación de transformadores de potencia y pruebas pre-operacionales bajo normativas internacionales.',
    client: 'Empresa Distribuidora Sur',
    duration: '12 meses',
    scope: ['Construcción', 'Estructura metálica', 'Rehabilitación de redes', 'Estudios y diseños'],
    gallery: [
      'https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2069&auto=format&fit=crop'
    ]
  },
  {
    id: 'automatizacion-planta-procesamiento',
    title: 'Automatización Planta de Procesamiento',
    year: '2021',
    location: 'Santo Domingo, RD',
    mainImage: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=2070&auto=format&fit=crop',
    description: 'Actualización integral del sistema de control distribuido (DCS) y automatización de líneas de producción. Implementación de SCADA, tableros de control de motores (CCM) y capacitación al personal operativo.',
    client: 'Industrias Alimenticias Nacionales',
    duration: '6 meses',
    scope: ['Automatizaciones', 'Paneles eléctricos', 'Estudios y diseños', 'Entrenamiento al personal'],
    gallery: [
      'https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580983546130-531b19201264?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop'
    ]
  }
];
