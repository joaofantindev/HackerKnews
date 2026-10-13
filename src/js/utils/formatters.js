/**
 * Formatação de dados para exibição. Funções puras, sem efeitos colaterais.
 */

import { LABELS } from './constants.js';

const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_DAY = 86400;

/**
 * Converte um número de pontos em texto legível.
 * @param {number} score
 * @returns {string} Ex.: "513 pts"
 */
export function formatScore(score) {
  return `${score} ${LABELS.POINTS}`;
}

/**
 * Converte a quantidade de comentários em texto legível, com singular/plural.
 * @param {number} count
 * @returns {string} Ex.: "1 comentário", "224 comentários"
 */
export function formatCommentsCount(count) {
  const label = count === 1 ? LABELS.COMMENT_SINGULAR : LABELS.COMMENTS;
  return `${count} ${label}`;
}

/**
 * Converte um timestamp Unix (em segundos) em texto relativo em português.
 * @param {number} unixSeconds - Timestamp em segundos.
 * @param {number} [nowMs] - "Agora" em milissegundos (injetável para testes).
 * @returns {string} Ex.: "1h atrás", "3d atrás", "agora"
 */
export function formatRelativeTime(unixSeconds, nowMs = Date.now()) {
  const elapsedSeconds = Math.max(0, Math.floor(nowMs / 1000) - unixSeconds);

  if (elapsedSeconds < SECONDS_IN_MINUTE) return LABELS.NOW;
  if (elapsedSeconds < SECONDS_IN_HOUR) {
    return `${Math.floor(elapsedSeconds / SECONDS_IN_MINUTE)}min atrás`;
  }
  if (elapsedSeconds < SECONDS_IN_DAY) {
    return `${Math.floor(elapsedSeconds / SECONDS_IN_HOUR)}h atrás`;
  }
  return `${Math.floor(elapsedSeconds / SECONDS_IN_DAY)}d atrás`;
}

/**
 * Extrai o domínio legível de uma URL.
 * @param {string} url
 * @returns {string} Ex.: "github.com" ou string vazia se inválida.
 */
export function extractDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

/**
 * Formata uma data para o cabeçalho do jornal.
 * @param {Date} [date]
 * @returns {string} Ex.: "segunda-feira, 13 de outubro de 2026"
 */
export function formatMastheadDate(date = new Date()) {
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
