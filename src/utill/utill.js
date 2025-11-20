export function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;

    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
        .toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          padding: 12px 20px;
          border-radius: 8px;
          color: white;
          font-size: 14px;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
          z-index: 9999;
          animation: slideIn 0.3s;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .toast--info { background: #3b82f6; }
        .toast--success { background: #10b981; }
        .toast--warning { background: #f59e0b; }
        .toast--error { background: #ef4444; }
      `;
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), duration);
}