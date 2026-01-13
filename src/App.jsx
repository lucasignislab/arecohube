import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { RefreshCw, Package, FileText, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'

// Spring animation config for smoother, more natural animations
const springConfig = { stiffness: 100, damping: 15, mass: 0.5 }

// Mouse tracking hook for parallax effect
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  return mousePosition
}

// Animated counter component
function AnimatedNumber({ value, duration = 2 }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const controls = animate(count, value, {
      duration: duration,
      ease: "easeOut",
    })

    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v))
    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [value, duration, count, rounded])

  return <>{displayValue}</>
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

function App() {
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
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden">
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary leading-tight mb-4 sm:mb-6">
                Domine o Multicanal. <br />
                <span className="gradient-text">Escale com Inteligência.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 max-w-lg">
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
                  className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition-colors text-center"
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
      <section id="integracoes" className="py-8 sm:py-12 border-y border-slate-200/50">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-center text-xs sm:text-sm uppercase tracking-widest text-slate-500 mb-6 sm:mb-8">Integrado com os maiores players do mercado</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-16 opacity-60">
            {['Mercado Livre', 'Americanas', 'Amazon', 'Magalu', 'Shopee'].map((brand, i) => (
              <motion.span
                key={brand}
                className="text-sm sm:text-lg font-bold text-slate-500"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 0.6, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', ...springConfig, delay: i * 0.05 }}
              >
                {brand}
              </motion.span>
            ))}
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
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Gestão completa em um único lugar</h2>
            <p className="text-base sm:text-lg text-slate-600">Funcionalidades desenhadas para trazer eficiência e agilidade para sua operação digital.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: RefreshCw, title: 'Sincronização em Tempo Real', desc: 'Atualize estoques e preços simultaneamente em todos os canais, evitando vendas sem estoque.' },
              { icon: Package, title: 'Catálogo Centralizado', desc: 'Publique produtos em múltiplos marketplaces com um único clique. Gestão de atributos simplificada.' },
              { icon: FileText, title: 'Automação Fiscal', desc: 'Emissão de notas fiscais automática e integração imediata com os dados financeiros do seu ERP.' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', ...springConfig, delay: i * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px -15px rgba(59, 130, 246, 0.2)' }}
                className="glass-card p-6 sm:p-8 group cursor-pointer"
              >
                <motion.div
                  className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-white transition-colors"
                  whileHover={{ rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <feature.icon size={24} />
                </motion.div>
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
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
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.4 }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-slate-200 -z-10" />
            {['Conecte', 'Mapeie', 'Venda', 'Fature'].map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', ...springConfig, delay: i * 0.1 }}
                className="text-center"
              >
                <motion.div
                  className="w-14 sm:w-16 h-14 sm:h-16 bg-white rounded-full shadow-lg shadow-accent/10 flex items-center justify-center mx-auto mb-3 sm:mb-4 text-xl sm:text-2xl font-bold text-accent border-4 border-slate-50"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  0{i + 1}
                </motion.div>
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-1 sm:mb-2">{step}</h3>
                <p className="text-slate-600 text-xs sm:text-sm">
                  {['Vincule seu ERP Areco aos canais.', 'Sincronize categorias e atributos.', 'Seus produtos ativos em múltiplos hubs.', 'Pedidos integrados para expedição.'][i]}
                </p>
              </motion.div>
            ))}
          </div>
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
      <footer className="py-8 sm:py-12 border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="text-xl font-bold text-primary mb-3 sm:mb-4">
            ARECO<span className="gradient-text">HUBe</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 Areco Sistemas Empresariais. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
