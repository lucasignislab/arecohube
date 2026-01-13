// eslint-disable-next-line no-unused-vars -- motion é usado via JSX: <motion.section>, <motion.div>
import { motion } from 'framer-motion'
import { ArrowLeft, Palette, Type, Grid3X3, Layers, Box, BookOpen, Code, Settings, MessageSquare, Sun, Moon, Check, X, Loader2, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SPRING_CONFIG } from './constants'

// Color swatch component
function ColorSwatch({ name, hex, textColor = 'white' }) {
    return (
        <div className="flex flex-col">
            <div
                className="w-full h-16 rounded-lg shadow-md flex items-end p-2"
                style={{ backgroundColor: hex }}
            >
                <span className={`text-xs font-mono ${textColor === 'dark' ? 'text-slate-800' : 'text-white'}`}>{hex}</span>
            </div>
            <span className="text-xs font-medium text-slate-600 mt-2">{name}</span>
        </div>
    )
}

// Section wrapper
// eslint-disable-next-line no-unused-vars
function Section({ id, title, icon: SectionIcon, children }) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: 'spring', ...SPRING_CONFIG }}
            className="mb-20"
        >
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <SectionIcon className="text-accent" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-primary">{title}</h2>
            </div>
            {children}
        </motion.section>
    )
}

// Subsection component
function Subsection({ title, children }) {
    return (
        <div className="mb-10">
            <h3 className="text-lg font-semibold text-primary mb-4 pb-2 border-b border-slate-200">{title}</h3>
            {children}
        </div>
    )
}

// Component card for UI Kit
function ComponentCard({ name, children, variants }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h4 className="font-semibold text-primary mb-4">{name}</h4>
            <div className="space-y-4">
                {children}
            </div>
            {variants && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                    <span className="text-xs text-slate-500 font-medium">Variantes: {variants}</span>
                </div>
            )}
        </div>
    )
}

// Token row
function TokenRow({ name, value, preview }) {
    return (
        <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-lg">
            <code className="text-sm font-mono text-accent">{name}</code>
            <div className="flex items-center gap-4">
                {preview}
                <span className="text-sm text-slate-600 font-mono">{value}</span>
            </div>
        </div>
    )
}

function DesignSystem() {
    const sidebarItems = [
        { id: 'strategy', label: 'Estratégia e Identidade', icon: BookOpen },
        { id: 'foundations', label: 'Fundações', icon: Palette },
        { id: 'tokens', label: 'Design Tokens', icon: Layers },
        { id: 'components', label: 'Biblioteca de Componentes', icon: Box },
        { id: 'docs', label: 'Documentação', icon: Code },
        { id: 'tech', label: 'Tecnologia', icon: Settings },
        { id: 'governance', label: 'Governança', icon: MessageSquare },
    ]

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
                            Design<span className="text-accent">System</span>
                        </div>
                    </div>
                    <div className="text-sm text-slate-500">
                        v1.0.0 • Areco HUBe
                    </div>
                </div>
            </header>

            <div className="flex pt-16">
                {/* Sidebar Navigation */}
                <aside className="hidden lg:block w-64 fixed h-[calc(100vh-64px)] bg-white border-r border-slate-200 overflow-y-auto">
                    <nav className="p-4">
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">
                            Navegação
                        </div>
                        <ul className="space-y-1">
                            {sidebarItems.map((item) => (
                                <li key={item.id}>
                                    <a
                                        href={`#${item.id}`}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-accent transition-colors group"
                                    >
                                        <item.icon size={18} className="text-slate-400 group-hover:text-accent transition-colors" />
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 lg:ml-64 p-8 lg:p-12 max-w-5xl">
                    {/* Hero */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
                            Areco HUBe <span className="text-accent">Design System</span>
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl">
                            Um sistema de design escalável e robusto, criado para garantir consistência visual
                            e acelerar o desenvolvimento de produtos digitais na Areco.
                        </p>
                    </motion.div>

                    {/* 1. Strategy & Identity */}
                    <Section id="strategy" title="Estratégia e Identidade" icon={BookOpen}>
                        <Subsection title="Princípios de Design">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    { title: 'Clareza sobre Densidade', desc: 'Priorizamos interfaces limpas e respiráveis, mesmo em cenários complexos.' },
                                    { title: 'Consistência é Confiança', desc: 'Elementos previsíveis reduzem a carga cognitiva e aumentam a confiança do usuário.' },
                                    { title: 'Acessibilidade Primeiro', desc: 'Projetamos para todos os usuários, independentemente de suas capacidades.' },
                                    { title: 'Feedback Imediato', desc: 'Toda interação deve ter uma resposta visual clara e instantânea.' },
                                    { title: 'Escalabilidade Modular', desc: 'Componentes atômicos se combinam para criar experiências complexas.' },
                                ].map((principle, i) => (
                                    <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                        <h4 className="font-semibold text-primary mb-2">{principle.title}</h4>
                                        <p className="text-sm text-slate-600">{principle.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </Subsection>

                        <Subsection title="Declaração de Propósito">
                            <div className="bg-linear-to-r from-accent/5 to-sky-400/5 p-6 rounded-2xl border border-accent/10">
                                <p className="text-slate-700 leading-relaxed">
                                    O <strong>Areco HUBe Design System</strong> existe para resolver o problema da
                                    fragmentação visual e da inconsistência entre produtos. Ele serve como a
                                    <strong> única fonte de verdade</strong> para designers e desenvolvedores,
                                    garantindo que toda a experiência do usuário seja coesa, acessível e escalável.
                                </p>
                            </div>
                        </Subsection>

                        <Subsection title="Glossário (Linguagem Ubíqua)">
                            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="text-left p-4 font-semibold text-slate-700">Termo</th>
                                            <th className="text-left p-4 font-semibold text-slate-700">Definição</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {[
                                            { term: 'Token', def: 'Variável de design que armazena um valor visual (cor, espaçamento, tipografia).' },
                                            { term: 'Primitivo', def: 'Token de base que define valores brutos (ex: blue-500: #3B82F6).' },
                                            { term: 'Semântico', def: 'Token que define propósito (ex: color-bg-primary).' },
                                            { term: 'Componente', def: 'Elemento de UI reutilizável e documentado.' },
                                            { term: 'Variante', def: 'Versão alternativa de um componente (tamanho, estilo, estado).' },
                                        ].map((item, i) => (
                                            <tr key={i}>
                                                <td className="p-4 font-mono text-accent">{item.term}</td>
                                                <td className="p-4 text-slate-600">{item.def}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Subsection>
                    </Section>

                    {/* 2. Foundations */}
                    <Section id="foundations" title="Fundações (Foundations)" icon={Palette}>
                        <Subsection title="Cores - Paleta Primitiva">
                            <div className="grid grid-cols-5 gap-3 mb-8">
                                <ColorSwatch name="Blue 50" hex="#EFF6FF" textColor="dark" />
                                <ColorSwatch name="Blue 100" hex="#DBEAFE" textColor="dark" />
                                <ColorSwatch name="Blue 300" hex="#93C5FD" textColor="dark" />
                                <ColorSwatch name="Blue 500" hex="#3B82F6" />
                                <ColorSwatch name="Blue 700" hex="#1D4ED8" />
                            </div>
                            <div className="grid grid-cols-5 gap-3 mb-8">
                                <ColorSwatch name="Slate 50" hex="#F8FAFC" textColor="dark" />
                                <ColorSwatch name="Slate 200" hex="#E2E8F0" textColor="dark" />
                                <ColorSwatch name="Slate 500" hex="#64748B" />
                                <ColorSwatch name="Slate 700" hex="#334155" />
                                <ColorSwatch name="Slate 900" hex="#0F172A" />
                            </div>
                        </Subsection>

                        <Subsection title="Cores - Paleta Semântica">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <div className="w-full h-12 rounded-lg bg-accent mb-3" />
                                    <span className="text-sm font-medium text-slate-700">Primary Action</span>
                                    <p className="text-xs text-slate-500 mt-1">Ações principais e CTAs</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <div className="w-full h-12 rounded-lg bg-emerald-500 mb-3" />
                                    <span className="text-sm font-medium text-slate-700">Success</span>
                                    <p className="text-xs text-slate-500 mt-1">Confirmações e êxito</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <div className="w-full h-12 rounded-lg bg-amber-500 mb-3" />
                                    <span className="text-sm font-medium text-slate-700">Warning</span>
                                    <p className="text-xs text-slate-500 mt-1">Alertas e atenção</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-200">
                                    <div className="w-full h-12 rounded-lg bg-red-500 mb-3" />
                                    <span className="text-sm font-medium text-slate-700">Error</span>
                                    <p className="text-xs text-slate-500 mt-1">Erros e estados críticos</p>
                                </div>
                            </div>
                        </Subsection>

                        <Subsection title="Tipografia">
                            <div className="mb-8">
                                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Família Tipográfica</h4>
                                <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <span className="text-6xl font-bold text-primary">Aa</span>
                                        <div>
                                            <div className="text-2xl font-bold text-primary">Inter</div>
                                            <p className="text-sm text-slate-500">Sans-serif • Google Fonts</p>
                                        </div>
                                    </div>
                                    <div className="hidden md:block max-w-xs text-xs text-slate-400 font-mono leading-relaxed">
                                        ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                                        abcdefghijklmnopqrstuvwxyz<br />
                                        0123456789!@#$%^&*()
                                    </div>
                                </div>
                            </div>

                            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Escalas e Estilos</h4>
                            <div className="space-y-6 bg-white p-6 rounded-xl border border-slate-200">
                                <div className="flex items-baseline justify-between pb-4 border-b border-slate-100">
                                    <div>
                                        <span className="text-5xl font-bold text-primary">Display</span>
                                        <p className="text-sm text-slate-500 mt-1">48px / 700 / 1.1 line-height</p>
                                    </div>
                                    <code className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">font-display</code>
                                </div>
                                <div className="flex items-baseline justify-between pb-4 border-b border-slate-100">
                                    <div>
                                        <span className="text-3xl font-bold text-primary">Heading 1</span>
                                        <p className="text-sm text-slate-500 mt-1">30px / 700 / 1.2 line-height</p>
                                    </div>
                                    <code className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">font-h1</code>
                                </div>
                                <div className="flex items-baseline justify-between pb-4 border-b border-slate-100">
                                    <div>
                                        <span className="text-xl font-semibold text-primary">Heading 2</span>
                                        <p className="text-sm text-slate-500 mt-1">20px / 600 / 1.3 line-height</p>
                                    </div>
                                    <code className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">font-h2</code>
                                </div>
                                <div className="flex items-baseline justify-between pb-4 border-b border-slate-100">
                                    <div>
                                        <span className="text-base text-slate-700">Body Text - Lorem ipsum dolor sit amet.</span>
                                        <p className="text-sm text-slate-500 mt-1">16px / 400 / 1.5 line-height</p>
                                    </div>
                                    <code className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">font-body</code>
                                </div>
                                <div className="flex items-baseline justify-between">
                                    <div>
                                        <span className="text-sm text-slate-500">Caption Text</span>
                                        <p className="text-sm text-slate-500 mt-1">14px / 400 / 1.4 line-height</p>
                                    </div>
                                    <code className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">font-caption</code>
                                </div>
                            </div>
                        </Subsection>

                        <Subsection title="Espaçamento e Grid">
                            <div className="bg-white p-6 rounded-xl border border-slate-200">
                                <p className="text-sm text-slate-600 mb-6">
                                    Sistema baseado em múltiplos de <strong>4px</strong> para precisão e <strong>8px</strong> para espaçamento padrão.
                                </p>
                                <div className="flex items-end gap-2 mb-6">
                                    {[4, 8, 12, 16, 24, 32, 48, 64].map((size) => (
                                        <div key={size} className="flex flex-col items-center">
                                            <div
                                                className="bg-accent/20 border border-accent/40 rounded"
                                                style={{ width: size, height: size }}
                                            />
                                            <span className="text-xs text-slate-500 mt-2">{size}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div className="bg-slate-50 p-4 rounded-lg">
                                        <span className="font-semibold text-primary">Mobile</span>
                                        <p className="text-slate-500">&lt; 640px • 4 cols</p>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-lg">
                                        <span className="font-semibold text-primary">Tablet</span>
                                        <p className="text-slate-500">640-1024px • 8 cols</p>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-lg">
                                        <span className="font-semibold text-primary">Desktop</span>
                                        <p className="text-slate-500">&gt; 1024px • 12 cols</p>
                                    </div>
                                </div>
                            </div>
                        </Subsection>

                        <Subsection title="Elevação e Sombras">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                    { name: 'Level 0', class: 'shadow-none', desc: 'Flat / Inline' },
                                    { name: 'Level 1', class: 'shadow-sm', desc: 'Cards, Inputs' },
                                    { name: 'Level 2', class: 'shadow-lg', desc: 'Dropdowns' },
                                    { name: 'Level 3', class: 'shadow-2xl', desc: 'Modals, FAB' },
                                ].map((shadow) => (
                                    <div key={shadow.name} className="flex flex-col items-center">
                                        <div className={`w-20 h-20 bg-white rounded-xl ${shadow.class} border border-slate-100`} />
                                        <span className="text-sm font-medium text-slate-700 mt-3">{shadow.name}</span>
                                        <span className="text-xs text-slate-500">{shadow.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </Subsection>

                        <Subsection title="Radii (Bordas)">
                            <div className="flex items-end gap-6">
                                {[
                                    { name: 'None', class: 'rounded-none', value: '0px' },
                                    { name: 'Small', class: 'rounded', value: '4px' },
                                    { name: 'Medium', class: 'rounded-lg', value: '8px' },
                                    { name: 'Large', class: 'rounded-xl', value: '12px' },
                                    { name: 'XL', class: 'rounded-2xl', value: '16px' },
                                    { name: 'Full', class: 'rounded-full', value: '9999px' },
                                ].map((radius) => (
                                    <div key={radius.name} className="flex flex-col items-center">
                                        <div className={`w-16 h-16 bg-accent/20 border-2 border-accent ${radius.class}`} />
                                        <span className="text-sm font-medium text-slate-700 mt-3">{radius.name}</span>
                                        <span className="text-xs text-slate-500">{radius.value}</span>
                                    </div>
                                ))}
                            </div>
                        </Subsection>
                    </Section>

                    {/* 3. Design Tokens */}
                    <Section id="tokens" title="Design Tokens" icon={Layers}>
                        <Subsection title="Arquitetura de Tokens">
                            <div className="bg-white p-6 rounded-xl border border-slate-200">
                                <div className="flex items-center justify-between text-center gap-4">
                                    <div className="flex-1 bg-slate-100 p-4 rounded-xl">
                                        <div className="text-sm font-semibold text-slate-700 mb-1">Primitivo</div>
                                        <code className="text-xs text-accent">blue-500</code>
                                        <p className="text-xs text-slate-500 mt-2">Valor bruto</p>
                                    </div>
                                    <ChevronRight className="text-slate-400" />
                                    <div className="flex-1 bg-accent/10 p-4 rounded-xl">
                                        <div className="text-sm font-semibold text-slate-700 mb-1">Semântico</div>
                                        <code className="text-xs text-accent">color-action-primary</code>
                                        <p className="text-xs text-slate-500 mt-2">Propósito definido</p>
                                    </div>
                                    <ChevronRight className="text-slate-400" />
                                    <div className="flex-1 bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                                        <div className="text-sm font-semibold text-slate-700 mb-1">Componente</div>
                                        <code className="text-xs text-emerald-600">btn-bg-primary</code>
                                        <p className="text-xs text-slate-500 mt-2">Uso específico</p>
                                    </div>
                                </div>
                            </div>
                        </Subsection>

                        <Subsection title="Dicionário de Variáveis">
                            <div className="space-y-2">
                                <TokenRow
                                    name="--color-bg-primary"
                                    value="#FFFFFF"
                                    preview={<div className="w-6 h-6 rounded bg-white border border-slate-200" />}
                                />
                                <TokenRow
                                    name="--color-bg-secondary"
                                    value="#F8FAFC"
                                    preview={<div className="w-6 h-6 rounded bg-slate-50 border border-slate-200" />}
                                />
                                <TokenRow
                                    name="--color-text-primary"
                                    value="#0F172A"
                                    preview={<div className="w-6 h-6 rounded bg-primary" />}
                                />
                                <TokenRow
                                    name="--color-action-primary"
                                    value="#3B82F6"
                                    preview={<div className="w-6 h-6 rounded bg-accent" />}
                                />
                                <TokenRow
                                    name="--spacing-md"
                                    value="16px"
                                    preview={<div className="w-4 h-4 bg-accent/30 rounded" />}
                                />
                                <TokenRow
                                    name="--radius-lg"
                                    value="12px"
                                    preview={<div className="w-6 h-4 bg-accent/30 rounded-xl" />}
                                />
                            </div>
                        </Subsection>

                        <Subsection title="Suporte a Temas">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-xl border border-slate-200">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Sun size={20} className="text-amber-500" />
                                        <span className="font-semibold text-slate-700">Light Mode</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                            <span className="text-sm text-slate-700">Background</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded bg-white border border-slate-200" />
                                                <code className="text-xs text-slate-500">#FFFFFF</code>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                            <span className="text-sm text-slate-700">Text</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded bg-slate-900" />
                                                <code className="text-xs text-slate-500">#0F172A</code>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Moon size={20} className="text-slate-400" />
                                        <span className="font-semibold text-white">Dark Mode</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                                            <span className="text-sm text-slate-300">Background</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded bg-slate-900 border border-slate-700" />
                                                <code className="text-xs text-slate-400">#0F172A</code>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                                            <span className="text-sm text-slate-300">Text</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded bg-white" />
                                                <code className="text-xs text-slate-400">#FFFFFF</code>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Subsection>
                    </Section>

                    {/* 4. Component Library */}
                    <Section id="components" title="Biblioteca de Componentes (UI Kit)" icon={Box}>
                        <Subsection title="Componentes Atômicos">
                            <div className="grid md:grid-cols-2 gap-6">
                                <ComponentCard name="Botões" variants="Primary, Secondary, Ghost, Danger">
                                    <div className="flex flex-wrap gap-3">
                                        <button className="bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-accent-hover transition-colors">Primary</button>
                                        <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-200 transition-colors">Secondary</button>
                                        <button className="text-accent px-4 py-2 rounded-full text-sm font-semibold hover:bg-accent/10 transition-colors">Ghost</button>
                                        <button className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors">Danger</button>
                                    </div>
                                </ComponentCard>

                                <ComponentCard name="Inputs" variants="Default, Focus, Error, Disabled">
                                    <input type="text" placeholder="Default input" className="w-full p-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent" />
                                    <input type="text" placeholder="Error state" className="w-full p-3 border-2 border-red-400 rounded-lg text-sm bg-red-50" />
                                    <input type="text" placeholder="Disabled" disabled className="w-full p-3 border border-slate-200 rounded-lg text-sm bg-slate-100 text-slate-400 cursor-not-allowed" />
                                </ComponentCard>

                                <ComponentCard name="Tags / Badges">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold">Default</span>
                                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">Success</span>
                                        <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">Warning</span>
                                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">Error</span>
                                    </div>
                                </ComponentCard>

                                <ComponentCard name="Checkboxes & Toggles">
                                    <div className="flex items-center gap-6">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 text-accent focus:ring-accent" />
                                            <span className="text-sm text-slate-700">Checked</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-accent focus:ring-accent" />
                                            <span className="text-sm text-slate-700">Unchecked</span>
                                        </label>
                                    </div>
                                </ComponentCard>
                            </div>
                        </Subsection>

                        <Subsection title="Estados Interativos">
                            <div className="bg-white p-6 rounded-xl border border-slate-200">
                                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
                                    <div className="p-4 bg-accent text-white rounded-lg text-sm font-medium">Default</div>
                                    <div className="p-4 bg-accent-hover text-white rounded-lg text-sm font-medium">Hover</div>
                                    <div className="p-4 bg-blue-700 text-white rounded-lg text-sm font-medium">Active</div>
                                    <div className="p-4 bg-accent text-white rounded-lg text-sm font-medium ring-4 ring-accent/30">Focus</div>
                                    <div className="p-4 bg-slate-200 text-slate-400 rounded-lg text-sm font-medium">Disabled</div>
                                    <div className="p-4 bg-accent text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                                        <Loader2 size={16} className="animate-spin" /> Loading
                                    </div>
                                </div>
                            </div>
                        </Subsection>

                        <Subsection title="Componentes Moleculares">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                                        <Box className="text-accent" size={24} />
                                    </div>
                                    <h4 className="font-semibold text-primary mb-2">Card Component</h4>
                                    <p className="text-sm text-slate-600 mb-4">Contêiner versátil para agrupar informações relacionadas.</p>
                                    <button className="text-accent text-sm font-semibold hover:underline">Saiba mais →</button>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">JD</div>
                                        <div>
                                            <div className="font-semibold text-primary">John Doe</div>
                                            <div className="text-xs text-slate-500">Desenvolvedor Frontend</div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-600">Avatar + User Info List Item</p>
                                </div>
                            </div>
                        </Subsection>
                    </Section>

                    {/* 5. Documentation */}
                    <Section id="docs" title="Documentação e Diretrizes" icon={Code}>
                        <Subsection title="Getting Started">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-xl border border-slate-200">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Palette size={20} className="text-accent" />
                                        <span className="font-semibold text-slate-700">Para Designers</span>
                                    </div>
                                    <ol className="space-y-2 text-sm text-slate-600 list-decimal list-inside">
                                        <li>Acesse a biblioteca compartilhada no Figma</li>
                                        <li>Ative "Areco DS" nas suas bibliotecas</li>
                                        <li>Arraste componentes para seu canvas</li>
                                    </ol>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-slate-200">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Code size={20} className="text-accent" />
                                        <span className="font-semibold text-slate-700">Para Desenvolvedores</span>
                                    </div>
                                    <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm">
                                        <code>npm install @areco/design-system</code>
                                    </div>
                                </div>
                            </div>
                        </Subsection>

                        <Subsection title="Do's and Don'ts">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Check size={20} className="text-emerald-600" />
                                        <span className="font-semibold text-emerald-800">Do's</span>
                                    </div>
                                    <ul className="space-y-2 text-sm text-emerald-700">
                                        <li>✓ Use tokens semânticos para cores</li>
                                        <li>✓ Mantenha espaçamento consistente (8px)</li>
                                        <li>✓ Teste acessibilidade com leitores de tela</li>
                                        <li>✓ Documente variações de componentes</li>
                                    </ul>
                                </div>
                                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                                    <div className="flex items-center gap-2 mb-4">
                                        <X size={20} className="text-red-600" />
                                        <span className="font-semibold text-red-800">Don'ts</span>
                                    </div>
                                    <ul className="space-y-2 text-sm text-red-700">
                                        <li>✗ Cores hardcoded fora do sistema</li>
                                        <li>✗ Criar estilos de texto customizados</li>
                                        <li>✗ Ignorar estados de hover e focus</li>
                                        <li>✗ Alterar tokens de componentes diretamente</li>
                                    </ul>
                                </div>
                            </div>
                        </Subsection>

                        <Subsection title="Diretrizes de Acessibilidade">
                            <div className="bg-white p-6 rounded-xl border border-slate-200">
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-8 h-8 bg-accent rounded flex items-center justify-center text-white text-xs font-bold">Aa</div>
                                            <span className="font-semibold text-slate-700">Contraste</span>
                                        </div>
                                        <p className="text-sm text-slate-600">Mínimo 4.5:1 para texto normal, 3:1 para texto grande (WCAG AA).</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center">👆</div>
                                            <span className="font-semibold text-slate-700">Área de Toque</span>
                                        </div>
                                        <p className="text-sm text-slate-600">Elementos interativos devem ter no mínimo 44x44px.</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center">🔊</div>
                                            <span className="font-semibold text-slate-700">Leitores de Tela</span>
                                        </div>
                                        <p className="text-sm text-slate-600">Todos os componentes possuem aria-labels apropriados.</p>
                                    </div>
                                </div>
                            </div>
                        </Subsection>
                    </Section>

                    {/* 6. Technology */}
                    <Section id="tech" title="Tecnologia e Entregáveis" icon={Settings}>
                        <Subsection title="Sincronia Design-Code">
                            <div className="bg-white p-6 rounded-xl border border-slate-200">
                                <div className="flex items-center justify-between text-center gap-4">
                                    <div className="flex-1 p-4 bg-purple-50 rounded-xl border border-purple-200">
                                        <span className="text-2xl mb-2 block">🎨</span>
                                        <span className="font-semibold text-slate-700">Figma</span>
                                        <p className="text-xs text-slate-500 mt-1">Design Tokens</p>
                                    </div>
                                    <ChevronRight className="text-slate-400" />
                                    <div className="flex-1 p-4 bg-amber-50 rounded-xl border border-amber-200">
                                        <span className="text-2xl mb-2 block">🔄</span>
                                        <span className="font-semibold text-slate-700">Tokens Studio</span>
                                        <p className="text-xs text-slate-500 mt-1">Sync Layer</p>
                                    </div>
                                    <ChevronRight className="text-slate-400" />
                                    <div className="flex-1 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                                        <span className="text-2xl mb-2 block">💻</span>
                                        <span className="font-semibold text-slate-700">Código</span>
                                        <p className="text-xs text-slate-500 mt-1">CSS Variables</p>
                                    </div>
                                </div>
                            </div>
                        </Subsection>

                        <Subsection title="Storybook & Playground">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-linear-to-br from-pink-500 to-orange-500 p-6 rounded-xl text-white">
                                    <span className="text-3xl mb-4 block">📕</span>
                                    <h4 className="font-bold text-xl mb-2">Storybook</h4>
                                    <p className="text-white/80 text-sm mb-4">Visualize todos os componentes em ambiente isolado com controles interativos.</p>
                                    <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors">
                                        Acessar Storybook →
                                    </button>
                                </div>
                                <div className="bg-linear-to-br from-violet-500 to-blue-500 p-6 rounded-xl text-white">
                                    <span className="text-3xl mb-4 block">🎮</span>
                                    <h4 className="font-bold text-xl mb-2">Playground</h4>
                                    <p className="text-white/80 text-sm mb-4">Teste componentes em tempo real com código editável e preview instantâneo.</p>
                                    <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors">
                                        Abrir Playground →
                                    </button>
                                </div>
                            </div>
                        </Subsection>
                    </Section>

                    {/* 7. Governance */}
                    <Section id="governance" title="Governança e Manutenção" icon={MessageSquare}>
                        <Subsection title="Changelog (Log de Alterações)">
                            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                                    <div>
                                        <span className="font-semibold text-primary">v1.0.0</span>
                                        <span className="text-slate-400 mx-2">•</span>
                                        <span className="text-sm text-slate-500">13 Jan 2026</span>
                                    </div>
                                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-semibold">Latest</span>
                                </div>
                                <div className="p-4 text-sm text-slate-600">
                                    <ul className="space-y-1">
                                        <li>🎉 Lançamento inicial do Design System</li>
                                        <li>✨ Adicionados 15 componentes atômicos</li>
                                        <li>🎨 Definida paleta de cores completa</li>
                                        <li>📝 Documentação inicial e guidelines</li>
                                    </ul>
                                </div>
                            </div>
                        </Subsection>

                        <Subsection title="Versionamento (SemVer)">
                            <div className="bg-white p-6 rounded-xl border border-slate-200">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                                        <div className="text-2xl font-bold text-red-600 mb-1">1</div>
                                        <div className="text-sm font-medium text-slate-700">Major</div>
                                        <p className="text-xs text-slate-500 mt-1">Breaking changes</p>
                                    </div>
                                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                                        <div className="text-2xl font-bold text-amber-600 mb-1">0</div>
                                        <div className="text-sm font-medium text-slate-700">Minor</div>
                                        <p className="text-xs text-slate-500 mt-1">New features</p>
                                    </div>
                                    <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                                        <div className="text-2xl font-bold text-emerald-600 mb-1">0</div>
                                        <div className="text-sm font-medium text-slate-700">Patch</div>
                                        <p className="text-xs text-slate-500 mt-1">Bug fixes</p>
                                    </div>
                                </div>
                            </div>
                        </Subsection>

                        <Subsection title="Modelo de Contribuição">
                            <div className="bg-white p-6 rounded-xl border border-slate-200">
                                <div className="flex items-start gap-4">
                                    {[
                                        { step: 1, title: 'Proposta', desc: 'Abra uma issue descrevendo o componente ou mudança.' },
                                        { step: 2, title: 'Revisão', desc: 'Time de Design System avalia viabilidade.' },
                                        { step: 3, title: 'Desenvolvimento', desc: 'Implemente seguindo as guidelines.' },
                                        { step: 4, title: 'Merge', desc: 'Após aprovação, integrado ao sistema.' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex-1 text-center">
                                            <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold mx-auto mb-3">
                                                {item.step}
                                            </div>
                                            <div className="font-semibold text-primary text-sm mb-1">{item.title}</div>
                                            <p className="text-xs text-slate-500">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Subsection>

                        <Subsection title="Canais de Suporte">
                            <div className="grid md:grid-cols-3 gap-4">
                                <a href="#" className="bg-white p-5 rounded-xl border border-slate-200 hover:border-accent hover:shadow-md transition-all group">
                                    <div className="text-xl mb-2">💬</div>
                                    <div className="font-semibold text-slate-700 group-hover:text-accent">Slack</div>
                                    <p className="text-sm text-slate-500">#design-system</p>
                                </a>
                                <a href="#" className="bg-white p-5 rounded-xl border border-slate-200 hover:border-accent hover:shadow-md transition-all group">
                                    <div className="text-xl mb-2">🐛</div>
                                    <div className="font-semibold text-slate-700 group-hover:text-accent">GitHub Issues</div>
                                    <p className="text-sm text-slate-500">Reportar bugs</p>
                                </a>
                                <a href="#" className="bg-white p-5 rounded-xl border border-slate-200 hover:border-accent hover:shadow-md transition-all group">
                                    <div className="text-xl mb-2">📧</div>
                                    <div className="font-semibold text-slate-700 group-hover:text-accent">Email</div>
                                    <p className="text-sm text-slate-500">ds@areco.com.br</p>
                                </a>
                            </div>
                        </Subsection>
                    </Section>

                    {/* Footer */}
                    <footer className="mt-20 pt-8 border-t border-slate-200 text-center">
                        <p className="text-sm text-slate-500">
                            Areco HUBe Design System v1.0.0 • Mantido pelo Time de Produto • 2026
                        </p>
                    </footer>
                </main>
            </div>
        </div>
    )
}

export default DesignSystem
