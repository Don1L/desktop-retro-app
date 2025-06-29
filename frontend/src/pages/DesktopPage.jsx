import { useState, useEffect, useCallback } from 'react';
import Shortcut from '../components/Shortcut';
import AddShortcutModal from '../components/AddShortcutModal';

export default function DesktopPage({ onLogout }) {
  const user = localStorage.getItem('session');
  const [desktop, setDesktop] = useState({ bg: '#1b5e20', shortcuts: [] });
  const [showAdd, setShowAdd] = useState(false);

  /* утилиты для чтения/записи одного пользователя -------------------- */
  const loadDesktop = () => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    return users[user]?.desktop || { bg: '#1b5e20', shortcuts: [] };
  };

  const saveDesktop = (nextDesktop) => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    users[user].desktop = nextDesktop;
    localStorage.setItem('users', JSON.stringify(users));
  };
  /* ------------------------------------------------------------------ */

  /* первый рендер — загружаем данные */
  useEffect(() => setDesktop(loadDesktop()), []);

  /* добавление ярлыка */
  const addShortcut = (sc) => {
    const next = { ...desktop, shortcuts: [...desktop.shortcuts, sc] };
    setDesktop(next);
    saveDesktop(next);
  };

  /* перемещение ярлыка */
  const moveShortcut = useCallback(
    (id, x, y) => {
      const nextShortcuts = desktop.shortcuts.map((s) =>
        s.id === id ? { ...s, x, y } : s
      );
      const next = { ...desktop, shortcuts: nextShortcuts };
      setDesktop(next);
      saveDesktop(next);
    },
    [desktop]
  );

  return (
    <div
      className="desktop"
      style={{ background: desktop.bg }}
    >
      {desktop.shortcuts.map((sc) => (
        <Shortcut key={sc.id} data={sc} onMove={moveShortcut} />
      ))}

      <div className="taskbar">
        <button onClick={() => setShowAdd(true)}>Добавить ярлык</button>
        <button
          onClick={() => {
            localStorage.removeItem('session');
            onLogout();
          }}
        >
          Выйти
        </button>
      </div>

      {showAdd && (
        <AddShortcutModal
          onClose={() => setShowAdd(false)}
          onSave={addShortcut}
        />
      )}
    </div>
  );
}
