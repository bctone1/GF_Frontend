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
        <div class="notification-item__icon notification-item__icon--warning">⚠️</div>
        <div class="notification-item__content">
          <p class="notification-item__title">과제 제출 마감 임박</p>
          <p class="notification-item__time">2시간 전</p>
        </div>
      </div>
    </div>
    <div class="dropdown__footer">
      <a href="#" class="dropdown__link">모든 알림 보기</a>
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