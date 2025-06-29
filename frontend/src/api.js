/* src/api.js ---------------------------------------------------- */
/** Базовый адрес API:
 *  – на проде читается из .env.production  → VITE_API_BASE=https://backend-desktop.onrender.com/api
 *  – локально можно задать в .env.local    → VITE_API_BASE=http://localhost:8080/api
 *  Если переменной нет, падаем к относительному '/api' (как раньше).
 */
const API_BASE = import.meta.env.VITE_API_BASE || '/api';

/** Унифицированная обёртка: бросаем ошибку, если статус не OK,
 *  автоматически парсим JSON или TEXT. */
const request = (path, opts) =>
  fetch(`${API_BASE}${path}`, opts).then(res => {
    if (!res.ok) throw new Error(res.statusText);
    const isJson = res.headers
      .get('content-type')
      ?.includes('application/json');
    return isJson ? res.json() : res.text();
  });

/* --------- конкретные вызовы ---------------------------------- */
export const ping = () =>
  request('/ping').then(data => (typeof data === 'string' ? data : data.response));

export const register = (username, password) =>
  request('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

export const login = (username, password) =>
  request('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

export const getShortcuts = username =>
  request(`/desktop/shortcuts?username=${encodeURIComponent(username)}`);
/* --------------------------------------------------------------- */
