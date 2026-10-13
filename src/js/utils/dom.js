/**
 * Helpers de manipulação de DOM.
 *
 * Todas as funções aqui constroem elementos de forma segura, usando apenas
 * `textContent` para dados dinâmicos. Isso evita injeção de HTML a partir de
 * conteúdo vindo da API.
 */

/**
 * Cria um elemento HTML com atributos e filhos.
 *
 * @param {string} tagName - Ex.: 'a', 'li', 'h2'.
 * @param {Object} [options] - Configuração do elemento.
 * @param {string} [options.className] - Classe(s) CSS.
 * @param {string} [options.text] - Texto seguro (usa textContent).
 * @param {Object.<string, string>} [options.attributes] - Atributos do elemento.
 * @param {Node[]} [options.children] - Nós filhos, na ordem.
 * @returns {HTMLElement} O elemento criado.
 */
export function createElement(tagName, options = {}) {
  const element = document.createElement(tagName);

  if (options.className) element.className = options.className;
  if (options.text !== undefined) element.textContent = options.text;

  if (options.attributes) {
    for (const [name, value] of Object.entries(options.attributes)) {
      element.setAttribute(name, value);
    }
  }

  if (options.children) {
    element.append(...options.children);
  }

  return element;
}

/**
 * Esvazia um elemento removendo todos os seus filhos.
 * @param {HTMLElement} element
 * @returns {void}
 */
export function clearElement(element) {
  element.replaceChildren();
}

/**
 * Cria um link seguro (abre em nova aba, com proteção `noopener`).
 * @param {string} href - Destino.
 * @param {string} text - Texto visível.
 * @param {string} [className] - Classe(s) CSS.
 * @returns {HTMLAnchorElement}
 */
export function createExternalLink(href, text, className) {
  return createElement('a', {
    className,
    text,
    attributes: {
      href,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  });
}

/**
 * Cria um divisor horizontal (equivalente ao `---` do Markdown).
 * @param {string} [className]
 * @returns {HTMLHRElement}
 */
export function createHorizontalRule(className = 'md-rule') {
  return createElement('hr', { className });
}
