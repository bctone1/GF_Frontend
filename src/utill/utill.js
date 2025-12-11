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



export function createNotificationDropdown() {
  const notificationBtn = document.getElementById('notificationBtn');
  if (!notificationBtn) return;

  // 이미 열려있는 알림창이 있는지 확인
  const existingDropdown = document.getElementById('notificationDropdown');

  if (existingDropdown) {
    // 알림창이 열려있으면 닫기
    existingDropdown.classList.remove('dropdown--open');
    notificationBtn.classList.remove('header__icon-button--active');

    // 애니메이션 후 DOM에서 제거
    setTimeout(() => {
      if (existingDropdown.parentElement) {
        existingDropdown.parentElement.removeChild(existingDropdown);
      }
    }, 300); // CSS transition 시간에 맞춰 조정
    return;
  }

  // 알림창이 없으면 새로 생성
  const dropdown = document.createElement('div');
  dropdown.id = 'notificationDropdown';
  dropdown.className = 'dropdown dropdown--notifications';
  dropdown.innerHTML = `
    <div class="dropdown__header">
      <h3>알림</h3>
      <button class="btn btn--sm btn--outline">모두 읽음</button>
    </div>
    <div class="dropdown__body">
      <div class="notification-item">
        Phase 2에서 구현 예정입니다
      </div>
    </div>
  `;

  notificationBtn.parentElement.style.position = 'relative';
  notificationBtn.parentElement.appendChild(dropdown);

  setTimeout(() => {
    notificationBtn.classList.add('header__icon-button--active');
    dropdown.classList.add('dropdown--open');
  }, 10);
}

// 선택된 강의 정보를 관리하는 유틸리티 함수들
export function getSelectedClassId() {
  return sessionStorage.getItem('selected_class_id') || null;
}

export function getSelectedClassTitle() {
  return sessionStorage.getItem('selected_class_title') || null;
}

export function setSelectedClass(classId, classTitle) {
  if (classId) {
    sessionStorage.setItem('selected_class_id', classId);
    if (classTitle) {
      sessionStorage.setItem('selected_class_title', classTitle);
    }
  } else {
    sessionStorage.removeItem('selected_class_id');
    sessionStorage.removeItem('selected_class_title');
  }
}

export function clearSelectedClass() {
  sessionStorage.removeItem('selected_class_id');
  sessionStorage.removeItem('selected_class_title');
}

export function hasSelectedClass() {
  return !!sessionStorage.getItem('selected_class_id');
}

// 확인 모달 함수 (Promise 기반)
export function showConfirm(message, options = {}) {
  return new Promise((resolve) => {
    // 이미 열려있는 모달이 있으면 제거
    const existingOverlay = document.getElementById('confirm-overlay');
    if (existingOverlay) {
      existingOverlay.remove();
    }

    const {
      title = '확인',
      confirmText = '확인',
      cancelText = '취소',
      icon = '⚠️',
      confirmButtonClass = 'btn-confirm--primary',
      cancelButtonClass = 'btn-confirm--secondary'
    } = options;

    // CSS 스타일 추가 (한 번만)
    if (!document.getElementById('confirm-modal-styles')) {
      const style = document.createElement('style');
      style.id = 'confirm-modal-styles';
      style.textContent = `
        .confirm-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(8px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: confirmFadeIn 0.3s ease-out;
        }
        @keyframes confirmFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .confirm-modal {
          background: var(--background, #ffffff);
          border-radius: var(--radius-xl, 16px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          max-width: 400px;
          width: 90%;
          animation: confirmSlideUp 0.3s ease-out;
          overflow: hidden;
        }
        @keyframes confirmSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .confirm-modal__header {
          text-align: center;
          padding: 24px 24px 16px;
        }
        .confirm-modal__icon {
          font-size: 48px;
          margin-bottom: 12px;
        }
        .confirm-modal__title {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary, #1e293b);
          margin-bottom: 8px;
        }
        .confirm-modal__body {
          padding: 0 24px 24px;
        }
        .confirm-modal__message {
          font-size: 16px;
          color: var(--text-secondary, #64748b);
          text-align: center;
          margin-bottom: 24px;
          line-height: 1.6;
        }
        .confirm-modal__actions {
          display: flex;
          gap: 12px;
        }
        .btn-confirm {
          flex: 1;
          padding: 12px 16px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .btn-confirm--primary {
          background: var(--error, #ef4444);
          color: white;
        }
        .btn-confirm--primary:hover:not(:disabled) {
          background: #dc2626;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(239, 68, 68, 0.3);
        }
        .btn-confirm--secondary {
          background: var(--gray-100, #f1f5f9);
          color: var(--text-primary, #1e293b);
          border: 1px solid var(--border, #e2e8f0);
        }
        .btn-confirm--secondary:hover:not(:disabled) {
          background: var(--gray-200, #e2e8f0);
        }
        .btn-confirm:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `;
      document.head.appendChild(style);
    }

    // 오버레이 생성
    const overlay = document.createElement('div');
    overlay.id = 'confirm-overlay';
    overlay.className = 'confirm-overlay';

    // 모달 생성
    const modal = document.createElement('div');
    modal.className = 'confirm-modal';
    modal.innerHTML = `
      <div class="confirm-modal__header">
        <div class="confirm-modal__icon">${icon}</div>
        <h2 class="confirm-modal__title">${title}</h2>
      </div>
      <div class="confirm-modal__body">
        <p class="confirm-modal__message">${message}</p>
        <div class="confirm-modal__actions">
          <button type="button" class="btn-confirm ${cancelButtonClass}" data-action="cancel">
            ${cancelText}
          </button>
          <button type="button" class="btn-confirm ${confirmButtonClass}" data-action="confirm">
            ${confirmText}
          </button>
        </div>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // 모달 클릭 시 닫히지 않도록
    modal.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // 오버레이 클릭 시 취소
    overlay.addEventListener('click', () => {
      removeModal();
      resolve(false);
    });

    // 버튼 이벤트
    const handleAction = (action) => {
      removeModal();
      resolve(action === 'confirm');
    };

    modal.querySelectorAll('[data-action]').forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        handleAction(button.dataset.action);
      });
    });

    // ESC 키로 닫기
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        removeModal();
        resolve(false);
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);

    // 모달 제거 함수
    function removeModal() {
      overlay.style.animation = 'confirmFadeIn 0.3s ease-out reverse';
      modal.style.animation = 'confirmSlideUp 0.3s ease-out reverse';
      setTimeout(() => {
        if (overlay.parentElement) {
          overlay.parentElement.removeChild(overlay);
        }
        document.removeEventListener('keydown', handleEscape);
      }, 300);
    }
  });
}