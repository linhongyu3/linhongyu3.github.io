/**
 * Sveltia CMS 自定义插件：Markdown 文件导入
 * 在编辑器页面注入"导入 Markdown"按钮
 */
(function () {
  'use strict';

  const BTN_ID = 'md-import-btn';

  function createImportButton() {
    if (document.getElementById(BTN_ID)) return;

    const btn = document.createElement('button');
    btn.id = BTN_ID;
    btn.textContent = '📄 导入 Markdown';
    btn.title = '选择 .md 文件导入到编辑器';
    btn.style.cssText = `
      display: inline-flex; align-items: center; gap: 4px;
      padding: 8px 16px; margin: 8px;
      font-size: 14px; font-weight: 500;
      color: #fff; background: #4285f4; border: none; border-radius: 6px;
      cursor: pointer; white-space: nowrap; z-index: 9999;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    `;
    btn.addEventListener('mouseenter', () => (btn.style.background = '#3367d6'));
    btn.addEventListener('mouseleave', () => (btn.style.background = '#4285f4'));

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.md,.markdown,.txt,.text';
    input.style.display = 'none';

    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const content = ev.target.result;
        setEditorContent(content);
      };
      reader.readAsText(file);
      input.value = '';
    });

    btn.addEventListener('click', () => input.click());
    return btn;
  }

  function setEditorContent(content) {
    // 方式1: CodeMirror 实例
    const cmEl = document.querySelector('.CodeMirror');
    if (cmEl && cmEl.CodeMirror) {
      cmEl.CodeMirror.setValue(content);
      return;
    }

    // 方式2: textarea
    const textarea = document.querySelector('textarea[name="body"], textarea');
    if (textarea) {
      textarea.value = content;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      return;
    }

    // 方式3: contenteditable
    const editable = document.querySelector('[contenteditable="true"]');
    if (editable) {
      editable.innerText = content;
      editable.dispatchEvent(new Event('input', { bubbles: true }));
      return;
    }

    // 方式4: 所有 textarea
    const allTextareas = document.querySelectorAll('textarea');
    for (const ta of allTextareas) {
      const nativeSetter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
      nativeSetter.call(ta, content);
      ta.dispatchEvent(new Event('input', { bubbles: true }));
      ta.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  function injectButton() {
    if (document.getElementById(BTN_ID)) return;

    const btn = createImportButton();

    const candidates = [
      document.querySelector('.editor-container'),
      document.querySelector('[class*="editor"]'),
      document.querySelector('[class*="Editor"]'),
      document.querySelector('header'),
      document.querySelector('nav'),
      document.querySelector('main'),
      document.querySelector('#root'),
      document.querySelector('body'),
    ];

    for (const container of candidates) {
      if (container) {
        container.prepend(btn);
        return;
      }
    }
  }

  function tryInject() {
    const isEditorPage =
      location.href.includes('/edit/') ||
      location.href.includes('/new/') ||
      document.querySelector('.CodeMirror') ||
      document.querySelector('textarea') ||
      document.querySelector('[class*="editor"]');

    if (isEditorPage || document.querySelector('#root')) {
      injectButton();
    }
  }

  setTimeout(tryInject, 2000);
  setTimeout(tryInject, 4000);
  setTimeout(tryInject, 6000);

  let lastUrl = location.href;
  setInterval(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      const old = document.getElementById(BTN_ID);
      if (old) old.remove();
      setTimeout(injectButton, 2000);
    }
  }, 800);

  const observer = new MutationObserver(() => {
    if (!document.getElementById(BTN_ID)) {
      tryInject();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 15000);
})();
