/**
 * Renderiza o cabeçalho do jornal (masthead): nome, data e tagline.
 */

import { createElement } from '../../utils/dom.js';
import { formatMastheadDate } from '../../utils/formatters.js';

/**
 * Cria o masthead do jornal.
 * @returns {HTMLElement}
 */
export function renderMasthead() {
  const title = createElement('h1', {
    className: 'masthead__title',
    text: 'Hacker Knews',
  });

  const date = createElement('p', {
    className: 'masthead__date',
    text: formatMastheadDate(),
  });

  const tagline = createElement('p', {
    className: 'masthead__tagline',
    text: 'As 10 principais histórias do Hacker News, em tempo real.',
  });

  return createElement('header', {
    className: 'masthead',
    children: [title, date, tagline],
  });
}
