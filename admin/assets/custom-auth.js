/**
 * Sveltia CMS 自定义认证界面
 * - 隐藏 GitHub 登录按钮
 * - 添加获取 Token 的链接
 */
(function() {
  'use strict';

  function customizeAuthPage() {
    // 隐藏所有包含 "GitHub" 文字的按钮
    var buttons = document.querySelectorAll('button');
    buttons.forEach(function(btn) {
      if (btn.textContent.indexOf('GitHub') !== -1) {
        btn.style.display = 'none';
      }
    });

    // 查找 Token 相关区域，添加获取 Token 链接
    var tokenBtn = document.querySelectorAll('button');
    tokenBtn.forEach(function(btn) {
      if (btn.textContent.indexOf('Access Token') !== -1 || btn.textContent.indexOf('Token') !== -1) {
        var parent = btn.parentNode;
        if (parent && !document.getElementById('get-token-link')) {
          var link = document.createElement('a');
          link.id = 'get-token-link';
          link.href = 'https://github.com/settings/tokens/new?description=Sveltia%20CMS&scopes=repo';
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.textContent = '没有 Token？点击获取';
          link.style.cssText = 'display: block; margin-top: 8px; color: #6c757d; font-size: 14px; text-decoration: none;';
          link.onmouseenter = function() { this.style.color = '#495057'; };
          link.onmouseleave = function() { this.style.color = '#6c757d'; };
          parent.appendChild(link);
        }
      }
    });
  }

  // 多次尝试
  var attempts = [1000, 2000, 3000, 5000];
  attempts.forEach(function(delay) {
    setTimeout(customizeAuthPage, delay);
  });

  // 监听 DOM 变化
  var observer = new MutationObserver(function() {
    customizeAuthPage();
  });
  
  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }

  setTimeout(function() { observer.disconnect(); }, 15000);
})();
