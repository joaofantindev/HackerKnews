/**
 * Renderiza a manchete principal (história de maior destaque).
 */

import { createElement, createExternalLink } from '../../utils/dom.js';
import { extractDomain } from '../../utils/formatters.js';
import { createStoryMeta } from '../components/storyMeta.js';

/**
 * Cria o link principal da manchete, com o domínio de origem em destaque.
 *
 * @param {import('../../models/Story.js').Story} story
 * @returns {HTMLAnchorElement}
 */
function createHeadlineLink(story) {
  const domain = extractDomain(story.url);

  const title = createElement('span', {
    className: 'headline__title',
    text: story.title,
  });

  const children = [title];
  if (domain) {
    children.push(
      createElement('span', { className: 'headline__domain', text: `(${domain})` }),
    );
  }

  const link = createExternalLink(story.url, '', 'headline__link');
  link.replaceChildren(...children);
  return link;
}

/**
 * Renderiza a seção de manchete.
 *
 * @param {import('../../models/Story.js').Story} story
 * @returns {HTMLElement}
 */
export function renderHeadline(story) {
  const rank = createElement('span', {
    className: 'headline__label',
    text: 'Manchete principal',
  });

  return createElement('article', {
    className: 'headline',
    children: [rank, createHeadlineLink(story), createStoryMeta(story)],
  });
}
