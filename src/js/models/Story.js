/**
 * Modelo de domínio de uma história do Hacker News.
 *
 * Isola a aplicação do formato bruto da API: o restante do código usa apenas
 * as propriedades normalizadas abaixo.
 */

/** URL canônica de um item no site do Hacker News. */
const HACKER_NEWS_ITEM_URL = 'https://news.ycombinator.com/item?id=';

export class Story {
  /**
   * @param {Object} params
   * @param {number} params.id
   * @param {string} params.title
   * @param {string} params.author
   * @param {number} params.score
   * @param {number} params.comments
   * @param {number} params.publishedAt - Timestamp Unix em segundos.
   * @param {string} params.url - Link externo ou URL do item no HN.
   * @param {number} params.rank - Posição na lista (1..N).
   */
  constructor({
    id,
    title,
    author,
    score,
    comments,
    publishedAt,
    url,
    rank,
  }) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.score = score;
    this.comments = comments;
    this.publishedAt = publishedAt;
    this.url = url;
    this.rank = rank;
  }

  /**
   * Constrói uma `Story` a partir de um item bruto da API.
   * @param {Object} item - Item retornado pela API.
   * @param {number} rank - Posição na lista.
   * @returns {Story}
   */
  static fromApiItem(item, rank) {
    return new Story({
      id: item.id,
      title: item.title ?? 'Título indisponível',
      author: item.by ?? 'desconhecido',
      score: item.score ?? 0,
      comments: item.descendants ?? 0,
      publishedAt: item.time ?? 0,
      url: item.url ?? `${HACKER_NEWS_ITEM_URL}${item.id}`,
      rank,
    });
  }

  /**
   * Verifica se o item bruto é uma história válida e utilizável.
   * @param {Object|null|undefined} item
   * @returns {boolean}
   */
  static isValidApiItem(item) {
    return Boolean(item) && item.type === 'story' && Boolean(item.title);
  }
}
