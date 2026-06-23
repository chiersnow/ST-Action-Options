// Action Options - renders [最佳·攻心] etc. as clickable buttons
(function() {
    if (window.__actionOptionsLoaded) return;
    window.__actionOptionsLoaded = true;
    console.log('[Action Options] loaded');

    // Inject styles
    var style = document.createElement('style');
    style.id = 'action-options-style';
    style.textContent = '.action-btn{display:inline-block;padding:4px 12px;margin:2px 4px;border-radius:14px;border:1px solid var(--main-border);background:var(--main-bg);color:var(--main-color);cursor:pointer;font-size:12px;transition:all 0.15s;user-select:none}.action-btn:hover{background:var(--accent-bg);border-color:var(--accent);color:var(--accent)}';
    document.head.appendChild(style);

    function fillInput(text) {
        var ta = document.getElementById('send_textarea');
        if (!ta) return;
        ta.value = text;
        ta.focus();
        ta.dispatchEvent(new Event('input', {bubbles: true}));
        ta.selectionStart = ta.selectionEnd = ta.value.length;
    }

    function processOptions() {
        // Try multiple possible message container selectors
        var selectors = '.mes_text, .message_text, .mes_block .text, .chat_message .mes_text, [class*="mes_text"]';
        var items = document.querySelectorAll(selectors);
        var found = 0;
        for (var i = 0; i < items.length; i++) {
            var el = items[i];
            if (el.getAttribute('data-opt') === '1') continue;
            el.setAttribute('data-opt', '1');
            var html = el.innerHTML;
            // Match [类型·子类] 描述  OR  [类型] 描述
            // Uses flexible dot matching (any kind of middle dot, bullet, etc.)
            var regex = /\[(最佳|优等|中等|风险)(?:[\s·•・‧]*([^\]]+?))?\]\s*([^<]*)/g;
            var match;
            var result = html;
            var hasMatch = false;
            while ((match = regex.exec(html)) !== null) {
                hasMatch = true;
                var type = match[1];
                var sub = match[2] ? match[2].trim() : '';
                var desc = match[3] ? match[3].trim() : '';
                var label = sub ? ('[' + type + '·' + sub + ']') : ('[' + type + ']');
                var text = desc || label;
                // Escape for onclick attribute
                var escaped = text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '\u0027');
                var btn = '<span class="action-btn" onclick="window._actionFill&&window._actionFill(\'' + escaped + '\')">' + label + '</span>';
                result = result.replace(match[0], btn);
                found++;
            }
            if (hasMatch) {
                el.innerHTML = result;
            }
        }
        if (found > 0) console.log('[Action Options] rendered ' + found + ' buttons');
    }

    // Register global handler
    window._actionFill = fillInput;

    // Observe for new messages
    var chat = document.getElementById('chat') || document.querySelector('.chat-container, #chatContainer, [class*="chat"]');
    if (chat) {
        var obs = new MutationObserver(function() { setTimeout(processOptions, 100); });
        obs.observe(chat, { childList: true, subtree: true, characterData: false });
    }
    // Initial run
    setTimeout(processOptions, 500);
    setTimeout(processOptions, 1500);
})();