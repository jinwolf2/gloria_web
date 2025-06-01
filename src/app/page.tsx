'use client';

import Image from "next/image";
import Link from 'next/link';
import { useState, SVGProps } from 'react';
import { motion, Variants, AnimatePresence, wrap } from 'framer-motion';

const currentYear = new Date().getFullYear();
const contactEmail = "tuemail@dominio.com";

interface NavLink {
  href: string;
  label: string;
}

interface ServiceData {
  title: string;
  description: string;
  linkHref: string;
  linkText: string;
}

interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
  emailForGravatar: string; 
}

const navLinks: NavLink[] = [
  { href: "#constelaciones", label: "El Método" },
  { href: "#sobre-mi", label: "Sobre Mí" },
  { href: "#servicios", label: "Servicios" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" },
];

const servicesData: ServiceData[] = [
  {
    title: "Sesión Individual",
    description: "Un proceso íntimo y centrado en tus necesidades específicas, online o presencial.",
    linkHref: "/sesiones-individuales",
    linkText: "Saber Más",
  },
  {
    title: "Taller Grupal",
    description: "Experimenta la resonancia y el apoyo del grupo en un formato intensivo y transformador.",
    linkHref: "/talleres",
    linkText: "Ver Agenda",
  },
];

const testimonialsData: Testimonial[] = [
  {
    id: "t1",
    text: "Encontré una paz que no sabía que estaba buscando. Pude ver mi historia familiar con amor y comprensión.",
    author: "A. Martínez",
    role: "Cliente Satisfecho",
    emailForGravatar: "amartinez.test@example.com",
  },
  {
    id: "t2",
    text: "El proceso fue revelador y me ayudó a desbloquear patrones que se repetían en mi vida. Muy agradecida.",
    author: "L. Gómez",
    role: "Participante de Taller",
    emailForGravatar: "lgomez.test@example.com",
  },
  {
    id: "t3",
    text: "Gloria tiene una sensibilidad y profesionalismo excepcionales. Me sentí acompañada en todo momento.",
    author: "C. Fernández",
    role: "Cliente Individual",
    emailForGravatar: "cfernandez.test@example.com",
  },
];

const getGravatarUrl = (email: string, size: number = 96): string => {
  const dummyHashForExample = "00000000000000000000000000000000";
  return `https://www.gravatar.com/avatar/${dummyHashForExample}?s=${size}&d=mp`;
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const scaleUp: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const testimonialVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const ChevronLeftIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
);
  
const ChevronRightIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
);

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [[testimonialIndex, testimonialDirection], setTestimonialPage] = useState([0, 0]);
  
  const activeTestimonialIndex = wrap(0, testimonialsData.length, testimonialIndex);

  const paginateTestimonials = (newDirection: number) => {
    setTestimonialPage([testimonialIndex + newDirection, newDirection]);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const siteName = "Gloria Ramirez";
  const contactLink = "#contacto";

  const heroVideoSrc = "/fondo.mp4";
  const heroTitle = "Comprender las Raíces, Transformar el Presente.";
  const heroSubtitle = "Un espacio de terapia sistémica para encontrar claridad, sanación y equilibrio a través de las Constelaciones Familiares.";
  const heroCtaLink = "#servicios";
  const heroCtaText = "Explorar Servicios";

  const motionProps = (variants: Variants = fadeInUp, amount: number = 0.2) => ({
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount },
    variants,
  });

  return (
    <motion.main 
        className="bg-white text-slate-900 font-sans"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
    >
      <motion.header 
        className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-100"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <nav className="container mx-auto px-6 py-5 flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href="/" className="text-xl font-bold text-slate-900 tracking-tight">
              {siteName}
            </Link>
          </motion.div>
          <motion.ul 
            className="hidden md:flex space-x-8 lg:space-x-10 text-slate-700 text-sm font-normal items-center"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {navLinks.map((link) => (
              <motion.li key={link.href} variants={fadeInUp} whileHover={{ y: -2 }}>
                <Link href={link.href} className="hover:text-indigo-600 transition duration-200">
                  {link.label}
                </Link>
              </motion.li>
            ))}
            <motion.li variants={fadeInUp} whileHover={{ scale: 1.05 }}>
              <Link 
                href={contactLink} 
                className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-full hover:bg-indigo-600 hover:text-white text-sm font-normal transition-all duration-200"
              >
                Iniciar Proceso
              </Link>
            </motion.li>
          </motion.ul>
          <div className="md:hidden">
            <motion.button
              onClick={toggleMobileMenu}
              aria-label="Abrir menú de navegación"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu-panel"
              className="text-slate-900 focus:outline-none p-1"
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </motion.button>
          </div>
        </nav>
        <AnimatePresence>
            {isMobileMenuOpen && (
            <motion.div 
                id="mobile-menu-panel" 
                className="md:hidden bg-white border-t border-slate-100 shadow-lg origin-top"
                initial={{ opacity: 0, scaleY: 0.9 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <ul className="px-6 py-4 space-y-1">
                {navLinks.map((link, index) => (
                    <motion.li 
                        key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                    <Link 
                        href={link.href} 
                        className="block text-slate-700 hover:text-indigo-600 py-2.5 transition duration-200"
                        onClick={toggleMobileMenu}
                    >
                        {link.label}
                    </Link>
                    </motion.li>
                ))}
                <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
                >
                    <Link 
                    href={contactLink}
                    className="mt-3 inline-block w-full text-center bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 text-sm font-normal transition-all duration-200"
                    onClick={toggleMobileMenu}
                    >
                    Iniciar Proceso
                    </Link>
                </motion.li>
                </ul>
            </motion.div>
            )}
        </AnimatePresence>
      </motion.header>

      <section id="inicio" className="relative min-h-[70vh] md:min-h-[85vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0" poster="/poster-image.jpg">
          <source src={heroVideoSrc} type="video/mp4" /> Tu navegador no soporta el tag de vídeo.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
        <motion.div className="relative z-20 container mx-auto px-6 text-center" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight text-white" variants={fadeInUp}>
            {heroTitle}
          </motion.h1>
          <motion.p className="text-lg md:text-xl text-slate-100 mb-10 md:mb-12 max-w-2xl mx-auto font-light" variants={fadeInUp}>
            {heroSubtitle}
          </motion.p>
          <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href={heroCtaLink} className="inline-block bg-indigo-600 text-white px-8 md:px-10 py-3 rounded-full text-base font-medium hover:bg-indigo-700 transition-colors duration-200 border border-indigo-600 hover:border-indigo-700 shadow-lg hover:shadow-xl">
              {heroCtaText}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <motion.hr className="w-24 h-px mx-auto my-16 md:my-20 bg-slate-200 border-0" {...motionProps(scaleUp)} />

      <section id="constelaciones" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div className="text-left" {...motionProps(staggerContainer)}>
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900" variants={fadeInUp}> El Eco del Sistema Familiar </motion.h2>
            <motion.p className="text-base text-slate-600 mb-4 font-light leading-relaxed" variants={fadeInUp}> Las Constelaciones Familiares ofrecen una mirada profunda a las dinámicas inconscientes que heredamos. No se trata de culpar, sino de comprender los patrones y lealtades que nos moldean, para así poder elegir un camino con mayor conciencia y libertad. </motion.p>
            <motion.p className="text-base text-slate-600 font-light leading-relaxed" variants={fadeInUp}> A través de representaciones, sacamos a la luz lo oculto, permitiendo que el amor fluya de nuevo y cada miembro ocupe su lugar legítimo. </motion.p>
          </motion.div>
          <motion.div className="hidden md:block text-center p-10 md:p-12 bg-slate-50 rounded-lg shadow-sm" {...motionProps(scaleUp)}>
            <blockquote className="text-2xl lg:text-3xl italic text-slate-600 font-light"> <p>&ldquo;Sólo cuando estamos en sintonía con nuestro destino, tenemos la fuerza para cambiarlo.&rdquo;</p> </blockquote>
            <p className="mt-4 text-slate-600">- Bert Hellinger</p>
          </motion.div>
        </div>
      </section>

      <section id="sobre-mi" className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
          <motion.div className="md:w-1/2 text-left" {...motionProps(staggerContainer)}>
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900" variants={fadeInUp}> Mi Enfoque: Presencia y Respeto </motion.h2>
            <motion.p className="text-base text-slate-600 mb-6 font-light leading-relaxed" variants={fadeInUp}> Te ofrezco un espacio de escucha activa y sin juicio, donde tu historia es sagrada. Mi rol es facilitar, con sensibilidad y rigor, tu encuentro con las comprensiones profundas que emergen del campo. Mi formación y mi propia experiencia me guían en este delicado y poderoso trabajo. </motion.p>
            <motion.div variants={fadeInUp} whileHover={{ x: 5 }}> <Link href="/sobre-mi" className="text-indigo-600 font-medium hover:underline transition duration-200 inline-block"> Leer más sobre mi camino → </Link> </motion.div>
          </motion.div>
          <motion.div className="md:w-1/2" {...motionProps(scaleUp)}> <Image src="/pfp.jpeg" alt="Foto Profesional de Gloria Ramirez" width={450} height={550} className="rounded-lg shadow-xl w-full h-auto max-w-md mx-auto object-cover" priority /> </motion.div>
        </div>
      </section>

      <section id="servicios" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-slate-900" {...motionProps(fadeInUp)}> Modalidades de Trabajo </motion.h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-4xl mx-auto" {...motionProps(staggerContainer)}>
            {servicesData.map((service) => (
              <motion.div key={service.title} className="border border-slate-200 p-8 rounded-lg hover:shadow-xl transition-shadow duration-300 bg-white" variants={fadeInUp} whileHover={{ y: -5, transition:{ type: 'spring', stiffness: 300 } }}>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-900"> {service.title} </h3>
                <p className="text-slate-600 mb-5 font-light leading-relaxed"> {service.description} </p>
                <Link href={service.linkHref} className="text-indigo-600 font-medium hover:underline transition duration-200"> {service.linkText} → </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <motion.hr className="w-24 h-px mx-auto my-16 md:my-20 bg-slate-200 border-0" {...motionProps(scaleUp)} />

      <section id="testimonios" className="py-16 md:py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
            <motion.h2 
                className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-slate-900"
                {...motionProps(fadeInUp)}
            >
                Lo que dicen de mí
            </motion.h2>
            <motion.div className="relative max-w-3xl mx-auto" {...motionProps(fadeInUp)}>
                <div className="relative h-80 md:h-72 flex items-center justify-center">
                    <AnimatePresence initial={false} custom={testimonialDirection}>
                        <motion.div
                            key={testimonialIndex}
                            custom={testimonialDirection}
                            variants={testimonialVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                            }}
                            className="absolute w-full px-4 md:px-8 text-center"
                        >
                            <img 
                                src={getGravatarUrl(testimonialsData[activeTestimonialIndex].emailForGravatar)} 
                                alt={`Avatar de ${testimonialsData[activeTestimonialIndex].author}`}
                                className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-6 shadow-lg border-2 border-indigo-100"
                            />
                            <blockquote className="text-lg md:text-xl italic text-slate-700 mb-6 leading-relaxed">
                                <p>&ldquo;{testimonialsData[activeTestimonialIndex].text}&rdquo;</p>
                            </blockquote>
                            <p className="font-semibold text-slate-800">{testimonialsData[activeTestimonialIndex].author}</p>
                            <p className="text-sm text-slate-500">{testimonialsData[activeTestimonialIndex].role}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
                    <motion.button
                        onClick={() => paginateTestimonials(-1)}
                        className="bg-white/50 hover:bg-indigo-100 text-indigo-600 p-2 rounded-full shadow-md focus:outline-none transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Testimonio anterior"
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </motion.button>
                </div>
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
                    <motion.button
                        onClick={() => paginateTestimonials(1)}
                        className="bg-white/50 hover:bg-indigo-100 text-indigo-600 p-2 rounded-full shadow-md focus:outline-none transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Siguiente testimonio"
                    >
                        <ChevronRightIcon className="w-6 h-6" />
                    </motion.button>
                </div>
                 <div className="flex justify-center space-x-2 mt-8">
                    {testimonialsData.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => setTestimonialPage([index, index > activeTestimonialIndex ? 1 : -1])}
                            className={`w-3 h-3 rounded-full transition-colors ${activeTestimonialIndex === index ? 'bg-indigo-600 scale-125' : 'bg-slate-300 hover:bg-slate-400'}`}
                            aria-label={`Ir al testimonio ${index + 1}`}
                            whileHover={{ scale: 1.2 }}
                            animate={{ scale: activeTestimonialIndex === index ? 1.25 : 1 }}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
      </section>

      <section id="contacto" className="py-16 md:py-24 bg-slate-50">
        <motion.div className="container mx-auto px-6 text-center" {...motionProps(staggerContainer)}>
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-5 text-slate-900" variants={fadeInUp}> ¿Deseas Iniciar tu Proceso? </motion.h2>
          <motion.p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto font-light" variants={fadeInUp}> Si resuenas con esta propuesta y sientes que es el momento de dar el siguiente paso, te invito a contactarme. </motion.p>
          <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}> <a href={`mailto:${contactEmail}`} className="inline-block bg-indigo-600 text-white px-10 py-3 rounded-full text-base font-normal hover:bg-indigo-700 transition-colors duration-200 border border-indigo-600 hover:border-indigo-700"> Enviar un Mensaje </a> </motion.div>
        </motion.div>
      </section>

      <motion.footer className="bg-white text-slate-600 py-10 border-t border-slate-100" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}>
        <div className="container mx-auto px-6 text-center sm:flex sm:justify-between items-center">
          <p className="text-xs font-light mb-4 sm:mb-0"> &copy; {currentYear} Gloria Ramirez. Todos los derechos reservados. </p>
          <ul className="flex justify-center sm:justify-end space-x-5 text-xs font-light">
            <li><Link href="/privacidad" className="hover:text-indigo-600 transition duration-200">Política de Privacidad</Link></li>
            <li><Link href="/aviso-legal" className="hover:text-indigo-600 transition duration-200">Aviso Legal</Link></li>
          </ul>
        </div>
      </motion.footer>
    </motion.main>
  );
}