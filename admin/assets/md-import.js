/**
 * Sveltia CMS 自定义插件：Markdown 文件导入
 * 在编辑器顶部添加"导入 Markdown"按钮
 */
(function () {
  'use strict';

  const LABEL = '导入 Markdown';
  const ACCEPT = '.md,.markdown,.txt,.text';

  function waitForEditor() {
    const selector = 'sveltia-cms-editor-content';
    return new Promise((resolve) => {
      const el = document.querySelector(selector);
      if (el) return resolve(el);
      const observer = new MutationObserver(() => {
        const el = document.querySelector(selector);
        if (el) {
          observer.disconnect();
          resolve(el);
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }

  function injectButton() {
    // 避免重复注入
    if (document.getElementById('md-import-btn')) return;

    waitForEditor().then((editorEl) => {
      const toolbar = editorEl.querySelector('.editor-toolbar, [class*="toolbar"], [class*="header"]');
      const container = toolbar || editorEl;

      const btn = document.createElement('button');
      btn.id = 'md-import-btn';
      btn.textContent = LABEL;
      btn.title = '选择 .md 文件导入到编辑器';
      btn.style.cssText = `
        display: inline-flex; align-items: center; gap: 4px;
        padding: 6px 14px; margin: 4px 8px;
        font-size: 13px; font-weight: 500;
        color: #fff; background: #4285f4; border: none; border-radius: 4px;
        cursor: pointer; white-space: nowrap;
      `;
      btn.addEventListener('mouseenter', () => (btn.style.background = '#3367d6'));
      btn.addEventListener('mouseleave', () => (btn.style.background = '#4285f4'));

      const input = document.createElement('input');
      input.type = 'file';
      input.accept = ACCEPT;
      input.style.display = 'none';
      input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          const content = ev.target.result;
          // 尝试找到 CodeMirror 或 textarea 编辑器实例
          const cm =
            editorEl.querySelector('.CodeMirror') ||
            editorEl.querySelector('textarea') ||
            editorEl.querySelector('[contenteditable="true"]');
          if (cm && cm.CodeMirror) {
            cm.CodeMirror.setValue(content);
          } else if (cm && cm.tagName === 'TEXTAREA') {
            cm.value = content;
            cm.dispatchEvent(new Event('input', { bubbles: true }));
          } else if (cm && cm.contentEditable === 'true') {
            cm.innerText = content;
            cm.dispatchEvent(new Event('input', { bubbles: true }));
          }
        };
        reader.readAsText(file);
        input.value = '';
      });

      btn.addEventListener('click', () => input.click());
      container.prepend(btn);
    });
  }

  // 页面加载后注入
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(injectButton, 1500));
  } else {
    setTimeout(injectButton, 1500);
  }

  // 路由切换时重新注入
  let lastUrl = location.href;
  setInterval(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      setTimeout(injectButton, 1500);
    }
  }, 1000);
})();
