import { useState } from 'react';

export default function LoginPage({ onLogin }) {
  const [mode, setMode] = useState('login');      // 'login' | 'register'
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  /* вспомогательные функции ------------------------------------------- */
  const getUsers = () => JSON.parse(localStorage.getItem('users') || '{}');

  const saveUsers = (users) =>
    localStorage.setItem('users', JSON.stringify(users));
  /* ------------------------------------------------------------------- */

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !pass) return;

    const users = getUsers();

    /* регистрация ------------------------------------------------------ */
    if (mode === 'register') {
      if (users[user]) {
        alert('Такой пользователь уже существует');
        return;
      }
      users[user] = {
        password: pass,
        desktop: {
          bg: '#1b5e20',
          shortcuts: []
        }
      };
      saveUsers(users);
      alert('Успешно зарегистрирован! Теперь войдите.');
      setMode('login');
      return;
    }

    /* логин ------------------------------------------------------------ */
    if (!users[user] || users[user].password !== pass) {
      alert('Неверный логин или пароль');
      return;
    }
    localStorage.setItem('session', user);
    onLogin();
  };

  return (
    <div style={styles.container}>
      <div style={styles.window}>
        <div style={styles.tabs}>
          <button
            style={mode === 'login' ? styles.tabActive : styles.tab}
            onClick={() => setMode('login')}
          >
            Войти
          </button>
          <button
            style={mode === 'register' ? styles.tabActive : styles.tab}
            onClick={() => setMode('register')}
          >
            Регистрация
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Логин:</label>
          <input
            style={styles.input}
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />

          <label style={styles.label}>Пароль:</label>
          <input
            style={styles.input}
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <button style={styles.button} type="submit">
            {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#e0e0e0'
  },
  window: {
    background: 'white',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    width: '320px'
  },
  tabs: {
    display: 'flex',
    marginBottom: '16px'
  },
  tab: {
    flex: 1,
    padding: '8px',
    border: '1px solid #ccc',
    background: '#f5f5f5',
    cursor: 'pointer'
  },
  tabActive: {
    flex: 1,
    padding: '8px',
    border: '1px solid #4CAF50',
    background: '#4CAF50',
    color: 'white',
    cursor: 'pointer'
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '12px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};
