const base = import.meta.env.VITE_API_URL || '/api';

export const ping = () =>
  fetch(`${base}/ping`).then(res => res.text());

export const register = (u, p) =>
  fetch(`${base}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: u, password: p })
  }).then(r => r.json());

export const login = (u, p) =>
  fetch(`${base}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: u, password: p })
  }).then(r => r.json());

export const getShortcuts = (u) =>
  fetch(`${base}/desktop/shortcuts?username=${u}`).then(r => r.json());
