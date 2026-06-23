// Action Options Buttons - renders [最佳·攻心] etc. into clickable buttons
(function() {
    if (document.getElementById('action-options-style')) return;

    var style = document.createElement('style');
    style.id = 'action-options-style';
    style.textContent = '.action-btn{display:inline-block;padding:4px 12px;margin:2px 4px 2px 0;border-radius:14px;border:1px solid var(--main-border);background:var(--main-bg);color:var(--main-color);cursor:pointer;font-size:12px;transition:all 0.15s;user-select:none}.action-btn:hover{background:var(--accent-bg);border-color:var(--accent)}';
    document.head.appendChild(style);

    function processOptions() {
        var items = document.querySelectorAll('.mes_text:not([data-opt])');
        for (var i = 0; i < items.length; i++) {
            var el = items[i];
            el.setAttribute('data-opt', '1');
            var html = el.innerHTML;
            var regex = /\[(最佳|优等|中等|风险)(?:·([^\]]+))?\]([^<]*)/g;
            var match;
            var result = html;
            while ((match = regex.exec(html)) !== null) {
                var type = match[1];
                var sub = match[2] || '';
                var desc = match[3] ? match[3].trim().substring(0, 30) : '';
                var label = sub ? ('[' + type + '·' + sub + ']') : ('[' + type + ']');
                var text = desc || label;
                var btn = '<span class="action-btn" onclick="var ta=document.getElementById(\'send_textarea\');if(ta){ta.value=\'' + text.replace(/'/g, "\\'") + '\';ta.focus();ta.dispatchEvent(new Event(\'input\'));}">' + label + '</span>';
                result = result.replace(match[0], btn);
            }
            if (result !== html) {
                el.innerHTML = result;
            }
        }
    }

    var chat = document.getElementById('chat');
    if (chat) {
        var obs = new MutationObserver(processOptions);
        obs.observe(chat, { childList: true, subtree: true });
    }
    processOptions();
})();
