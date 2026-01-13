import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, animate, useScroll, useInView } from 'framer-motion'
import { Package, Users, ClipboardList, Warehouse, Zap, Shield, TrendingUp, Globe, Clock, DollarSign, FileText, UserCheck, RefreshCw, BarChart3, MessageSquare, Phone, Mail, HelpCircle, ExternalLink, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// Spring animation config for smoother, more natural animations
const springConfig = { stiffness: 100, damping: 15, mass: 0.5 }



// Animated counter component
function AnimatedNumber({ value, duration = 2 }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: "-50px" })

  useEffect(() => {
    if (isInView) {
      count.set(0)
      const controls = animate(count, value, {
        duration: duration,
        ease: "easeOut",
      })

      const unsubscribe = rounded.on("change", (v) => setDisplayValue(v))
      return () => {
        controls.stop()
        unsubscribe()
      }
    }
  }, [isInView, value, duration, count, rounded])

  return <span ref={ref}>{displayValue}</span>
}

// Parallax component for hero image
function ParallaxImage() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [0, window.innerHeight], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, window.innerWidth], [-10, 10]), springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="relative z-10"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
    >
      <motion.img
        src="/hero-dashboard.png"
        alt="Areco HUBe Dashboard"
        className="w-full rounded-2xl shadow-2xl shadow-accent/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', ...springConfig, delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
      />
    </motion.div>
  )
}

// Product Modal Component
function ProductModal({ isOpen, onClose, imageSrc }) {
  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', ...springConfig }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img
          src={imageSrc}
          alt="Product Catalog Interface"
          className="w-full h-auto"
        />
      </motion.div>
    </motion.div>
  )
}

// Steps with scroll-locked progress component
function StepsWithProgress() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Track which step is active based on scroll progress
  const step1Opacity = useTransform(scrollYProgress, [0, 0.15], [0.4, 1])
  const step2Opacity = useTransform(scrollYProgress, [0.15, 0.4], [0.4, 1])
  const step3Opacity = useTransform(scrollYProgress, [0.4, 0.65], [0.4, 1])
  const step4Opacity = useTransform(scrollYProgress, [0.65, 0.9], [0.4, 1])

  const stepOpacities = [step1Opacity, step2Opacity, step3Opacity, step4Opacity]

  const steps = ['Conecte', 'Mapeie', 'Venda', 'Fature']
  const descriptions = [
    'Vincule seu ERP Areco aos canais.',
    'Sincronize categorias e atributos.',
    'Seus produtos ativos em múltiplos hubs.',
    'Pedidos integrados para expedição.'
  ]

  return (
    <div ref={containerRef} className="h-[200vh] relative">
      <div className="sticky top-1/2 -translate-y-1/2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative">
          {/* Background line */}
          <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-slate-200 -z-10" />

          {/* Animated progress line */}
          <motion.div
            className="hidden md:block absolute top-8 left-[12%] h-0.5 bg-gradient-to-r from-accent to-sky-400 -z-10 origin-left"
            style={{
              scaleX,
              width: '76%'
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step}
              className="text-center"
              style={{ opacity: stepOpacities[i] }}
            >
              <motion.div
                className="w-14 sm:w-16 h-14 sm:h-16 bg-white rounded-full shadow-lg shadow-accent/10 flex items-center justify-center mx-auto mb-3 sm:mb-4 text-xl sm:text-2xl font-bold text-accent border-4 border-slate-50 relative z-10"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                0{i + 1}
              </motion.div>
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-1 sm:mb-2">{step}</h3>
              <p className="text-slate-600 text-xs sm:text-sm">{descriptions[i]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Infinite Moving Cards Component
function InfiniteMovingCards({ items, direction = "left", speed = "fast", pauseOnHover = true, className }) {
  const containerRef = useRef(null)
  const scrollerRef = useRef(null)
  const [start, setStart] = useState(false)

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards")
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse")
      }
    }
  }

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s")
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s")
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s")
      }
    }
  }

  const addAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }

  useEffect(() => {
    addAnimation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={containerRef}
      className={`scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] ${className}`}
    >
      <ul
        ref={scrollerRef}
        className={`flex min-w-full shrink-0 gap-6 py-4 w-max flex-nowrap ${start && "animate-scroll"} ${pauseOnHover && "hover:[animation-play-state:paused]"}`}
      >
        {items.map((benefit) => (
          <li
            key={benefit.title}
            className="w-[350px] max-w-full relative rounded-2xl border border-white/10 px-8 py-6 bg-white/5 backdrop-blur-md flex-shrink-0"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center border border-white/10 flex-shrink-0">
                <benefit.icon size={20} />
              </div>
              <h3 className="text-base font-bold leading-tight">{benefit.title}</h3>
            </div>
            <div className="w-full h-px bg-white/10 mb-4" />
            <p className="text-white/60 text-sm leading-relaxed">{benefit.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Premium Footer Component
function Footer() {
  const footerSections = [
    {
      title: "O que você está buscando?",
      links: [
        "Autonomia para Construir Soluções",
        "Plataforma Completa de Gestão",
        "Aplicativos e Sistemas Complementares",
        "Finanças Integradas na Operação",
        "Plataforma de Ensino"
      ]
    },
    {
      title: "Sobre a Areco",
      links: [
        "Nossa História", "Eventos", "Conteúdo", "e-Pier", "VSat ERP", "Add-Ons", "arc"
      ],
      columns: 2
    },
    {
      title: "Carreiras",
      links: [
        "Protagonismo", "Buscar Vagas", "Partnership"
      ]
    }
  ]

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Top Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', ...springConfig }}
          className="mb-12"
        >
          <div className="text-3xl font-bold flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 border-4 border-white rounded-sm rotate-45" />
            </div>
            ARECO
          </div>
        </motion.div>

        {/* Support Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', ...springConfig, delay: 0.1 }}
          className="glass-card mb-16 p-6 sm:p-8 bg-white/5 border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="text-2xl font-bold tracking-tight">Select</div>
            <div className="text-center md:text-left">
              <p className="text-white/90 font-medium">Gostaria de acessar nossos conteúdos pelo WhatsApp?</p>
              <p className="text-white/60 text-sm">Cadastre-se e receba insights e novidades pelo seu celular.</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20"
          >
            Cadastrar-se
          </motion.button>
        </motion.div>

        {/* Main Links Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {footerSections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', ...springConfig, delay: 0.2 + (idx * 0.1) }}
            >
              <h4 className="font-bold text-lg mb-6 pb-2 border-b border-white/10">{section.title}</h4>
              <ul className={`grid gap-4 ${section.columns === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/50 hover:text-accent transition-colors text-sm sm:text-base">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Fale Conosco Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', ...springConfig, delay: 0.5 }}
          className="mb-8 p-6 bg-white/5 rounded-2xl"
        >
          <h4 className="font-bold text-lg mb-8 flex items-center gap-2">
            Fale Conosco <span className="text-white/30 text-sm font-normal">| Telefone, Ticket ou WhatsApp</span>
          </h4>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h5 className="font-bold text-sm uppercase tracking-wider text-accent mb-4">Central de Atendimento</h5>
              <div className="space-y-3 text-white/60 text-sm">
                <p className="flex items-center gap-2"><Phone size={14} className="text-accent" /> (19) 3849-4355 | Todas as regiões</p>
                <p className="flex items-center gap-2"><ExternalLink size={14} className="text-accent" /> Portal | Abertura de Tickets</p>
                <p className="flex items-center gap-2"><MessageSquare size={14} className="text-accent" /> (19) 98243-0079 | WhatsApp</p>
              </div>
            </div>
            <div>
              <h5 className="font-bold text-sm uppercase tracking-wider text-accent mb-4">SAC</h5>
              <div className="space-y-3 text-white/60 text-sm">
                <p className="flex items-center gap-2"><HelpCircle size={14} className="text-accent" /> KB | Base de Conhecimento</p>
                <p className="flex items-center gap-2"><Mail size={14} className="text-accent" /> contato@areco.com.br</p>
                <p className="flex items-center gap-2"><MessageSquare size={14} className="text-accent" /> (19) 98243-0079 | WhatsApp</p>
              </div>
            </div>
            <div>
              <h5 className="font-bold text-sm uppercase tracking-wider text-accent mb-4">Perguntas Frequentes</h5>
              <div className="space-y-2 text-white/60 text-sm">
                {["VSat", "Valora", "e-Pier", "Política de Privacidade"].map(item => (
                  <p key={item} className="hover:text-white cursor-pointer transition-colors">{item}</p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-white/40 text-xs text-center sm:text-left">
            © 2026 Areco Sistemas Empresariais. Todos os direitos reservados.
            Todas as imagens e marcas são propriedades de seus respectivos donos.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

// Floating AI Insights Button
function FloatingAI() {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 hidden sm:block"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.1
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      <div className="w-20 h-20 bg-[#1e293b] rounded-full flex flex-col items-center justify-center shadow-2xl border border-white/10 group overflow-hidden relative cursor-pointer">
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <span className="text-3xl font-extrabold text-white leading-none tracking-tight">AI</span>
        <div className="flex flex-col items-center mt-1">
          <span className="text-[8px] text-white/80 font-bold uppercase tracking-widest leading-none">Areco</span>
          <span className="text-[8px] text-white/60 font-medium uppercase tracking-widest leading-none mt-0.5">Insights</span>
        </div>

        {/* Shine effect */}
        <div className="absolute -left-full top-0 w-1/2 h-full bg-white/10 skew-x-[-25deg] group-hover:left-[150%] transition-all duration-700 ease-in-out" />
      </div>
    </motion.div>
  )
}

function App() {
  const [modalImage, setModalImage] = useState(null)
  const [isRecruiterMenuOpen, setIsRecruiterMenuOpen] = useState(false)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-primary">
            ARECO<span className="gradient-text">HUBe</span>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <a href="#funcionalidades" className="text-slate-600 hover:text-accent transition-colors">Funcionalidades</a>
            <a href="#integracoes" className="text-slate-600 hover:text-accent transition-colors">Integrações</a>
            <a href="#como-funciona" className="text-slate-600 hover:text-accent transition-colors">Como Funciona</a>

            {/* Recruiter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsRecruiterMenuOpen(!isRecruiterMenuOpen)}
                className="flex items-center gap-1 text-accent font-semibold hover:text-accent-hover transition-all group"
              >
                Apenas p/ Recrutadores
                <ChevronDown size={16} className={`transition-transform duration-300 ${isRecruiterMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isRecruiterMenuOpen && (
                  <>
                    {/* Backdrop to close menu */}
                    <div
                      className="fixed inset-0 z-[-1]"
                      onClick={() => setIsRecruiterMenuOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="absolute top-full mt-2 left-0 w-48 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden py-2"
                    >
                      <Link
                        to="/design-system"
                        className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-accent transition-colors"
                        onClick={() => setIsRecruiterMenuOpen(false)}
                      >
                        Design System
                      </Link>
                      <Link
                        to="/case-study"
                        className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-accent transition-colors"
                        onClick={() => setIsRecruiterMenuOpen(false)}
                      >
                        Case Study
                      </Link>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <a href="#" className="btn-primary">Agendar Demo</a>
          </nav>
          {/* Mobile menu button */}
          <button className="md:hidden text-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-sky-400/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', ...springConfig }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 sm:mb-6">
                Domine o Multicanal. <br />
                <span className="gradient-text">Escale com Inteligência.</span>
              </h1>
              <p className="text-base sm:text-lg text-white/70 mb-6 sm:mb-8 max-w-lg">
                O Hub de integração que conecta seu ERP Areco aos maiores marketplaces do mundo em tempo real. Elimine o retrabalho e venda mais.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <motion.a
                  href="#"
                  className="btn-primary flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                >
                  <Zap size={18} />
                  Começar agora
                </motion.a>
                <motion.a
                  href="#integracoes"
                  className="px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors text-center"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ver Integrações
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', ...springConfig, delay: 0.2 }}
              className="relative mt-8 lg:mt-0"
            >
              <ParallaxImage />
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-accent/20 to-sky-400/20 rounded-2xl -z-10 blur-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section id="integracoes" className="py-8 sm:py-12 border-y border-slate-200/50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-center text-xs sm:text-sm uppercase tracking-widest text-slate-500 mb-6 sm:mb-8">Integrado com os maiores players do mercado</p>

          {/* Infinite Carousel */}
          <div className="relative">
            <div className="flex animate-[scroll-left_20s_linear_infinite]">
              {/* First set of brands */}
              {['Mercado Livre', 'Americanas', 'Amazon', 'Magalu', 'Shopee', 'B2W', 'Via Varejo', 'Carrefour'].map((brand) => (
                <div key={brand} className="flex-shrink-0 px-8 sm:px-12">
                  <span className="text-lg sm:text-xl font-bold text-slate-500 opacity-60 whitespace-nowrap">
                    {brand}
                  </span>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {['Mercado Livre', 'Americanas', 'Amazon', 'Magalu', 'Shopee', 'B2W', 'Via Varejo', 'Carrefour'].map((brand) => (
                <div key={`${brand}-duplicate`} className="flex-shrink-0 px-8 sm:px-12">
                  <span className="text-lg sm:text-xl font-bold text-slate-500 opacity-60 whitespace-nowrap">
                    {brand}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features - Bento Grid */}
      <section id="funcionalidades" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', ...springConfig }}
            className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Desenhado para a Operação</h2>
            <p className="text-base sm:text-lg text-slate-600">Em tempo real, sua operação ganha eficiência <br />e controle nas vendas multi-canais (omnichannel).</p>
          </motion.div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Package, title: 'Catalogação de Produtos', desc: 'Importe via ERP, ou cadastre produtos uma única vez e sincronize automaticamente em todos os canais de venda online.', hasModal: true, modalImage: '/produto-modal.png' },
              { icon: Users, title: 'Lista de Clientes', desc: 'Gerencie sua lista de clientes de múltiplos canais com facilidade, mantendo informações organizadas.', hasModal: true, modalImage: '/clientes-modal.png' },
              { icon: ClipboardList, title: 'Lista de Pedidos', desc: 'Acesso a múltiplos pedidos de diversos canais, com filtragem para análises, campanhas e/ou resolução de problemas.', hasModal: true, modalImage: '/pedidos-modal.png' },
              { icon: Warehouse, title: 'Locais de Estoque', desc: 'Gerencie estoques de forma personalizada, com opções de configuração flexíveis e integração total ao ERP.', hasModal: true, modalImage: '/estoque-modal.png' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', ...springConfig, delay: i * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px -15px rgba(59, 130, 246, 0.2)' }}
                className="glass-card p-6 sm:p-8 group cursor-pointer flex flex-col h-full"
                onClick={() => feature.hasModal && setModalImage(feature.modalImage)}
              >
                <motion.div
                  className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-white transition-colors"
                  whileHover={{ rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <feature.icon size={24} />
                </motion.div>
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-slate-600 mb-4 flex-grow">{feature.desc}</p>
                {feature.hasModal && (
                  <div className="text-xs text-accent font-semibold flex items-center gap-1 mt-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Clique para visualizar
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Product Modal */}
          <ProductModal
            isOpen={modalImage !== null}
            onClose={() => setModalImage(null)}
            imageSrc={modalImage}
          />
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 sm:py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', ...springConfig }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Por que a gestão manual é o maior inimigo da sua escala?</h2>
              <p className="text-white/70 text-base sm:text-lg mb-6 sm:mb-8">Manter múltiplos canais atualizados sem um Hub integrado gera falhas contínuas que custam caro ao seu negócio.</p>
              <ul className="space-y-4 sm:space-y-6">
                {[
                  { title: 'Vendas sem estoque', desc: 'Penalizações pesadas e perda de relevância nos marketplaces.' },
                  { title: 'Erros de precificação', desc: 'Prejuízos operacionais por falta de sincronia de tabelas.' },
                ].map((item, i) => (
                  <motion.li
                    key={item.title}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', ...springConfig, delay: i * 0.1 }}
                  >
                    <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                    </div>
                    <div>
                      <strong className="block text-base sm:text-lg">{item.title}</strong>
                      <p className="text-white/60 text-sm sm:text-base">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: 'spring', ...springConfig, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card p-8 sm:p-12 text-center bg-white/5"
            >
              <motion.div
                className="text-5xl sm:text-6xl font-extrabold gradient-text mb-2"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false }}
                transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.4 }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                >
                  <AnimatedNumber value={42} />%
                </motion.span>
              </motion.div>
              <p className="text-white/70 text-sm sm:text-base">do tempo da equipe de e-commerce é gasto em tarefas repetitivas que o HUBe automatiza.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', ...springConfig }}
            className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Simplicidade em cada etapa</h2>
            <p className="text-base sm:text-lg text-slate-600">Veja como o HUBe transforma sua operação em uma máquina de vendas.</p>
          </motion.div>

          <StepsWithProgress />
        </div>
      </section>

      {/* Benefícios Section */}
      <section className="py-16 sm:py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-accent/10 rounded-full blur-3xl opacity-50" />
        </div>
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', ...springConfig }}
            className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Benefícios do Areco HUBe</h2>
            <p className="text-base sm:text-lg text-white/70">A vantagem competitiva que sua operação precisa para dominar o mercado.</p>
          </motion.div>

          <InfiniteMovingCards
            items={[
              { icon: Warehouse, title: 'Administração de Estoques', desc: 'Sincroniza automaticamente alterações, replicando em todos os canais de venda.' },
              { icon: DollarSign, title: 'Integração de Dados Financeiros', desc: 'Movimentos financeiros de diferentes marketplaces no seu ERP.' },
              { icon: FileText, title: 'Conformidade Fiscal', desc: 'Emissão de notas fiscais e tributos de acordo com as exigências legais.' },
              { icon: UserCheck, title: 'Gerenciamento de Clientes', desc: 'Empresa tem acesso rápido a histórico de compras de clientes.' },
              { icon: RefreshCw, title: 'Sincronização Multicanal', desc: 'Atualize informações de preços, disponibilidade em todos os canais.' },
              { icon: BarChart3, title: 'Emissão de Relatórios', desc: 'Painéis de controle e relatórios que permitem analisar a performance.' },
            ]}
            direction="left"
            speed="slow"
          />
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 sm:py-24 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/5 to-sky-400/5" />
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', ...springConfig }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4 sm:mb-6">Pronto para transformar sua escala digital?</h2>
            <p className="text-base sm:text-lg text-slate-600 mb-8 sm:mb-10">Junte-se a centenas de empresas que já automatizaram sua operação com o Areco HUBe.</p>
            <motion.a
              href="#"
              className="btn-primary inline-flex items-center gap-2 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              whileHover={{ scale: 1.05, boxShadow: '0 15px 30px -10px rgba(59, 130, 246, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Zap size={20} />
              Agendar Demonstração Gratuita
            </motion.a>
            <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-slate-500">Integração rápida. Suporte em português. Sem taxas ocultas.</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating AI Agent */}
      <FloatingAI />
    </div>
  )
}

export default App
