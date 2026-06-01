document.addEventListener('DOMContentLoaded', function() {
  var mirrorSelect = document.getElementById('mirror-select');
  var filterBtns = document.querySelectorAll('.filter-btn');
  var downloadItems = document.querySelectorAll('.download-item');
  
  if (!filterBtns.length || !downloadItems.length) return;
  
  // 筛选功能
  function applyFilter(filterType) {
    for (var i = 0; i < downloadItems.length; i++) {
      var item = downloadItems[i];
      var category = item.getAttribute('data-category') || 'self-made';
      if (filterType === 'all' || category === filterType) {
        item.classList.remove('filtered-out');
        item.style.display = '';
      } else {
        item.classList.add('filtered-out');
        item.style.display = 'none';
      }
    }
  }
  
  applyFilter('all');
  
  for (var i = 0; i < filterBtns.length; i++) {
    (function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var filter = btn.getAttribute('data-filter');
        for (var j = 0; j < filterBtns.length; j++) {
          filterBtns[j].classList.remove('active');
        }
        btn.classList.add('active');
        applyFilter(filter);
      });
    })(filterBtns[i]);
  }
  
  // 更新下载链接
  function updateDownloadLinks() {
    if (!mirrorSelect) return;
    var mirrorUrl = mirrorSelect.value || '';
    
    var btns = document.querySelectorAll('.download-btn');
    for (var i = 0; i < btns.length; i++) {
      var originalUrl = btns[i].getAttribute('data-original-url');
      if (!originalUrl) continue;
      if (mirrorUrl && originalUrl.indexOf('github.com') !== -1) {
        btns[i].href = mirrorUrl + originalUrl;
      } else {
        btns[i].href = originalUrl;
      }
    }
    
    var links = document.querySelectorAll('.download-link');
    for (var i = 0; i < links.length; i++) {
      var originalUrl = links[i].getAttribute('data-original-url');
      if (!originalUrl) continue;
      if (mirrorUrl && originalUrl.indexOf('github.com') !== -1) {
        links[i].href = mirrorUrl + originalUrl;
      } else {
        links[i].href = originalUrl;
      }
    }
  }
  
  if (mirrorSelect) {
    mirrorSelect.addEventListener('change', updateDownloadLinks);
    setTimeout(updateDownloadLinks, 500);
  }
  
  // 检查更新
  for (var i = 0; i < downloadItems.length; i++) {
    (function(item) {
      var btn = item.querySelector('.download-btn') || item.querySelector('.download-link');
      if (!btn) return;
      var url = btn.getAttribute('data-original-url');
      var match = url.match(/github\.com\/([^\/]+)\/([^\/]+)\/releases\/download\/([^\/]+)\/(.+)/);
      if (!match) return;
      
      var checking = item.querySelector('.checking-update');
      if (checking) checking.style.display = 'inline';
      
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://api.github.com/repos/' + match[1] + '/' + match[2] + '/releases/latest', true);
      xhr.onload = function() {
        try {
          var release = JSON.parse(xhr.responseText);
          if (release.tag_name && release.tag_name !== match[3]) {
            var badge = item.querySelector('.version-badge');
            if (badge) {
              badge.textContent = '版本: ' + release.tag_name + ' (新)';
              badge.classList.add('new-version', 'bg-success');
              badge.classList.remove('bg-light', 'text-secondary');
            }
          }
        } catch(e) {}
        if (checking) checking.style.display = 'none';
      };
      xhr.onerror = function() {
        if (checking) checking.style.display = 'none';
      };
      xhr.send();
    })(downloadItems[i]);
  }
});
