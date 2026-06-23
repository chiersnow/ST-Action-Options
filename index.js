// Action Options - renders [最佳·攻心] etc. as clickable buttons
(function() {
    if (window.__actionOptionsLoaded) return;
    window.__actionOptionsLoaded = true;
    console.log('[Action Options] loaded');

    var style = document.createElement('style');
    style.id = 'action-options-style';
    style.textContent = '.action-btn{display:inline-block;padding:4px 12px;margin:2px 4px;border-radius:14px;border:1px solid var(--main-border);background:var(--main-bg);color:var(--main-color);cursor:pointer;font-size:12px;transition:all 0.15s;user-select:none}.action-btn:hover{background:var(--accent-bg);border-color:var(--accent);color:var(--accent)}';
    document.head.appendChild(style);

    function processOptions() {
        var items = document.querySelectorAll('.mes_text, .message_text, [class*="mes_text"]');
        for (var i = 0; i < items.length; i++) {
            var el = items[i];
            if (el.getAttribute('data-opt') === '1') continue;
            el.setAttribute('data-opt', '1');
            var html = el.innerHTML;
            var regex = /\[(最佳|优等|中等|风险)(?:[\s\u00b7\u2022\u30fb]*([^\]]+?))?\]\s*([^<]*)/g;
            var match;
            var result = html;
            while ((match = regex.exec(html)) !== null) {
                var type = match[1];
                var sub = match[2] ? match[2].trim() : '';
                var desc = match[3] ? match[3].trim() : '';
                var label = sub ? ('[' + type + '·' + sub + ']') : ('[' + type + ']');
                var text = desc || label;
                var escaped = text.replace(/'/g, '\\u0027').replace(/"/g, '&quot;');
                var btn = '<span class="action-btn" onclick="var ta=document.getElementById(\'send_textarea\');if(ta){ta.value=\'' + escaped + '\';ta.focus();ta.dispatchEvent(new Event(\'input\'));}">' + label + '</span>';
                result = result.replace(match[0], btn);
            }
            if (result !== html) el.innerHTML = result;
        }
    }

    var chat = document.getElementById('chat');
    if (chat) {
        var obs = new MutationObserver(function() { setTimeout(processOptions, 100); });
        obs.observe(chat, { childList: true, subtree: true });
    }
    setTimeout(processOptions, 500);
    setTimeout(processOptions, 1500);
})();