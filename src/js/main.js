/**
 * Ponto de entrada da aplicação.
 * Orquestra o fluxo: carregar dados → decidir estado → renderizar.
 */

import { getTopStories, splitStoriesIntoSections } from './services/newsService.js';
import { APP_STATE } from './utils/constants.js';
import { clearElement, createHorizontalRule } from './utils/dom.js';
import { renderMasthead } from './ui/renderers/mastheadRenderer.js';
import { renderHeadline } from './ui/renderers/headlineRenderer.js';
import { renderArticles } from './ui/renderers/articleRenderer.js';
import { renderStoryList } from './ui/renderers/storyListRenderer.js';
import {
  renderEmptyState,
  renderErrorState,
  renderLoadingState,
} from './ui/stateRenderer.js';

/** Elemento raiz onde todo o jornal é montado. */
const rootElement = document.getElementById('app');

/**
 * Atualiza o atributo de estado usado pelos estilos CSS.
 * @param {string} state - Um valor de `APP_STATE`.
 * @returns {void}
 */
function setAppState(state) {
  rootElement.dataset.state = state;
}

/**
 * Renderiza o conteúdo principal do jornal.
 * @param {import('./models/Story.js').Story[]} stories
 * @returns {void}
 */
function renderNewspaper(stories) {
  const { headline, featured, all } = splitStoriesIntoSections(stories);

  const sections = [renderMasthead()];

  if (headline) {
    sections.push(renderHeadline(headline), createHorizontalRule());
  }
  if (featured.length > 0) {
    sections.push(renderArticles(featured));
  }
  sections.push(renderStoryList(all));

  clearElement(rootElement);
  rootElement.append(...sections);
}

/**
 * Carrega as histórias e renderiza o estado correspondente.
 * @returns {Promise<void>}
 */
async function loadNewspaper() {
  setAppState(APP_STATE.LOADING);
  clearElement(rootElement);
  rootElement.append(renderLoadingState());

  try {
    const stories = await getTopStories();

    if (stories.length === 0) {
      setAppState(APP_STATE.EMPTY);
      clearElement(rootElement);
      rootElement.append(renderEmptyState());
      return;
    }

    setAppState(APP_STATE.SUCCESS);
    renderNewspaper(stories);
  } catch (error) {
    console.error('Erro ao carregar as notícias.', error);
    setAppState(APP_STATE.ERROR);
    clearElement(rootElement);
    rootElement.append(renderErrorState(loadNewspaper));
  }
}

document.addEventListener('DOMContentLoaded', loadNewspaper);
