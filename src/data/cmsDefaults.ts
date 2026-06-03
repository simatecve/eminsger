export type CmsBlock = {
  id?: string;
  section: string;
  item_key: string;
  label: string;
  content: Record<string, any>;
  is_hidden: boolean;
  sort_order: number;
};

export const cmsDefaults: CmsBlock[] = [
  {
    section: 'home.hero',
    item_key: 'main',
    label: 'Hero principal',
    sort_order: 0,
    is_hidden: false,
    content: {
      titlePrefix: 'Ingenieria que',
      titleMain: 'Transforma Industrias',
      description:
        'Representantes exclusivos de Hyundai Marine Solutions. Desarrollo de proyectos de generacion electrica, energia solar e infraestructura industrial con respaldo tecnico certificado.',
      primaryCta: 'Explorar Soluciones',
      secondaryCta: 'Ver Proyectos',
    },
  },
  {
    section: 'home.heroMedia',
    item_key: 'video-1',
    label: 'Video hero 1',
    sort_order: 0,
    is_hidden: false,
    content: {
      type: 'video',
      url: 'https://res.cloudinary.com/dah8wmc2g/video/upload/v1779827344/Hyundai_generator_assembling_in___202605261528_r2ekan.mp4',
    },
  },
  {
    section: 'home.heroMedia',
    item_key: 'video-2',
    label: 'Video hero 2',
    sort_order: 1,
    is_hidden: false,
    content: {
      type: 'video',
      url: 'https://res.cloudinary.com/dah8wmc2g/video/upload/v1779828611/9294c057-58f2-4914-9a90-c8cfc950cc62_1_kowryd.mp4',
    },
  },
  {
    section: 'home.statusMessages',
    item_key: 'message-1',
    label: 'Mensaje terminal 1',
    sort_order: 0,
    is_hidden: false,
    content: { text: 'Escaneando sistema electrico...' },
  },
  {
    section: 'home.statusMessages',
    item_key: 'message-2',
    label: 'Mensaje terminal 2',
    sort_order: 1,
    is_hidden: false,
    content: { text: 'Calculando carga termica...' },
  },
  {
    section: 'home.statusMessages',
    item_key: 'message-3',
    label: 'Mensaje terminal 3',
    sort_order: 2,
    is_hidden: false,
    content: { text: 'Optimizando parametros de red...' },
  },
  {
    section: 'home.statusMessages',
    item_key: 'message-4',
    label: 'Mensaje terminal 4',
    sort_order: 3,
    is_hidden: false,
    content: { text: 'Verificando protocolos de seguridad...' },
  },
  {
    section: 'home.metrics',
    item_key: 'main',
    label: 'Metricas flotantes',
    sort_order: 0,
    is_hidden: false,
    content: {
      status: 'ONLINE',
      projectsLabel: 'Proyectos Activos',
      projectsValue: '47',
      mwLabel: 'MW Instalados',
      mwValue: '1240',
      clientsLabel: 'Clientes',
      clientsValue: '120',
      efficiencyLabel: 'Eficiencia del sistema',
      efficiencyValue: '98.7%',
      partnerTitle: 'Hyundai Marine Solutions',
      partnerSubtitle: 'Partner Oficial Rep. Dom.',
      certification: 'ISO 9001',
    },
  },
  {
    section: 'home.featuresIntro',
    item_key: 'main',
    label: 'Titulo caracteristicas',
    sort_order: 0,
    is_hidden: false,
    content: {
      title: 'En Group Emingser nos caracterizamos por ofrecer a nuestros clientes',
      bannerTitle: 'Group Emingser Internacional',
      bannerDescription:
        'En Group Emingser ofrecemos servicios a nivel internacional, nos encontramos ubicado America del Norte, El Caribe y America del Sur.',
      bannerCta: 'Sucursales',
    },
  },
  {
    section: 'home.features',
    item_key: 'calidad',
    label: 'Calidad',
    sort_order: 0,
    is_hidden: false,
    content: {
      title: 'Calidad',
      description: 'Aseguramos la calidad de nuestros servicios, respaldados por un personal altamente capacitado.',
    },
  },
  {
    section: 'home.features',
    item_key: 'rapidez',
    label: 'Rapidez en Entrega',
    sort_order: 1,
    is_hidden: false,
    content: {
      title: 'Rapidez en Entrega',
      description: 'Cumplimos con el tiempo de entrega prometido y damos seguimiento continuo a la orden solicitada.',
    },
  },
  {
    section: 'home.features',
    item_key: 'precio',
    label: 'Precio Competitivo',
    sort_order: 2,
    is_hidden: false,
    content: {
      title: 'Precio Competitivo',
      description: 'Nuestros procesos de produccion efectivos nos permiten ofrecer precios competitivos.',
    },
  },
  {
    section: 'home.features',
    item_key: 'garantia',
    label: 'Garantia',
    sort_order: 3,
    is_hidden: false,
    content: {
      title: 'Garantia',
      description:
        'Garantizamos la inversion de nuestros clientes con trabajos y diseno e ingenieria calificada, con el servicio excepcional de nuestro equipo Group Emingser.',
    },
  },
  {
    section: 'home.specialtiesIntro',
    item_key: 'main',
    label: 'Titulo especialidades',
    sort_order: 0,
    is_hidden: false,
    content: {
      title: 'Nuestras Especialidades',
      description:
        'Soluciones de ingenieria de alto nivel para la industria moderna, garantizando eficiencia y continuidad operativa.',
    },
  },
  {
    section: 'home.specialties',
    item_key: 'mantenimiento-predictivo',
    label: 'Mantenimiento Predictivo',
    sort_order: 0,
    is_hidden: false,
    content: {
      title: 'Mantenimiento Predictivo',
      content: 'Reduccion del 40% en tiempo de parada no planificada',
      bgImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
      link: '/servicios#mantenimiento',
    },
  },
  {
    section: 'home.specialties',
    item_key: 'instalacion-energetica',
    label: 'Instalacion Energetica',
    sort_order: 1,
    is_hidden: false,
    content: {
      title: 'Instalacion Energetica',
      content: 'Energia solar + Generacion termica integrada',
      bgImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop',
      link: '/servicios#industriales',
    },
  },
  {
    section: 'home.specialties',
    item_key: 'infraestructura-industrial',
    label: 'Infraestructura Industrial',
    sort_order: 2,
    is_hidden: false,
    content: {
      title: 'Infraestructura Industrial',
      content: 'Montaje y puesta en marcha llave en mano',
      bgImage: 'https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=2070&auto=format&fit=crop',
      link: '/servicios#proyectos',
    },
  },
  {
    section: 'about.header',
    item_key: 'main',
    label: 'Encabezado Nosotros',
    sort_order: 0,
    is_hidden: false,
    content: {
      title: 'Sobre Nosotros',
      paragraphs: [
        'En Group Emingser protegemos la inversion de nuestros clientes, ejecutando trabajos de ingenieria y servicio de alta calidad en cada proyecto a realizar. Deseamos formar parte integral del exito de nuestros clientes; por esta razon, brindamos soluciones practicas que nos permitan cumplir con las metas establecidas en cada una de nuestras gestiones.',
        'Ademas, ofrecemos servicios complementarios que agregan valor a nuestra propuesta, que se traducen en facilidades y ahorro en los costos de mantenimientos de nuestros clientes. El concepto de espiritu de excelencia es parte esencial de nuestro equipo Group Emingser.',
      ],
    },
  },
  {
    section: 'about.cards',
    item_key: 'mission',
    label: 'Mision',
    sort_order: 0,
    is_hidden: false,
    content: {
      title: 'Mision',
      description:
        'Reconocer a cada uno de nuestros clientes; la razon de ser de nuestra empresa, logrando de manera permanente la excelencia en la calidad de nuestros productos y servicios con la satisfaccion de quienes lo utilizan, respaldado por un personal capacitado y una infraestructura estable y confiable.',
    },
  },
  {
    section: 'about.cards',
    item_key: 'vision',
    label: 'Vision',
    sort_order: 1,
    is_hidden: false,
    content: {
      title: 'Vision',
      description:
        'Ser una empresa lider en la prestacion de ingenieria y servicios. Ademas de ser preferidos por nuestros clientes a nivel nacional e internacional.',
    },
  },
  {
    section: 'about.valuesIntro',
    item_key: 'main',
    label: 'Titulo valores',
    sort_order: 0,
    is_hidden: false,
    content: {
      title: 'Nuestros Valores',
      slogan: 'Pensar diferente y hacerlo simple mediante un metodo atractivo.',
      historyTitle: 'Nuestra Historia',
    },
  },
  {
    section: 'about.values',
    item_key: 'integridad',
    label: 'Integridad',
    sort_order: 0,
    is_hidden: false,
    content: { text: 'Integridad' },
  },
  {
    section: 'about.values',
    item_key: 'calidad',
    label: 'Calidad',
    sort_order: 1,
    is_hidden: false,
    content: { text: 'Calidad' },
  },
  {
    section: 'about.values',
    item_key: 'responsabilidad',
    label: 'Responsabilidad',
    sort_order: 2,
    is_hidden: false,
    content: { text: 'Responsabilidad' },
  },
  {
    section: 'about.values',
    item_key: 'innovacion',
    label: 'Innovacion',
    sort_order: 3,
    is_hidden: false,
    content: { text: 'Innovacion' },
  },
  {
    section: 'about.history',
    item_key: 'main',
    label: 'Historia',
    sort_order: 0,
    is_hidden: false,
    content: {
      paragraphs: [
        'Group Emingser fue fundada en marzo 2016 con el proposito de atender las necesidades de la industria relacionada principalmente con la construccion, instalaciones electricas, mantenimiento industrial especializado, desarrollo de ingenieria, montaje en estructuras metalicas, mantenimiento a subestaciones electricas, Mantenimiento a motores de combustion internas para los diferentes sectores.',
        'En los inicios de nuestras operaciones, nos especializamos en la provision de productos y servicios de ingenieria en centrales de generacion electrica. En poco tiempo incorporamos nuevas lineas de servicio con el objetivo de proveer a nuestros clientes una solucion integral a sus necesidades.',
        'Nuestro objetivo principal es lograr una permanente mejora en nuestras actividades a fin de dar un servicio que asegure una entrega en tiempo y forma con su correspondiente asesoramiento y soporte tecnico.',
      ],
    },
  },
  {
    section: 'services.header',
    item_key: 'main',
    label: 'Encabezado Servicios',
    sort_order: 0,
    is_hidden: false,
    content: {
      eyebrow: 'Catalogo de Soluciones',
      title: 'Nuestros Servicios',
      description:
        'Soluciones integrales de ingenieria disenadas para optimizar, proteger y potenciar la infraestructura critica de su empresa con los mas altos estandares de calidad.',
    },
  },
  {
    section: 'services.items',
    item_key: 'mantenimiento',
    label: 'Servicios de Mantenimiento',
    sort_order: 0,
    is_hidden: false,
    content: {
      id: 'mantenimiento',
      title: 'Servicios de Mantenimiento',
      descriptions: [
        'Contamos con un equipo de ingenieros y tecnicos capacitados, acumulando mas de 15 anos de experiencia en Operacion y Mantenimiento de centrales electricas realizando Mantenimientos Preventivos desde 200 horas hasta 84,000 hrs de operacion.',
        'Nuestro personal cuenta con amplia experiencia en servicios de entrenamiento de Centrales electricas y diagnosticos, realizando pruebas de P-max, termografia, analisis de vibracion, calibraciones entre otros.',
      ],
      list: ['Mantenimiento Preventivo', 'Mantenimiento Correctivo', 'Mantenimiento Predictivo', 'Inspeccion y diagnostico', 'Ofrecemos entrenamiento al personal'],
    },
  },
  {
    section: 'services.items',
    item_key: 'industriales',
    label: 'Servicios Industriales',
    sort_order: 1,
    is_hidden: false,
    content: {
      id: 'industriales',
      title: 'Servicios Industriales',
      descriptions: [
        'Nos comprometemos en dar soluciones a las necesidades y solicitudes de nuestros clientes, cumpliendo con los tiempos y presupuestos acordados de mantenimiento y reparaciones de equipos industriales.',
        'Nuestros metodos de reparacion y reconstruccion son estrictamente controlados para asegurar una calidad optima y constante en el reacondicionamiento de los equipos.',
      ],
      list: ['Reacondicionamiento de piezas industriales', 'Venta de repuesto', 'Mantenimiento de maquinas industriales', 'Rebobinado de motores electricos', 'Aire acondicionado', 'Climatizacion'],
    },
  },
  {
    section: 'services.items',
    item_key: 'proyectos',
    label: 'Proyectos',
    sort_order: 2,
    is_hidden: false,
    content: {
      id: 'proyectos',
      title: 'Proyectos',
      descriptions: [
        'Velamos por eficientizar la inversion de nuestro cliente garantizando la realizacion de su proyecto desde el inicio hasta la entrega de llave en mano.',
        'Aplicamos conocimientos que contribuyan a mejorar la calidad, costos y valor de sus proyectos desde la etapa de investigacion hasta la concepcion de los mismos.',
        'Nuestro compromiso es construir infraestructuras civiles y metalicas en un sentido mas amplio donde se identifica las necesidades del cliente antes de realizar un proyecto.',
      ],
      list: ['Estudios y disenos', 'Construccion', 'Fiscalizacion y supervision de obras', 'Estructura metalica', 'Rehabilitacion de redes'],
    },
  },
  {
    section: 'projects.header',
    item_key: 'main',
    label: 'Encabezado Proyectos',
    sort_order: 0,
    is_hidden: false,
    content: {
      title: 'Nuestros Proyectos',
      description:
        'Un portafolio de excelencia en ingenieria. Descubra como hemos transformado la infraestructura industrial a traves de soluciones innovadoras y ejecucion precisa.',
      emptyText: 'No se encontraron proyectos publicados actualmente.',
    },
  },
  {
    section: 'branches.header',
    item_key: 'main',
    label: 'Encabezado Sucursales',
    sort_order: 0,
    is_hidden: false,
    content: {
      title: 'Nuestras Sucursales',
      description:
        'Presencia internacional para brindar soporte tecnico y soluciones de ingenieria de clase mundial en toda la region.',
    },
  },
  {
    section: 'branches.items',
    item_key: 'dominicana',
    label: 'Republica Dominicana',
    sort_order: 0,
    is_hidden: false,
    content: {
      country: 'Republica Dominicana',
      flag: 'DO',
      address: 'Avenida 27 de Febrero #529 Plaza Don Jose, Local 1D, Santo Domingo 10510',
      contact: 'Priscila Villafranco',
      email: 'info@emingser.com',
      phone: '+1 (809) 403 3224',
      website: '',
    },
  },
  {
    section: 'branches.items',
    item_key: 'panama',
    label: 'Panama',
    sort_order: 1,
    is_hidden: false,
    content: {
      country: 'Panama',
      flag: 'PA',
      address: 'Ave. Aquilino de la Guardia y calle 47E, Edificio Torre Banco General, Piso 20. Urbanizacion Marbella. Panama.',
      contact: 'Priscila Villafranco',
      email: 'info@emingser.com',
      phone: '+1 (849) 403 3224',
      website: '',
    },
  },
  {
    section: 'branches.items',
    item_key: 'nicaragua',
    label: 'Nicaragua',
    sort_order: 2,
    is_hidden: false,
    content: {
      country: 'Nicaragua',
      flag: 'NI',
      address: 'Plaza Santa Monica, Iglesia las Sierras 200 mts Norte, 2do Piso. Managua Nicaragua.',
      contact: 'Lisseth Rojas',
      email: 'info@emingser.com',
      phone: '+1 (505) 581 2178',
      website: '',
    },
  },
  {
    section: 'branches.items',
    item_key: 'ecuador',
    label: 'Ecuador',
    sort_order: 3,
    is_hidden: false,
    content: {
      country: 'Ecuador',
      flag: 'EC',
      address: 'Pasaje OE10-67, S11 Chilibulo 170608, Ciudad de Quito.',
      contact: 'Carlos Ugalde',
      email: 'c.ugalde@emingser.com',
      phone: '+593 93 988 4494',
      website: '',
    },
  },
  {
    section: 'branches.items',
    item_key: 'usa',
    label: 'United States Of America',
    sort_order: 4,
    is_hidden: false,
    content: {
      country: 'United States Of America',
      flag: 'US',
      address: '6136 Delmar Blvd. Saint Louis, Missouri 63112, United States.',
      contact: 'Bassam Rammaha',
      email: 'Info@oneworldusagroup.com',
      phone: '+1 (314) 800 8225',
      website: 'www.oneworldusagroup.com',
    },
  },
  {
    section: 'footer.main',
    item_key: 'main',
    label: 'Footer',
    sort_order: 0,
    is_hidden: false,
    content: {
      description:
        'Soluciones integrales de ingenieria disenadas para optimizar, proteger y potenciar la infraestructura critica de su empresa con los mas altos estandares de calidad.',
      contactCountry: 'Republica Dominicana',
      phone: '+1 (809) 000-0000',
      email: 'info@groupemingser.com',
      copyright: 'Group Emingser S.R.L. | One World Engineering. Todos los derechos reservados.',
      linkedinUrl: '#',
      mailUrl: 'mailto:info@groupemingser.com',
    },
  },
];

export const getDefaultBlock = (section: string, itemKey = 'main') =>
  cmsDefaults.find((block) => block.section === section && block.item_key === itemKey);

export const getDefaultItems = (section: string) =>
  cmsDefaults.filter((block) => block.section === section).sort((a, b) => a.sort_order - b.sort_order);
