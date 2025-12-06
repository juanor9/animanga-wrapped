'use client';

import { useEffect } from 'react';
import './Toast.scss';
const Toast = ({ message, icon = '✓', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className="toast" role="status" aria-live="polite">
      {icon && <span className="toast__icon">{icon}</span>}
      <span className="toast__message">{message}</span>
    </div>
  );
};

export default Toast;
