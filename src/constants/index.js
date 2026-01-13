/**
 * Configuração padrão de animação spring para Framer Motion.
 * Usada para criar animações suaves e naturais em todo o projeto.
 *
 * @property {number} stiffness - Rigidez da mola (100 = animação moderada)
 * @property {number} damping - Amortecimento (15 = pouco bounce)
 * @property {number} mass - Massa do objeto (0.5 = leve e responsivo)
 */
export const SPRING_CONFIG = {
    stiffness: 100,
    damping: 15,
    mass: 0.5,
}

/**
 * Lista de marcas de marketplaces integrados ao Areco HUBe.
 */
export const MARKETPLACE_BRANDS = [
    'Mercado Livre',
    'Americanas',
    'Amazon',
    'Magalu',
    'Shopee',
    'B2W',
    'Via Varejo',
    'Carrefour',
]
