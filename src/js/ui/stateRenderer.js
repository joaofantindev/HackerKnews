/**
 * Renderiza componentes de estado (loading, erro, vazio).
 * Mantém a página informativa mesmo antes ou sem dados.
 */

import { createElement } from '../utils/dom.js';

/**
 * Estado de carregamento.
 * @returns {HTMLElement}
 */
export function renderLoadingState() {
  const spinner = createElement('div', {
    className: 'state__spinner',
    attributes: { 'aria-hidden': 'true' },
  });

  return createElement('section', {
    className: 'state state--loading',
    attributes: { role: 'status', 'aria-live': 'polite' },
    children: [
      spinner,
      createElement('p', { className: 'state__message', text: 'Carregando as notícias...' }),
    ],
  });
}

/**
 * Estado de erro, com botão para tentar novamente.
 * @param {() => void} onRetry - Callback disparado ao clicar em "Tentar novamente".
 * @returns {HTMLElement}
 */
export function renderErrorState(onRetry) {
  const retryButton = createElement('button', {
    className: 'state__retry',
    text: 'Tentar novamente',
    attributes: { type: 'button' },
  });
  retryButton.addEventListener('click', onRetry);

  return createElement('section', {
    className: 'state state--error',
    attributes: { role: 'alert' },
    children: [
      createElement('p', {
        className: 'state__message',
        text: 'Não foi possível carregar as notícias do Hacker News.',
      }),
      retryButton,
    ],
  });
}

/**
 * Estado vazio (nenhuma história encontrada).
 * @returns {HTMLElement}
 */
export function renderEmptyState() {
  return createElement('section', {
    className: 'state state--empty',
    attributes: { role: 'status' },
    children: [
      createElement('p', {
        className: 'state__message',
        text: 'Nenhuma história disponível no momento.',
      }),
    ],
  });
}
