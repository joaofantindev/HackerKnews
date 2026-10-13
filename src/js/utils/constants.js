/**
 * Constantes globais da aplicação.
 * Centraliza valores mágicos para facilitar ajustes e leitura.
 */

/** Base da API pública do Hacker News (Firebase, sem autenticação). */
export const HACKER_NEWS_API_BASE_URL = 'https://hacker-news.firebaseio.com/v0';

/** Quantidade de histórias exibidas no jornal. */
export const TOP_STORIES_LIMIT = 10;

/**
 * Folga de itens buscados além do limite.
 * Compensa itens removidos ou que não são histórias (ex.: vagas de emprego),
 * garantindo que a listagem final complete o total desejado.
 */
export const STORY_FETCH_BUFFER = 10;

/** Quantas histórias adicionais aparecem na seção de matérias. */
export const FEATURED_ARTICLES_COUNT = 3;

/** Início (inclusive) do intervalo usado na seção de matérias. */
export const FEATURED_ARTICLES_START_INDEX = 1;

/** Tempo máximo (ms) de espera por uma requisição antes de abortar. */
export const REQUEST_TIMEOUT_MS = 10000;

/** Estados possíveis de renderização da página. */
export const APP_STATE = Object.freeze({
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  EMPTY: 'empty',
});

/** Rótulos em português para pontos e comentários. */
export const LABELS = Object.freeze({
  POINTS: 'pts',
  COMMENTS: 'comentários',
  COMMENT_SINGULAR: 'comentário',
  BY: 'por',
  NOW: 'agora',
});
