/**
 * Renderiza a seção de matérias (histórias em destaque secundário).
 */

import { createElement, createExternalLink } from '../../utils/dom.js';
import { extractDomain } from '../../utils/formatters.js';
import { createStoryMeta } from '../components/storyMeta.js';

/**
 * Cria o card de uma matéria.
 *
 * @param {import('../../models/Story.js').Story} story
 * @returns {HTMLElement}
 */
function createArticleCard(story) {
  const domain = extractDomain(story.url);

  const title = createElement('h3', {
    className: 'article-card__title',
    children: [
      createExternalLink(story.url, story.title, 'article-card__link'),
    ],
  });

  const children = [title];

  if (domain) {
    children.push(
      createElement('p', { className: 'article-card__domain', text: domain }),
    );
  }

  children.push(createStoryMeta(story));

  return createElement('article', {
    className: 'article-card',
    children,
  });
}

/**
 * Renderiza a seção de matérias.
 *
 * @param {import('../../models/Story.js').Story[]} stories
 * @returns {HTMLElement}
 */
export function renderArticles(stories) {
  const heading = createElement('h2', {
    className: 'section-title',
    text: 'Matérias',
  });

  const grid = createElement('div', {
    className: 'article-grid',
    children: stories.map(createArticleCard),
  });

  return createElement('section', {
    className: 'section section--articles',
    children: [heading, grid],
  });
}
