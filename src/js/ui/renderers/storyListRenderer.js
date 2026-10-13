/**
 * Renderiza a listagem numerada com as 10 histórias.
 */

import { LABELS } from '../../utils/constants.js';
import { createElement, createExternalLink } from '../../utils/dom.js';
import { extractDomain, formatRelativeTime } from '../../utils/formatters.js';

/**
 * Cria uma linha da listagem numerada.
 *
 * @param {import('../../models/Story.js').Story} story
 * @returns {HTMLLIElement}
 */
function createStoryListItem(story) {
  const rank = createElement('span', {
    className: 'story-list__rank',
    text: String(story.rank),
  });

  const title = createElement('div', {
    className: 'story-list__title',
    children: [createExternalLink(story.url, story.title, 'story-list__link')],
  });

  const domain = extractDomain(story.url);
  if (domain) {
    title.append(
      createElement('span', { className: 'story-list__domain', text: ` (${domain})` }),
    );
  }

  const details = createElement('p', {
    className: 'story-list__details',
    text: [
      `${story.score} ${LABELS.POINTS}`,
      `${story.comments} ${LABELS.COMMENTS}`,
      formatRelativeTime(story.publishedAt),
    ].join(' · '),
  });

  return createElement('li', {
    className: 'story-list__item',
    children: [rank, createElement('div', { className: 'story-list__body', children: [title, details] })],
  });
}

/**
 * Renderiza a seção de listagem numerada.
 *
 * @param {import('../../models/Story.js').Story[]} stories
 * @returns {HTMLElement}
 */
export function renderStoryList(stories) {
  const heading = createElement('h2', {
    className: 'section-title',
    text: `Top ${stories.length}`,
  });

  const list = createElement('ol', {
    className: 'story-list',
    children: stories.map(createStoryListItem),
  });

  return createElement('section', {
    className: 'section section--list',
    children: [heading, list],
  });
}
