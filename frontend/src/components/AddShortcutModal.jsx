import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function AddShortcutModal({ onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSave = () => {
    if (!title || !url) return;
    onSave({
      id: uuidv4(),
      title,
      url,
      x: 20,
      y: 20
    });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Новый ярлык</h3>

        <label>Название</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="GitHub"
        />

        <label>URL</label>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://github.com/..."
        />

        <div className="modal-actions">
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
}
