/**
 * Serviço de notícias: compõe a API com o modelo de domínio.
 * É a única porta de entrada da UI para obter histórias.
 */

import { fetchStoryById, fetchTopStoryIds } from '../api/hackerNewsApi.js';
import { Story } from '../models/Story.js';
import { STORY_FETCH_BUFFER, TOP_STORIES_LIMIT } from '../utils/constants.js';

/**
 * Busca e normaliza as principais histórias do Hacker News.
 *
 * Estratégia:
 * 1. Obtém os IDs das top histórias.
 * 2. Busca os itens em paralelo (`Promise.all`), pedindo uma folga além do
 *    limite para compensar itens removidos ou que não são histórias.
 * 3. Filtra itens inválidos, preserva a ordem original e limita ao total.
 *
 * @param {number} [limit=TOP_STORIES_LIMIT] - Quantidade desejada.
 * @returns {Promise<Story[]>}
 */
export async function getTopStories(limit = TOP_STORIES_LIMIT) {
  const storyIds = await fetchTopStoryIds();
  if (storyIds.length === 0) return [];

  const candidateIds = storyIds.slice(0, limit + STORY_FETCH_BUFFER);
  const fetchedItems = await Promise.all(candidateIds.map(fetchStoryById));

  const validStories = fetchedItems
    .filter((item) => Story.isValidApiItem(item))
    .map((item, index) => Story.fromApiItem(item, index + 1));

  return validStories.slice(0, limit);
}

/**
 * Divide as histórias nas seções do jornal.
 *
 * @param {Story[]} stories - Lista completa, já ordenada por ranking.
 * @returns {{ headline: Story|null, featured: Story[], all: Story[] }}
 */
export function splitStoriesIntoSections(stories) {
  const [headline = null, ...remaining] = stories;

  return {
    headline,
    featured: remaining.slice(0, 3),
    all: stories,
  };
}
