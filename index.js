// Action Options - renders [\u6700\u4f73\u00b7\u653b\u5fc3] etc. as clickable buttons
(function(){if(window.__actionOptionsLoaded)return;window.__actionOptionsLoaded=true;
var s=document.createElement('style');s.textContent='.action-btn{display:inline-block;padding:4px 12px;margin:2px 4px;border-radius:14px;border:1px solid var(--main-border);background:var(--main-bg);color:var(--main-color);cursor:pointer;font-size:12px;user-select:none}.action-btn:hover{background:var(--accent-bg);border-color:var(--accent);color:var(--accent)}';
document.head.appendChild(s);
function run(){var els=document.querySelectorAll('.mes_text,.message_text,[class*=mes_text]');
for(var i=0;i<els.length;i++){var el=els[i];if(el.getAttribute('data-o2'))continue;
el.setAttribute('data-o2','1');var h=el.innerHTML;
var re=/\[(\u6700\u4f73|\u4f18\u7b49|\u4e2d\u7b49|\u98ce\u9669)(?:[\s\u00b7\u2022\u30fb]*([^\]]+?))?\]\s*([^<]*)/g;var m,r=h;
while((m=re.exec(h))!==null){var sub=m[2]?m[2].trim():'';var desc=m[3]?m[3].trim():'';
var label=sub?('['+m[1]+'\u00b7'+sub+']'):('['+m[1]+']');var txt=desc||label;
var esc=txt.replace(/'/g,"\\u0027").replace(/"/g,'&quot;');
r=r.replace(m[0],'<span class="action-btn" onclick="var ta=document.getElementById(\'send_textarea\');if(ta){ta.value=\''+esc+'\';ta.focus();ta.dispatchEvent(new Event(\'input\'));}">'+label+'</span>');}
if(r!==h)el.innerHTML=r;}}
var chat=document.getElementById('chat');
if(chat)new MutationObserver(function(){setTimeout(run,100)}).observe(chat,{childList:true,subtree:true});
setTimeout(run,500);setTimeout(run,1500);})();