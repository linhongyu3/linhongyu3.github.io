/**
 * Sveltia CMS 自定义认证界面
 * - 隐藏 GitHub 登录按钮
 * - 添加获取 Token 的链接
 */
(function() {
  'use strict';

  function customizeAuthPage() {
    // 查找登录容器
    const authContainer = document.querySelector('[data-testid="auth-page"]') || 
                          document.querySelector('.auth-container') ||
                          document.querySelector('main');
    
    if (!authContainer) return;

    // 隐藏 GitHub 登录按钮（多种选择器尝试）
    const githubBtns = document.querySelectorAll(
      '[data-testid="auth-button-github"], ' +
      'button[data-provider="github"], ' +
      '.auth-button-github, ' +
      'button:contains("GitHub")'
    );
    githubBtns.forEach(function(btn) {
      btn.style.display = 'none';
    });

    // 查找 Token 输入区域
    const tokenInput = document.querySelector('input[type="password"]') ||
                       document.querySelector('input[name="token"]') ||
                       document.querySelector('[data-testid="token-input"]');
    
    if (tokenInput && !document.getElementById('get-token-link')) {
      // 创建获取 Token 链接
      const link = document.createElement('a');
      link.id = 'get-token-link';
      link.href = 'https://github.com/settings/tokens/new?description=Sveltia%20CMS&scopes=repo';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = '→ 没有 Token？点击获取';
      link.style.cssText = 'display: block; margin-top: 8px; color: #6c757d; font-size: 14px; text-decoration: none;';
      link.onmouseenter = function() { this.style.color = '#495057'; };
      link.onmouseleave = function() { this.style.color = '#6c757d'; };
      
      tokenInput.parentNode.appendChild(link);
    }
  }

  // 页面加载后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(customizeAuthPage, 1000);
      setTimeout(customizeAuthPage, 2000);
    });
  } else {
    setTimeout(customizeAuthPage, 1000);
    setTimeout(customizeAuthPage, 2000);
  }

  // 监听 DOM 变化
  const observer = new MutationObserver(function() {
    customizeAuthPage();
  });
  
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }

  // 5秒后停止观察
  setTimeout(function() {
    observer.disconnect();
  }, 10000);
})();
