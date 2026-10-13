/**
 * Componente reutilizável que monta a linha de metadados de uma história:
 * autor, pontos, comentários e tempo relativo.
 */

import { LABELS } from '../../utils/constants.js';
import { createElement } from '../../utils/dom.js';
import {
  formatCommentsCount,
  formatRelativeTime,
  formatScore,
} from '../../utils/formatters.js';

/**
 * Cria um item de metadado (elemento `span` com classe própria).
 * @param {string} text
 * @param {string} modifierClass
 * @returns {HTMLSpanElement}
 */
function createMetaItem(text, modifierClass) {
  return createElement('span', {
    className: `story-meta__item story-meta__item--${modifierClass}`,
    text,
  });
}

/**
 * Monta o bloco de metadados de uma história.
 *
 * @param {import('../../models/Story.js').Story} story
 * @returns {HTMLDivElement}
 */
export function createStoryMeta(story) {
  const items = [
    createMetaItem(`${LABELS.BY} ${story.author}`, 'author'),
    createMetaItem(formatScore(story.score), 'score'),
    createMetaItem(formatCommentsCount(story.comments), 'comments'),
    createMetaItem(formatRelativeTime(story.publishedAt), 'time'),
  ];

  return createElement('div', {
    className: 'story-meta',
    children: items,
  });
}
