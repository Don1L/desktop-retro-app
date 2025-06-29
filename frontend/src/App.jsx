import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import DesktopPage from './pages/DesktopPage';
import { ping } from './api';

export default function App() {
  /* авторизация */
  const [isAuth, setIsAuth] = useState(false);

  /* ping-индикатор */
  const [backendMsg, setBackendMsg] = useState('');

  useEffect(() => {
    /* сессия */
    if (localStorage.getItem('session')) setIsAuth(true);

    /* проверяем бекенд */
    ping()
      .then(txt => setBackendMsg(txt))   // pong
      .catch(() => setBackendMsg('error'));
  }, []);

  return (
    <>
      {isAuth ? (
        <DesktopPage
          onLogout={() => {
            localStorage.removeItem('session');
            setIsAuth(false);
          }}
        />
      ) : (
        <LoginPage onLogin={() => setIsAuth(true)} />
      )}

      {/* маленький серый индикатор */}
      {backendMsg && (
        <div style={{
          position: 'fixed',
          bottom: 6,
          right: 8,
          fontSize: 10,
          color: '#888'
        }}>
          backend: {backendMsg}
        </div>
      )}
    </>
  );
}
