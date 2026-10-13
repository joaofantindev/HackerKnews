/**
 * Camada de acesso à API pública do Hacker News.
 * Responsável apenas por HTTP; não conhece regras de negócio nem UI.
 */

import {
  HACKER_NEWS_API_BASE_URL,
  REQUEST_TIMEOUT_MS,
} from '../utils/constants.js';

/**
 * Executa um `fetch` com timeout via `AbortController`.
 *
 * @param {string} url - Endpoint absoluto.
 * @returns {Promise<unknown>} Corpo da resposta já convertido em JSON.
 * @throws {Error} Se a rede falhar, o tempo esgotar ou o status não for 2xx.
 */
async function fetchJson(url) {
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => abortController.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: abortController.signal });

    if (!response.ok) {
      throw new Error(`Falha na requisição (${response.status}): ${url}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Busca os identificadores das principais histórias.
 * @returns {Promise<number[]>}
 */
export async function fetchTopStoryIds() {
  const ids = await fetchJson(`${HACKER_NEWS_API_BASE_URL}/topstories.json`);
  return Array.isArray(ids) ? ids : [];
}

/**
 * Busca um item pelo seu identificador.
 * Retorna `null` em caso de falha isolada, para não derrubar a listagem inteira.
 *
 * @param {number} storyId
 * @returns {Promise<Object|null>}
 */
export async function fetchStoryById(storyId) {
  try {
    return await fetchJson(`${HACKER_NEWS_API_BASE_URL}/item/${storyId}.json`);
  } catch (error) {
    console.warn(`Não foi possível carregar a história ${storyId}.`, error);
    return null;
  }
}
