import { useRef, useEffect } from 'react';

export default function Shortcut({ data, onMove }) {
  const ref = useRef(null);

  /* Drag & Drop -------------------------------------------------------- */
  useEffect(() => {
    const node = ref.current;
    let offX = 0;
    let offY = 0;

    const onMouseDown = (e) => {
      offX = e.clientX - node.offsetLeft;
      offY = e.clientY - node.offsetTop;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      node.style.left = `${e.clientX - offX}px`;
      node.style.top = `${e.clientY - offY}px`;
    };

    const onMouseUp = (e) => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      /* сохраняем координаты */
      onMove(data.id, e.clientX - offX, e.clientY - offY);
    };

    node.addEventListener('mousedown', onMouseDown);
    return () => node.removeEventListener('mousedown', onMouseDown);
  }, [data.id, onMove]);
  /* ------------------------------------------------------------------- */

  return (
    <a
      ref={ref}
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      className="shortcut"
      style={{ left: data.x, top: data.y }}
    >
      📁
      <span>{data.title}</span>
    </a>
  );
}
