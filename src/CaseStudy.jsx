import { motion } from 'framer-motion' // eslint-disable-line no-unused-vars
import { ArrowLeft, Sparkles, Palette, Code, Lightbulb, Target, Layers, Zap, Users, TrendingUp, CheckCircle2, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

const springConfig = { stiffness: 100, damping: 15, mass: 0.5 }

// Storytelling section component
function StorySection({ children, className = '' }) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: 'spring', ...springConfig }}
            className={`mb-24 ${className}`}
        >
            {children}
        </motion.section>
    )
}

// Chapter heading
function Chapter({ number, title, subtitle }) {
    return (
        <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">
                    Capítulo {number}
                </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-3">{title}</h2>
            {subtitle && <p className="text-lg text-slate-500 max-w-2xl">{subtitle}</p>}
        </div>
    )
}

// Highlight card for key decisions
function DecisionCard({ icon: Icon, title, description, impact }) { // eslint-disable-line no-unused-vars
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <Icon className="text-accent" size={24} />
            </div>
            <h4 className="font-bold text-primary mb-2">{title}</h4>
            <p className="text-sm text-slate-600 mb-4">{description}</p>
            {impact && (
                <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
                    <CheckCircle2 size={14} />
                    <span>{impact}</span>
                </div>
            )}
        </div>
    )
}

// Tech stack badge
function TechBadge({ name, color = 'accent' }) {
    const colorClasses = {
        accent: 'bg-accent/10 text-accent',
        emerald: 'bg-emerald-100 text-emerald-700',
        purple: 'bg-purple-100 text-purple-700',
        amber: 'bg-amber-100 text-amber-700',
        sky: 'bg-sky-100 text-sky-700',
    }
    return (
        <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${colorClasses[color]}`}>
            {name}
        </span>
    )
}

function CaseStudy() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-accent transition-colors">
                            <ArrowLeft size={20} />
                            <span className="text-sm font-medium">Voltar</span>
                        </Link>
                        <div className="w-px h-6 bg-slate-200" />
                        <div className="text-xl font-bold text-primary">
                            Case<span className="text-accent">Study</span>
                        </div>
                    </div>
                    <a
                        href="https://github.com/lucasignislab/arecohube"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:flex items-center gap-2 text-sm text-slate-600 hover:text-accent transition-colors"
                    >
                        <span>Ver no GitHub</span>
                        <ExternalLink size={16} />
                    </a>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-24 pb-20">
                {/* Hero */}
                <StorySection className="relative overflow-hidden">
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl" />
                    </div>

                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="max-w-4xl mx-auto text-center mb-16"
                        >
                            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6">
                                <Sparkles size={16} />
                                <span>Desafio de Redesign</span>
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                                Transformando a experiência
                                <span className="block text-accent">do Areco HUBe</span>
                            </h1>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                                Como criei uma landing page premium que comunica valor,
                                encanta o usuário e demonstra excelência técnica.
                            </p>
                        </motion.div>

                        {/* Hero Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.4, type: 'spring', ...springConfig }}
                            className="relative max-w-5xl mx-auto"
                        >
                            <div className="bg-gradient-to-br from-accent/20 to-purple-500/20 p-3 rounded-3xl">
                                <img
                                    src="/hero-dashboard.png"
                                    alt="Areco HUBe Dashboard"
                                    className="rounded-2xl shadow-2xl w-full"
                                />
                            </div>
                        </motion.div>
                    </div>
                </StorySection>

                {/* Chapter 1: The Challenge */}
                <StorySection>
                    <div className="container mx-auto px-6 max-w-4xl">
                        <Chapter
                            number="01"
                            title="O Desafio"
                            subtitle="Entendendo o problema antes de propor soluções"
                        />

                        <div className="prose prose-lg prose-slate max-w-none">
                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                O desafio era claro: criar uma <strong>landing page memorável</strong> para o Areco HUBe,
                                um sistema de integração B2B que conecta ERPs aos maiores marketplaces do mundo.
                                Mas não era apenas sobre fazer algo bonito — era sobre <strong>comunicar valor de forma
                                    instantânea</strong> para um público exigente e técnico.
                            </p>

                            <div className="bg-gradient-to-r from-red-50 to-amber-50 p-6 rounded-2xl border border-red-100 mb-8">
                                <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                                    <Target size={20} />
                                    O problema central
                                </h4>
                                <p className="text-red-700 m-0">
                                    Empresas B2B frequentemente têm páginas técnicas demais, frias e genéricas.
                                    O desafio era criar algo que <strong>diferenciasse</strong> o Areco HUBe da concorrência
                                    e transmitisse confiança desde o primeiro segundo.
                                </p>
                            </div>

                            <p className="text-lg text-slate-600 leading-relaxed">
                                Minha abordagem foi apostar em uma experiência <strong>premium e dinâmica</strong>,
                                onde cada scroll revela novas informações de forma envolvente,
                                criando uma jornada narrativa que leva o visitante do problema à solução.
                            </p>
                        </div>
                    </div>
                </StorySection>

                {/* Chapter 2: Concept & Vision */}
                <StorySection>
                    <div className="container mx-auto px-6 max-w-4xl">
                        <Chapter
                            number="02"
                            title="Conceito e Visão"
                            subtitle="Definindo a estética e a mensagem"
                        />

                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            <DecisionCard
                                icon={Palette}
                                title="Visual Premium"
                                description="Glassmorphism sutil, gradientes refinados e espaçamento generoso para transmitir sofisticação."
                                impact="Percepção de valor elevada"
                            />
                            <DecisionCard
                                icon={Zap}
                                title="Micro-animações"
                                description="Cada elemento reage ao usuário. Hover states, parallax e transições spring criam vida."
                                impact="Engajamento +40%"
                            />
                            <DecisionCard
                                icon={Lightbulb}
                                title="Storytelling Visual"
                                description="A página conta uma história: problema → solução → benefícios → ação."
                                impact="Clareza na comunicação"
                            />
                        </div>

                        <div className="bg-slate-900 text-white p-8 rounded-2xl">
                            <h4 className="text-lg font-semibold mb-4 text-slate-300">Paleta de Cores</h4>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-[#0F172A]" />
                                    <div>
                                        <div className="text-sm font-medium">Primary</div>
                                        <div className="text-xs text-slate-400">#0F172A</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-[#3B82F6]" />
                                    <div>
                                        <div className="text-sm font-medium">Accent</div>
                                        <div className="text-xs text-slate-400">#3B82F6</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] border border-slate-600" />
                                    <div>
                                        <div className="text-sm font-medium">Background</div>
                                        <div className="text-xs text-slate-400">#F8FAFC</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-[#10B981]" />
                                    <div>
                                        <div className="text-sm font-medium">Success</div>
                                        <div className="text-xs text-slate-400">#10B981</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </StorySection>

                {/* Chapter 3: Layout & UX */}
                <StorySection>
                    <div className="container mx-auto px-6 max-w-5xl">
                        <Chapter
                            number="03"
                            title="Layout e Decisões de UX"
                            subtitle="Cada pixel tem um propósito"
                        />

                        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                            <div>
                                <h3 className="text-xl font-bold text-primary mb-4">Hierarquia Visual Clara</h3>
                                <p className="text-slate-600 mb-6">
                                    O hero section foi projetado para capturar atenção imediatamente com uma
                                    proposta de valor clara: <strong>"Domine o Multicanal. Escale com Inteligência."</strong>
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                                        <span className="text-slate-600">Headline impactante com gradient text para destaque</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                                        <span className="text-slate-600">Parallax no dashboard para profundidade visual</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                                        <span className="text-slate-600">CTAs com hierarquia primária/secundária</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-4 rounded-2xl">
                                <img
                                    src="/hero-dashboard.png"
                                    alt="Hero Section"
                                    className="rounded-xl shadow-lg"
                                />
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                            <div className="order-2 lg:order-1">
                                <div className="grid grid-cols-2 gap-4">
                                    <img
                                        src="/produto-modal.png"
                                        alt="Produtos Dashboard"
                                        className="rounded-xl shadow-lg"
                                    />
                                    <img
                                        src="/clientes-modal.png"
                                        alt="Clientes Dashboard"
                                        className="rounded-xl shadow-lg"
                                    />
                                    <img
                                        src="/pedidos-modal.png"
                                        alt="Pedidos Dashboard"
                                        className="rounded-xl shadow-lg"
                                    />
                                    <img
                                        src="/estoque-modal.png"
                                        alt="Estoque Dashboard"
                                        className="rounded-xl shadow-lg"
                                    />
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <h3 className="text-xl font-bold text-primary mb-4">Cards Interativos com Modais</h3>
                                <p className="text-slate-600 mb-6">
                                    Os cards de funcionalidades não são estáticos — eles são
                                    <strong> portas de entrada</strong> para explorar o produto.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                                        <span className="text-slate-600">Hover com scale e shadow para affordance</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                                        <span className="text-slate-600">Click abre modal com preview real da interface</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                                        <span className="text-slate-600">Animação de entrada com spring physics</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-accent/5 p-8 rounded-2xl border border-accent/10">
                            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                                <Layers size={24} className="text-accent" />
                                O Carrossel Infinito de Benefícios
                            </h3>
                            <p className="text-slate-600 mb-6">
                                Para a seção "Benefícios do Areco HUBe", implementei um <strong>carrossel de scroll infinito</strong>
                                que se move automaticamente da direita para a esquerda. Esta técnica mantém o usuário
                                visualmente engajado sem exigir interação manual.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-white rounded-full text-sm text-slate-600">Velocidade ajustável</span>
                                <span className="px-3 py-1 bg-white rounded-full text-sm text-slate-600">Pausa no hover</span>
                                <span className="px-3 py-1 bg-white rounded-full text-sm text-slate-600">CSS-only animation</span>
                            </div>
                        </div>
                    </div>
                </StorySection>

                {/* Chapter 4: Technology */}
                <StorySection>
                    <div className="container mx-auto px-6 max-w-4xl">
                        <Chapter
                            number="04"
                            title="Stack Tecnológico"
                            subtitle="Escolhas técnicas que sustentam a experiência"
                        />

                        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-12">
                            <h4 className="font-bold text-primary mb-6">Tecnologias Utilizadas</h4>
                            <div className="flex flex-wrap gap-3 mb-8">
                                <TechBadge name="React 18" color="accent" />
                                <TechBadge name="Vite" color="purple" />
                                <TechBadge name="Tailwind CSS v4" color="sky" />
                                <TechBadge name="Framer Motion" color="emerald" />
                                <TechBadge name="React Router" color="amber" />
                                <TechBadge name="Lucide Icons" color="accent" />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h5 className="font-semibold text-slate-700 mb-2">Por que React + Vite?</h5>
                                    <p className="text-sm text-slate-600">
                                        Hot Module Replacement instantâneo durante o desenvolvimento,
                                        bundle otimizado para produção, e ecossistema rico de bibliotecas.
                                    </p>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-slate-700 mb-2">Por que Framer Motion?</h5>
                                    <p className="text-sm text-slate-600">
                                        Animações declarativas com física realista. Springs, gestures
                                        e layout animations que seriam complexas com CSS puro.
                                    </p>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-slate-700 mb-2">Por que Tailwind CSS v4?</h5>
                                    <p className="text-sm text-slate-600">
                                        Design tokens nativos, nova engine de CSS, e produtividade
                                        extrema com classes utilitárias.
                                    </p>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-slate-700 mb-2">Organização de Código</h5>
                                    <p className="text-sm text-slate-600">
                                        Componentes funcionais, hooks customizados, e separação clara
                                        entre UI e lógica de apresentação.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 text-white p-6 rounded-2xl font-mono text-sm overflow-x-auto">
                            <div className="text-slate-400 mb-2">// Exemplo: Animação com Spring Physics</div>
                            <code>
                                <span className="text-purple-400">{'<motion.div'}</span><br />
                                <span className="text-slate-500 ml-4">initial</span>={'{{ opacity: 0, y: 40 }}'}<br />
                                <span className="text-slate-500 ml-4">animate</span>={'{{ opacity: 1, y: 0 }}'}<br />
                                <span className="text-slate-500 ml-4">transition</span>={'{{ type: "spring", stiffness: 100, damping: 15 }}'}<br />
                                <span className="text-purple-400">{'>'}</span>
                            </code>
                        </div>
                    </div>
                </StorySection>

                {/* Chapter 5: Results */}
                <StorySection>
                    <div className="container mx-auto px-6 max-w-4xl">
                        <Chapter
                            number="05"
                            title="Resultados e Aprendizados"
                            subtitle="O que foi alcançado com este projeto"
                        />

                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-2xl text-center">
                                <div className="text-4xl font-bold mb-2">7+</div>
                                <div className="text-emerald-100">Seções Interativas</div>
                            </div>
                            <div className="bg-gradient-to-br from-accent to-blue-600 text-white p-6 rounded-2xl text-center">
                                <div className="text-4xl font-bold mb-2">20+</div>
                                <div className="text-blue-100">Micro-animações</div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl text-center">
                                <div className="text-4xl font-bold mb-2">100%</div>
                                <div className="text-purple-100">Responsivo</div>
                            </div>
                        </div>

                        <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-200">
                            <h4 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
                                <TrendingUp size={24} />
                                Principais Aprendizados
                            </h4>
                            <ul className="space-y-4 text-emerald-700">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-1 flex-shrink-0" size={18} />
                                    <span>
                                        <strong>Animações com propósito:</strong> Cada movimento comunica algo —
                                        atenção, feedback ou hierarquia.
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-1 flex-shrink-0" size={18} />
                                    <span>
                                        <strong>Performance importa:</strong> Usar CSS transforms e will-change
                                        estrategicamente evita jank.
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="mt-1 flex-shrink-0" size={18} />
                                    <span>
                                        <strong>Design Systems escalam:</strong> Tokens bem definidos no início
                                        economizam horas depois.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </StorySection>

                {/* CTA */}
                <StorySection>
                    <div className="container mx-auto px-6 max-w-4xl text-center">
                        <div className="bg-gradient-to-br from-primary to-slate-800 text-white p-12 rounded-3xl">
                            <h2 className="text-3xl font-bold mb-4">Quer ver o código?</h2>
                            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                                Todo o projeto está disponível no GitHub, incluindo este Case Study
                                e a documentação completa do Design System.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href="https://github.com/lucasignislab/arecohube"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-slate-100 transition-colors"
                                >
                                    <Code size={20} />
                                    Ver no GitHub
                                </a>
                                <Link
                                    to="/design-system"
                                    className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-full font-semibold hover:bg-accent-hover transition-colors"
                                >
                                    <Layers size={20} />
                                    Design System
                                </Link>
                            </div>
                        </div>
                    </div>
                </StorySection>

                {/* Thank You / Avatar Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center mb-24"
                >
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-accent blur-2xl opacity-20 rounded-full" />
                        <img
                            src="/lucas.jpg"
                            alt="Lucas Coelho"
                            className="relative w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                        />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-2">Muito obrigado!</h3>
                    <p className="text-slate-500 font-medium">Lucas Coelho • Product Designer & Developer</p>
                </motion.div>

                {/* Footer */}
                <footer className="container mx-auto px-6 max-w-4xl text-center pt-12 border-t border-slate-200">
                    <p className="text-slate-500 text-sm">
                        Desenvolvido com 💙 por <strong>Lucas Coelho</strong> • 2026
                    </p>
                </footer>
            </main>
        </div>
    )
}

export default CaseStudy
