/* ===== C7 CUSTOM JS =====
   بلا نظام دخول، بلا بوّابة إخفاء، بلا قفل تمرير، وبلا كانفس نجوم
   (النجوم صارت CSS خالص في ملف التصميم).
   ========================================================== */

/* ---------- 0) أدوات مشتركة ----------
   waitFor: ينتظر ظهور عنصر في الـDOM عبر MutationObserver بدل
   المؤقّتات العمياء. مكوّنات سلة تُبنى متأخّرة، والمؤقّت الثابت
   يفشل صامتًا كلما تأخّرت الشبكة. */
window.c7 = window.c7 || {};
/* رابط سيرفر الديسكورد — موضعٌ واحد يقرأ منه زرّ الفوتر والرابط والزرّ العائم.
   (القديم discord.gg/c77 كان مبطَلًا: الـAPI يردّ Unknown Invite.) */
c7.discord = 'https://discord.gg/a4hsh2YmVa';
c7.waitFor = function (sel, cb, opt) {
  opt = opt || {};
  var seen = new WeakSet(), stop = false;
  function scan() {
    var hit = false;
    document.querySelectorAll(sel).forEach(function (el) {
      if (seen.has(el)) return;
      seen.add(el);
      try { cb(el); } catch (e) {}
      hit = true;
    });
    return hit;
  }
  function boot() {
    if (scan() && opt.once) return;
    var mo = new MutationObserver(function () {
      if (stop) return;
      if (scan() && opt.once) { stop = true; mo.disconnect(); }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
    if (opt.timeout) setTimeout(function () { stop = true; mo.disconnect(); }, opt.timeout);
  }
  if (document.body) boot();
  else document.addEventListener('DOMContentLoaded', boot);
};
c7.ready = function (fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
};
/* اللغة تُحسم مبكّرًا هنا لأنّ وحداتٍ لاحقة (تواريخ التقييمات، شريط العرض) تقرؤها.
   الترتيب: ?lang= في الرابط ⟵ اختيار الزائر المحفوظ ⟵ تخمين ذكيّ:
   متصفّح فيه العربيّة أو منطقة زمنيّة عربيّة = عربي؛ وغير ذلك إسبانيّ لمن متصفّحه
   إسبانيّ وإنجليزيّ للباقي. الترجمة نفسها في وحدة «اللغات» آخر الملف. */
c7.lang = (function () {
  var ok = { ar: 1, en: 1, es: 1 }, s, q = /[?&]lang=(ar|en|es)\b/.exec(location.search);
  if (q) { try { localStorage.setItem('c7-lang', q[1]); } catch (e) {} return q[1]; }
  try { s = localStorage.getItem('c7-lang'); } catch (e) {}
  if (ok[s]) return s;
  try {
    var ls = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'ar'];
    for (var i = 0; i < ls.length; i++) if (/^ar/i.test(ls[i])) return 'ar';
    var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (/^Asia\/(Riyadh|Kuwait|Qatar|Bahrain|Dubai|Muscat|Baghdad|Amman|Aden|Damascus|Beirut|Gaza|Hebron)$|^Africa\/(Cairo|Tripoli|Tunis|Algiers|Casablanca|Khartoum)$/.test(tz)) return 'ar';
    return /^es/i.test(ls[0]) ? 'es' : 'en';
  } catch (e) { return 'ar'; }
})();
/* ===== C7 DISCORD ICON FIX ===== */
(function(){var P='M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z';
function fix(){var s=document.querySelectorAll('.c7-discord svg');if(!s.length)return false;for(var i=0;i<s.length;i++){s[i].setAttribute('viewBox','0 0 24 24');s[i].style.transform='none';s[i].innerHTML='<path d="'+P+'"></path>';}return true;}
var n=0,id=setInterval(function(){n++;if(fix()||n>60)clearInterval(id);},250);
if(document.readyState!=='loading')fix();else document.addEventListener('DOMContentLoaded',fix);})();

(function () {
function run() {
var box = document.querySelector('.content--single-page .content-entry');
if (!box || box.getAttribute('data-c7') === '1') return;
box.setAttribute('data-c7', '1');
var ps = box.querySelectorAll('p');
for (var i = 0; i < ps.length; i++) {
var p = ps[i];
var t = (p.textContent || '').trim();
if (!t) { p.classList.add('c7-blank'); continue; }
if (t.length <= 6 && /^[^A-Za-z0-9\u0600-\u06FF]+$/.test(t)) {
p.classList.add('c7-divider');
p.textContent = '';
continue;
}
var solo = p.children.length === 1 &&
p.children[0].tagName === 'STRONG' &&
(p.children[0].textContent || '').trim().length >= t.length - 2;
var head = t.length <= 42 &&
p.children.length === 0 &&
!/^[\u2022\u25E6\u00B7\u2043\u2013\u2014\-\d]/.test(t) &&
!/[.\u060C]$/.test(t);
if (solo || head) p.classList.add('c7-h');
}
var items = box.querySelectorAll('li, p');
for (var j = 0; j < items.length; j++) {
var el = items[j];
if (el.classList.contains('c7-divider')) continue;
var f = el.firstChild;
if (f && f.nodeType === 3) {
var v = f.nodeValue.replace(/^\s*[\u2022\u25E6\u00B7\u2043]\s*/, '');
if (v !== f.nodeValue) {
f.nodeValue = v;
el.classList.remove('c7-h');
el.classList.add('c7-li');
}
}
if (el.tagName === 'LI') el.classList.add('c7-li');
}
}
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', run);
} else {
run();
}
setTimeout(run, 900);
setTimeout(run, 2500);
})();
(function () {
var DURL = c7.discord;
var SVG = '<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M20.3 4.4A19.8 19.8 0 0 0 16.6 3c-.2.4-.4.8-.6 1.2a18.3 18.3 0 0 0-3.9 0c-.2-.4-.4-.8-.6-1.2A19.7 19.7 0 0 0 7.7 4.4C3.9 9.1 3.2 13.6 3.5 18.1A19.9 19.9 0 0 0 9.5 21c.5-.7.9-1.4 1.3-2.1-.7-.3-1.4-.6-2-1 .2-.1.3-.2.5-.4 3.9 1.8 8 1.8 11.9 0 .2.2.3.3.5.4-.6.4-1.3.7-2 1 .4.7.8 1.4 1.3 2.1a19.9 19.9 0 0 0 6-2.9c.4-5.2-.7-9.7-3.1-13.7ZM9.7 15.3c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4Zm7.9 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-.9 2.4-2.2 2.4Z"/></svg>';
function addD() {
var lists = document.querySelectorAll('.s-contacts-list');
for (var i = 0; i < lists.length; i++) {
if (lists[i].querySelector('.c7-discord')) continue;
var w = document.createElement('div');
w.innerHTML = '<a class="s-contacts-item c7-discord" target="_blank" rel="noopener" href="' + DURL + '"><span class="s-contacts-icon">' + SVG + '</span><span class="unicode">سيرفر الديسكورد</span></a>';
lists[i].appendChild(w);
}
var cols = document.querySelectorAll('.footer-list__item');
for (var j = 0; j < cols.length; j++) {
var col = cols[j];
if (col.querySelector('.c7-discord-link')) continue;
if ((col.textContent || '').indexOf('من نحن') === -1) continue;
var links = col.querySelectorAll('a');
if (!links.length) continue;
var a = document.createElement('a');
a.className = links[0].className + ' c7-discord-link';
a.href = DURL;
a.target = '_blank';
a.rel = 'noopener';
a.textContent = 'سيرفر الديسكورد';
links[links.length - 1].parentNode.appendChild(a);
}
}
/* كان: ثلاث محاولات بمؤقّتات عمياء — وكلها تسبق بناء <salla-contacts>
   فيفشل الزرّ صامتًا. الآن: مراقبة DOM حتى يظهر العنصر فعلًا. */
c7.waitFor('.s-contacts-list, .footer-list__item', function () { addD(); });
})();
(function () {
var ATT = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
/* أيقونات ثنائيّة اللون: تعبئة شفّافة + خطّ أبيض (المميزات v2) */
var SH = '<svg ' + ATT + '><path d="M12 2.8l7.4 3v6.1c0 4.9-3.2 8.4-7.4 9.5-4.2-1.1-7.4-4.6-7.4-9.5V5.8z" fill="currentColor" fill-opacity=".2"/><path d="M8.6 12.3l2.3 2.3 4.6-5"/></svg>';
var CARD = '<svg ' + ATT + '><rect x="2.5" y="5" width="19" height="14" rx="3.2" fill="currentColor" fill-opacity=".2"/><path d="M2.5 9.6h19"/><path d="M6.2 15h4.4"/><circle cx="17.2" cy="15" r="1.2" fill="currentColor" stroke="none"/></svg>';
var SUP = '<svg ' + ATT + '><path d="M4 13.6a8 8 0 1 1 16 0"/><rect x="2.6" y="13" width="4.8" height="6.4" rx="2.1" fill="currentColor" fill-opacity=".2"/><rect x="16.6" y="13" width="4.8" height="6.4" rx="2.1" fill="currentColor" fill-opacity=".2"/><path d="M19 19.4v.3a2.8 2.8 0 0 1-2.8 2.8h-2.4"/></svg>';
function pick(t) {
if (/ضمان|أمان|امان/.test(t)) return SH;
if (/دفع|تقسيط|فاتورة/.test(t)) return CARD;
return SUP;
}
function run() {
var p = document.querySelector('.footer_top p');
if (p && !p.querySelector('.c7-brand') && /C7/.test(p.textContent || '')) {
p.innerHTML = p.innerHTML.replace(/C7\s*Script|C7/, '<b class="c7-brand">C7Script</b>');
}
var items = document.querySelectorAll('.s-block--features__item');
for (var i = 0; i < items.length; i++) {
var box = items[i].querySelector('.feature-icon');
if (!box || box.classList.contains('c7-ico')) continue;
var t = (items[i].textContent || '');
box.classList.add('c7-ico');
box.innerHTML = pick(t);
}
}
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', run);
} else {
run();
}
setTimeout(run, 1000);
setTimeout(run, 2600);
})();
(function () {
var SEL = 'section.s-block > .container, .s-block--features__item, .faq-item, custom-salla-product-card, .special-testimonial__inner, .s-comment-form-wrapper, salla-comment-item, .content--single-page';
var io = null, live = 0, calm = Date.now() + 4000;
function boot() {
if (!('IntersectionObserver' in window)) return;
if (!io) {
io = new IntersectionObserver(function (es) {
var k = 0, vh = window.innerHeight;
es.forEach(function (e) {
if (!e.isIntersecting) return;
var el = e.target, r = e.boundingClientRect;
io.unobserve(el);
/* الأداء: كل حركة ظهور تفتح طبقة رسم بحجم العنصر. التمرير السريع كان يشغّل عشرات الطبقات
   دفعة واحدة (حاويات أقسام كاملة) فتخلص ذاكرة الجوّال الضعيف والآيفون فيعيد المتصفّح تحميل
   الصفحة. بعد أوّل ٤ ثوانٍ: العنصر الأطول من الشاشة، أو اللي وصل نصّ الشاشة قبل ما نلحق عليه
   (تمرير سريع — حركته كانت تخفيه ثم تظهره = وميض)، أو ما زاد عن ٤ حركات شغّالة: يظهر بلا حركة. */
if (Date.now() > calm && (live >= 4 || r.height > vh * 1.1 || r.top < vh * 0.55)) return;
live++;
setTimeout(function () { el.classList.add('c7-rv'); setTimeout(function () { live--; }, 850); }, k++ * 70);
});
}, { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });
}
var list = document.querySelectorAll(SEL);
for (var i = 0; i < list.length; i++) {
if (list[i].getAttribute('data-c7rv')) continue;
list[i].setAttribute('data-c7rv', '1');
io.observe(list[i]);
}
}
/* حُذفت waLabel: كانت تستبدل نصّ الرقم بكلمة «واتساب» فتمحو الرقم،
   والعنوان الآن من CSS (::after) فلو عملت الدالة لتكرّرت الكلمة ولضاع الرقم.
   لم يظهر الخلل سابقًا إلا لأنّ مؤقّتاتها تسبق ترطيب الفوتر. */
function run() { boot(); }
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', run);
} else {
run();
}
setTimeout(run, 1200);
setTimeout(run, 3000);
})();;(function(){function P(){document.querySelectorAll('.product__description p').forEach(function(p){var s=p.textContent.trim();if(!s)return;var c=s.codePointAt(0);if(c>8000&&!p.classList.contains('c7-ph'))p.classList.add('c7-ph')})}P();setTimeout(P,900);setTimeout(P,2200)})();
;(function(){function B(){try{return salla.url.get('/')}catch(e){return '/'}}
function mk(cls,h){var li=document.createElement('li');li.className='c7-home ';li.className+=cls;var a=document.createElement('a');a.href=h;a.className='text-gray-500 !flex items-center justify-start';var t=document.createElement('h4');t.className='text-sm lg:text-lg def-note';t.textContent='الصفحة الرئيسية';a.appendChild(t);li.appendChild(a);return li}
function H(){var ul=document.querySelector('#mobile-menu ul.main-menu');if(!ul||ul.querySelector('li.c7-home'))return;var h=B();ul.insertBefore(mk('desktop-menu-item text-primary !hidden lg:!block root-level',h),ul.firstChild);ul.insertBefore(mk('mobile-menu-item has-no-children lg:hidden text-sm font-bold',h),ul.firstChild)}
/* كان: أربع مؤقّتات + مستمع نقر على كل الصفحة يعمل للأبد.
   الآن: مراقبة القائمة نفسها — تعمل مرّة واحدة عند ظهورها. */
c7.waitFor('#mobile-menu ul.main-menu', function(){ H(); }, { timeout: 20000 });
})();

/* ---------- زر الديسكورد العائم ----------
   النسخة القديمة كانت تنتظر <salla-contacts> بمؤقّتات فتفشل دائمًا.
   هذه تُضاف إلى body مباشرة فتظهر في كل صفحة بلا استثناء. */
(function () {
  var URL_D = c7.discord;
  var ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.3 18.3 0 0 0-5.487 0 12.6 12.6 0 0 0-.618-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.319 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.94.252-.192.372-.291a.074.074 0 0 1 .078-.011c3.928 1.794 8.18 1.794 12.061 0a.074.074 0 0 1 .079.01c.12.099.246.198.373.292a.077.077 0 0 1-.007.128c-.598.35-1.22.652-1.873.891a.077.077 0 0 0-.04.107c.36.698.772 1.363 1.225 1.993a.076.076 0 0 0 .084.029 19.9 19.9 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.029ZM8.02 15.331c-1.183 0-2.157-1.086-2.157-2.419s.956-2.419 2.157-2.419c1.211 0 2.176 1.095 2.157 2.419 0 1.333-.956 2.419-2.157 2.419Zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419s.955-2.419 2.157-2.419c1.211 0 2.176 1.095 2.157 2.419 0 1.333-.946 2.419-2.157 2.419Z"/></svg>';
  function add() {
    if (document.querySelector('.c7-fab')) return;
    var w = document.createElement('div');
    w.className = 'c7-fab';
    w.innerHTML = '<a class="c7-fab__btn" href="' + URL_D + '" target="_blank" rel="noopener" aria-label="سيرفر الديسكورد">' + ICON + '</a>' +
                  '<span class="c7-fab__tip">للاستفسارات حيّاك في ديسكورد</span>';
    document.body.appendChild(w);
  }
  c7.ready(add);
})();

/* ═══ القنوات الثلاث في مجموعة واحدة ═══
   سلّة تضع «التواصل الاجتماعي» و«قنوات التواصل» في عمودين مختلفين،
   فيبقى تيك توك وحده بعيدًا عن واتساب والديسكورد. النقل بعد الترطيب
   لا قبله، لأنّ القائمة لا توجد إلا بعده. */
(function () {
  c7.waitFor('footer.store-footer .s-social-list', function (ul) {
    var box = document.querySelector('footer.store-footer .footer-contact');
    var host = ul.closest('salla-social') || ul;
    if (!box || box.contains(host)) return;
    box.appendChild(host);
    /* بلا مهلة: الفوتر يُرطَّب متى وصله الزائر، وقد يتجاوز ذلك دقائق،
       ومهلة ٢٠ ثانية كانت تفصل المراقب قبل وجود القائمة. */
  }, { once: true });
})();

/* ---------- 9) أيقونات خيارات المنتج ----------
   مكوّن سلّة يرسم كل خيار كـ <label><input type=radio><div class="s-product-options-grid-mode-span">نصّ</div></label>
   داخل .s-product-options-grid-mode، بلا أيّ معرّف للماركة. نقرأ النصّ ونضيف صنوفًا،
   والـCSS (كتلة «خيارات المنتج» في global-extras.css) يرسم علامة الماركة وأيقونة الجهاز:
   كرونس/ماتريكس ⟶ c7-brand-cronus / c7-brand-xim · يد/ماوس ⟶ c7-dev-pad / c7-dev-mouse
   · خيار «خدمة الاتصال» (نعم/لا) ⟶ c7-call-yes / c7-call-no. */
(function () {
  function groupTitle(label) {
    var el = label, n = 0;
    while (el && n < 5) {
      var t = el.querySelector && el.querySelector('.s-product-options-option-label');
      if (t) return t.textContent || '';
      el = el.parentElement; n++;
    }
    return '';
  }
  function tag(label) {
    var span = label.querySelector('.s-product-options-grid-mode-span');
    if (!span) return;
    var t = (span.textContent || '').replace(/\s+/g, ' ').trim();
    var g = groupTitle(label);
    var cls = [];
    if (/كرونس|cronus/i.test(t)) cls.push('c7-brand-cronus');
    if (/ماتريكس|ماتركس|matrix|xim/i.test(t)) cls.push('c7-brand-xim');
    if (/ماوس|mouse/i.test(t)) cls.push('c7-dev-mouse');
    else if (/يد|L1|R1|R2|L2|controller|pad/i.test(t)) cls.push('c7-dev-pad');
    if (/اتصال|مكالمة|إعداد|اعداد|دعم/.test(g)) cls.push(/^لا(\s|،|$)/.test(t) ? 'c7-call-no' : 'c7-call-yes');
    if (!cls.length) return;
    cls.push('c7-opt');
    for (var i = 0; i < cls.length; i++) label.classList.add(cls[i]);
  }
  c7.waitFor('.s-product-options-grid-mode > label', tag);
})();
/* ---------- 12) «تقييمات متجر C7Script» في كل صفحة منتج (مثل tkpro) ----------
   التقييمات الحقيقيّة لكل منتجات المتجر تُجلب مباشرة من سلّة (salla.api.comment) وتُعرض:
   (أ) شارة نجوم المتجر تحت اسم المنتج «(N تقييم للمتجر)» — تضغطها تنزل للقسم
   (ب) قسم بطاقات قبل تعليقات المنتج: آخر تقييمات العملاء على المنتجات الأخرى + اسم المنتج.
   العدد = مجموع التقييمات الفعليّة، يزيد وحده مع كل تقييم جديد. كاش ١٠ دقائق بالجلسة. */
(function () {
  var SOURCES = [1755224368, 1561774982, 1778429348, 1651879706, 771396096, 1544249465, 1765129269, 354378945,
                 1107757505, 844722281, 2037265166, 2031556291, 1460523496];
  var SHOW = 6, PER = 20, MAXPAGES = 3, KEY = 'c7-sr-v1';
  var host = document.querySelector('salla-comments');
  if (!host || document.getElementById('c7-sr')) return;
  var cur = +(host.getAttribute('item-id') || 0);
  function el(t, c, txt) { var e = document.createElement(t); if (c) e.className = c; if (txt != null) e.textContent = txt; return e; }
  function stars(n) { n = Math.round(n); return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n); }
  function ago(sec) {
    try {
      var d = (sec * 1000 - Date.now()) / 1000, a = Math.abs(d), rtf = new Intl.RelativeTimeFormat(c7.lang || 'ar', { numeric: 'auto' });
      if (a < 3600) return rtf.format(Math.round(d / 60), 'minute');
      if (a < 86400) return rtf.format(Math.round(d / 3600), 'hour');
      if (a < 2592000) return rtf.format(Math.round(d / 86400), 'day');
      if (a < 31536000) return rtf.format(Math.round(d / 2592000), 'month');
      return rtf.format(Math.round(d / 31536000), 'year');
    } catch (e) { return ''; }
  }
  function fetchAll() {
    try { var c = JSON.parse(sessionStorage.getItem(KEY) || 'null'); if (c && Date.now() - c.t < 600000) return Promise.resolve(c.d); } catch (e) {}
    var api = salla.api.comment;
    return Promise.all(SOURCES.map(function (id) {
      return api.getComments('product', id, 1, PER).then(function (r) {
        var pages = Math.min(MAXPAGES, (r.pagination && r.pagination.totalPages) || 1), more = [];
        for (var p = 2; p <= pages; p++) more.push(api.getComments('product', id, p, PER).then(function (x) { return x.data || []; }).catch(function () { return []; }));
        return Promise.all(more).then(function (rest) { return [].concat(r.data || [], [].concat.apply([], rest)); });
      }).catch(function () { return []; });
    })).then(function (all) {
      var d = [].concat.apply([], all).map(function (i) {
        return { n: (i.name || '').trim(), r: +i.rating || 0, t: (i.content || '').trim(), d: +i.date || 0, o: !!i.has_order,
                 p: i.product ? i.product.name : '', pid: i.product ? i.product.id : 0 };
      });
      try { sessionStorage.setItem(KEY, JSON.stringify({ t: Date.now(), d: d })); } catch (e) {}
      return d;
    });
  }
  var STAR = '<svg viewBox="0 0 24 24"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';
  function badge(avg, count) {
    var mc = document.querySelector('.prod-main-content');
    if (!mc || document.getElementById('c7-sr-badge')) return;
    var price = mc.querySelector(':scope > .p-price-outer'); if (!price) return;
    var b = el('button', 'c7-sr-badge'); b.id = 'c7-sr-badge'; b.type = 'button'; b.dir = 'rtl'; b.title = 'تقييم متجر C7Script';
    var st = el('span', 's'), n = Math.round(avg);
    for (var k = 0; k < 5; k++) { var i = el('i', k < n ? '' : 'e'); i.innerHTML = STAR; st.appendChild(i); }
    b.appendChild(st); b.appendChild(el('b', null, avg.toFixed(1))); b.appendChild(el('span', 'c', '(' + count + ' تقييم للمتجر)'));
    b.addEventListener('click', function () { var t = document.getElementById('c7-sr'); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    price.parentNode.insertBefore(b, price);
    document.documentElement.classList.add('c7-sr-on');
  }
  function render(all) {
    var rated = all.filter(function (i) { return i.r > 0; });
    if (!rated.length) return;
    var avg = rated.reduce(function (s, i) { return s + i.r; }, 0) / rated.length;
    badge(avg, rated.length);
    var list = all.filter(function (i) { return i.pid !== cur && i.r >= 4 && i.t.length >= 3; }).sort(function (a, b) { return b.d - a.d; });
    if (list.length < 2) return;
    var sec = el('section', 'c7-sr'); sec.id = 'c7-sr'; sec.dir = 'rtl';
    var box = el('div', 'c7-sr-box'); sec.appendChild(box);
    var head = el('div', 'c7-sr-head'); head.appendChild(el('h2', null, 'تقييمات متجر C7Script'));
    var sc = el('div', 'c7-sr-score'); sc.appendChild(el('b', null, avg.toFixed(1)));
    var sw = el('div'); sw.appendChild(el('div', 'c7-sr-stars', stars(avg))); sw.appendChild(el('small', null, 'من ' + rated.length + ' تقييم لعملائنا'));
    sc.appendChild(sw); head.appendChild(sc); box.appendChild(head);
    var grid = el('div', 'c7-sr-grid'); box.appendChild(grid);
    var shown = 0, btn = el('button', 'c7-sr-more', 'عرض المزيد'); btn.type = 'button';
    function more() {
      list.slice(shown, shown + SHOW).forEach(function (i) {
        var c = el('div', 'c7-sr-card'), top = el('div', 'c7-sr-top');
        top.appendChild(el('span', 'c7-sr-av', (i.n || '؟').charAt(0)));
        var who = el('div', 'c7-sr-who'); who.appendChild(el('b', null, i.n || 'عميل C7'));
        if (i.o) who.appendChild(el('i', null, '✓ مشتري موثّق'));
        top.appendChild(who); top.appendChild(el('span', 'c7-sr-stars', stars(i.r))); c.appendChild(top);
        c.appendChild(el('p', null, i.t));
        var f = el('div', 'c7-sr-foot'); f.appendChild(el('span', null, i.p ? 'عن: ' + i.p : '')); f.appendChild(el('span', null, ago(i.d))); c.appendChild(f);
        grid.appendChild(c);
      });
      shown += SHOW; if (shown >= list.length && btn.parentNode) btn.parentNode.removeChild(btn);
    }
    btn.addEventListener('click', more);
    more(); if (shown < list.length) box.appendChild(btn);
    host.parentNode.insertBefore(sec, host);
  }
  function go() { if (!(window.salla && salla.api && salla.api.comment)) return false; fetchAll().then(render); return true; }
  if (!go()) { var n = 0, iv = setInterval(function () { if (go() || ++n > 40) clearInterval(iv); }, 250); }
})();

/* ---------- 15) خيار «الدعم الخاص» بصياغةٍ واحدة ----------
   الخيار موجود في سلّة بأسماء متفرّقة («خدمه اتصال للإعداد الشخصي مع موظف» / «نعم (٦٩ ر.س)» / «لا»).
   هنا يُعرض بصياغة واحدة واضحة: العنوان «الدعم»، والشرح تحته، والسعر الإضافيّ شارةً بجانب الاسم.
   السعر يُقرأ من نصّ سلّة نفسه، فلا رقم مكتوبًا هنا. */
(function () {
  function fix(opt) {
    var lb = opt.querySelector('.s-product-options-option-label');
    if (!lb) return;
    var b = lb.querySelector('b'), sm = lb.querySelector('small');
    if (!b || !/اتصال|مكالمة|دعم/.test(b.textContent)) return;
    b.textContent = 'الدعم';
    if (sm) sm.textContent = 'دعم خاص: موظف يدخل معك ويضبط لك كل شي';
    opt.classList.add('c7-sup');
    /* الدعم دائمًا آخر خيار (في بعض المنتجات يرجع من سلّة قبل خيار القطعة) */
    var w = opt.parentNode;
    if (w && w.parentNode && /s-product-options-option-container/.test(w.className)) {
      var all = w.parentNode.querySelectorAll(':scope > .s-product-options-option-container'), last = all[all.length - 1];
      if (last && last !== w) w.parentNode.insertBefore(w, last.nextSibling);
    }
    opt.querySelectorAll('.s-product-options-grid-mode-span').forEach(function (sp) {
      var tx = (sp.textContent || '').replace(/\s+/g, ' ').trim();
      var lab = sp.closest('label'), no = /^لا(\s|،|$)/.test(tx);
      if (lab) { lab.classList.add('c7-opt'); lab.classList.add(no ? 'c7-call-no' : 'c7-call-yes'); }
      if (no) { sp.textContent = 'لا، أكتفي بالشروحات'; return; }
      var pr = /\(([^)]*[0-9٠-٩][^)]*)\)/.exec(tx);
      sp.textContent = 'دعم خاص';
      if (pr) { var em = document.createElement('em'); em.className = 'c7-sup__p'; em.textContent = '+' + pr[1].trim(); sp.appendChild(em); }
    });
  }
  /* تُراقَب القيمة لا الحاوية: الحاوية تُدرَج قبل أن تُبنى قيمها */
  c7.waitFor('.product-single .s-product-options-option .s-product-options-grid-mode-span', function (sp) {
    var o = sp.closest('.s-product-options-option');
    if (o && !o.classList.contains('c7-sup')) fix(o);
  });
})();

/* ---------- 16) اللغات: ترجمة المتجر كاملًا إلى الإنجليزيّة والإسبانيّة ----------
   المتجر في سلّة عربيّ فقط، فالترجمة هنا على المتصفّح: قاموس مُعدّ سلفًا (لا ترجمة آليّة
   وقت التصفّح) مفتاحه بصمة النصّ العربيّ، يُطبَّق على كل نصّ وخاصيّة ظاهرة ثم يراقب ما
   يُبنى لاحقًا (مكوّنات سلّة، النوافذ، السلّة). الأرقام تُستخرج من النصّ وتُعاد مكانها
   فيكفي مدخلٌ واحد لكل صيغة («قبل # أشهر»). تعليقات العملاء وأسماؤهم تبقى بنصّها.
   نصٌّ ليس في القاموس يبقى عربيًّا كما هو. العربيّ لا يمرّ من هنا إطلاقًا. */
(function () {
  var L = c7.lang;
  if (L !== 'en' && L !== 'es') return;
  var I = L === 'es' ? 1 : 0, D;
  try { D = JSON.parse("{\"wombo7\":[\"# days\",\"# días\"],\"5ekqs8\":[\"# months (# SAR)\",\"# meses (# SAR)\"],\"h8o4dd\":[\"#. Prices and offers are subject to change without prior notice.\",\"#. Los precios y las ofertas pueden cambiar sin previo aviso.\"],\"1wraxj8\":[\"#. Arabic is the governing language in interpreting this agreement.\",\"#. El árabe es el idioma que prevalece en la interpretación de este acuerdo.\"],\"1lhawfe\":[\"#. Seasons and holidays:\",\"#. Temporadas y festivos:\"],\"cicyx6\":[\"#. All financial transactions are subject to approved accounting systems.\",\"#. Todas las operaciones financieras están sujetas a los sistemas contables aprobados.\"],\"1vu0fdk\":[\"#. Product and service prices are clearly stated in the store.\",\"#. Los precios de los productos y servicios se indican claramente en la tienda.\"],\"10m0jb3\":[\"#. The store undertakes to provide an invoice or proof of purchase.\",\"#. La tienda se compromete a proporcionar una factura o comprobante de compra.\"],\"1ly6cgn\":[\"#. The store offers multiple secure electronic payment methods.\",\"#. La tienda ofrece varios métodos de pago electrónico seguros.\"],\"13o46pc\":[\"(# store reviews)\",\"(# reseñas de la tienda)\"],\"o3fq7i\":[\"(# reviews)\",\"(# reseñas)\"],\"1fijoup\":[\"(# reviews)\",\"(# reseñas)\"],\"ilshhz\":[\"(Under review)\",\"(En revisión)\"],\"ak8wqa\":[\"(1 review)\",\"(1 reseña)\"],\"8txhlm\":[\"(2 reviews)\",\"(2 reseñas)\"],\"1diqri5\":[\"(if it is a non-digital product).\",\"(si se trata de un producto no digital).\"],\"1plceyr\":[\"(In progress)\",\"(En curso)\"],\"141k1u5\":[\"Powerful Aim Assist similar to Aim Bot, works accurately with and without zoom.\",\"Aim Assist potente similar a un Aim Bot, funciona con precisión con y sin zoom.\"],\"o00uij\":[\"Aim Assist tuned for each character for ideal performance.\",\"Aim Assist ajustado para cada personaje para un rendimiento ideal.\"],\"1wigb14\":[\"Advanced Anti Recoil supporting multiple weapons, such as:\",\"Anti Recoil avanzado que admite varias armas, como:\"],\"14el6qz\":[\"Capture Card such as Elgato #K X\",\"Capture Card como Elgato #K X\"],\"8t1rny\":[\"PlayStation # and Windows PC only\",\"Solo PlayStation # y PC con Windows\"],\"he1ovq\":[\"XIM Matrix (Mouse + Keyboard)\",\"XIM Matrix (Ratón + Teclado)\"],\"snv0kc\":[\"XIM Matrix (Controller)\",\"XIM Matrix (Mando)\"],\"1z0ru28\":[\", using\",\", el uso de\"],\"1t7vzu\":[\"Latest products\",\"Últimos productos\"],\"rzoslt\":[\"Latest Black Ops # script — Instant delivery\",\"El script más reciente de Black Ops # — Entrega inmediata\"],\"o4dsb6\":[\"months, Sharia-compliant!\",\"meses, compatible con la ley islámica (Sharía).\"],\"1v8o6y0\":[\"Add to wishlist\",\"Añadir a la lista de deseos\"],\"1u4x8w1\":[\"Add to cart\",\"Añadir al carrito\"],\"g5scc3\":[\"Multiple custom modes to stabilize your aim to match your playstyle.\",\"Varios modos personalizados para estabilizar la puntería según tu estilo de juego.\"],\"gbqnji\":[\"or\",\"o\"],\"48s1oe\":[\"Recommended the product\",\"Recomendaron el producto\"],\"1on9ugq\":[\"Working hours\",\"Horario de atención\"],\"1xkv3ge\":[\"Working hours - C#Script\",\"Horario de atención - C#Script\"],\"xs93oo\":[\"First: Scripts and digital products\",\"Primero: Scripts y productos digitales\"],\"1q50sx1\":[\"First: Ground shots (Low Driven)\",\"Primero: Tiros rasos (Low Driven)\"],\"1as4v6u\":[\"First: Introduction to the Terms of Use\",\"Primero: Introducción al acuerdo de uso\"],\"1bjxri8\":[\"Any game you choose\",\"Cualquier juego que elijas\"],\"42cg46\":[\"New release\",\"Nuevo lanzamiento\"],\"iokz42\":[\"New release with strong recoil control — Instant delivery\",\"Nuevo lanzamiento con gran control de retroceso — Entrega inmediata\"],\"xq0ngc\":[\"Faster firing for semi-auto weapons, with a speed you can tune for each weapon.\",\"Disparo más rápido para armas semiautomáticas, con una velocidad que ajustas para cada arma.\"],\"1sywbk8\":[\"Return the physical device to us\",\"Devolvernos el dispositivo físico\"],\"1832ntr\":[\"Ready-to-use settings for instant play, no hassle.\",\"Configuración lista para usar de inmediato, sin complicaciones.\"],\"14fi39j\":[\"Close menu\",\"Cerrar menú\"],\"1s8h6z1\":[\"Easily switch between mods during the match.\",\"Cambia fácilmente entre modos durante la partida.\"],\"1736fid\":[\"Switch between Aim Assist modes quickly and easily.\",\"Cambia entre los modos de Aim Assist de forma rápida y sencilla.\"],\"4owdm\":[\"Search\",\"Buscar\"],\"26hta4\":[\"Very strong and stable internet connection\",\"Conexión a internet muy fuerte y estable\"],\"ry65vd\":[\"Stable internet connection.\",\"Conexión a internet estable.\"],\"kyo45l\":[\"Ahmed\",\"Ahmed\"],\"1xdmp1\":[\"Choose\",\"Elige\"],\"wfvnm1\":[\"Choose a city or use your location to find the nearest branch.\",\"Elige una ciudad o usa tu ubicación para encontrar la sucursal más cercana.\"],\"n4on4j\":[\"Choose your script\",\"Elige tu script\"],\"1xwnijh\":[\"Choose your device and control type\",\"Elige tu dispositivo y tipo de control\"],\"s4keml\":[\"Choose your device and control type\",\"Elige tu dispositivo y tipo de control\"],\"1qj9a4f\":[\"Attacking shortcuts to create shooting angles and precise passes.\",\"Atajos ofensivos para crear ángulos de tiro y pases precisos.\"],\"180j73l\":[\"Send\",\"Enviar\"],\"o6vj8w\":[\"ARC Raiders (Controller)\",\"ARC Raiders (Mando)\"],\"1fm0khk\":[\"Using the script in an unsupported environment.\",\"Usar el script en un entorno no compatible.\"],\"1vqn0fs\":[\"Restore all original texts\",\"Restaurar todos los textos originales\"],\"gh6fc1\":[\"Network stability.\",\"Estabilidad de la red.\"],\"14o209r\":[\"Your name\",\"Tu nombre\"],\"1kuke68\":[\"Buy now and enjoy\",\"Compra ahora y disfruta\"],\"1p5ylqc\":[\"Buy now\",\"Comprar\"],\"6k2wx8\":[\"Supported devices: PS# – PS# – Xbox – PC\",\"Dispositivos compatibles: PS# – PS# – Xbox – PC\"],\"1wysqkw\":[\"Newest\",\"Más recientes\"],\"1ul3hwn\":[\"Oldest\",\"Más antiguos\"],\"1xymchg\":[\"Best for Ranked\",\"Lo mejor para Ranked\"],\"qwwstv\":[\"Best for Ranked and tournaments — Instant delivery\",\"Lo mejor para Ranked y torneos — Entrega inmediata\"],\"egzhnu\":[\"Best seller\",\"Más vendido\"],\"16v8ke7\":[\"The only exception to the no-refund policy:\",\"La única excepción a la política de no devoluciones:\"],\"tdva1t\":[\"Use at your own risk if it violates the game's rules\",\"Úsalo bajo tu propia responsabilidad si infringe las reglas del juego\"],\"1w9kex2\":[\"Refund:\",\"Reembolso:\"],\"1ahxg2q\":[\"Installation: ready-made file with a simple step-by-step guide to get running in minutes\",\"Instalación: archivo listo con una guía sencilla paso a paso para empezar en minutos\"],\"vi5a8w\":[\"Sale\",\"Ofertas\"],\"1nvyvo7\":[\"Sale -\",\"Ofertas -\"],\"mnlyl0\":[\"Sale - C#Script\",\"Ofertas - C#Script\"],\"9er6wo\":[\"Instant delivery after completing the order.\",\"Entrega inmediata tras completar el pedido.\"],\"fvj5z\":[\"Categories\",\"Categorías\"],\"1h6h5wy\":[\"Most searched categories\",\"Categorías más buscadas\"],\"1rtbi43\":[\"Overall rating\",\"Valoración general\"],\"1u0mrrr\":[\"Switch between modes quickly to change your playstyle in seconds.\",\"Cambia de modo rápidamente para variar tu estilo de juego en segundos.\"],\"qkl15y\":[\"Go to homepage\",\"Ir a la página de inicio\"],\"jepo27\":[\"Home\",\"Inicio\"],\"5npty6\":[\"Responding to inquiries\",\"Respuesta a consultas\"],\"12tkn22\":[\"Commercial registration\",\"Registro mercantil\"],\"18onlt\":[\"The script is for personal use only and is non-refundable after purchase.\",\"El script es solo para uso personal y no es reembolsable después de la compra.\"],\"17p7ry0\":[\"The script is designed exclusively for FIFA #.\",\"El script está diseñado exclusivamente para FIFA #.\"],\"1hjhbqg\":[\"Cart\",\"Carrito\"],\"lhd00t\":[\"Additional terms:\",\"Condiciones adicionales:\"],\"1oyqtic\":[\"Home page\",\"Página de inicio\"],\"x60lks\":[\"Customers also bought\",\"Los clientes también compraron\"],\"1fla27d\":[\"Customers also viewed\",\"Los clientes también vieron\"],\"120px8b\":[\"Back to home\",\"Volver al inicio\"],\"1a3ontl\":[\"Technical inspection:\",\"Inspección técnica:\"],\"1mm0b27\":[\"Quantity\",\"Cantidad\"],\"1dtrgce\":[\"Article (#): Final provisions\",\"Artículo (#): Disposiciones finales\"],\"rcan3n\":[\"Article (#): Legal capacity\",\"Artículo (#): Capacidad legal\"],\"1evljrh\":[\"Article (#): Communications and notifications\",\"Artículo (#): Comunicaciones y notificaciones\"],\"pkiccl\":[\"Article (#): Definitions\",\"Artículo (#): Definiciones\"],\"11461kd\":[\"Article (#): Accounts and registration\",\"Artículo (#): Cuentas y registro\"],\"kyprzh\":[\"Article (#): Payment and settlement\",\"Artículo (#): Pago y liquidación\"],\"1vwkhky\":[\"Article (#): Governing law\",\"Artículo (#): Ley aplicable\"],\"ds3rqp\":[\"Article (#): Intellectual property\",\"Artículo (#): Propiedad intelectual\"],\"9f5mi5\":[\"Article (#): Amendments to the agreement and fees\",\"Artículo (#): Modificación del acuerdo y de las tarifas\"],\"17rdkrl\":[\"Article (#): Account suspension or cancellation\",\"Artículo (#): Suspensión o cancelación de la cuenta\"],\"124cxqp\":[\"Article (#): Limitation of liability\",\"Artículo (#): Limitación de responsabilidad\"],\"18v1wbk\":[\"Article (#): Usage rules\",\"Artículo (#): Normas de uso\"],\"1hnj1v4\":[\"Article (#): Scope of the store's obligations\",\"Artículo (#): Alcance de las obligaciones de la tienda\"],\"37vglf\":[\"Requirements:\",\"Requisitos:\"],\"129wm42\":[\"Requirements: original controller + Cronus Zen or XIM Matrix device\",\"Requisitos: mando original + dispositivo Cronus Zen o XIM Matrix\"],\"vx5xar\":[\"Blog\",\"Blog\"],\"1n7sig5\":[\"Key features:\",\"Características principales:\"],\"1ks5ajb\":[\"Digital product for personal use only, non-refundable.\",\"Producto digital solo para uso personal, no reembolsable.\"],\"4md0gi\":[\"Digital product, non-refundable\",\"Producto digital, no reembolsable\"],\"1jh2xk8\":[\"Digital product, non-refundable after purchase.\",\"Producto digital, no reembolsable después de la compra.\"],\"1vomqd0\":[\"Digital product, non-refundable.\",\"Producto digital, no reembolsable.\"],\"11rytf9\":[\"Most searched products\",\"Productos más buscados\"],\"2zvvr\":[\"Lower Ping.\",\"Ping más bajo.\"],\"arxi7z\":[\"Overwatch (Controller)\",\"Overwatch (Mando)\"],\"l5fius\":[\"Yes (# SAR)\",\"Sí (# SAR)\"],\"1peekh1\":[\"You can go back to the homepage or contact technical support!\",\"¡Puedes volver a la página de inicio o contactar con soporte técnico!\"],\"1ai13e9\":[\"Battlefield# (Controller)\",\"Battlefield# (Mando)\"],\"1j020zu\":[\"Promotional banner\",\"Banner promocional\"],\"12smhhb\":[\"Search\",\"Buscar\"],\"ip436i\":[\"Use a wired connection instead of Wi-Fi for the best response.\",\"Usa conexión por cable en lugar de Wi-Fi para obtener la mejor respuesta.\"],\"5wbtzk\":[\"No hassle\",\"Sin complicaciones\"],\"1njcq8e\":[\"Your email\",\"Tu correo electrónico\"],\"11cb9l0\":[\"Provided that the fault is:\",\"Siempre que la avería sea:\"],\"347yi5\":[\"Once the order is completed, it cannot be refunded or cancelled under any circumstances\",\"Una vez completado el pedido, no se puede reembolsar ni cancelar bajo ninguna circunstancia\"],\"v5s3st\":[\"Some features work better depending on the device type and gaming platform\",\"Algunas funciones funcionan mejor según el tipo de dispositivo y la plataforma de juego\"],\"ho8154\":[\"Black Ops # (Controller)\",\"Black Ops # (Mando)\"],\"hjp92u\":[\"Black Ops# (Controller)\",\"Black Ops# (Mando)\"],\"icsv4g\":[\"Fast building\",\"Construcción rápida\"],\"g2e7ww\":[\"Fast building and accurate aim — Instant delivery\",\"Construcción rápida y puntería precisa — Entrega inmediata\"],\"10fipwh\":[\"PC with Sony without Elgato (Sony and PC subscription)\",\"PC con Sony sin Elgato (suscripción Sony y PC)\"],\"jyevfj\":[\"PC with Sony with Elgato device (Sony and PC subscription)\",\"PC con Sony con dispositivo Elgato (suscripción Sony y PC)\"],\"wytyk4\":[\"YY switching with instant, smooth response and no delay.\",\"Cambio de YY con respuesta inmediata y fluida, sin retraso.\"],\"32fl6x\":[\"Ultra-fast weapon switching with no delay.\",\"Cambio de arma ultrarrápido y sin retraso.\"],\"1cr1ase\":[\"Sony color tracking\",\"Seguimiento de color de Sony\"],\"ikvsov\":[\"Sony Color Tracking | C#Script\",\"Seguimiento de color de Sony | C#Script\"],\"iyis0a\":[\"Smart high-accuracy color tracking — Instant delivery\",\"Seguimiento de color inteligente de alta precisión — Entrega inmediata\"],\"iil1lm\":[\"Improved control experience for smoother, more responsive gameplay.\",\"Experiencia de control mejorada para un juego más fluido y con mejor respuesta.\"],\"jn5dc2\":[\"Smooth gameplay with no lag or stuttering.\",\"Juego fluido sin lag ni tirones.\"],\"w2oko7\":[\"Management reserves the right to reject any request that does not meet the conditions above.\",\"La administración se reserva el derecho de rechazar cualquier solicitud que no cumpla las condiciones anteriores.\"],\"1g0g6x8\":[\"Free updates as they come\",\"Actualizaciones gratis en cuanto salen\"],\"12z156u\":[\"Regular free updates to improve performance.\",\"Actualizaciones gratuitas periódicas para mejorar el rendimiento.\"],\"1wa2aqt\":[\"Free updates whenever new improvements are released.\",\"Actualizaciones gratuitas cuando se lanzan nuevas mejoras.\"],\"gv5cby\":[\"Free updates whenever new improvements are released\",\"Actualizaciones gratuitas cuando se lanzan nuevas mejoras\"],\"1t89nm\":[\"Continuous updates\",\"Actualizaciones continuas\"],\"ol8lbs\":[\"Continuous updates and direct support via WhatsApp and Discord.\",\"Actualizaciones continuas y soporte directo por WhatsApp y Discord.\"],\"1fqwdy\":[\"Improved performance and control in matches with balanced settings.\",\"Mejor rendimiento y control en las partidas con ajustes equilibrados.\"],\"1031lkb\":[\"Greater control and more precise response in competitive fights.\",\"Mayor control y respuesta más precisa en los enfrentamientos competitivos.\"],\"1jk81x1\":[\"Precise, steady control for the top meta weapons:\",\"Control preciso y estable para las armas más importantes de la meta:\"],\"1klhr77\":[\"Shipping time varies depending on:\",\"El tiempo de envío varía según:\"],\"jn01t0\":[\"Sort by\",\"Ordenar por\"],\"toebw0\":[\"Full money back\",\"Te devolvemos tu dinero completo\"],\"1vugbj0\":[\"Translate to Arabic\",\"Traducir al árabe\"],\"1hkkp9l\":[\"Translate all comments to Arabic\",\"Traducir todos los comentarios al árabe\"],\"a9ba0t\":[\"Turki\",\"Turki\"],\"gkthly\":[\"Sign in\",\"Iniciar sesión\"],\"qzxyxr\":[\"Instant delivery\",\"Entrega inmediata\"],\"fkh26x\":[\"Run a PS# device through C#Script using a Windows device.\",\"Usa tu PS# a través de C#Script con un dispositivo Windows.\"],\"1cerxlx\":[\"Instant start with no complicated settings.\",\"Uso inmediato sin configuraciones complicadas.\"],\"j6nke7\":[\"Run directly on PC with no need for a PlayStation.\",\"Funciona directamente en el PC sin necesidad de una PlayStation.\"],\"lfwu9q\":[\"Professional design tested with pro players to ensure the best performance.\",\"Diseño profesional probado con jugadores profesionales para garantizar el mejor rendimiento.\"],\"jnfvgz\":[\"Accurate aim\",\"Puntería precisa\"],\"3zi4kr\":[\"Accurate aim and fast moves — Instant delivery\",\"Puntería precisa y movimientos rápidos — Entrega inmediata\"],\"gb5tny\":[\"The quality of the experience depends heavily on\",\"La calidad de la experiencia depende en gran medida de\"],\"10mfqzl\":[\"Unable to load more\",\"No se pudo cargar más\"],\"1v0f2fy\":[\"Auto-detect\",\"Detección automática\"],\"1bf7hkh\":[\"Automatic weapon detection and precise recoil control — Instant delivery\",\"Detección automática del arma y control de retroceso preciso — Entrega inmediata\"],\"8tsol3\":[\"Learn about your options\",\"Conoce tus opciones\"],\"10526kc\":[\"Comment\",\"Comentario\"],\"14ltz5l\":[\"1 comment\",\"1 comentario\"],\"1yw7d0x\":[\"Comments\",\"Comentarios\"],\"7ms6h1\":[\"2 comments\",\"2 comentarios\"],\"8xnvu7\":[\"Works up to\",\"Funciona hasta\"],\"gnk4c3\":[\"Works on\",\"Funciona en\"],\"1malguk\":[\"Delivers good performance and a stable experience.\",\"Ofrece buen rendimiento y una experiencia estable.\"],\"etqhe5\":[\"C#Script store review\",\"Reseña de la tienda C#Script\"],\"3vs2gw\":[\"C#Script store reviews\",\"Reseñas de la tienda C#Script\"],\"zmwu76\":[\"Reviewed\",\"Valorado\"],\"1itl18b\":[\"Fast, clear communication via WhatsApp for any question or help.\",\"Comunicación rápida y clara por WhatsApp para cualquier consulta o ayuda.\"],\"11lukhu\":[\"Free shipping\",\"Envío gratis\"],\"51vm38\":[\"provides it.\",\"lo proporciona.\"],\"13qc0fc\":[\"Third: Shipping and delivery policy\",\"Tercero: Política de envío y entrega\"],\"12w2z1w\":[\"Second: Devices and non-digital products\",\"Segundo: Dispositivos y productos no digitales\"],\"lacqx0\":[\"Second: Natural shot modes\",\"Segundo: Modos de tiros normales\"],\"1007459\":[\"Recoil control ,\",\"Control de retroceso ,\"],\"cp9jrv\":[\"Strong recoil control and accurate Aim Assist — Instant delivery\",\"Gran control de retroceso y Aim Assist preciso — Entrega inmediata\"],\"4858wb\":[\"Strong recoil control\",\"Gran control de retroceso\"],\"13igaf0\":[\"Strong recoil control for most primary weapons, with smart tuning by weapon type:\",\"Gran control de retroceso para la mayoría de las armas principales, con ajuste inteligente según el tipo de arma:\"],\"j249od\":[\"Strong recoil control and pro moves — Instant delivery\",\"Gran control de retroceso y movimientos profesionales — Entrega inmediata\"],\"k05r0a\":[\"Strong recoil control reduces kickback and gives you full control in combat.\",\"Un gran control de retroceso reduce el rebote y te da control total en combate.\"],\"aa0jt\":[\"Excellent stability in close and long-range fights.\",\"Excelente estabilidad en combates cercanos y lejanos.\"],\"1x06r4c\":[\"All rights reserved | #\",\"Todos los derechos reservados | #\"],\"19uut97\":[\"PS# device.\",\"Dispositivo PS#.\"],\"1vqjgyy\":[\"Performance and frame rate quality depend on the type of capture card used.\",\"El rendimiento y los fotogramas dependen del tipo de capturadora utilizada.\"],\"tu89vf\":[\"High-quality programming\",\"Programación de alta calidad\"],\"1vb3ljh\":[\"Automatic breath-hold with sniper rifles to steady your view.\",\"Contención de la respiración automática con francotiradores para estabilizar la visión.\"],\"flz3le\":[\"Pro movement that breaks your opponent's aim during a fight.\",\"Movimiento de profesionales que rompe la puntería del rival durante el enfrentamiento.\"],\"1r36sta\":[\"Khalid Al Zaabi\",\"Khalid Al Zaabi\"],\"1hidzhc\":[\"After-sales services and technical support\",\"Servicios posventa y soporte técnico\"],\"1eh1pfw\":[\"Call service for personal setup with a staff member\",\"Servicio de llamada para configuración personalizada con un agente\"],\"1v16zsu\":[\"Call service for personal setup with a staff member\",\"Servicio de llamada para configuración personalizada con un agente\"],\"wiubn8\":[\"Call service with a staff member\",\"Servicio de llamada con un agente\"],\"1ba1ewd\":[\"#% off\",\"#% de descuento\"],\"nlwo5f\":[\"Error\",\"Error\"],\"6p6hp4\":[\"Professional support for the strongest devices\",\"Soporte profesional para los mejores dispositivos\"],\"1ag1ukm\":[\"Direct technical support\",\"Soporte técnico directo\"],\"12cafj1\":[\"Direct technical support via WhatsApp to solve any issue quickly.\",\"Soporte técnico directo por WhatsApp para resolver cualquier problema rápido.\"],\"cqn1l8\":[\"Direct technical support via WhatsApp to answer any question.\",\"Soporte técnico directo por WhatsApp para responder cualquier consulta.\"],\"1mybhsm\":[\"Ongoing technical support\",\"Soporte técnico continuo\"],\"y6dxfx\":[\"Full character support:\",\"Compatibilidad total con los personajes:\"],\"1ebcmnl\":[\"Direct support via WhatsApp\",\"Soporte directo por WhatsApp\"],\"1dg1f21\":[\"Written setup guide + tutorial videos\",\"Guía de uso escrita + videos explicativos\"],\"14dswpd\":[\"AI\",\"IA\"],\"1cjvpln\":[\"AI and accurate aim — Instant delivery\",\"IA y puntería precisa — Entrega inmediata\"],\"1qepexf\":[\"Our vision\",\"Nuestra visión\"],\"gwmr4z\":[\"Fourth: General provisions\",\"Cuarto: Disposiciones generales\"],\"1rt4l5v\":[\"Back\",\"Volver\"],\"bpxmg8\":[\"Instant WhatsApp message with the script installation steps.\",\"Mensaje inmediato por WhatsApp con los pasos para instalar el script.\"],\"1whaw90\":[\"Model number\",\"Número de modelo\"],\"380wce\":[\"Important links\",\"Enlaces importantes\"],\"fdwhvx\":[\"Pre-programmed XIM Matrix with Xim matrix script\",\"XIM Matrix preprogramado con script Xim matrix\"],\"8hqpva\":[\"Pre-programmed XIM Matrix with Xim matrix script | C#Script\",\"XIM Matrix preprogramado con script Xim matrix | C#Script\"],\"1kpo42h\":[\"Spider-Man: fast, direct combo to land hits accurately.\",\"Spider-Man: combo rápido y directo para acertar los golpes con precisión.\"],\"wfmdw8\":[\"Speed Boost for fast attacks and quick maneuvers.\",\"Speed Boost para ataques rápidos y maniobras ágiles.\"],\"tmkyfe\":[\"Internet speed.\",\"Velocidad de internet.\"],\"11cgsx0\":[\"Script ,\",\"Script ,\"],\"khfgbe\":[\"Professional Apex Legends Script\",\"Script profesional de Apex Legends\"],\"nwiyii\":[\"Professional Black Ops # Script\",\"Script profesional de Black Ops #\"],\"19c8p9l\":[\"Professional FIFA # Script – for tournaments and Ranked\",\"Script profesional de FIFA # – para torneos y Ranked\"],\"12303u0\":[\"Professional Marvel Rivals Script\",\"Script profesional de Marvel Rivals\"],\"1tsk6ho\":[\"Professional Modern Warfare # Script\",\"Script profesional de Modern Warfare #\"],\"1s7dwu5\":[\"Overwatch # Script\",\"Script de Overwatch #\"],\"1sz9n5g\":[\"Apex Legends Script\",\"Script de Apex Legends\"],\"rxk5ep\":[\"Battlefield # Script\",\"Script de Battlefield #\"],\"1p3i5vz\":[\"Black Ops # Script\",\"Script de Black Ops #\"],\"gvwuqm\":[\"C#Script Script\",\"Script de C#Script\"],\"16zz8rz\":[\"C#Script Script\",\"Script de C#Script\"],\"8apdkc\":[\"Fortnite Script\",\"Script de Fortnite\"],\"z5h8tj\":[\"C#Script Script\",\"Script de C#Script\"],\"1swtvcg\":[\"FC # Script\",\"Script de FC #\"],\"oddwmt\":[\"Marvel Rivals Script\",\"Script de Marvel Rivals\"],\"6ud23k\":[\"Modern Warfare # Script\",\"Script de Modern Warfare #\"],\"ju7bb1\":[\"C# Scripts\",\"Scripts de C#\"],\"bdst9i\":[\"C# Scripts | C#Script\",\"Scripts de C# | C#Script\"],\"1j49m9\":[\"Our Scripts Are Guaranteed\",\"Nuestros scripts están garantizados\"],\"ts2611\":[\"Shopping Cart\",\"Carrito de compras\"],\"nbs983\":[\"Shopping Cart - C#Script\",\"Carrito de compras - C#Script\"],\"1uu953b\":[\"Your cart is empty\",\"Tu carrito está vacío\"],\"17fvrco\":[\"A suitable Type-C cable.\",\"Un cable Type-C adecuado.\"],\"oeqk9v\":[\"1 year (# SAR)\",\"1 año (# SAR)\"],\"t53h5l\":[\"We made payment easy\",\"Te facilitamos el pago\"],\"dsj4fb\":[\"Easy to use\",\"Fácil de usar\"],\"loljjs\":[\"Misuse or incorrect operation.\",\"Uso indebido u operación incorrecta.\"],\"2is93f\":[\"Sony # without the Gato piece\",\"Sony # sin la pieza Gato\"],\"w8j0i2\":[\"Sony # with the Gato piece\",\"Sony # con la pieza Gato\"],\"9wdmqw\":[\"Return Policy:\",\"Política de devoluciones:\"],\"1uge8c2\":[\"Exchange and Return Policy\",\"Política de cambios y devoluciones\"],\"gk3t2z\":[\"Terms of Use and Privacy Policy\",\"Términos de uso y política de privacidad\"],\"uf7vox\":[\"Terms of Use and Privacy Policy - C#Script\",\"Términos de uso y política de privacidad - C#Script\"],\"q5u2f1\":[\"Return and Exchange Policy (Devices and Scripts)\",\"Política de devoluciones y cambios (dispositivos y scripts)\"],\"180l4xk\":[\"Store Policy\",\"Política de la tienda\"],\"mr93rw\":[\"Store Policy - C#Script\",\"Política de la tienda - C#Script\"],\"1ga9x5t\":[\"Discord Server\",\"Servidor de Discord\"],\"1azw961\":[\"Buy with\",\"Comprar con\"],\"zq7z63\":[\"Buy with Apple Pay\",\"Comprar con Apple Pay\"],\"1izy3io\":[\"Buy with\",\"Comprar con\"],\"1c0lgje\":[\"The shipping company and circumstances beyond our control.\",\"La empresa de envíos y circunstancias fuera de nuestro control.\"],\"156bs8p\":[\"Written or video tutorials (if available).\",\"Tutoriales escritos o en video (si existen).\"],\"1hlu5ln\":[\"1 month (# SAR)\",\"1 mes (# SAR)\"],\"1pjnjhv\":[\"Monthly up to\",\"Mensual hasta\"],\"ydt4u0\":[\"Powerful rocket shot (Power Shot)\",\"Tiro cohete potente (Power Shot)\"],\"15ybwpx\":[\"Natural shot with smart assist\",\"Tiro natural con asistencia inteligente\"],\"1bqeuqn\":[\"Special flair shot\",\"Tiro flair especial\"],\"1ii78e\":[\"Precise curved shot\",\"Tiro curvo preciso\"],\"dwzl8l\":[\"Weak Aim Assist on PC is because the game doesn't support it,\",\"El Aim Assist débil en PC se debe a que el juego no lo soporta,\"],\"qpybd1\":[\"One button press makes you jump automatically, making it harder for opponents to hit you.\",\"Con solo pulsar un botón saltas automáticamente y al rival le cuesta más acertarte.\"],\"cg7f28\":[\"Golden warranty\",\"Garantía dorada\"],\"axrqdi\":[\"Golden warranty if the script doesn't work for you\",\"Garantía dorada si el script no te funciona\"],\"1txtsmw\":[\"Abdullatif Al-Jutaili\",\"Abdullatif Al-Jutaili\"],\"ddhj9b\":[\"Number of purchases\",\"Número de compras\"],\"akek8x\":[\"Not following the provided clips or tutorials.\",\"No seguir los videos o tutoriales proporcionados.\"],\"11ahd8j\":[\"Customer not knowing how to use it.\",\"Que el cliente no sepa cómo usarlo.\"],\"1w30jq4\":[\"Sorry, you don't have sufficient permission to access this page!\",\"Lo sentimos, no tienes permiso suficiente para acceder a esta página.\"],\"1pt1jid\":[\"View all\",\"Ver todo\"],\"1srxed2\":[\"Show more\",\"Ver más\"],\"1todqnc\":[\"Show original text\",\"Mostrar texto original\"],\"urugl8\":[\"Quick view\",\"Vista rápida\"],\"1o9imo1\":[\"Ammar Al-Nazawi\",\"Ammar Al-Nazawi\"],\"97rd0n\":[\"Script worked properly but doesn't meet the customer's expectations.\",\"El script funcionó correctamente pero no cumple las expectativas del cliente.\"],\"uym4q0\":[\"Verified purchases\",\"Compras verificadas\"],\"1uebkzi\":[\"About: Overwatch # Script\",\"Sobre: Script de Overwatch #\"],\"lhgc5g\":[\"About: Black Ops # Script\",\"Sobre: Script de Black Ops #\"],\"1cvcsme\":[\"For: Cronus Zen pre-programmed with a free script\",\"Sobre: Cronus Zen preprogramado con script de regalo\"],\"dhcyen\":[\"When creating an account in the store, the user agrees to the following:\",\"Al crear una cuenta en la tienda, el usuario se compromete a lo siguiente:\"],\"1q6r0hj\":[\"Technical or manufacturing defect\",\"Defecto técnico o de fabricación\"],\"fnvpx2\":[\"Not found\",\"No encontrado\"],\"gel5qp\":[\"Not caused by incorrect settings.\",\"No causado por una configuración incorrecta.\"],\"1x2hvln\":[\"Not caused by a conflict with other scripts or add-ons.\",\"No causado por un conflicto con otros scripts o complementos.\"],\"1o0uoxa\":[\"Not caused by modifying, deleting or tampering with the script files.\",\"No causado por modificar, eliminar o manipular los archivos del script.\"],\"dhbrqs\":[\"Not caused by an installation error.\",\"No causado por un error de instalación.\"],\"tdh7m6\":[\"Not caused by an operation error.\",\"No causado por un error de funcionamiento.\"],\"9gp0k8\":[\"Open search\",\"Abrir búsqueda\"],\"1w74xe9\":[\"Open menu\",\"Abrir menú\"],\"300rf7\":[\"Open cart\",\"Abrir carrito\"],\"1xulc37\":[\"only, following these procedures:\",\"únicamente, según el siguiente procedimiento:\"],\"h9fnf2\":[\"Fortnite (controller)\",\"Fortnite (mando)\"],\"8uroxe\":[\"In\",\"En\"],\"7cc307\":[\"In the following cases:\",\"En los siguientes casos:\"],\"firz72\":[\"If a fault is reported:\",\"Si se reporta una falla:\"],\"ookqo0\":[\"If the fault is confirmed, only the fault will be repaired.\",\"Si se confirma la falla, solo se repara la falla.\"],\"q91ucy\":[\"If there is any manufacturing defect\",\"Si hay algún defecto de fabricación\"],\"j681mf\":[\"FC# (controller)\",\"FC# (mando)\"],\"ct4f8b\":[\"# months ago\",\"hace # meses\"],\"fuwro3\":[\"A private group to continuously follow script improvements and updates.\",\"Un grupo privado para seguir las mejoras y actualizaciones del script.\"],\"1zk9pv\":[\"Cronus device (controller)\",\"Dispositivo Cronus (mando)\"],\"12qxb7q\":[\"Cronus controller device\",\"Dispositivo Cronus para mando\"],\"1m3py0j\":[\"Matrix device (controller)\",\"Dispositivo Matrix (mando)\"],\"w753qf\":[\"Matrix device L# R#\",\"Dispositivo Matrix L# R#\"],\"195x95o\":[\"Matrix mouse device\",\"Dispositivo Matrix para ratón\"],\"1g2zhom\":[\"Matrix controller device\",\"Dispositivo Matrix para mando\"],\"bwbshu\":[\"Matrix controller device R# L#\",\"Dispositivo Matrix para mando R# L#\"],\"dtmtip\":[\"Matrix controller device R# L#\",\"Dispositivo Matrix para mando R# L#\"],\"1229wc1\":[\"Pre-programmed device with gift script — free shipping\",\"Dispositivo preprogramado con script de regalo — envío gratis\"],\"dtsb1k\":[\"Cronus controller device\",\"Dispositivo Cronus para mando\"],\"1e3dzxj\":[\"Matrix device (mouse)\",\"Dispositivo Matrix (ratón)\"],\"1txj50l\":[\"Matrix device (controller)\",\"Dispositivo Matrix (mando)\"],\"q9rx6e\":[\"Matrix mouse device\",\"Dispositivo Matrix para ratón\"],\"18oakjt\":[\"Internet speed and stability\",\"Velocidad y estabilidad de internet\"],\"3g4shr\":[\"Cronus Zen | C#Script\",\"Cronus Zen | C#Script\"],\"1fbwh6h\":[\"Cronus Zen pre-programmed with the script\",\"Cronus Zen preprogramado con el script\"],\"1qryuqi\":[\"Cronus Zen pre-programmed with the script | C#Script\",\"Cronus Zen preprogramado con el script | C#Script\"],\"10733sd\":[\"Cronus Zen pre-programmed with a gift script\",\"Cronus Zen preprogramado con script de regalo\"],\"y3z7yr\":[\"Cronus Zen\",\"Cronus Zen\"],\"2u2u2n\":[\"A Windows computer or laptop.\",\"Un ordenador o portátil con Windows.\"],\"1bzb85b\":[\"Call of Duty ,\",\"Call of Duty ,\"],\"1iwyhdi\":[\"Ready-made combos:\",\"Combos listos para usar:\"],\"1h1q47\":[\"Ethernet cable\",\"Cable Ethernet\"],\"5s4wyk\":[\"No\",\"No\"],\"10v7w6h\":[\"No capture card needed.\",\"No necesitas tarjeta de captura.\"],\"sxl714\":[\"No articles\",\"No hay artículos\"],\"1ko87tx\":[\"No products\",\"No hay productos\"],\"1nk4qac\":[\"No results\",\"Sin resultados\"],\"8eknl3\":[\"Nothing more to show\",\"No hay más que mostrar\"],\"chgbwp\":[\"To reduce delay and improve responsiveness.\",\"Para reducir el retraso y mejorar la respuesta.\"],\"1nnx5l8\":[\"Questions? Come find us on Discord\",\"¿Dudas? Te esperamos en Discord\"],\"1now1jg\":[\"Why C# Script?\",\"¿Por qué C# Script?\"],\"1cv4r6q\":[\"Low Driven Power Shot (Power Shot)\",\"Low Driven Power Shot (Power Shot)\"],\"st3bgc\":[\"Standard Low Driven\",\"Low Driven normal\"],\"zw21fp\":[\"Low Driven Flair (Flair)\",\"Low Driven Flair (Flair)\"],\"7ovy85\":[\"Curved Low Driven\",\"Low Driven curvo\"],\"jc3a5h\":[\"You don't have permission!\",\"¡No tienes permiso!\"],\"1kcs95v\":[\"What is a script?\",\"¿Qué es un script?\"],\"176tq9k\":[\"What is the warranty?\",\"¿Qué es la garantía?\"],\"kazuje\":[\"Magic: four powerful, effective combos.\",\"Magic: cuatro combos potentes y eficaces.\"],\"7sou13\":[\"What will I get after purchase?\",\"¿Qué recibiré después de la compra?\"],\"s06e42\":[\"Marvel Rivals (controller)\",\"Marvel Rivals (mando)\"],\"1kz6kmz\":[\"Compatible with all devices: PS# – PS# – Xbox – PC.\",\"Compatible con todos los dispositivos: PS# – PS# – Xbox – PC.\"],\"l0krco\":[\"In stock\",\"Disponible\"],\"pyo2ty\":[\"Repair attempt:\",\"Intento de reparación:\"],\"tk6kl9\":[\"Mohammed .\",\"Mohammed .\"],\"twys5u\":[\"Mohammed Badawi\",\"Mohammed Badawi\"],\"1i77cee\":[\"Mohammed Boukhalaf\",\"Mohammed Boukhalaf\"],\"zd1crf\":[\"Subscription duration\",\"Duración de la suscripción\"],\"dg91nd\":[\"Aim assist for close and mid-range fights without having to zoom in.\",\"Asistencia de puntería para combates cercanos y medios sin necesidad de hacer zoom.\"],\"r72ec8\":[\"A balanced offensive and defensive assistant that ensures smooth pressure and ball recovery.\",\"Asistente ofensivo y defensivo equilibrado que garantiza una presión y una recuperación de balón fluidas.\"],\"ia56i6\":[\"Verified buyer ,\",\"Comprador verificado ,\"],\"10jcvvl\":[\"Designed to improve stability and control during play, with support for\",\"Diseñado para mejorar la estabilidad y el control durante el juego, con soporte para\"],\"bagjn9\":[\"Tutorial clips.\",\"Videos tutoriales.\"],\"ez3cym\":[\"Note: the product supports Black Ops # 🚨\",\"Nota: el producto es compatible con Black Ops # 🚨\"],\"1mg32p0\":[\"Your custom script file.\",\"Tu archivo de script personalizado.\"],\"1onc3sm\":[\"File ready to install right after purchase.\",\"Archivo listo para instalar justo después de la compra.\"],\"9sofvy\":[\"File ready to install instantly\",\"Archivo listo para instalar al instante\"],\"1ekqjuc\":[\"File ready to install right after purchase\",\"Archivo listo para instalar justo después de la compra\"],\"rk7p3g\":[\"From # reviews by our customers\",\"De # reseñas de nuestros clientes\"],\"mkfoy3\":[\"From | C# Script\",\"De | C# Script\"],\"142oafr\":[\"From the date of receipt.\",\"desde la fecha de recepción.\"],\"zc92d7\":[\"By running the C#Script system on a computer or laptop running\",\"Al ejecutar el sistema C#Script en un ordenador o portátil con\"],\"db95cj\":[\"From the C# Script store\",\"De la tienda C# Script\"],\"gtmg1f\":[\"About us\",\"Sobre nosotros\"],\"kariwp\":[\"About us - C#Script\",\"Sobre nosotros - C#Script\"],\"17df7n0\":[\"Product\",\"Producto\"],\"17po6q1\":[\"1 product\",\"1 producto\"],\"1stc7mi\":[\"Products you may like\",\"Productos que podrían gustarte\"],\"11p3pbh\":[\"Similar products\",\"Productos similares\"],\"1q4qp3k\":[\"Other products and scripts\",\"Otros productos y scripts\"],\"1u9oiue\":[\"Our products\",\"Nuestros productos\"],\"58l228\":[\"Gaming platform\",\"Plataforma de juego\"],\"1db02gl\":[\"Not sure what to order?\",\"¿No sabes qué pedir?\"],\"1m12bze\":[\"Keeping up with game and device updates to ensure continued performance.\",\"Mantenernos al día con las actualizaciones de juegos y dispositivos para asegurar un rendimiento continuo.\"],\"t7i4ii\":[\"Customer's location.\",\"Ubicación del cliente.\"],\"1bluk5y\":[\"Na Yef Otaibi\",\"Na Yef Otaibi\"],\"17hl71d\":[\"Nasser Asiri\",\"Nasser Asiri\"],\"sq95hx\":[\"Your message here!\",\"¡Escribe aquí tu mensaje!\"],\"1g01s2j\":[\"system\",\"sistema\"],\"wqejb7\":[\"Yes (# SAR)\",\"Sí (# SAR)\"],\"f54wt9\":[\"Out of stock\",\"Agotado\"],\"1hck9gp\":[\"We commit to first trying to solve the problem or defect technically.\",\"Nos comprometemos a intentar primero resolver el problema o defecto de forma técnica.\"],\"18bskpo\":[\"We advise all users to make sure their devices are ready before purchasing.\",\"Recomendamos a todos los usuarios asegurarse de que sus dispositivos estén listos antes de comprar.\"],\"1kxgapu\":[\"Product type.\",\"Tipo de producto.\"],\"tynlak\":[\"Can the script get me banned?\",\"¿El script puede causar un baneo?\"],\"nj9k28\":[\"Does the device support mouse and keyboard?\",\"¿El dispositivo es compatible con ratón y teclado?\"],\"1sytxz0\":[\"Does the device have any problems?\",\"¿El dispositivo tiene algún problema?\"],\"my3tlk\":[\"Does the script need complicated setup?\",\"¿El script requiere una configuración complicada?\"],\"1xxl038\":[\"Can the script be used for other games?\",\"¿Se puede usar el script en otros juegos?\"],\"au3k6h\":[\"Hawkeye: a ready combo for instant activation.\",\"Hawkeye: un combo listo para activar al instante.\"],\"1w7qjab\":[\"and choose what suits you, and it will be programmed specifically to your request\",\"y elige lo que más te convenga, y se programará especialmente según tu pedido\"],\"pkqeqe\":[\"What makes us different?\",\"¿Qué nos hace diferentes?\"],\"1e525ol\":[\"Full access to all script tutorials (video, images, and written).\",\"Acceso completo a todos los tutoriales del script (video, imágenes y texto).\"],\"l4swmz\":[\"AFK mode to prevent being kicked when you stop playing.\",\"Modo AFK para evitar que te expulsen al dejar de jugar.\"],\"1yu61md\":[\"A mode that prevents you from being kicked from the match while idle.\",\"Un modo que evita que te expulsen de la partida mientras estás inactivo.\"],\"1kmyost\":[\"A mode that prevents you from being kicked from the match when idle.\",\"Un modo que evita que te expulsen de la partida cuando estás inactivo.\"],\"zdi7p7\":[\"And for the best experience with\",\"Y para la mejor experiencia con\"],\"1yad0id\":[\"And if it doesn't work for you\",\"Y si no te funciona\"],\"19cqc0v\":[\"And supports the following devices:\",\"Y es compatible con los siguientes dispositivos:\"],\"1i3uk6g\":[\"And supports the following devices: Cronus Zen\",\"Y es compatible con los siguientes dispositivos: Cronus Zen\"],\"stwk11\":[\"And supports the following devices: XIM Matrix – Cronus Zen\",\"Y es compatible con los siguientes dispositivos: XIM Matrix – Cronus Zen\"],\"1n1i9ly\":[\"Provided:\",\"Se proporciona:\"],\"1dfzzsn\":[\"The script is tested by us.\",\"Nosotros probamos el script.\"],\"77a9oq\":[\"Return or exchange requests are accepted if there is\",\"Se aceptan solicitudes de devolución o cambio si existe\"],\"12avy8u\":[\"The request must be submitted within\",\"La solicitud debe presentarse en un plazo de\"],\"1j0u8wx\":[\"Requires a Cronus Zen or XIM Matrix device.\",\"Requiere un dispositivo Cronus Zen o XIM Matrix.\"],\"1y9znr4\":[\"Detects the opponent right from the first shot, with no spam or delay.\",\"Detecta al rival desde el primer disparo, sin spam ni retraso.\"],\"11idvus\":[\"Detects the opponent from the first shot, with no spam or delay.\",\"Detecta al rival desde el primer disparo, sin spam ni retraso.\"],\"1w1m8vr\":[\"Detects the opponent right from the first shot, with no spam or any delay.\",\"Detecta al rival desde el primer disparo, sin spam ni retraso alguno.\"],\"14wsjo7\":[\"Original DualSense controller.\",\"Mando DualSense original.\"],\"1p2xee3\":[\"Supports controller (Controller), mouse and keyboard play\",\"Compatible con mando (Controller), ratón y teclado\"],\"1uu8wtz\":[\"Supports controller (Controller) play.\",\"Compatible con juego con mando (Controller).\"],\"raqlfj\":[\"Supports all platforms: PC – PS# – PS# – Xbox\",\"Compatible con todas las plataformas: PC – PS# – PS# – Xbox\"],\"1b131nj\":[\"Please make sure your device and the operating requirements are compatible before completing the order.\",\"Asegúrate de que tu dispositivo y los requisitos de funcionamiento sean compatibles antes de completar el pedido.\"],\"1b18zz5\":[\"Increases damage in close-range fights.\",\"Aumenta el daño en combates cercanos.\"],\"16zoirb\":[\"Helps you track opponents easily and accurately from all distances.\",\"Te ayuda a seguir a los rivales con facilidad y precisión desde cualquier distancia.\"],\"vud9ot\":[\"Automatically marks enemies for your team without taking your finger off the aim.\",\"Marca enemigos automáticamente para tu equipo sin soltar la puntería.\"],\"j1igpq\":[\"Works on all platforms: PC – PS# – PS# – Xbox\",\"Funciona en todas las plataformas: PC – PS# – PS# – Xbox\"],\"idc153\":[\"Drops you automatically the instant you fire — makes it harder for the opponent to hit you.\",\"Te tira al suelo automáticamente en el instante de disparar, así al rival le cuesta más acertarte.\"],\"pc562\":[\"• Stable performance and smooth gameplay with no stuttering.\",\"• Rendimiento estable y juego fluido sin tirones.\"],\"1b72ql8\":[\"• Ready-made settings that work right away, with no complexity or manual tuning.\",\"• Configuración lista que funciona de inmediato, sin complicaciones ni ajustes manuales.\"],\"1ichkg4\":[\"• Digital product, non-refundable\",\"• Producto digital no reembolsable\"],\"65szp2\":[\"• Free updates as they come\",\"• Actualizaciones gratis al instante\"],\"za4pl2\":[\"• Free updates when new improvements are available.\",\"• Actualizaciones gratis cuando haya nuevas mejoras.\"],\"fp4imx\":[\"• Free updates for any future improvements.\",\"• Actualizaciones gratis para futuras mejoras.\"],\"1pff4fv\":[\"• Free future updates.\",\"• Actualizaciones futuras gratis.\"],\"1rx7fpe\":[\"• Wide compatibility: supports all platforms, and PS#/PS#/Xbox/PC\",\"• Amplia compatibilidad: admite todas las plataformas, y PS#/PS#/Xbox/PC\"],\"1i6zc5s\":[\"• Ready to install right after purchase.\",\"• Listo para instalar justo después de la compra.\"],\"9487d3\":[\"• Fast, direct technical support via WhatsApp\",\"• Soporte técnico rápido y directo por WhatsApp\"],\"1frmkl0\":[\"• Direct technical support via WhatsApp.\",\"• Soporte técnico directo por WhatsApp.\"],\"qf3q1z\":[\"• Written setup guide + explanatory videos\",\"• Guía de uso escrita + videos explicativos\"],\"12uk86d\":[\"• Full guide with images and video from installation to use.\",\"• Guía completa con imágenes y video desde la instalación hasta el uso.\"],\"1bdqxnn\":[\"• Video, image and text tutorials to ensure the best use.\",\"• Tutoriales en video, imágenes y texto para sacar el máximo provecho.\"],\"1p4z324\":[\"• Video, image and text tutorials.\",\"• Tutoriales en video, imágenes y texto.\"],\"4m72zo\":[\"• Golden warranty if the script doesn't work for you\",\"• Garantía dorada si el script no te funciona\"],\"16hn2k6\":[\"• Multiple Aim Assist modes to suit different play styles.\",\"• Varios modos de Aim Assist para distintos estilos de juego.\"],\"1393bhz\":[\"• Compatible with controller (Controller), mouse and keyboard.\",\"• Compatible con mando (Controller), ratón y teclado.\"],\"kzxrpe\":[\"• Compatible with all mice and controllers (Controller).\",\"• Compatible con todos los ratones y mandos (Controller).\"],\"1i51c90\":[\"• File ready to install instantly\",\"• Archivo listo para instalar al instante\"],\"1nnr0ya\":[\"• File ready to install and use right after purchase.\",\"• Archivo listo para instalar y usar justo después de la compra.\"],\"7hugyv\":[\"• Requires a Cronus Zen or XIM Matrix device.\",\"• Requiere un dispositivo Cronus Zen o XIM Matrix.\"],\"v7mx3b\":[\"• Requires a XIM Matrix or Cronus Zen device.\",\"• Requiere un dispositivo XIM Matrix o Cronus Zen.\"],\"2lshjh\":[\"• Supports: PC – PS# – PS# – Xbox.\",\"• Compatible con: PC – PS# – PS# – Xbox.\"],\"9bpt9\":[\"• Supports: PC – PlayStation # – PlayStation # – Xbox.\",\"• Compatible con: PC – PlayStation # – PlayStation # – Xbox.\"],\"1jmvu6m\":[\"• Works efficiently on platforms that support Aim Assist.\",\"• Funciona de forma eficiente en las plataformas compatibles con Aim Assist.\"],\"1uj0vim\":[\"• Works on all platforms: PC – PS# – PS# – Xbox.\",\"• Funciona en todas las plataformas: PC – PS# – PS# – Xbox.\"],\"tfbati\":[\"⚠️ Important notice before ordering\",\"⚠️ Aviso importante antes de pedir\"],\"1uqf8x2\":[\"⚡ Performance depends on:\",\"⚡ El rendimiento depende de:\"],\"ytivd3\":[\"⚡ Extra features\",\"⚡ Funciones adicionales\"],\"prs0rr\":[\"⚡ Advanced gameplay features\",\"⚡ Funciones avanzadas de juego\"],\"1naftaq\":[\"⚽ Core script features\",\"⚽ Funciones básicas del script\"],\"1wukicc\":[\"✅ Customizable Anti-Recoil.\",\"✅ Anti-Recoil personalizable.\"],\"h5awbg\":[\"✅ Smooth performance depending on device specs.\",\"✅ Rendimiento fluido según las especificaciones del dispositivo.\"],\"1fty94d\":[\"✅ Flexible settings to match your play style.\",\"✅ Configuración flexible según tu estilo de juego.\"],\"15lavju\":[\"✅ Improved aim stability during fights.\",\"✅ Mejor estabilidad de puntería durante los enfrentamientos.\"],\"1j6m30l\":[\"✅ Full control over settings.\",\"✅ Control total de la configuración.\"],\"mgimgj\":[\"✅ Extra features:\",\"✅ Funciones adicionales:\"],\"dzfhp9\":[\"✅ No Capture Card needed.\",\"✅ No necesitas Capture Card.\"],\"67q6wp\":[\"✅ Smart high-precision color tracking system.\",\"✅ Sistema inteligente de seguimiento por color de alta precisión.\"],\"1eq71ef\":[\"✅ Always recommended to use\",\"✅ Siempre se recomienda usar\"],\"17ewz35\":[\"✓ Verified buyer\",\"✓ Comprador verificado\"],\"1vchlne\":[\"❌ The device doesn't support the required specs.\",\"❌ El dispositivo no cumple los requisitos necesarios.\"],\"oonrc8\":[\"❌ The device runs a non-Windows system.\",\"❌ El dispositivo funciona con un sistema que no es Windows.\"],\"9qacgr\":[\"❌ Poor performance due to low device specs.\",\"❌ Bajo rendimiento por especificaciones débiles del dispositivo.\"],\"xmrwwb\":[\"❌ Weak internet or high Ping.\",\"❌ Internet débil o Ping alto.\"],\"6iq037\":[\"❌ Required devices not available for the selected version.\",\"❌ Los dispositivos requeridos no están disponibles según la versión elegida.\"],\"azl4nx\":[\"❓ Frequently Asked Questions (FAQ)\",\"❓ Preguntas frecuentes (FAQ)\"],\"1873w66\":[\"⭐ Key Script Features\",\"⭐ Características principales del script\"],\"wkdfxb\":[\"⭐ Why Choose This Script?\",\"⭐ ¿Por qué elegir este script?\"],\"g19vel\":[\"⭐ Why Choose Our FIFA # Script?\",\"⭐ ¿Por qué elegir nuestro script de FIFA #?\"],\"1myob4k\":[\"⭐ Script Features\",\"⭐ Características del script\"],\"fxxddj\":[\"⭐ We Recommend Using\",\"⭐ Recomendamos usar\"],\"crqewg\":[\"🌟 C#Script Features\",\"🌟 Características de C#Script\"],\"10mxryj\":[\"🎮 Professional Battlefield # Script\",\"🎮 Script profesional de Battlefield #\"],\"1had8pg\":[\"🎮 Professional Overwatch # Script\",\"🎮 Script profesional de Overwatch #\"],\"tnc3ih\":[\"🎮 What the Script Offers In-Game\",\"🎮 Lo que ofrece el script en el juego\"],\"q5st4c\":[\"🎮 PlayStation # Version\",\"🎮 Versión para PlayStation #\"],\"1gz87l5\":[\"🎯 Aim Systems\",\"🎯 Sistemas de puntería\"],\"aaq7vg\":[\"🎯 Extra Capabilities to Boost Your Performance\",\"🎯 Funciones adicionales para mejorar tu rendimiento\"],\"vs5i4z\":[\"🎯 Extra Features\",\"🎯 Funciones adicionales\"],\"1w8acz6\":[\"🎯 Aim Assist Modes (Aim Assist)\",\"🎯 Modos de puntería (Aim Assist)\"],\"pugeog\":[\"📦 What You Get After Purchase\",\"📦 Lo que recibes después de la compra\"],\"lvbe8h\":[\"🔒 Disclaimer\",\"🔒 Aviso legal\"],\"1ys20q2\":[\"🔒 Important Notes\",\"🔒 Notas importantes\"],\"1o9hyk0\":[\"🔒 Note\",\"🔒 Nota\"],\"1t76vqi\":[\"🔒 Important Note\",\"🔒 Nota importante\"],\"1qe5mg\":[\"🔗 PC Windows + PS# Version\",\"🔗 Versión PC Windows + PS#\"],\"1d91szo\":[\"🔸 RAM: #GB minimum, #GB or more recommended.\",\"🔸 RAM: mínimo #GB, se recomiendan #GB o más.\"],\"u3cntk\":[\"🔸 Strong, stable internet connection.\",\"🔸 Conexión a internet potente y estable.\"],\"1ei4u17\":[\"🔸 Suitable Type-C cable.\",\"🔸 Cable Type-C adecuado.\"],\"1xkf4fm\":[\"🔸 Intel 10th-gen processor or newer, or equivalent.\",\"🔸 Procesador Intel de 10.ª generación o superior, o equivalente.\"],\"1p6exxn\":[\"🔸 Windows only (Mac not supported).\",\"🔸 Solo Windows (no es compatible con Mac).\"],\"1rkkzjc\":[\"🔸 Original DualSense controller.\",\"🔸 Mando DualSense original.\"],\"xz5poa\":[\"🔹 Smart, Balanced Aim Assist\",\"🔹 Aim Assist inteligente y equilibrado\"],\"1l3ywa\":[\"🔹 Advanced Aim Assist\",\"🔹 Aim Assist avanzado\"],\"18w5ggi\":[\"🔹 Advanced Aim Assist\",\"🔹 Aim Assist avanzado\"],\"45kq03\":[\"🔹 Aim Assist – Advanced Aim Helper\",\"🔹 Aim Assist – asistente de puntería avanzado\"],\"adgv1n\":[\"🔹 Anti Recoil – Weapon Stability\",\"🔹 Anti Recoil – control de retroceso de armas\"],\"o083ph\":[\"🔹 Anti Recoil – Full Weapon Stability\",\"🔹 Anti Recoil – control de retroceso total de armas\"],\"1uu23v8\":[\"🔹 Auto Crouch – Automatic Crouch\",\"🔹 Auto Crouch – agacharse automáticamente\"],\"jkjymr\":[\"🔹 Auto Mark – Enemy Marking\",\"🔹 Auto Mark – marcado de enemigos\"],\"z2a5cb\":[\"🔹 Auto Ping\",\"🔹 Auto Ping\"],\"3nmasy\":[\"🔹 Auto Ping – Automatic Enemy Marking\",\"🔹 Auto Ping – marcado automático del rival\"],\"muq28e\":[\"🔹 Breath – Sniping Stability\",\"🔹 Breath – estabilidad al francotirar\"],\"17tvh80\":[\"🔹 Automatic Bunny Hop\",\"🔹 Bunny Hop automático\"],\"79a6y9\":[\"🔹 Automatic Bunny Hop\",\"🔹 Bunny Hop automático\"],\"dijvsc\":[\"🔹 Bunny Hop – Continuous Jumping\",\"🔹 Bunny Hop – salto continuo\"],\"vej2f8\":[\"🔹 Bunny Hop – Continuous Jump\",\"🔹 Bunny Hop – salto continuo\"],\"kxsgk9\":[\"🔹 C# Aim Assist – Aim Helper\",\"🔹 C# Aim Assist – asistente de puntería\"],\"1ayx8f4\":[\"🔹 C# Move – Faster Movement\",\"🔹 C# Move – movimiento más rápido\"],\"ycj7a1\":[\"🔹 Hip Assist – Aim Without Zoom\",\"🔹 Hip Assist – puntería sin zoom\"],\"hrfwgd\":[\"🔹 Jitter – Higher Damage\",\"🔹 Jitter – más daño\"],\"asj10k\":[\"🔹 PS# Without Capture Card\",\"🔹 PS# sin Capture Card\"],\"k271j7\":[\"🔹 PS# With Capture Card\",\"🔹 PS# con Capture Card\"],\"1x4yorl\":[\"🔹 Profiles – Your Settings Saved\",\"🔹 Profiles – tus ajustes guardados\"],\"kytez0\":[\"🔹 Rapid Fire – Fast Firing\",\"🔹 Rapid Fire – disparo rápido\"],\"1f7jlp1\":[\"🔹 Snake – Snake Movement\",\"🔹 Snake – movimiento de serpiente\"],\"37hv6y\":[\"🔹 Snaking Movement – Worm Movement\",\"🔹 Snaking Movement – movimiento de gusano\"],\"1ug51mn\":[\"🔹 Snaking – Worm Movement\",\"🔹 Snaking – movimiento de gusano\"],\"o7fhwn\":[\"🔹 Snaking – Worm Movement / Snake\",\"🔹 Snaking – movimiento de gusano / Snake\"],\"5tykp6\":[\"🔹 Fast YY Switch\",\"🔹 YY Switch rápido\"],\"1waut1e\":[\"🔹 YY Switch – Quick Swap\",\"🔹 YY Switch – cambio rápido\"],\"19exmno\":[\"🔹 YY – Quick Swap\",\"🔹 YY – cambio rápido\"],\"118md88\":[\"🔹 Weapons with high recoil control supported:\",\"🔹 Armas compatibles con alto control de retroceso:\"],\"1k8jz4o\":[\"🔹 In-game settings\",\"🔹 Ajustes dentro del juego\"],\"nuo16u\":[\"🔹 AI weapon recognition\",\"🔹 Reconocimiento de armas con IA\"],\"szdbqq\":[\"🔹 Automatic weapon recognition\",\"🔹 Reconocimiento automático de armas\"],\"1u0pbpc\":[\"🔹 Quick Swap (YY Movement)\",\"🔹 Cambio rápido (movimiento YY)\"],\"nybmon\":[\"🔹 Full on-screen control\",\"🔹 Control total desde la pantalla\"],\"11ksdbn\":[\"🔹 Baptiste recoil control\",\"🔹 Control de retroceso de Baptiste\"],\"1q2g57\":[\"🔹 McCree (Cassidy) recoil control\",\"🔹 Control de retroceso de McCree (Cassidy)\"],\"4doe7o\":[\"🔹 Soldier # recoil control\",\"🔹 Control de retroceso de Soldier #\"],\"1kdlmgs\":[\"🔹 Primary weapon recoil control\",\"🔹 Control de retroceso de armas principales\"],\"1omnnhw\":[\"🔹 Aim recoil control\",\"🔹 Control de retroceso de la puntería\"],\"p8jq2w\":[\"🔹 Improved primary weapon recoil control\",\"🔹 Control de retroceso mejorado para armas principales\"],\"1yqix8f\":[\"🔹 Dual-Zone support\",\"🔹 Compatibilidad con Dual-Zone\"],\"15g0nbu\":[\"🔹 Build and attack support\",\"🔹 Soporte para construcción y ataque\"],\"131a4ej\":[\"🔹 Fast Shield\",\"🔹 Escudo rápido\"],\"a7dmbh\":[\"🔹 Ashe + Rapid Fire Combo\",\"🔹 Combo Ashe + Rapid Fire\"],\"q4mbh9\":[\"🔹 Rapid Fire Combo\",\"🔹 Combo Rapid Fire\"],\"18j5fsk\":[\"🔹 Compatible with all devices\",\"🔹 Compatible con todos los dispositivos\"],\"10awajp\":[\"🔹 Script update bundle\",\"🔹 Paquete de actualizaciones del script\"],\"1wybq8y\":[\"🔹 AFK Mode (Stay Mode)\",\"🔹 Modo AFK (Stay Mode)\"],\"16pn7jv\":[\"🔹 AI recognition system\",\"🔹 Sistema de reconocimiento con IA\"],\"1cwijbl\":[\"🖥️ Compatibility\",\"🖥️ Compatibilidad\"],\"15d8h4f\":[\"🖥️ Compatibility & Requirements\",\"🖥️ Compatibilidad y requisitos\"],\"1k1q05a\":[\"🖥️ PC Windows Version\",\"🖥️ Versión PC Windows\"],\"17gkyse\":[\"🛠️ After-Sales Service\",\"🛠️ Servicio posventa\"],\"1fxlcz5\":[\"🛠️ After Purchase\",\"🛠️ Después de la compra\"],\"o2p7hb\":[\"🛠️ System Requirements\",\"🛠️ Requisitos del sistema\"],\"1dmww5z\":[\"🧩 Available Versions\",\"🧩 Versiones disponibles\"],\"1scxurk\":[\"# profiles × # loadouts: save your weapon and its settings and switch between them mid-round with one button press.\",\"# perfiles × # loadouts: guarda tu arma y sus ajustes y cambia entre ellos durante la ronda con solo pulsar un botón.\"],\"10av8mr\":[\"#. Notify store management immediately if you suspect any unauthorized use.\",\"#. Informar de inmediato a la administración de la tienda si sospechas de cualquier uso no autorizado.\"],\"yzqfrk\":[\"#. Continued use of the store after changes constitutes implicit acceptance of them.\",\"#. El uso continuado de la tienda después de los cambios implica su aceptación tácita.\"],\"9g6prn\":[\"#. Agreement: this Usage and Privacy Policy, including all of its terms and provisions.\",\"#. Acuerdo: esta política de uso y privacidad, con todas sus cláusulas y disposiciones.\"],\"w7r014\":[\"#. Store: includes the C# Script platform in all its forms, whether a website, a digital app, or any other electronic sales channel.\",\"#. Tienda: incluye la plataforma C# Script en todas sus formas, ya sea un sitio web, una aplicación digital u otro canal de venta electrónico.\"],\"d17afe\":[\"#. Keep login credentials confidential and take full responsibility for any use made through your account.\",\"#. Mantener la confidencialidad de los datos de acceso y asumir plena responsabilidad por cualquier uso realizado a través de tu cuenta.\"],\"18wvj3a\":[\"#. User / Consumer: any person who uses the store, benefits from its services, or buys its products.\",\"#. Usuario / Consumidor: toda persona que utilice la tienda, aproveche sus servicios o compre sus productos.\"],\"1fphvgv\":[\"#. All content displayed in the store, including scripts, names, logos, and designs, is fully owned by the store as intellectual property.\",\"#. Todo el contenido que se muestra en la tienda, incluidos scripts, nombres, logotipos y diseños, es propiedad intelectual exclusiva de la tienda.\"],\"1b2v430\":[\"#. If any clause of this Agreement is found invalid, the remaining clauses remain in effect.\",\"#. Si alguna cláusula de este Acuerdo resulta inválida, las demás cláusulas seguirán en vigor.\"],\"uveutz\":[\"#. Fees may be charged for some services or products as the store sees fit or as required by applicable regulations.\",\"#. Se pueden aplicar cargos a algunos servicios o productos según lo estime la tienda o conforme a la normativa vigente.\"],\"hw6hz3\":[\"#. The store may offer additional services such as support or after-sales services depending on the nature of the product or service, without any ongoing obligation to do so.\",\"#. La tienda puede ofrecer servicios adicionales, como soporte o servicios posventa, según la naturaleza del producto o servicio, sin obligación permanente de hacerlo.\"],\"2hj6js\":[\"#. The store is not liable for any damages or losses resulting from misuse of the products or from third parties.\",\"#. La tienda no se hace responsable de daños o pérdidas derivados del mal uso de los productos o de terceros.\"],\"1oh7sun\":[\"#. This Agreement can only be terminated by an official decision of store management.\",\"#. Este Acuerdo solo puede rescindirse por decisión oficial de la administración de la tienda.\"],\"u1j2a9\":[\"#. The store has the right to change prices or fees at any time without prior notice.\",\"#. La tienda tiene derecho a modificar los precios o tarifas en cualquier momento sin previo aviso.\"],\"1w7qp9y\":[\"#. The user bears full legal responsibility if this declaration is proven untrue.\",\"#. El usuario asume toda la responsabilidad legal si se demuestra que esta declaración es falsa.\"],\"1bfefmp\":[\"#. The user alone bears any losses resulting from disclosing account details.\",\"#. El usuario asume por sí solo cualquier pérdida derivada de divulgar los datos de su cuenta.\"],\"jsjgvl\":[\"#. Official communication with the user is made through the contact details registered with the store.\",\"#. La comunicación oficial con el usuario se realiza a través de los datos de contacto registrados en la tienda.\"],\"onq65f\":[\"#. The store reserves the right to suspend or cancel an account if false information is provided or this Agreement is violated.\",\"#. La tienda se reserva el derecho de suspender o cancelar una cuenta si se proporciona información falsa o se infringe este Acuerdo.\"],\"15qv1na\":[\"#. The store reserves the right to amend or update the terms of this Agreement at any time.\",\"#. La tienda se reserva el derecho de modificar o actualizar las cláusulas de este Acuerdo en cualquier momento.\"],\"qosrq7\":[\"#. The store may send general or personal notices or updates related to the services or the Agreement.\",\"#. La tienda puede enviar avisos o actualizaciones generales o personales relacionados con los servicios o el Acuerdo.\"],\"m9qz80\":[\"#. The store's obligation is limited to providing the products or services offered as described in their listings.\",\"#. La obligación de la tienda se limita a proporcionar los productos o servicios ofrecidos tal como se describen en sus fichas.\"],\"x3mijq\":[\"#. The user acknowledges that their use of the products is at their own personal risk.\",\"#. El usuario reconoce que el uso de los productos es bajo su propia responsabilidad.\"],\"2c1nzz\":[\"#. The user declares that they have full legal capacity to enter into this Agreement, or that they are at least # years old.\",\"#. El usuario declara que tiene plena capacidad legal para celebrar este Acuerdo, o que tiene al menos # años.\"],\"14j1z9e\":[\"#. The store undertakes to keep personal information confidential and to use it only for lawful purposes.\",\"#. La tienda se compromete a mantener la confidencialidad de la información personal y a usarla solo con fines legales.\"],\"1568fnh\":[\"#. The store undertakes to provide its services in accordance with the regulations in force in the Kingdom of Saudi Arabia.\",\"#. La tienda se compromete a prestar sus servicios conforme a la normativa vigente en el Reino de Arabia Saudita.\"],\"80zb5\":[\"#. The user undertakes to use the store in compliance with the laws, regulations, and public morals in force in the Kingdom of Saudi Arabia.\",\"#. El usuario se compromete a usar la tienda de acuerdo con las leyes, normativas y la moral pública vigentes en el Reino de Arabia Saudita.\"],\"1qlfzur\":[\"#. The user undertakes to provide correct, accurate, and up-to-date information when registering.\",\"#. El usuario se compromete a proporcionar información correcta, precisa y actualizada al registrarse.\"],\"asatji\":[\"#. The user undertakes not to use any product or service provided by the store in any way that violates regulations or laws.\",\"#. El usuario se compromete a no utilizar ningún producto o servicio de la tienda de forma que infrinja normativas o leyes.\"],\"1yvqq4j\":[\"#. The user agrees that electronic notifications are a legally valid means of notice.\",\"#. El usuario acepta que las notificaciones electrónicas son un medio de aviso legalmente válido.\"],\"10ey334\":[\"#. Copying or reusing any content without prior written permission from the store is prohibited.\",\"#. Queda prohibido copiar o reutilizar cualquier contenido sin permiso previo por escrito de la tienda.\"],\"14547fu\":[\"Aim Assist without zoom with excellent tracking, ideal for fast close- to mid-range fights.\",\"Aim Assist sin zoom con un seguimiento excelente, ideal para combates rápidos a corta y media distancia.\"],\"15wlw5x\":[\"Custom Anti Recoil that noticeably reduces recoil and gives you great control while spraying.\",\"Anti Recoil personalizado que reduce el retroceso de forma notable y te da gran control al ráfaguear.\"],\"1fobdob\":[\"C# Script is a platform specialized in developing and selling paid gaming scripts with a high level of professionalism, aimed at players who want to raise their performance and control in competitive games. We provide well-thought-out technical solutions that help improve accuracy and responsiveness while you play.\",\"C# Script es una plataforma especializada en desarrollar y vender scripts de juegos de pago con un alto nivel de profesionalidad, dirigida a jugadores que buscan mejorar su rendimiento y control en juegos competitivos. Ofrecemos soluciones técnicas bien pensadas que ayudan a mejorar la precisión y la capacidad de respuesta mientras juegas.\"],\"tkyc4o\":[\"Hip Assist: highly efficient aiming without zoom for close- and mid-range encounters.\",\"Hip Assist: puntería sin zoom muy eficaz para enfrentamientos a corta y media distancia.\"],\"padsr8\":[\", and it offers flexible settings and an experience that can be customized to the user's needs.\",\", y ofrece ajustes flexibles y una experiencia personalizable según las necesidades del usuario.\"],\"1txuirt\":[\"Balanced offensive and defensive performance based on precise, smooth shortcut control.\",\"Rendimiento ofensivo y defensivo equilibrado, basado en un control preciso y fluido de los atajos.\"],\"13m70u2\":[\"More than # built-in skills, with the ability to activate up to # skills at the same time.\",\"Más de # habilidades integradas, con la posibilidad de activar hasta # habilidades al mismo tiempo.\"],\"1kana06\":[\"Completing the purchase constitutes explicit and final acceptance of this entire policy without exception.\",\"Completar la compra supone la aceptación expresa y definitiva de esta política en su totalidad, sin excepciones.\"],\"10mwm5k\":[\"If you already have a Cronus Zen or XIM Matrix device, you can choose and order one of the ready-made scripts. If you don't have one, all you need to do is order the device itself.\",\"Si ya tienes un Cronus Zen o un XIM Matrix, puedes elegir y pedir uno de los scripts listos. Si no tienes el dispositivo, solo tienes que pedir el dispositivo.\"],\"15qtd4\":[\"Fast, sequential weapon firing with superb responsiveness to boost your offensive power and make the biggest impact in fights.\",\"Disparo rápido y secuencial de armas con una respuesta excelente para potenciar tu poder ofensivo y lograr el mayor impacto en los combates.\"],\"1jrovdj\":[\"Built-in script settings to ensure a smooth, effective gaming experience without any complicated tweaking.\",\"Ajustes integrados en el script para garantizar una experiencia de juego fluida y eficaz sin necesidad de configuraciones complicadas.\"],\"1lfyeq\":[\"Fast building and easy execution of combat commands, so you can play like a pro in any match 🏗️\",\"Construcción rápida y ejecución sencilla de comandos de combate, para que juegues como un profesional en cualquier partida 🏗️\"],\"o9eidj\":[\"Strong, effective Aim Assist that works with and without zoom, making it easy to track opponents from any distance.\",\"Aim Assist potente y eficaz que funciona con y sin zoom, para seguir fácilmente al rival a cualquier distancia.\"],\"3ii7yw\":[\"Get an exceptional gaming experience with the pre-programmed Cronus Zen\",\"Disfruta de una experiencia de juego excepcional con el Cronus Zen preprogramado\"],\"zftov2\":[\"Take your performance in Apex Legends to the next level with a professional script that gives you strong recoil control, advanced Aim Assist, and combat features that help you win every fight.\",\"Lleva tu rendimiento en Apex Legends al siguiente nivel con un script profesional que te da un fuerte control de retroceso, Aim Assist avanzado y funciones de combate que te ayudan a ganar cada enfrentamiento.\"],\"1e15feh\":[\"Elevate your playstyle and take full control of attack and defense from your very first match, with a professional script designed to give you the best competitive experience on the pitch.\",\"Mejora tu estilo de juego y toma el control total del ataque y la defensa desde tu primer partido, con un script profesional diseñado para ofrecerte la mejor experiencia competitiva en el campo.\"],\"1rksleu\":[\"Take your Black Ops # experience to pro level with a professional script that gives you high recoil control, advanced Aim Assist, and pro movements like Snaking and YY Switch, all with ready-made settings and no hassle.\",\"Lleva tu experiencia en Black Ops # al nivel de los profesionales con un script profesional que te da un alto control de retroceso, Aim Assist avanzado y movimientos pro como Snaking y YY Switch, todo con ajustes listos y sin complicaciones.\"],\"1bpyobk\":[\"Go back to the classic vibe with pro-level performance: a script fully tuned for Black Ops # that gives you strong weapon recoil control, accurate Aim Assist, and pro movements with ready-made settings and no hassle.\",\"Vuelve al ambiente clásico con rendimiento de profesional: un script totalmente ajustado para Black Ops # que te da un fuerte control del retroceso de las armas, Aim Assist preciso y movimientos pro con ajustes listos y sin complicaciones.\"],\"4loxfv\":[\"Full refund if the script doesn't work and we are unable to fix it.\",\"Reembolso completo si el script no funciona y no podemos solucionarlo.\"],\"1mt4xbx\":[\"Enjoy an advanced gaming experience in Battlefield # with a smart script designed to give you greater control and more stable performance in fights. The script relies on a smart system that automatically adjusts settings to your weapon, with pro features that help you win with confidence in every round.\",\"Disfruta de una experiencia de juego avanzada en Battlefield # con un script inteligente diseñado para darte mayor control y un rendimiento más estable en los combates. El script se basa en un sistema inteligente que ajusta automáticamente la configuración según tu arma, con funciones profesionales que te ayudan a ganar con confianza en cada ronda.\"],\"1ty59lj\":[\"Enjoy an advanced gaming experience in Fortnite with a script that gives you full building control, strong aim stabilization, and effective Aim Assist at all ranges, so you win every fight in the game.\",\"Disfruta de una experiencia de juego avanzada en Fortnite con un script que te da control total de la construcción, una fuerte estabilización de la puntería y un Aim Assist eficaz a todas las distancias, para que ganes cada enfrentamiento en el juego.\"],\"4edel6\":[\"The script is designed to work with great efficiency with the Dual-Zone system, offering an ideal balance of speed and aiming accuracy, with smooth responsiveness in fights.\",\"El script está diseñado para funcionar con gran eficacia con el sistema Dual-Zone, ofreciendo un equilibrio ideal entre velocidad y precisión de puntería, con una respuesta fluida en los combates.\"],\"1q9zkym\":[\"A script is code that gets installed on the device, and it gives you features based on the script's strength.\",\"Un script es código que se instala en el dispositivo y te da funciones según la potencia del script.\"],\"1vrofst\":[\"The script automatically recognizes the weapon you're using and applies the ideal recoil control and aim settings.\",\"El script reconoce automáticamente el arma que usas y aplica los ajustes ideales de control de retroceso y puntería.\"],\"1mwxlcc\":[\"Scripts installed to your choice, giving you full control and helping you dominate in\",\"Scripts instalados según tu elección, para darte control total y ayudarte a dominar en\"],\"u2phlp\":[\"The scripts are carefully designed to deliver the best responsiveness and control in the game.\",\"Los scripts están diseñados con cuidado para ofrecer la mejor respuesta y control en el juego.\"],\"ubguu9\":[\"The final decision on all return, exchange, or shipping cases rests with the seller's management.\",\"La decisión final en todos los casos de devolución, cambio o envío corresponde a la administración del vendedor.\"],\"1uwvgt7\":[\"The store is not responsible for any delay caused by these circumstances beyond its control.\",\"La tienda no se hace responsable de ningún retraso causado por estas circunstancias ajenas a su control.\"],\"11de8vf\":[\"The ideal setup, arriving pre-programmed with the required scripts to ensure superior performance\",\"La configuración ideal, que llega preprogramada con los scripts necesarios para garantizar un rendimiento superior\"],\"gqazyf\":[\"Plus RAPID FIRE mode, which turns single shots into continuous rapid fire.\",\"Además del modo RAPID FIRE, que convierte el disparo único en disparo rápido continuo.\"],\"cy0cke\":[\"Multiple profiles that save your weapon and its settings and let you switch between them mid-round with one button press.\",\"Varios perfiles que guardan tu arma y sus ajustes y te permiten cambiar entre ellos durante la ronda con solo pulsar un botón.\"],\"znk9qc\":[\"Switch weapons or movement at lightning speed with no delay, with just a button press.\",\"Cambia de arma o de movimiento a una velocidad fulminante y sin retraso, con solo pulsar un botón.\"],\"1pezn23\":[\"Quick weapon swap that cancels movement delay and gets you ready to shoot faster.\",\"Cambio rápido de arma que elimina el retraso de movimiento y te deja listo para disparar antes.\"],\"1qo9zq2\":[\"Full, precise weapon stabilization while aiming, which increases bullet accuracy and gives you better control in fights.\",\"Estabilización completa y precisa de las armas al apuntar, lo que aumenta la precisión de las balas y te da mejor control en los combates.\"],\"40it6u\":[\"A clear purchase and activation experience, with guides that help you get the most out of the product.\",\"Una experiencia de compra y activación clara, con guías que te ayudan a aprovechar al máximo el producto.\"],\"9n9qsw\":[\"Automatically marks the opponent on your first shot, with no annoyance or unnecessary spam.\",\"Marca automáticamente al rival con tu primer disparo, sin molestias ni spam innecesario.\"],\"rl64nk\":[\"Better control and reduced weapon recoil for greater accuracy in rapid shots.\",\"Mejor control y menos retroceso del arma para mayor precisión en disparos rápidos.\"],\"1ort6ou\":[\"Control all Marvel Rivals characters with high precision, trigger combos easily with a single press, and enjoy amazing stability in aiming and movement in every match.\",\"Controla a todos los personajes de Marvel Rivals con gran precisión, activa combos fácilmente con una sola pulsación y disfruta de una estabilidad asombrosa en la puntería y el movimiento en cada partida.\"],\"tdlm98\":[\"Converts some weapons, such as pistols, into rapid sequential fire to boost offensive power.\",\"Convierte algunas armas, como las pistolas, en disparo rápido secuencial para potenciar el poder ofensivo.\"],\"t4liq5\":[\"Converts some single-shot weapons into rapid, sequential fire to boost offensive power.\",\"Convierte algunas armas de disparo único en disparo rápido y secuencial para potenciar el poder ofensivo.\"],\"1jrq729\":[\"This agreement is governed by and construed in accordance with the laws and regulations in force in the Kingdom of Saudi Arabia, and the competent judicial authorities within the Kingdom shall be the reference for any dispute.\",\"Este acuerdo se rige e interpreta de acuerdo con las leyes y normativas vigentes en el Reino de Arabia Saudita, y las autoridades judiciales competentes dentro del Reino serán la referencia en cualquier disputa.\"],\"1x8ei0h\":[\"This agreement applies to all dealings between the store and users, and takes effect as soon as it is accepted or registration in the store begins, in accordance with the electronic transactions regulations in force in the Kingdom of Saudi Arabia.\",\"Este acuerdo se aplica a todas las transacciones entre la tienda y los usuarios, y entra en vigor en cuanto se acepta o se inicia el registro en la tienda, conforme a la normativa de transacciones electrónicas vigente en el Reino de Arabia Saudita.\"],\"ikke3z\":[\"No-zoom aim that is highly effective in close and long-range fights, giving you a clear advantage in combat.\",\"Puntería sin zoom muy eficaz en combates cercanos y lejanos, que te da una ventaja clara durante la pelea.\"],\"h0m937\":[\"No-zoom aim that gives you a clear advantage in close, fast-paced engagements.\",\"Puntería sin zoom que te da una ventaja clara en enfrentamientos cercanos y rápidos.\"],\"revndv\":[\"Precise aim that locks onto your opponent with zoom, and you can choose the assist strength that suits your style.\",\"Puntería precisa que fija al rival con zoom, y puedes elegir la intensidad de la asistencia que mejor se adapte a tu estilo.\"],\"1wa9juf\":[\"Effective no-zoom aim that gives you a clear advantage in fast engagements.\",\"Puntería eficaz sin zoom que te da una ventaja clara en enfrentamientos rápidos.\"],\"1lvy2vy\":[\"Includes more than # mods for a varied gameplay experience, with continuous improvements to ensure the best performance.\",\"Incluye más de # mods para una experiencia de juego variada, con mejoras continuas para garantizar el mejor rendimiento.\"],\"1uccq5u\":[\"Change buttons, sensitivity, and turn off vibration — all from the device screen while you play.\",\"Cambia los botones, la sensibilidad y desactiva la vibración, todo desde la pantalla del dispositivo mientras juegas.\"],\"1eg9m37\":[\"Smooth, instant switching between building and attack moves with no delay, so you control the flow of the game precisely.\",\"Cambio fluido e instantáneo entre movimientos de construcción y ataque sin ningún retraso, para controlar el ritmo de la partida con precisión.\"],\"pujfj6\":[\"Activate the shield directly with a single button press, without navigating between commands.\",\"Activa el escudo directamente con una sola pulsación, sin tener que moverte entre comandos.\"],\"1lnh9su\":[\"Performs the YY move at high speed just by holding the button, with no delay.\",\"Ejecuta el movimiento YY a gran velocidad con solo mantener pulsado el botón, sin ningún retraso.\"],\"13t9o0z\":[\"Offers higher responsiveness and recoil control, and an experience closer to professional-grade systems.\",\"Ofrece mayor capacidad de respuesta y control de retroceso, y una experiencia más cercana a la de los sistemas profesionales.\"],\"xsphcr\":[\"Strong recoil control tuned for each weapon individually, holding the weapon steady from the first bullet to the end of the spray.\",\"Control de retroceso fuerte y ajustado para cada arma por separado, que mantiene el arma estable desde la primera bala hasta el final de la ráfaga.\"],\"8vb9p4\":[\"Strong recoil control tuned for most core weapons, holding the weapon steady from the first bullet to the end of the spray.\",\"Control de retroceso fuerte y ajustado para la mayoría de las armas principales, que mantiene el arma estable desde la primera bala hasta el final de la ráfaga.\"],\"4fexxb\":[\"Amazing control for most weapons with no kickback, letting you aim straight no matter your speed or your opponent's movement.\",\"Control impresionante para la mayoría de las armas sin retroceso, que te permite apuntar recto sin importar tu velocidad ni el movimiento del rival.\"],\"14ikjd5\":[\"All scripts and digital products are strictly non-refundable and non-exchangeable once delivery is completed, whether delivered via direct download, file transfer, or activation on a specific server or account.\",\"Todos los scripts y productos digitales no son reembolsables ni intercambiables bajo ninguna circunstancia una vez completada la entrega, ya sea mediante descarga directa, envío de archivo o activación en un servidor o cuenta específicos.\"],\"67d1vk\":[\"To protect the rights of all parties and clearly set out the terms, we outline below our approved exchange and refund policy. Completing a purchase constitutes explicit and final acceptance of all the terms set out below.\",\"Para proteger los derechos de todas las partes y aclarar las condiciones por completo, a continuación detallamos nuestra política de cambios y reembolsos. Completar la compra implica la aceptación expresa y definitiva de todos los términos que se indican a continuación.\"],\"71hz9i\":[\"A pro move that lets you see your opponent without them being able to hit you, with a single button press.\",\"Un movimiento profesional que te permite ver al rival sin que pueda alcanzarte, con una sola pulsación.\"],\"zm5xft\":[\"A pro move that gives you the ability to see your opponent without them being able to hit you, working with just one button press.\",\"Un movimiento profesional que te da la capacidad de ver al rival sin que pueda alcanzarte, y funciona con una sola pulsación.\"],\"2g1z0z\":[\"An advanced move that lets you peek at your opponent and see them without being hit, working with a single button press.\",\"Un movimiento avanzado que te permite asomarte ante el rival y verlo sin que pueda alcanzarte, y funciona con una sola pulsación.\"],\"txyirz\":[\"Tailored to your needs, we offer the well-known device, ready with\",\"Pensado para tus necesidades, te ofrecemos el dispositivo que no necesita presentación, listo con\"],\"kg1zyc\":[\"During holiday seasons and official public holidays (such as Eid al-Fitr, Eid al-Adha, and others), shipping services may be suspended or delayed due to closures or heavy load at shipping companies.\",\"Durante las temporadas festivas y los días feriados oficiales (como Eid al-Fitr, Eid al-Adha y otros), los servicios de envío pueden suspenderse o retrasarse por cierres o alta demanda en las empresas de transporte.\"],\"13dzbkd\":[\"Full support for both XIM Matrix and Cronus Zen, with equally powerful programming in terms of strength and performance.\",\"Compatibilidad total con XIM Matrix y Cronus Zen, con una programación equivalente en potencia y rendimiento.\"],\"1y2c6a6\":[\"A strong comeback for the classic legend — a script fully tuned for Black Ops # that gives you strong recoil control, precise Aim Assist, and pro moves with ready-made settings and no complications.\",\"El regreso a lo grande de la leyenda clásica: un script totalmente ajustado para Black Ops # que te ofrece un control de retroceso potente, Aim Assist preciso y movimientos profesionales con ajustes listos para usar, sin complicaciones.\"],\"1o4dp2c\":[\"C#Script Script\",\"Script de C#Script\"],\"225m8r\":[\"C#Script Script\",\"Script de C#Script\"],\"1vsa70q\":[\"C#Script Script\",\"Script de C#Script\"],\"1jiqm5h\":[\"C#Script Script\",\"Script de C#Script\"],\"4bgpw7\":[\"C#Script Script\",\"Script de C#Script\"],\"1s03o91\":[\"C#Script Script\",\"Script de C#Script\"],\"1xc7hge\":[\"AI Color Tracking Script - Supports PS#/PS#/PC, Instant Delivery\",\"Script de seguimiento de color con IA - Compatible con PS#/PS#/PC, entrega inmediata\"],\"1x4grk8\":[\"Smart script that automatically recognizes the weapon on the first shot and adjusts the right recoil control and settings.\",\"Script inteligente que reconoce automáticamente el arma al primer disparo y ajusta el control de retroceso y la configuración adecuados.\"],\"y1bvx8\":[\"C#Script Script\",\"Script de C#Script\"],\"1ddlgh6\":[\"An advanced script for players who want full control and an edge in every encounter. Works on all platforms (PC – PS# – PS# – Xbox) and delivers full weapon recoil control, precise Aim Assist, and pro moves that give you a clear advantage over opponents.\",\"Un script avanzado para jugadores que quieren control total y ventaja en cada enfrentamiento. Funciona en todas las plataformas (PC – PS# – PS# – Xbox) y ofrece control de retroceso completo para las armas, Aim Assist preciso y movimientos profesionales que te dan una ventaja clara sobre los rivales.\"],\"3ayzq1\":[\"An advanced script fully tuned for Modern Warfare # that gives you strong recoil control, precise Aim Assist, and pro moves with ready-made settings and no complications.\",\"Un script avanzado totalmente ajustado para Modern Warfare # que te ofrece un control de retroceso potente, Aim Assist preciso y movimientos profesionales con ajustes listos para usar, sin complicaciones.\"],\"13iuqyr\":[\"A script built for competitive Overwatch # players, offering high stability, smart control, and advanced mods that mimic the PC gameplay experience, with full support for the Dual-Zone system for smoother, more precise aiming.\",\"Un script pensado para jugadores competitivos de Overwatch #, que ofrece gran estabilidad, control inteligente y mods avanzados que imitan la experiencia de juego en PC, con compatibilidad total con el sistema Dual-Zone para una puntería más fluida y precisa.\"],\"176y4xu\":[\"C#Script Script\",\"Script de C#Script\"],\"1dlodtc\":[\"Our scripts run at peak efficiency, with instant delivery sent to you automatically after you order\",\"Nuestros scripts funcionan con la máxima eficiencia y la entrega inmediata te llega de forma automática después del pedido\"],\"yi81d8\":[\"Our scripts go through rigorous testing and continuous updates to ensure full compatibility with game systems. We are proud of the trust of many professional players and their great experiences with us. Most importantly… we stand out with the power of our XIM Matrix support, plus ongoing technical support always available to serve you at any time.\",\"Nuestros scripts pasan por pruebas rigurosas y actualizaciones continuas para garantizar su total compatibilidad con los sistemas de los juegos. Nos enorgullece la confianza de muchos jugadores profesionales y sus excelentes experiencias con nosotros. Y lo más importante… destacamos por la potencia de nuestra compatibilidad con XIM Matrix, además de un soporte técnico continuo siempre disponible para ayudarte en cualquier momento.\"],\"1wm348o\":[\"One button press makes the script keep jumping automatically, giving you a big advantage during engagements.\",\"Con una sola pulsación, el script salta de forma continua y automática, lo que te da una gran ventaja durante los enfrentamientos.\"],\"5v40vu\":[\"Money-back warranty if the script doesn't work or the problem can't be fixed.\",\"Garantía de reembolso si el script no funciona o no se puede solucionar el problema.\"],\"19mlo7c\":[\"When a problem is reported, the device or script is inspected by us.\",\"Cuando se informa de un problema, nosotros sometemos el dispositivo o el script a una revisión.\"],\"6urd5q\":[\"Our team is always with you to answer your questions and solve your problems quickly and professionally\",\"Nuestro equipo siempre está contigo para responder tus preguntas y resolver tus problemas de forma rápida y profesional\"],\"43mjmp\":[\"At C#Script, we aim to provide reliable, high-quality scripts that put powerful tools in your hands to enhance your playstyle, while ensuring programming stability and equal performance across all supported devices.\",\"En C#Script nuestro objetivo es ofrecer scripts fiables y de alta calidad que ponen en tus manos herramientas potentes para mejorar tu estilo de juego, garantizando la estabilidad de la programación y un rendimiento equivalente en todos los dispositivos compatibles.\"],\"m50g0p\":[\"Orders are usually shipped within # to # business days; this timeframe is an estimate and is not binding.\",\"Por lo general, los pedidos se envían en un plazo de # a # días hábiles; este plazo es estimado y no es vinculante.\"],\"1r3d41k\":[\"In some cases, and out of care for customer satisfaction, optional compensation may be offered such as (a free script, a free add-on, or an additional service), at the discretion of management; such compensation is not a mandatory right of the customer.\",\"En algunos casos, y por interés en la satisfacción del cliente, se puede ofrecer una compensación opcional como (un script gratis, un complemento gratis o un servicio adicional), a criterio de la administración; dicha compensación no constituye un derecho obligatorio del cliente.\"],\"10d5cwv\":[\"If the defect cannot be fully repaired, the customer is refunded, provided that\",\"Si el defecto no se puede reparar por completo, se reembolsa el importe al cliente, siempre que\"],\"1hkyl6x\":[\"If a single fundamental software fault is proven in the script that prevents it from working at all.\",\"Si se comprueba que existe un único fallo de software fundamental en el script que le impide funcionar por completo.\"],\"1j7dxyi\":[\"Preparing and shipping orders may take up to a maximum of # business days from the order confirmation date.\",\"La preparación y el envío de los pedidos pueden tardar hasta un máximo de # días hábiles desde la fecha de confirmación del pedido.\"],\"1nnji1m\":[\"The Cronus Zen device is what gives you full control and gameplay experience\",\"El dispositivo Cronus Zen es el que te da el control total y la experiencia de juego\"],\"24l4iv\":[\"Continuous jumping with a single button press to improve movement and increase your chances of survival in combat.\",\"Salto continuo con una sola pulsación para mejorar el movimiento y aumentar tus probabilidades de sobrevivir en combate.\"],\"1i41sx9\":[\"Continuous jumping with a single button press gives you faster movement and better control in engagements.\",\"El salto continuo con una sola pulsación te da un movimiento más rápido y mejor control en los enfrentamientos.\"],\"4cqyff\":[\"A ready-made one-shot combo (One Shot) with rapid fire and quick response to boost offensive performance.\",\"Combo listo para un solo disparo (One Shot) con disparo rápido y respuesta ágil para potenciar el rendimiento ofensivo.\"],\"8b3llc\":[\"Ready-made combos for the main characters to make combat easier and help you control engagements.\",\"Combos listos para los personajes principales para facilitar el combate y dominar los enfrentamientos.\"],\"1131kv7\":[\"For the purposes of this agreement, the following terms have the meanings set out next to each, unless the context requires otherwise:\",\"A los efectos de este acuerdo, los siguientes términos tienen el significado indicado junto a cada uno, salvo que el contexto exija otra cosa:\"],\"k60cc3\":[\"This does not entitle you to a refund unless the fault cannot be permanently fixed, and this is at the discretion of management.\",\"Esto no da derecho a reembolso, salvo que la avería no pueda repararse de forma definitiva, y ello queda a criterio de la administración.\"],\"ilglra\":[\"No refund is given if the defect is found to result from misuse, modification by the customer, or errors in installation and operation.\",\"No se realiza el reembolso si se comprueba que el defecto se debe a un mal uso, a modificaciones del cliente o a errores de instalación y funcionamiento.\"],\"1ta0e0s\":[\"The customer has no right to demand order cancellation or a refund because of shipping delays as long as the delivery is within the stated maximum period.\",\"El cliente no tiene derecho a exigir la cancelación del pedido ni el reembolso por retrasos en el envío mientras se respete el plazo máximo establecido.\"],\"15vw6ht\":[\"The customer has no right to request a refund or cancel the order during this period because of the delay.\",\"El cliente no tiene derecho a solicitar un reembolso ni a cancelar el pedido durante este período por causa del retraso.\"],\"1tj0s47\":[\"The customer is not entitled to request a refund or exchange in the following cases (including but not limited to):\",\"El cliente no tiene derecho a solicitar un reembolso o cambio en los siguientes casos (a modo de ejemplo, sin limitarse a ellos):\"],\"18gmj82\":[\"An order cannot be cancelled or refunded if the order status is\",\"No se puede cancelar el pedido ni reclamar un reembolso si el estado del pedido es\"],\"1ou6gbu\":[\"No, the script is fully ready and you can easily customize some settings later.\",\"No, el script viene completamente listo y puedes personalizar algunos ajustes fácilmente más adelante.\"],\"1in8ejn\":[\"No, the device works very efficiently and without any problems, giving you stable and reliable performance\",\"No, el dispositivo funciona con gran eficiencia y sin ningún problema, y te ofrece un rendimiento estable y garantizado\"],\"295znn\":[\"No, all our scripts are completely safe and fully hidden, giving you a risk-free gaming experience for your account.\",\"No, todos nuestros scripts son totalmente seguros y están completamente ocultos, y te ofrecen una experiencia de juego sin riesgos para tu cuenta.\"],\"1tgj80a\":[\"It's not mandatory, but it's the best option for anyone who wants the highest level of performance.\",\"No es obligatorio, pero es la mejor opción para quien busque el máximo nivel de rendimiento.\"],\"1qx8hg\":[\"A variety of scripts designed to support different competitive games.\",\"Una variedad de scripts diseñados para dar soporte a distintos juegos competitivos.\"],\"lvro1m\":[\"Welcome to C#Script store. By using this online platform or any of its services, you acknowledge your full and final acceptance of all the terms and conditions set out in this agreement.\",\"Te damos la bienvenida a la tienda C#Script. Al usar esta plataforma en línea o cualquiera de sus servicios, reconoces tu aceptación plena y definitiva de todos los términos y condiciones de este acuerdo.\"],\"brnh7d\":[\"A precise aim assistant that works with and without zoom, and keeps tracking the target at various distances.\",\"Un asistente de puntería preciso que funciona con y sin zoom, y mantiene el seguimiento del objetivo a diferentes distancias.\"],\"1s2m6jc\":[\"A precise aim assistant that works with and without zoom, providing smooth target tracking at close and long range.\",\"Un asistente de puntería preciso que funciona con y sin zoom, y ofrece un seguimiento fluido de los objetivos a corta y larga distancia.\"],\"ekchby\":[\"With PS# for the best possible experience, especially for players looking for the highest recoil control and response speed.\",\"Con PS# para obtener la mejor experiencia posible, especialmente para jugadores que buscan el máximo control de retroceso y rapidez de respuesta.\"],\"5ulxfj\":[\"Through safe, varied, and fast methods, with support for installment payments via Tabby and Tamara\",\"Mediante métodos seguros, variados y rápidos, y con pago en cuotas a través de Tabby y Tamara\"],\"1d3gdyk\":[\"Yes, the device fully supports mouse and keyboard, and all our scripts are compatible with both controller and mouse with no issues\",\"Sí, el dispositivo es totalmente compatible con ratón y teclado, y todos nuestros scripts son compatibles con mando y ratón sin ningún problema\"],\"13hf8w7\":[\"At C#Script, we support the most powerful control tools currently available, led by XIM Matrix and Cronus Zen, developing and programming scripts for both devices with the same power and efficiency, with no difference in performance or features, and with comprehensive testing to ensure stability and smooth operation.\",\"En C#Script damos soporte a las herramientas de control más potentes disponibles actualmente, encabezadas por XIM Matrix y Cronus Zen, y desarrollamos y programamos los scripts para ambos dispositivos con la misma potencia y eficiencia, sin diferencias de rendimiento ni de funciones, con pruebas exhaustivas para garantizar estabilidad y un funcionamiento fluido.\"],\"1s89b4r\":[\"We offer professional scripts and advanced technical tools designed to improve your performance and raise your level in games, whether you're a competitive player or looking for an experience\",\"Ofrecemos scripts profesionales y herramientas técnicas avanzadas diseñadas para mejorar tu rendimiento y subir tu nivel en los juegos, ya seas un jugador competitivo o busques una experiencia\"],\"1t4ikp\":[\"This is considered sufficient to explain how to use it, and the customer's lack of understanding is not an acceptable reason for a refund or exchange.\",\"Esto se considera suficiente para explicar el modo de uso, y que el cliente no lo haya entendido no es un motivo aceptable para un reembolso o cambio.\"],\"vqwmk2\":[\"Tracks the opponent with high precision, with and without zoom. Smooth, stable, and gives you an edge in close and long-range engagements.\",\"Sigue al rival con gran precisión, con y sin zoom. Fluido, estable y te da ventaja en enfrentamientos cercanos y lejanos.\"],\"1ksiccn\":[\"Automatically recognizes the weapon you're using and applies the ideal recoil control and aim settings.\",\"Reconoce automáticamente el arma que usas y aplica los ajustes ideales de control de retroceso y puntería.\"],\"1oeo01p\":[\"Automatically recognizes the hero in use and applies the right settings for them right away.\",\"Reconoce automáticamente al héroe en uso y aplica de inmediato los ajustes adecuados para él.\"],\"1fs5ir2\":[\"Used at the user's own risk if it violates the game's policies\",\"Se utiliza bajo la responsabilidad del usuario si infringe las políticas del juego\"],\"1fejwu8\":[\"Inquiries about scripts or devices are answered throughout the week, subject to staff availability.\",\"Las consultas sobre scripts o dispositivos se responden todos los días de la semana, según la disponibilidad del equipo.\"],\"9yrnzt\":[\"Support for solving customers' script problems and errors is provided daily from #:# AM until #:# midnight.\",\"El soporte para resolver problemas y errores de los scripts de los clientes se ofrece todos los días desde las #:# a. m. hasta las #:# (medianoche).\"],\"6axmb9\":[\"Enables continuous movement with a single button press, to increase your chances of dodging shots during combat.\",\"Permite un movimiento continuo con una sola pulsación, para aumentar tus probabilidades de esquivar disparos durante el combate.\"],\"g2znwg\":[\"The store reserves the right to suspend or cancel a user's account or restrict their access to services at any time and without prior notice, if they are found to have violated any provision of this agreement.\",\"La tienda se reserva el derecho de suspender o cancelar la cuenta de un usuario, o de restringir su acceso a los servicios, en cualquier momento y sin previo aviso, si se comprueba que ha incumplido alguna de las disposiciones de este acuerdo.\"],\"jtgmoq\":[\"Supports mouse and controller and delivers complete performance for all players across different devices.\",\"Es compatible con ratón y mando, y ofrece un rendimiento completo para todos los jugadores en distintos dispositivos.\"],\"1omekak\":[\"Boosts movement speed and responsiveness, making you faster at pushing in and pulling out.\",\"Aumenta la velocidad de movimiento y la capacidad de respuesta, para que seas más rápido al entrar y al retirarte.\"],\"1ymijtj\":[\"Includes # weapons: MSMC – M#A# – AN-# – PDW-# – Skorpion EVO – Peacekeeper – DSR-# – and the rest of the game's weapons.\",\"Incluye # armas: MSMC – M#A# – AN-# – PDW-# – Skorpion EVO – Peacekeeper – DSR-# – y el resto de las armas del juego.\"],\"1fhrsqp\":[\"Includes the core weapons: AK-#u – Famas – Galil – Commando – MP#K – AUG – G# – RPK – Stakeout – L#A# – and the rest of the game's weapons.\",\"Incluye las armas principales: AK-#u – Famas – Galil – Commando – MP#K – AUG – G# – RPK – Stakeout – L#A# – y el resto de las armas del juego.\"],\"1rmmmfx\":[\"Considered the preferred choice for the highest recoil control and responsiveness, while the version without a Capture Card works well but needs\",\"Se considera la opción preferida para obtener el máximo control de retroceso y capacidad de respuesta, mientras que la versión sin Capture Card funciona bien pero necesita\"],\"1tdad53\":[\"Works with all characters with improved Aim Assist for greater accuracy and stability.\",\"Funciona con todos los personajes, con Aim Assist mejorado para mayor precisión y estabilidad.\"],\"1muu3tk\":[\"The script recognizes the weapon in use directly and applies the right settings for it without any input from you.\",\"El script reconoce directamente el arma en uso y aplica los ajustes adecuados sin que tengas que intervenir.\"],\"puptqi\":[\"Prevents you from being kicked from the match when idle or not moving, and is activated with a single button press.\",\"Evita que te expulsen de la partida por estar inactivo o sin moverte, y se activa con una sola pulsación.\"],\"1wytct6\":[\"Using the store, whether for browsing, purchasing products, or benefiting from services, constitutes the user's explicit acceptance, with full legal and statutory capacity, of everything in this agreement, and full commitment to all its provisions.\",\"El uso de la tienda, ya sea para navegar, comprar productos o aprovechar los servicios, constituye la aceptación expresa por parte del usuario, con plena capacidad legal y jurídica, de todo lo dispuesto en este acuerdo, y su pleno compromiso con todas sus disposiciones.\"],\"1wybulk\":[\"• Fully ready: the device arrives pre-programmed and ready with the scripts you choose from the store\",\"• Totalmente listo: el dispositivo llega preprogramado y listo con los scripts que elijas en la tienda\"],\"1ljbiz7\":[\"• Manufacturing defect warranty: the Cronus Zen device comes with a full warranty to return the device\",\"• Garantía por defectos de fabricación: el dispositivo Cronus Zen incluye una garantía completa para devolver el dispositivo\"],\"1r2z9n8\":[\"• On PC: Aim Assist is limited because the game doesn't support it, not because of the script.\",\"• En PC: el Aim Assist es limitado porque el juego no lo admite, y no por culpa del script.\"],\"1nt5q3a\":[\"• Flexibility of choice: you can browse all the scripts available in the store\",\"• Flexibilidad de elección: puedes explorar todos los scripts disponibles en la tienda\"],\"em9243\":[\"• You can return it only if there is a manufacturing defect or a fault in the programmed script\",\"• Solo puedes devolverlo si hay un defecto de fabricación o un fallo en el script programado\"],\"1fq2hmr\":[\"⚠️ For best performance, this version needs a very strong internet connection and it's recommended to use\",\"⚠️ Para obtener el mejor rendimiento, esta versión necesita una conexión a internet muy potente y se recomienda usar\"],\"1mmft9m\":[\"🎮 C#Script | Smart color tracking system to improve stability and accuracy while playing\",\"🎮 C#Script | Sistema inteligente de seguimiento de color para mejorar la estabilidad y la precisión mientras juegas\"],\"1o9b9ex\":[\"Support\",\"Soporte\"],\"1a3jrq1\":[\"Private support: a staff member joins you and sets everything up\",\"Soporte privado: un agente se conecta contigo y te configura todo\"],\"1nllqg6\":[\"Private support\",\"Soporte privado\"],\"ciphrv\":[\"+# SAR\",\"+# SAR\"],\"y2u8f5\":[\"No, the guides are enough\",\"No, me basta con las guías\"],\"1i02ov\":[\"Yes\",\"Sí\"],\"16mv5ri\":[\"Contact us\",\"Contáctanos\"],\"ysudiz\":[\"Close\",\"Cerrar\"],\"1rpj0q1\":[\"Thanks for sharing\",\"Gracias por compartir\"],\"1hw0hav\":[\"Share\",\"Compartir\"],\"1br10nz\":[\"Zoom\",\"Ampliar\"],\"1m4llnv\":[\"More\",\"Más\"],\"5bhigh\":[\"Recoil control\",\"Control de retroceso\"],\"1aqiqww\":[\"Script\",\"Script\"],\"1qqk2z7\":[\"Call of Duty\",\"Call of Duty\"],\"pmqggx\":[\"Products\",\"Productos\"],\"1o4cih0\":[\"Complete your order\",\"Completa tu pedido\"],\"v2a6qf\":[\"See what customers buy with this product.\",\"Descubre qué compran los clientes con este producto.\"],\"4lpfcs\":[\"Buy them together for #\",\"Cómpralos juntos por #\"],\"1kam0ez\":[\"Added to cart\",\"Añadido al carrito\"],\"1e158pp\":[\"Checkout\",\"Finalizar pedido\"],\"1281ir8\":[\"View cart\",\"Ver carrito\"],\"3okn1i\":[\"Free product\",\"Producto gratis\"],\"1giqkne\":[\"Weight\",\"Peso\"],\"x9584h\":[\"Total:\",\"Total:\"],\"lyp3lq\":[\"Free shipping\",\"Envío gratis\"],\"6gy5t0\":[\"Get\",\"Consigue\"],\"drmjzp\":[\"when you add\",\"al añadir\"],\"dgq6pd\":[\"to the cart\",\"al carrito\"],\"xbbay8\":[\"Send the order as a gift\",\"Enviar el pedido como regalo\"],\"1h4yzna\":[\"Send this product as a gift to your loved ones in a few simple steps.\",\"Envía este producto como regalo a tus seres queridos en unos pasos.\"],\"1iti5lk\":[\"Send as a gift\",\"Enviar como regalo\"],\"1cb9qie\":[\"Gift details\",\"Detalles del regalo\"],\"1tawzxs\":[\"Enter recipient details\",\"Datos del destinatario\"],\"v9j41s\":[\"Sender name\",\"Nombre del remitente\"],\"ryvuca\":[\"Recipient name\",\"Nombre del destinatario\"],\"1vfv6zs\":[\"Recipient mobile number\",\"Móvil del destinatario\"],\"6mnz74\":[\"Send later\",\"Enviar más tarde\"],\"1ord1xc\":[\"Sending date and time\",\"Fecha y hora de envío\"],\"obce1d\":[\"You can't edit the order details after setting the sending date\",\"No puedes editar el pedido después de fijar la fecha de envío\"],\"1js730p\":[\"Continue to payment\",\"Continuar al pago\"],\"1p82f4v\":[\"Subtotal\",\"Subtotal\"],\"140aqgh\":[\"Order summary\",\"Resumen del pedido\"],\"1v1f2v9\":[\"Total\",\"Total\"],\"9cthu8\":[\"(# items)\",\"(# productos)\"],\"9wm2kt\":[\"Show order summary\",\"Ver resumen del pedido\"],\"fl8acy\":[\"Offer ends in\",\"La oferta termina en\"],\"s5qgmv\":[\"Offer ended\",\"Oferta finalizada\"],\"kas7cu\":[\"Day\",\"Día\"],\"1ph43zc\":[\"Days\",\"Días\"],\"10yb94x\":[\"Hour\",\"Hora\"],\"1osetvj\":[\"Hours\",\"Horas\"],\"2qq2oj\":[\"Minute\",\"Minuto\"],\"hjyr1p\":[\"Minutes\",\"Minutos\"],\"1ed1sxy\":[\"Second\",\"Segundo\"],\"1nfot8f\":[\"Seconds\",\"Segundos\"],\"r6zz1\":[\"Have a discount code?\",\"¿Tienes un código de descuento?\"],\"wx9fd4\":[\"Enter discount code\",\"Introduce el código de descuento\"],\"1yaqb3u\":[\"Discount code\",\"Código de descuento\"],\"wob6a6\":[\"Apply\",\"Aplicar\"],\"b8eysb\":[\"Remove\",\"Eliminar\"],\"1bxofk9\":[\"Price\",\"Precio\"],\"40u8j4\":[\"Copy\",\"Copiar\"],\"1nn7xjn\":[\"Copied ✓\",\"Copiado ✓\"],\"1fjtzcj\":[\"Main menu\",\"Menú principal\"]}"); } catch (e) { return; }
  var H = document.documentElement;
  H.lang = L; H.dir = 'ltr'; H.classList.add('c7-ltr', 'c7-lang-' + L);

  var RX_AR = /[؀-ۿ]/, RX_LET = /[؀-ٟٮ-ۿ]/,
      RX_NUM = /[0-9٠-٩]+(?:[.,٫٬][0-9٠-٩]+)*/g;
  function lat(s) {
    return s.replace(/[٠-٩]/g, function (d) { return d.charCodeAt(0) - 0x0660; }).replace(/٫/g, '.').replace(/٬/g, ',');
  }
  function hash(s) {
    var h = 0x811c9dc5;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
    return (h >>> 0).toString(36);
  }
  var miss = c7.i18nMiss = {};
  function one(s) {
    var nums = [], k = s.replace(RX_NUM, function (m) { nums.push(lat(m)); return '#'; });
    if (!RX_LET.test(k)) return lat(s);                 /* أرقام عربيّة-هنديّة فقط */
    var hit = D[hash(k)], i = 0;
    if (!hit) return null;
    return hit[I].replace(/#/g, function () { return i < nums.length ? nums[i++] : ''; });
  }
  function tr(raw) {
    if (!RX_AR.test(raw)) return null;
    var s = raw.replace(/\s+/g, ' ').trim(), o = one(s);
    if (o != null) return o;
    /* سطر السلّة «اسم الخيار: قيمته» يُترجَم شطرًا شطرًا */
    var c = s.indexOf(': ');
    if (c > 0) {
      var a = one(s.slice(0, c)), b = one(s.slice(c + 2));
      if (a != null || b != null) return (a == null ? s.slice(0, c) : a) + ': ' + (b == null ? s.slice(c + 2) : b);
    }
    miss[s] = 1;
    return null;
  }
  var ATTRS = ['placeholder', 'title', 'aria-label', 'alt', 'data-mm-spn-title'];
  /* الصور التي فيها نصّ عربيّ (الهيرو، بطاقات الأقسام، الشرائط، البنرات، صور المنتجات) لها نسخ
     EN/ES مرفوعة على وسائط سلّة. المفتاح = أوّل ٨ من معرّف الصورة العربيّة (أو أوّل ١٠ من
     بصمة صور المنتجات القديمة، وهي ثابتة عبر المقاسات)، والقيمة = [EN, ES]. صورة بلا نسخة
     تبقى كما هي، ولو فشل تحميل النسخة المترجمة ترجع العربيّة. */
  var IM = {"a4dc6c79":["f051abc9-e2fb-4bde-abd5-6bf99bdc1bc0-original.webp","47e7fb52-3d08-440d-9ece-7372cc44fe0c-original.webp"],"ahjmIvMEaB":["ca082ee7-5179-4129-9233-07b9edd765cc-original.webp","80f0a490-31b5-41b4-b831-aa38375339af-original.webp"],"ubTqOnRcMX":["9c96b80a-511c-4615-a10b-d0e6720a4b41-original.webp","e5a9717f-343b-47fe-910b-45d388295b3e-original.webp"],"93fbd7bb":["1bdcac96-0d7c-4240-8e82-1f0de2daa0e3-original.webp","97b5eba1-f788-4652-a95c-f8d35a7fe6d9-original.webp"],"31483b6d":["96f525d3-80ef-4810-8492-cf8b7dab7c56-original.webp","76a011d2-beb0-4963-bde2-13cd5d57f10f-original.webp"],"BBeGxNmrDK":["b751f088-2d0d-48b0-a41b-532cb75bf8f6-original.webp","f69f2458-6c77-496f-b900-2e348c9bbb7a-original.webp"],"xhTsXgSezA":["bcab4ab8-8490-4ccf-8f66-a61ac5efe37f-original.webp","ab3f934c-a123-4fb9-bd2a-f90afb63a39b-original.webp"],"0RJZpCfwZG":["204fee80-a7fd-4aea-94d5-ce598f093147-original.webp","8bcd36c8-d017-4df3-82a5-8ecfaccd0541-original.webp"],"lBGVnv0dSz":["e8ec91df-4fe1-45dc-ad0d-453e494ac7cb-original.webp","1b32db90-19ad-4516-a9c3-d2fbe63a1f9b-original.webp"],"tchq9CgT0q":["c08839cf-ca8c-448b-b8c0-684a20628833-original.webp","4c6be92a-a246-4308-bb5e-9d531e22a0e6-original.webp"],"n6fShoLDZy":["18c425ab-2171-430d-8803-9746e4dc5300-original.webp","1e470dcd-bfa1-4bcf-95b8-f94cb29d1e03-original.webp"],"20b6a3db":["06edf6a9-d1eb-4483-81a5-dce23bf541ae-original.webp","13092ad7-5d32-4e1c-ad40-afe8ea95d8d7-original.webp"],"GBKFtDH6eT":["4d5cb688-8954-4f3f-9d77-33afd25e8195-original.webp","d3ea1bd5-7980-400f-aa27-971f4a703628-original.webp"],"40507d3c":["bfab3562-9b24-44a4-a329-81dcf5813837-original.webp","bb1aa6aa-5e00-4e66-bf29-b507f1c5681b-original.webp"],"c06988d7":["433215aa-279b-44e7-a1a3-566d52317808-original.webp","038531c9-9c77-402d-8813-8f5afdc3f702-original.webp"],"e91d5c50":["a9bf0eb9-cee9-42e5-a467-3c895a79c585-original.webp","e452dd57-5407-4ab7-a303-494133bc57b2-original.webp"],"821d2025":["a742c33a-4e49-4012-8aa6-21fa41800a92-original.webp","a742c33a-4e49-4012-8aa6-21fa41800a92-original.webp"],"b4242867":["70d14288-9ce7-4a2e-b911-58f0da238a2e-original.webp","f1a97a21-0134-4003-a866-145afb928620-original.webp"],"06a84cfb":["b0082b04-c324-45c9-9216-dd2aa6e454ab-original.webp","6165b54d-d574-4476-9e32-3056d4dda7f3-original.webp"],"d7351bf2":["797b6ecb-7447-4cda-81b1-dae429d870e0-original.webp","333128d5-7cde-4262-b551-b75ea3b3552e-original.webp"],"475affa3":["67fb3d8f-f24c-4e05-85d1-bde38a97a374-original.webp","3b723891-7094-45f3-ad95-b50dc232e5f7-original.webp"],"83e58e5b":["88e1b53a-8cc4-4ee7-927f-da308b556a4e-original.webp","88e1b53a-8cc4-4ee7-927f-da308b556a4e-original.webp"],"ef69644c":["90cf060e-d8e9-4673-a3cb-c707185b39b0-original.webp","90cf060e-d8e9-4673-a3cb-c707185b39b0-original.webp"],"183e7c18":["e86eb85e-6fab-4c4d-b108-3af3967c5b01-original.webp","e86eb85e-6fab-4c4d-b108-3af3967c5b01-original.webp"],"7609101b":["9a101def-4638-44f3-a9a5-15d8e3c770ae-original.webp","9a101def-4638-44f3-a9a5-15d8e3c770ae-original.webp"],"79df9885":["de35dd0a-4731-4fb4-ad82-6dc51adcf844-original.webp","de35dd0a-4731-4fb4-ad82-6dc51adcf844-original.webp"],"acb20cfa":["d23def37-642e-4f94-9978-3dceea98898d-original.webp","65ed22f7-f63e-4dfb-a075-d2ac8dd68ad9-original.webp"],"cf6973e0":["b7bc4af6-3868-49b8-bb6f-f1e09d726e85-original.webp","b7bc4af6-3868-49b8-bb6f-f1e09d726e85-original.webp"],"a9fa6e2d":["9407bf3f-a52b-495c-aa34-da3537978b49-original.webp","9407bf3f-a52b-495c-aa34-da3537978b49-original.webp"],"f42f0ad1":["b72014e0-560c-4ed2-8a9a-196ad9ca8c28-original.webp","b72014e0-560c-4ed2-8a9a-196ad9ca8c28-original.webp"],"ddcbb946":["37279d6c-363d-4c6a-8b3f-79ea5d992b4e-original.webp","37279d6c-363d-4c6a-8b3f-79ea5d992b4e-original.webp"],"a586a51a":["249bf8b8-02f0-4b0b-ac06-3104ed6b37ec-original.webp","249bf8b8-02f0-4b0b-ac06-3104ed6b37ec-original.webp"],"a99f1f82":["ae98912a-a5f2-4928-b7ce-c419fe446e58-original.webp","ae98912a-a5f2-4928-b7ce-c419fe446e58-original.webp"],"735a7a5e":["6db987fc-6a27-4623-9804-18bdb3480ebe-original.webp","3db10e25-7677-4e3b-87f8-642573a10455-original.webp"],"1410ea3b":["074ece25-8291-4c11-bfa1-f2b649b3b259-original.webp","1ab37a70-0f0c-4af7-b447-0459fae3cfb8-original.webp"],"776b5721":["337e968a-fa14-4f7f-9e5c-e8d269cc541b-original.webp","3e8d6e7b-5d27-42a1-914e-453b07dfca09-original.webp"]}, IBASE = 'https://cdn.files.salla.network/homepage/72668157/',
      IATTR = ['src', 'data-src', 'srcset', 'data-srcset', 'href', 'data-zoom', 'style'],
      RX_IMG = /https:\/\/cdn\.(?:files\.salla\.network|salla\.sa)\/[^\s"'()<>,]+?\.webp/g;
  function ikey(u) {
    var m = /-\d+x\d+-([A-Za-z0-9]{10})[A-Za-z0-9]*\.webp$/.exec(u);
    if (m) return m[1];
    m = /\/([0-9a-f]{8})-[0-9a-f-]{27}(?:-original)?\.webp$/.exec(u);
    return m ? m[1] : '';
  }
  function isw(s) {
    return s.replace(RX_IMG, function (u) { var h = IM[ikey(u)]; return h && h[I] ? IBASE + h[I] : u; });
  }
  function back(el, v) {
    el.addEventListener('error', function () { el.c7ar = 1; el.removeAttribute('srcset'); el.setAttribute('src', v); }, { once: true });
  }
  function imgs(el) {
    if (el.c7ar) return;
    for (var i = 0; i < IATTR.length; i++) {
      var a = IATTR[i], v = el.getAttribute(a);
      if (!v || v.length < 60 || v.indexOf('cdn.') < 0) continue;
      var o = isw(v);
      if (o === v) continue;
      if (a === 'src' && el.nodeName === 'IMG') back(el, v);
      el.setAttribute(a, o);
    }
  }
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEMPLATE: 1, TEXTAREA: 1 };
  var roots = new WeakSet();
  function text(n) {
    var v = n.nodeValue, o = tr(v);
    if (o == null) return;
    var a = /^\s*/.exec(v)[0], b = /\s*$/.exec(v)[0];
    n.nodeValue = a + o + (a.length < v.length ? b : '');
  }
  function attrs(el) {
    for (var i = 0; i < ATTRS.length; i++) {
      var v = el.getAttribute(ATTRS[i]);
      if (v) { var o = tr(v); if (o != null) el.setAttribute(ATTRS[i], o); }
    }
    imgs(el);
  }
  function walk(root) {
    if (root.nodeType === 3) { if (root.parentNode && !SKIP[root.parentNode.nodeName]) text(root); return; }
    if (root.nodeType !== 1 && root.nodeType !== 11) return;
    if (root.nodeType === 1) { if (SKIP[root.nodeName]) return; attrs(root); if (root.shadowRoot) watch(root.shadowRoot); }
    var tw = document.createTreeWalker(root, 5 /* عناصر + نصوص */, null), n;
    while ((n = tw.nextNode())) {
      if (n.nodeType === 3) { if (!SKIP[n.parentNode.nodeName]) text(n); }
      else { attrs(n); if (n.shadowRoot) watch(n.shadowRoot); }
    }
  }
  function watch(root) {
    if (roots.has(root)) return;
    roots.add(root);
    walk(root);
    new MutationObserver(function (list) {
      for (var i = 0; i < list.length; i++) {
        var m = list[i];
        if (m.type === 'characterData') { if (m.target.parentNode && !SKIP[m.target.parentNode.nodeName]) text(m.target); }
        else if (m.type === 'attributes') attrs(m.target);
        else for (var j = 0; j < m.addedNodes.length; j++) walk(m.addedNodes[j]);
      }
    }).observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS.concat(IATTR) });
  }
  watch(H);
})();

/* ---------- الأداء: إيقاف الحركات الزخرفيّة خارج الشاشة ----------
   لمعة «أضف للسلة» في كل بطاقة، نجوم التقييم، لمعة المميزات، الشعار، النقطة الحمراء — كانت
   كلها تشتغل وهي خارج الشاشة وتصحّي المعالج كل إطار. هنا تتوقّف خارجها وتكمل لمّا تظهر
   (الـCSS: كتلة «إيقاف خارج الشاشة»). */
(function () {
  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (es) {
    for (var i = 0; i < es.length; i++) es[i].target.classList.toggle('c7-off', !es[i].isIntersecting);
  }, { rootMargin: '80px 0px' });
  c7.waitFor('.btn--add-to-cart, salla-add-product-button .s-button-element, .s-rating-stars-wrapper, .s-block--features .feature-icon, .navbar-brand, .footer_logo, .c7-top, .c7-ofr', function (el) {
    io.observe(el);
  });
})();
;/* ===== C7 الوصف الفخم: الأرقام تعدّ من ٠ (المصدر: 12-الوصف-الفخم/count.js) ===== */
(function () { if (!('IntersectionObserver' in window)) return; if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return; function init() { var ul; try { ul = document.querySelector('.product__description p[class*="ql-align-center"]:not(:has(>strong)) + p + ul'); } catch (e) { return; } if (!ul || ul.__c7n) return; ul.__c7n = 1; var els = [].slice.call(ul.querySelectorAll(':scope > li > strong')).filter(function (s) { return /^\d+$/.test(s.textContent.trim()); }); if (!els.length) return; var first = true; var io = new IntersectionObserver(function (en) { var vis = en.some(function (e) { return e.isIntersecting; }); if (first) { first = false; if (vis) { io.disconnect(); return; } els.forEach(function (s) { s.dataset.n = s.textContent.trim(); s.textContent = '0'; }); return; } if (!vis) return; io.disconnect(); var t0 = 0, D = 1400; function step(t) { if (!t0) t0 = t; var k = Math.min(1, (t - t0) / D), e = 1 - Math.pow(1 - k, 3); els.forEach(function (s) { s.textContent = String(Math.round(+s.dataset.n * e)); }); if (k < 1) requestAnimationFrame(step); } requestAnimationFrame(step); }, { threshold: 0.4 }); io.observe(ul); } if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init(); })();

/* ===== C7 شراء مباشر: زر البطاقة (المصدر: 16-شراء-مباشر/buy.js) ===== */
document.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('custom-salla-product-card salla-add-product-button'); if (!b) return; var a = b.closest('custom-salla-product-card').querySelector('a.product-title, a.thumb-wrapper'); if (!a) return; e.preventDefault(); e.stopPropagation(); location.href = a.href; }, true);
/* =====================================================================
   C7 ARENA v2 — السكربت (١ نوفمبر ٢٠٢٦)
   الرئيسيّة تُبنى قسمًا واحدًا (#s-home) أوّل #main-content بترتيب تك برو وبمحتوى C7:
   هيرو ← اختر لعبتك ← كيف يوصلك السكربت؟ ← الأجهزة ← ليش C7؟ ← آراء عملائنا ← أسئلة قبل الطلب ← المجتمع.
   لو تعطّل البناء يرجع عالي كما هو (html.s-fail). الأسعار والتقييمات من api.salla.dev (كاش ١٠ دقائق).
   كل الصفحات: هيدر (روابط + مبدّل لغة بنفس مفتاح الحيّ c7-lang + حالة التمرير)، شريط جوّال بعنصر «الألعاب»،
   بطاقات سلة = ملصق لعبة، صفحة المنتج = ملصق بدل صور البنر القديمة + شريط ثقة + «كيف يوصلك»،
   السلة = شريط خطوات + ملصقات، صفحة شكرًا = «وش بعد؟». صفر مكتبات؛ IntersectionObserver للظهور فقط.
   ===================================================================== */
(function () {
  'use strict';
  if (window.__c7s) return;
  window.__c7s = 1;
  var de = document.documentElement;
  de.classList.add('s-js');
  /* الدخوليّة: مرّة لكلّ جلسة؛ الستارة CSS، وهنا الشعار فقط */
  var INTRO = false;
  try { INTRO = document.body && document.body.classList.contains('index') && !sessionStorage.getItem('s-intro') && !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches); if (INTRO) sessionStorage.setItem('s-intro', '1'); } catch (e) {}
  if (!INTRO) de.classList.add('s-intro-skip');
  try { var pc = document.createElement('link'); pc.rel = 'preconnect'; pc.href = 'https://cdn.jsdelivr.net'; pc.crossOrigin = ''; document.head.appendChild(pc); } catch (e) {}

  var ART = 'https://cdn.jsdelivr.net/gh/virusmohammed58-pixel/c7-assets@1.0.0/';
  var BG = 'https://cdn.jsdelivr.net/gh/virusmohammed58-pixel/c7-assets@1.1.0/';   /* مشاهد الخلفيّات: bg/ 1024×1280 · bg-s/ 640×800 */
  function scene(key, big, eager, cls) {
    return '<img class="' + (cls || 's-poster__scene') + '" src="' + BG + (big ? 'bg/' : 'bg-s/') + key + '.webp" srcset="' + BG + 'bg-s/' + key + '.webp 640w, ' + BG + 'bg/' + key + '.webp 1024w" sizes="' + (big ? '(min-width:1024px) 520px, 92vw' : '(min-width:1024px) 300px, (min-width:640px) 32vw, 46vw') + '" width="640" height="800" alt="" ' + (eager ? 'fetchpriority="high" ' : 'loading="lazy" ') + 'decoding="async">';
  }
  var CAT_SCRIPTS = '/%D8%B3%D9%83%D8%B1%D8%A8%D8%AA%D8%A7%D8%AA-c7/c1387544331';
  var CATS = [
    { id: 'c1387544331', ar: 'سكربتات C7', en: 'C7 scripts', href: CAT_SCRIPTS, key: 'bo7' },
    { id: 'c15667210', ar: 'كرونس زين مبرمجة', en: 'Programmed Cronus Zen', href: '/%D9%83%D8%B1%D9%88%D9%86%D8%B3-%D8%B2%D9%8A%D9%86-cronus-zen-%D9%85%D8%A8%D8%B1%D9%85%D8%AC%D9%87-%D9%85%D8%B9-%D8%A7%D9%84%D8%B3%D9%83%D8%B1%D8%A8%D8%AA/c15667210', key: 'cronus' },
    { id: 'c445257201', ar: 'XIM ماتريكس مبرمجة', en: 'Programmed XIM Matrix', href: '/%D8%B2%D9%85-%D9%85%D8%A7%D8%AA%D8%B1%D9%8A%D9%83%D8%B3-%D9%85%D8%A8%D8%B1%D9%85%D8%AC%D8%A9-%D9%85%D8%B9-%D8%B3%D9%83%D8%B1%D8%A8%D8%AA-xim-matrix/c445257201', key: 'cronus' },
    { id: 'c8760703', ar: 'تتبّع ألوان السوني', en: 'PlayStation color tracking', href: '/%D8%AA%D8%AA%D8%A8%D8%B9-%D8%A7%D9%84%D9%88%D8%A7%D9%86-%D8%A7%D9%84%D8%B3%D9%88%D9%86%D9%8A/c8760703', key: 'ai' }
  ];
  var DISCORD = 'https://discord.gg/a4hsh2YmVa', WHATSAPP = 'https://wa.me/966502059768';
  var POLICY = '/%D8%B3%D9%8A%D8%A7%D8%B3%D8%A9-%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%A8%D8%AF%D8%A7%D9%84-%D9%88%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B1%D8%AC%D8%A7%D8%B9/page-765094525';
  var SBC = 'https://eauthenticate.saudibusiness.gov.sa/certificate-details/0000211655';

  var LANG = (window.c7 && window.c7.lang) || 'ar', AR = LANG === 'ar';
  function t(ar, en) { return AR ? ar : en; }

  /* المنتجات: الترتيب = ترتيب العرض. rgb = لون المشهد خلف الشخصيّة؛ w×h = أبعاد art-s (تمنع النطّ) */
  var GAMES = [
    { id: '1755224368', key: 'bo7', slug: 'black-ops-7-script', ar: 'بلاك أوبس 7', en: 'Black Ops 7', rgb: '64,132,255', w: 353, h: 440, tag: t('الأحدث والأكثر طلبًا', 'Newest and most ordered'), hot: 1 },
    { id: '1765129269', key: 'mw4', slug: 'modern-warfare-4-script', ar: 'مودرن وارفير 4', en: 'Modern Warfare 4', rgb: '120,170,215', w: 406, h: 440, tag: t('يعرف سلاحك من أول طلقة', 'Knows your weapon from the first shot'), zen: 1 },
    { id: '2037265166', key: 'bo6', slug: 'black-ops-6-script', ar: 'بلاك أوبس 6', en: 'Black Ops 6', rgb: '214,64,52', w: 440, h: 427, tag: t('تعرّف تلقائي على السلاح', 'Automatic weapon detection') },
    { id: '1651879706', key: 'fc27', slug: 'fc-27-script', ar: 'فيفا 27', en: 'FC 27', rgb: '46,204,140', w: 440, h: 366, tag: t('للرانكد والبطولات', 'For ranked and tournaments') },
    { id: '1460523496', key: 'fortnite', slug: 'fortnite-script', ar: 'فورت نايت', en: 'Fortnite', rgb: '157,77,255', w: 308, h: 440, tag: t('بناء سريع وتصويب دقيق', 'Fast building, precise aim') },
    { id: '844722281', key: 'marvel', slug: 'marvel-rivals-script', ar: 'مارفل رايفلز', en: 'Marvel Rivals', rgb: '226,54,54', w: 346, h: 440, tag: t('تصويب دقيق وحركات سريعة', 'Precise aim, fast moves') },
    { id: '1544249465', key: 'apex', slug: 'apex-legends-script', ar: 'ايبكس ليجند', en: 'Apex Legends', rgb: '218,41,42', w: 391, h: 440, tag: t('ثبات قوي وحركات احترافية', 'Strong stability, pro movement') },
    { id: '2031556291', key: 'bf6', slug: 'battlefield-6-script', ar: 'باتلفيلد 6', en: 'Battlefield 6', rgb: '255,112,48', w: 399, h: 440, tag: t('إصدار جديد', 'New release') },
    { id: '1561774982', key: 'ow2', slug: 'overwatch-2-script', ar: 'أوفر واتش 2', en: 'Overwatch 2', rgb: '249,158,26', w: 440, h: 326, tag: t('دقة لكل بطل', 'Precision for every hero') },
    { id: '1107757505', key: 'bo2', slug: 'black-ops-2-script', ar: 'بلاك أوبس 2', en: 'Black Ops 2', rgb: '143,163,184', w: 440, h: 368, tag: t('كلاسيكي بثبات جديد', 'A classic with new stability') },
    { id: '354378945', key: 'bo1', slug: 'black-ops-1-script', ar: 'بلاك أوبس 1', en: 'Black Ops 1', rgb: '200,161,101', w: 440, h: 273, tag: t('للّي يحبّون الأصل', 'For fans of the original') }
  ];
  var GEAR = [
    { id: '1778429348', key: 'cronus', slug: 'cronus-zen-programmed', ar: 'كرونس زين مبرمجة مع سكربت هدية', en: 'Programmed Cronus Zen with a free script', rgb: '110,193,255', tag: t('توصيل مجاني', 'Free shipping'), desc: t('قطعة كرونس زين أصلية مبرمجة وجاهزة: توصّلها وتلعب. معها سكربت هدية من اختيارك وتوصيل مجاني داخل المملكة.', 'An original Cronus Zen, programmed and ready: plug in and play. Comes with a free script of your choice and free shipping in Saudi Arabia.'), tags: [t('سكربت هدية', 'Free script'), t('توصيل مجاني', 'Free shipping'), 'PS5 · PS4 · Xbox · PC'] },
    { id: '771396096', key: 'ai', slug: 'c7-ai-color-tracking', ar: 'تتبّع ألوان بالذكاء الاصطناعي', en: 'AI color tracking', rgb: '176,107,255', tag: t('يدعم السوني', 'PlayStation support'), desc: t('تتبّع ألوان بالذكاء الاصطناعي لأجهزة السوني: يتعرّف على الخصم من لونه ويساعدك على التصويب بدقة.', 'AI color tracking for PlayStation: it recognizes the enemy by color and helps you aim precisely.'), tags: [t('تسليم فوري', 'Instant delivery'), 'PS5 · PS4'] }
  ];
  var BYID = {}; GAMES.concat(GEAR).forEach(function (g) { BYID[g.id] = g; });
  var REVIEWS = [
    ['عون القحطاني', 'بيشة', 'ماشاءالله سرعه في الرد واسلوب عسل، الله يوفقكم ويرزقكم وسكربتات لا تفوتكم خورافية'],
    ['فارس القحطاني', 'الدمام', 'أقوى سكربت ممكن اجربه أسطوري، ثبات الأيم والكومبوهات جامد'],
    ['أنس العمري', 'خميس مشيط', 'الله يعطيكم العافية، سكربت مجنون والدعم على الواتساب أسلوب واحترام، شكراً من أعماق قلبي'],
    ['متعب العتيبي', 'عفيف', 'والله سكربت خيالي جداً، ثبات وكل شي ماشاءالله ويستاهل سعره وزيادة'],
    ['عبدالله الرويلي', 'عرعر', 'أفضل متجر ونصيحة لا تتعامل إلا معه، سعر مناسب وثقة ألف والله'],
    ['سلطان السعيد', 'رأس تنورة', 'للأمانة سكربت رهيب وفعلاً مو زي باقي المتاجر، والدعم متعاون معي لأقصى درجة']
  ];

  /* ---------- أدوات ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function num(n) { return new Intl.NumberFormat('en-US').format(n); }
  var PREFIX = '';
  try { PREFIX = new URL(salla.url.get('/'), location.href).pathname.replace(/\/+$/, ''); } catch (e) {}
  function link(p) { return PREFIX + p; }
  function prodLink(g) { return link('/' + g.slug + '/p' + g.id); }
  function home(hash) { return (document.body.classList.contains('index') ? '' : link('/')) + hash; }
  function sar() { return '<i class="sicon-sar s-sar" aria-hidden="true"></i>'; }
  function priceHtml(p) {
    if (!p) return '<b>&nbsp;</b>';
    var now = p.on && p.sale ? p.sale : p.price, was = p.on && p.reg > now ? p.reg : 0;
    return '<b class="s-num">' + sar() + num(now) + '</b>' + (was ? '<s class="s-num">' + num(was) + '</s>' : '');
  }
  function offPct(p) { if (!p || !p.on || !p.sale || !p.reg || p.sale >= p.reg) return 0; return Math.round((1 - p.sale / p.reg) * 100); }
  function gstyle(g) { return 'style="--s-g:' + g.rgb + '"'; }
  var SVG = function (d, extra) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' + (extra || '') + '>' + d + '</svg>'; };
  var IC = {
    arrow: SVG('<path d="M19 12H5M11 18l-6-6 6-6"/>'),
    bolt: SVG('<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>'),
    book: SVG('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5M9 7h6M9 11h6"/>'),
    update: SVG('<path d="M20 11a8 8 0 0 0-14.6-4.5L4 8"/><path d="M4 3v5h5"/><path d="M4 13a8 8 0 0 0 14.6 4.5L20 16"/><path d="M20 21v-5h-5"/>'),
    card: SVG('<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6.5 15h4"/>'),
    check: SVG('<circle cx="12" cy="12" r="9.5"/><path d="m8 12.3 2.7 2.7L16.2 9.5"/>'),
    shield: SVG('<path d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>'),
    headset: SVG('<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2.5" y="13" width="4" height="6" rx="1.5"/><rect x="17.5" y="13" width="4" height="6" rx="1.5"/><path d="M19.5 19v1a2 2 0 0 1-2 2H13"/>'),
    pad: SVG('<path d="M6 9h4M8 7v4M15 9.5h.01M18 11.5h.01"/><path d="M7 5h10a5 5 0 0 1 4.9 6l-.9 5a3 3 0 0 1-5.3 1.3L14 15h-4l-1.7 2.3A3 3 0 0 1 3 16l-.9-5A5 5 0 0 1 7 5z"/>'),
    aim: SVG('<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>'),
    star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z"/></svg>',
    plus: SVG('<path d="M12 5v14M5 12h14"/>'),
    grid: SVG('<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>'),
    box: SVG('<path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5z"/><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9"/>'),
    file: SVG('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>'),
    play: SVG('<circle cx="12" cy="12" r="9.5"/><path d="m10 8.5 5 3.5-5 3.5z"/>'),
    ps: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8.98 2.6v17.55l3.92 1.26V6.69c0-.69.3-1.15.79-.99.64.18.76.81.76 1.5v5.88c2.44 1.19 4.36 0 4.36-3.15 0-3.24-1.13-4.68-4.44-5.81-1.31-.45-3.73-1.2-5.39-1.52zM13.6 18.4l6.3-2.26c.72-.26.83-.62.25-.81-.58-.19-1.63-.14-2.35.12l-4.2 1.49v-2.37l.24-.08s1.21-.43 2.92-.62c1.71-.19 3.8.03 5.44.65 1.85.59 2.06 1.46 1.59 2.06-.47.6-1.63 1.03-1.63 1.03l-8.56 3.09V18.4zM2.26 18.1c-1.9-.54-2.22-1.66-1.35-2.3.8-.6 2.17-1.05 2.17-1.05l5.65-2.02v2.3l-4.07 1.46c-.72.26-.83.62-.25.81.58.19 1.63.14 2.35-.12l1.97-.71v2.06l-.39.07c-1.97.32-4.07.19-6.08-.5z"/></svg>',
    xbox: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.1 21.03A11.96 11.96 0 0 0 12 24c3.03 0 5.79-1.12 7.9-2.97 1.88-1.91-4.32-8.71-7.9-11.42-3.58 2.71-9.78 9.51-7.9 11.42zM15.26 4.8c2.55-1.87 4.36-1.6 4.9-1.44A11.95 11.95 0 0 0 12 0C9.05 0 6.33 1.07 4.22 2.84c.55-.16 2.35-.43 4.9 1.44A17.8 17.8 0 0 1 12 6.92a17.8 17.8 0 0 1 3.26-2.12zM20.6 4.26c-.52-.03-1.86.03-3.67 1.4 2.63 2.86 6.1 8.24 5.86 12.06A11.95 11.95 0 0 0 24 12c0-2.93-1.05-5.62-2.8-7.7-.2-.03-.4-.04-.6-.04zM3.4 4.26c-.2 0-.4.01-.6.04A11.95 11.95 0 0 0 0 12c0 2.09.54 4.06 1.48 5.77C1.3 13.95 4.7 8.6 7.3 5.72 5.5 4.3 4.15 4.23 3.4 4.26z"/></svg>',
    pc: SVG('<rect x="2.5" y="4" width="19" height="12.5" rx="2"/><path d="M8 20h8M12 16.5V20"/>'),
    discord: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.6 5.3A17 17 0 0 0 15.4 4l-.5 1a15.7 15.7 0 0 0-5.8 0L8.6 4a17 17 0 0 0-4.2 1.3C1.7 9.3 1 13.2 1.3 17a17 17 0 0 0 5.2 2.6l1.1-1.8a11 11 0 0 1-1.7-.8l.4-.3a12.2 12.2 0 0 0 11.4 0l.4.3c-.5.3-1.1.6-1.7.8l1.1 1.8a17 17 0 0 0 5.2-2.6c.4-4.4-.7-8.3-3.1-11.7zM8.7 14.7c-1 0-1.9-1-1.9-2.1s.8-2.1 1.9-2.1 1.9 1 1.9 2.1-.8 2.1-1.9 2.1zm6.6 0c-1 0-1.9-1-1.9-2.1s.8-2.1 1.9-2.1 1.9 1 1.9 2.1-.8 2.1-1.9 2.1z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1a17 17 0 0 1-1.7-.6 13.3 13.3 0 0 1-5.1-4.5c-.4-.5-1.1-1.6-1.1-3s.8-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.2.5.1.6 0l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>'
  };

  /* ---------- المنتجات: طلب واحد ---------- */
  var PKEY = 'c7s-products';
  function products() {
    return new Promise(function (res) {
      try { var c = JSON.parse(sessionStorage.getItem(PKEY) || 'null'); if (c && Date.now() - c.t < 600000 && c.d) return res(c.d); } catch (e) {}
      var id = 72668157;
      try { id = salla.config.get('store.id') || id; } catch (e) {}
      fetch('https://api.salla.dev/store/v1/products?per_page=50', { headers: { 'Store-Identifier': '' + id, 'Accept-Language': AR ? 'ar' : 'en' } })
        .then(function (r) { return r.json(); })
        .then(function (r) {
          var d = {};
          (r.data || []).forEach(function (p) { d[String(p.id)] = { name: p.name || '', price: +p.price || 0, sale: +p.sale_price || 0, reg: +p.regular_price || 0, on: !!p.is_on_sale, rc: +(p.rating && p.rating.count) || 0, rs: +(p.rating && p.rating.stars) || 0 }; });
          try { sessionStorage.setItem(PKEY, JSON.stringify({ t: Date.now(), d: d })); } catch (e) {}
          res(d);
        }).catch(function () { res({}); });
    });
  }
  function rating(d) { var n = 0, s = 0; Object.keys(d).forEach(function (k) { var p = d[k]; if (p.rc && p.rs) { n += p.rc; s += p.rc * p.rs; } }); return { n: n, avg: n ? s / n : 0 }; }

  /* ---------- الملصق ---------- */
  function poster(g, opts) {
    opts = opts || {};
    var dir = opts.big ? 'art/' : 'art-s/';
    return '<div class="s-poster' + (g.w && g.w / g.h > 1.1 ? ' s-poster--wide' : '') + '" ' + gstyle(g) + '><div class="s-poster__bg" aria-hidden="true">' + scene(g.key, !!opts.big, !!opts.eager) + '</div>' +
      '<img class="s-poster__fig" src="' + ART + dir + g.key + '.webp" alt="" ' + (g.w && !opts.big ? 'width="' + g.w + '" height="' + g.h + '" ' : '') + (opts.eager ? 'fetchpriority="high" ' : 'loading="lazy" ') + 'decoding="async">' +
      (opts.badge ? '<span class="s-poster__badge' + (opts.badgeIce ? ' s-ice' : '') + '">' + opts.badge + '</span>' : '<span class="s-poster__badge" data-s-off hidden></span>') +
      (opts.chips ? '<div class="s-poster__chips">' + opts.chips + '</div>' : '') +
      '<div class="s-poster__plate"><img src="' + ART + 'logo-s/' + g.key + '.webp" alt="' + esc(t(g.ar, g.en)) + '" loading="lazy" decoding="async"></div></div>';
  }

  /* ---------- أقسام الرئيسيّة ---------- */
  function head(id, h, p, more) {
    return '<div class="s-head' + (more ? ' s-head--row' : '') + '"><div><h2 id="' + id + '">' + h + '</h2>' + (p ? '<p>' + p + '</p>' : '') + '</div>' + (more ? '<a class="s-btn s-btn--ghost s-btn--sm s-more" href="' + more[1] + '">' + more[0] + IC.arrow + '</a>' : '') + '</div>';
  }
  function heroHtml() {
    var mw4 = GAMES[1];
    return '<section class="s-hero" aria-labelledby="s-hero-t"><div class="s-wrap s-hero__in">' +
      '<div class="s-hero__txt">' +
        '<h1 id="s-hero-t">' + t('ثبات يفرق<br>من أول طلقة.', 'Stability that shows<br>from the first shot.') + '</h1>' +
        '<p class="s-hero__p">' + t('سكربتات C7 لكرونس زين وXIM ماتريكس: ثبات مقاس لكل سلاح، وإيم أسست بحركة بشرية، وتسليم فوري بعد الدفع مع الشروحات.', 'C7 scripts for Cronus Zen and XIM Matrix: measured stability per weapon, human-like aim assist, and instant delivery with guides.') + '</p>' +
        '<div class="s-hero__cta"><a class="s-btn s-btn--primary" href="#s-games">' + t('اختر لعبتك', 'Pick your game') + IC.arrow + '</a><a class="s-btn s-btn--ghost" href="#s-how">' + t('كيف يوصلك السكربت؟', 'How does it arrive?') + '</a></div>' +
        '<ul class="s-trust"><li data-s-rating hidden><span class="s-gold">' + IC.star + '</span><b data-s-avg></b><span data-s-cnt></span></li><li>' + IC.bolt + t('تسليم فوري بعد الدفع', 'Instant delivery after payment') + '</li><li>' + IC.update + t('تحديثات 6 أشهر', '6 months of updates') + '</li><li>' + IC.shield + t('متجر موثّق', 'Verified store') + '</li></ul>' +
        '<div class="s-plat">' + t('يشتغل على', 'Works on') + '<span>' + IC.ps + 'PS5</span><span>' + IC.ps + 'PS4</span><span>' + IC.xbox + 'Xbox</span><span>' + IC.pc + 'PC</span><span>' + IC.pad + t('كرونس زين', 'Cronus Zen') + '</span><span>' + IC.aim + 'XIM Matrix</span></div>' +
      '</div>' +
      '<a class="s-hero__art" href="' + prodLink(mw4) + '" aria-label="' + esc(t('سكربت مودرن وارفير 4', 'Modern Warfare 4 script')) + '">' + poster(mw4, { big: true, eager: true, badge: t('الأكثر طلبًا', 'Most ordered'), badgeIce: true }) + '</a>' +
      '</div>' +
      '<div class="s-wrap"><div class="s-marq" aria-hidden="true"><div class="s-marq__track">' + (function () { var L = GAMES.map(function (g) { return '<a href="' + prodLink(g) + '" tabindex="-1"><img src="' + ART + 'logo-s/' + g.key + '.webp" alt="" loading="lazy" decoding="async"></a>'; }).join(''); return L + L; })() + '</div></div>' +
      '<div class="s-cats">' + [[IC.grid, t('سكربتات C7', 'C7 scripts'), t('11 لعبة، سكربت لكل واحدة', '11 games, a script for each'), CATS[0].href], [IC.pad, t('كرونس زين مبرمجة', 'Programmed Cronus Zen'), t('قطعة جاهزة + سكربت هدية', 'Ready device + free script'), CATS[1].href], [IC.aim, t('XIM ماتريكس مبرمجة', 'Programmed XIM Matrix'), t('للي يلعب يد أو ماوس', 'For pad or mouse players'), CATS[2].href], [IC.ps, t('تتبّع ألوان السوني', 'PlayStation color tracking'), t('ذكاء اصطناعي للتصويب', 'AI-assisted aiming'), CATS[3].href]]
        .map(function (c) { return '<a class="s-cat-card" href="' + link(c[3]) + '"><span class="s-cat-card__ic">' + c[0] + '</span><span><b>' + c[1] + '</b><small>' + c[2] + '</small></span></a>'; }).join('') + '</div></div>' +
      '</section>';
  }
  function tile(g) {
    var name = t(g.ar, g.en);
    return '<li class="s-rv"><a class="s-tile" href="' + prodLink(g) + '" data-s-id="' + g.id + '">' + poster(g) +
      '<div class="s-tile__cap"><div style="min-width:0"><h3 class="s-tile__name">' + esc(t('سكربت ', '') + name) + '</h3><p class="s-tile__sub">' + esc(g.tag) + '</p></div><div class="s-price" data-s-price><b>&nbsp;</b></div></div></a></li>';
  }
  function gamesHtml() {
    return '<section class="s-sec" id="s-games" aria-labelledby="s-games-t"><div class="s-wrap">' +
      head('s-games-t', t('اختر لعبتك', 'Pick your game'), t('سكربت واحد لكل لعبة، مضبوط على أسلحتها، يشتغل على كرونس زين وأغلبها على XIM ماتريكس.', 'One script per game, tuned to its weapons, for Cronus Zen and most for XIM Matrix.'), [t('كل السكربتات', 'All scripts'), link(CAT_SCRIPTS)]) +
      '<ul class="s-tiles">' + GAMES.map(tile).join('') + '</ul></div></section>';
  }
  function howHtml() {
    var steps = [
      [t('اختر لعبتك وقطعتك', 'Pick your game and device'), t('كرونس زين أو XIM ماتريكس (يد أو ماوس)، ولو تبي موظف يركّبه معك أضف «الدعم الخاص».', 'Cronus Zen or XIM Matrix (pad or mouse), and add private support if you want a team member to set it up with you.'), ''],
      [t('ادفع بالطريقة اللي تناسبك', 'Pay your way'), t('مدى، Apple Pay، البطاقات، STC Pay، أو قسّطها مع تمارا.', 'Mada, Apple Pay, cards, STC Pay, or split it with Tamara.'), ''],
      [t('يوصلك فورًا', 'It arrives instantly'), t('بعد الدفع مباشرة تلقى في «طلباتي»:', 'Right after payment you find in “My orders”:'), '<div class="s-step__ways"><span>' + IC.file + t('ملف السكربت', 'Script file') + '</span><span>' + IC.book + t('خطوات التركيب', 'Setup steps') + '</span><span>' + IC.play + t('مقاطع الشرح', 'Video guides') + '</span></div>']
    ];
    return '<section class="s-sec" id="s-how" data-cv aria-labelledby="s-how-t"><div class="s-wrap">' +
      head('s-how-t', t('كيف يوصلك السكربت؟', 'How does the script arrive?'), t('ثلاث خطوات من الاختيار إلى اللعب.', 'Three steps from choosing to playing.')) +
      '<ol class="s-steps">' + steps.map(function (s, i) { return '<li class="s-step s-rv"><span class="s-step__n s-num">' + (i + 1) + '</span><div><h3>' + s[0] + '</h3><p>' + s[1] + '</p>' + s[2] + '</div></li>'; }).join('') + '</ol></div></section>';
  }
  function gearHtml() {
    return '<section class="s-sec" id="s-gear" data-cv aria-labelledby="s-gear-t"><div class="s-wrap">' +
      head('s-gear-t', t('الأجهزة', 'Devices'), t('قطعة مبرمجة وجاهزة توصلك لبابك، أو تتبّع ألوان بالذكاء الاصطناعي لأجهزة السوني.', 'A programmed, ready device delivered to your door, or AI color tracking for PlayStation.')) +
      '<div class="s-wide">' + GEAR.map(function (g) {
        return '<article class="s-wide__card s-rv" ' + gstyle(g) + ' data-s-id="' + g.id + '">' +
          '<a class="s-wide__media" href="' + prodLink(g) + '" aria-hidden="true" tabindex="-1">' + scene(g.key, false, false) + '<img class="s-wide__fig" src="' + ART + 'art/' + g.key + '.webp" alt="" loading="lazy" decoding="async"><span class="s-poster__badge" data-s-off hidden></span></a>' +
          '<div class="s-wide__txt"><h3><a href="' + prodLink(g) + '">' + esc(t(g.ar, g.en)) + '</a></h3><p>' + esc(g.desc) + '</p>' +
          '<div class="s-tags">' + g.tags.map(function (x) { return '<span>' + IC.check + esc(x) + '</span>'; }).join('') + '</div>' +
          '<div class="s-wide__row"><div class="s-price" data-s-price><b>&nbsp;</b></div><a class="s-btn s-btn--primary s-btn--sm" href="' + prodLink(g) + '">' + t('اطلب الآن', 'Order now') + IC.arrow + '</a></div></div></article>';
      }).join('') + '</div></div></section>';
  }
  function whyHtml() {
    var feats = [
      [IC.bolt, t('تسليم فوري', 'Instant delivery'), t('ملف السكربت وخطوات التركيب في «طلباتي» مباشرة بعد الدفع.', 'The script file and setup steps appear in “My orders” right after payment.')],
      [IC.update, t('تحديثات 6 أشهر', '6 months of updates'), t('مجانًا من تاريخ الطلب عند توفّرها، لتبقى على آخر إصدار.', 'Free from the order date when available, so you stay current.')],
      [IC.headset, t('دعم واتساب وديسكورد', 'WhatsApp and Discord support'), t('شروحات مع كل سكربت، و«دعم خاص» لمن يبي موظفًا يركّب معه.', 'Guides with every script, and private support for a hands-on setup.')],
      [IC.card, t('ادفع براحتك', 'Pay your way'), t('مدى وApple Pay والبطاقات وSTC Pay، أو قسّطها مع تمارا.', 'Mada, Apple Pay, cards and STC Pay, or split it with Tamara.')]
    ];
    return '<section class="s-sec" id="s-why" data-cv aria-labelledby="s-why-t"><div class="s-wrap">' +
      head('s-why-t', t('ليش C7؟', 'Why C7?'), t('اللي يفرق في التجربة، مو في الكلام.', 'What makes the difference in play, not in words.')) +
      '<ul class="s-feats">' + feats.map(function (f) { return '<li class="s-feat s-rv"><span class="s-feat__ic">' + f[0] + '</span><h3>' + f[1] + '</h3><p>' + f[2] + '</p></li>'; }).join('') + '</ul>' +
      '<p class="s-verified"><img src="https://cdn.salla.network/images/sbc.png?v=2.0.5" alt="" width="26" height="26" loading="lazy"><span>' + t('متجر موثّق في المركز السعودي للأعمال', 'Verified by the Saudi Business Center') + ' <a href="' + SBC + '" target="_blank" rel="noopener">0000211655</a></span></p>' +
      '<div class="s-pay" data-s-pay hidden></div>' +
      '</div></section>';
  }
  function reviewsHtml() {
    var stars = ''; for (var i = 0; i < 5; i++) stars += IC.star;
    return '<section class="s-sec" id="s-revs" data-cv aria-labelledby="s-revs-t"><div class="s-wrap">' +
      head('s-revs-t', t('آراء عملائنا', 'What our customers say'), '', [t('كل التقييمات', 'All reviews'), link(CAT_SCRIPTS)]) +
      '<p class="s-score" data-s-score hidden></p>' +
      '<ul class="s-revs">' + REVIEWS.map(function (r) {
        return '<li class="s-rev s-rv"><div class="s-rev__stars" aria-label="5/5">' + stars + '</div><blockquote>' + esc(r[2]) + '</blockquote>' +
          '<p class="s-rev__who"><span class="s-rev__av" aria-hidden="true">' + esc(r[0].charAt(0)) + '</span><span><b>' + esc(r[0]) + '</b>' + esc(r[1]) + '</span></p></li>';
      }).join('') + '</ul></div></section>';
  }
  function faqHtml() {
    var faqs = [
      [t('وش أحتاج عشان أشغّل السكربت؟', 'What do I need to run a script?'), t('قطعة Cronus Zen أو XIM Matrix. بعض السكربتات لكرونس زين فقط، والتوافق مكتوب في صفحة كل سكربت.', 'A Cronus Zen or XIM Matrix. Some scripts are Cronus Zen only; compatibility is listed on each script page.')],
      [t('متى يوصلني السكربت؟', 'When do I get the script?'), t('فورًا بعد الدفع: ملف السكربت مع خطوات التركيب ومقاطع الشرح في «طلباتي».', 'Right after payment: the script file with setup steps and video guides in “My orders”.')],
      [t('فيه شرح ودعم؟', 'Are there guides and support?'), t('مع كل سكربت مقاطع شرح وشروحات مكتوبة. الشراء لا يشمل دعمًا فنيًا مجانيًا؛ لو تبي موظفًا يركّبه معك أضف «الدعم الخاص» من صفحة السكربت.', 'Every script comes with video and written guides. Free technical support is not included; add private support on the script page for a hands-on setup.')],
      [t('كم يأخذ توصيل كرونس زين؟', 'How long does Cronus Zen delivery take?'), t('في الغالب تجهيز 1–4 أيام عمل ثم توصيل 1–2 يوم عمل حسب شركة الشحن.', 'Usually 1–4 business days to prepare, then 1–2 business days of shipping depending on the carrier.')]
    ];
    return '<section class="s-sec" id="s-faq" data-cv aria-labelledby="s-faq-t"><div class="s-wrap">' +
      head('s-faq-t', t('أسئلة قبل الطلب', 'Questions before you order'), '', [t('سياسة المتجر', 'Store policy'), link(POLICY)]) +
      '<div class="s-faq">' + faqs.map(function (f, i) { return '<details class="s-rv"' + (i === 0 ? ' open' : '') + '><summary>' + f[0] + IC.plus + '</summary><p>' + f[1] + '</p></details>'; }).join('') + '</div></div></section>';
  }
  function joinHtml() {
    return '<section class="s-sec" id="s-join" data-cv aria-labelledby="s-join-t"><div class="s-wrap"><div class="s-join s-rv">' +
      head('s-join-t', t('تواصل معنا', 'Get in touch'), t('مجتمع C7 على ديسكورد، واستفساراتك على واتساب.', 'The C7 community on Discord, and your questions on WhatsApp.')) +
      '<div class="s-join__btns"><a class="s-btn s-btn--dc" href="' + DISCORD + '" target="_blank" rel="noopener">' + IC.discord + t('ادخل الديسكورد', 'Join Discord') + '</a><a class="s-btn s-btn--wa" href="' + WHATSAPP + '" target="_blank" rel="noopener">' + IC.whatsapp + t('راسلنا واتساب', 'Message on WhatsApp') + '</a></div>' +
      '</div></div></section>';
  }

  /* ---------- تعبئة الأسعار والتقييم وشعارات الدفع ---------- */
  function fill(root, d) {
    root.querySelectorAll('[data-s-id]').forEach(function (el) {
      var p = d[el.getAttribute('data-s-id')];
      if (!p) return;
      var pr = el.querySelector('[data-s-price]'); if (pr) pr.innerHTML = priceHtml(p);
      var off = el.querySelector('[data-s-off]'), pct = offPct(p);
      if (off && pct) { off.textContent = '-' + pct + '%'; off.hidden = false; }
    });
    var r = rating(d);
    if (r.n) {
      var avg = r.avg.toFixed(1);
      var li = root.querySelector('[data-s-rating]');
      if (li) { li.querySelector('[data-s-avg]').textContent = avg; li.querySelector('[data-s-cnt]').textContent = t('من ' + num(r.n) + ' تقييم', 'from ' + num(r.n) + ' reviews'); li.hidden = false; }
      var sc = root.querySelector('[data-s-score]');
      if (sc) { sc.innerHTML = IC.star + '<b>' + avg + '</b><span>' + t('من 5 على ' + num(r.n) + ' تقييمًا حقيقيًا على منتجاتنا', 'out of 5 from ' + num(r.n) + ' real product reviews') + '</span>'; sc.hidden = false; }
    }
    var pay = root.querySelector('[data-s-pay]'), src = document.querySelector('footer.store-footer .payments-wrapper');
    if (pay && src) {
      var seen = {}, items = [];
      src.querySelectorAll('img').forEach(function (im) { var k = (im.currentSrc || im.src || '').replace(/\?.*$/, ''); if (!k || seen[k]) return; seen[k] = 1; items.push('<li><img src="' + esc(im.src) + '" alt="' + esc(im.alt || '') + '" loading="lazy" decoding="async"></li>'); });
      if (items.length) { pay.innerHTML = '<ul>' + items.join('') + '</ul>'; pay.hidden = false; }
    }
  }
  function reveal(root) {
    var els = root.querySelectorAll('.s-rv');
    if (!('IntersectionObserver' in window) || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) { de.classList.add('s-norv'); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { var el = e.target, sib = 0, p = el.previousElementSibling; while (p && p.classList.contains('s-rv') && !p.classList.contains('in') && sib < 6) { sib++; p = p.previousElementSibling; } el.style.transitionDelay = (Math.min(sib, 5) * 60) + 'ms'; el.classList.add('in'); io.unobserve(el); } }); }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- البناء ---------- */
  function build() {
    var body = document.body, main = document.getElementById('main-content');
    if (!body || !main || !body.classList.contains('index')) return;
    if (document.getElementById('s-home')) return;
    try {
      var el = document.createElement('div');
      el.id = 's-home';
      el.setAttribute('dir', AR ? 'rtl' : 'ltr');
      el.innerHTML = heroHtml() + gamesHtml() + howHtml() + gearHtml() + whyHtml() + reviewsHtml() + faqHtml() + joinHtml();
      main.insertBefore(el, main.firstChild);
      de.classList.add('s-home');
      reveal(el);
      /* الحركتان المحيطيّتان (طفو الملصق وشريط الشعارات) تتوقّفان خارج الشاشة */
      if ('IntersectionObserver' in window) {
        var amb = el.querySelector('.s-hero__art'), marq = el.querySelector('.s-marq'), vis = {};
        var io2 = new IntersectionObserver(function (es) { es.forEach(function (e) { vis[e.target.className] = e.isIntersecting; }); de.classList.toggle('s-off', !Object.keys(vis).some(function (k) { return vis[k]; })); });
        if (amb) io2.observe(amb); if (marq) io2.observe(marq);
      }
      if (INTRO) { var logo = document.querySelector('header .navbar-brand img.main-logo'); if (logo && logo.src) { var it = document.createElement('div'); it.id = 's-intro'; it.setAttribute('aria-hidden', 'true'); it.innerHTML = '<img src="' + esc(logo.src) + '" alt="">'; document.body.appendChild(it); setTimeout(function () { if (it.parentNode) it.parentNode.removeChild(it); }, 2200); } }
      products().then(function (d) { fill(el, d); });
    } catch (e) {
      de.classList.add('s-fail');
      if (window.console) console.warn('C7 home', e);
    }
  }

  /* ---------- الهيدر: روابط + مبدّل لغة + حالة التمرير ---------- */
  function header() {
    var h = document.querySelector('header.store-header .header-inner-wrapper');
    if (!h) return;
    if (!document.getElementById('s-nav')) {
      var nav = document.createElement('ul');
      nav.id = 's-nav';
      var cur = location.pathname;
      nav.innerHTML = [[t('الألعاب', 'Games'), home('#s-games'), /\/c\d+/.test(cur)], [t('الأجهزة', 'Devices'), home('#s-gear'), false], [t('كيف يوصلك؟', 'How it arrives'), home('#s-how'), false], [t('تواصل', 'Contact'), home('#s-join'), false]]
        .map(function (x) { return '<li><a href="' + x[1] + '"' + (x[2] ? ' class="on"' : '') + '>' + x[0] + '</a></li>'; }).join('');
      var brand = h.querySelector('.navbar-brand');
      if (brand && brand.parentNode === h) h.insertBefore(nav, brand.nextSibling); else h.appendChild(nav);
    }
    var tools = h.querySelector('.header-innerLeft, .hdi-wrapper');
    if (tools && !tools.querySelector('.s-lang')) {
      var lg = document.createElement('div');
      lg.className = 's-lang'; lg.setAttribute('role', 'group'); lg.setAttribute('aria-label', 'Language / اللغة');
      lg.innerHTML = [['ar', 'AR', 'العربية'], ['en', 'EN', 'English'], ['es', 'ES', 'Español']].map(function (x) { return '<button type="button" data-l="' + x[0] + '" lang="' + x[0] + '" title="' + x[2] + '"' + (x[0] === LANG ? ' class="on" aria-pressed="true"' : ' aria-pressed="false"') + '>' + x[1] + '</button>'; }).join('');
      lg.addEventListener('click', function (e) {
        var b = e.target.closest('button[data-l]'); if (!b) return;
        var to = b.getAttribute('data-l'); if (to === LANG) return;
        try { localStorage.setItem('c7-lang', to); } catch (x) {}
        var u = location.href.replace(/([?&])lang=(ar|en|es)&?/, '$1').replace(/[?&]$/, '');
        if (u === location.href) location.reload(); else location.replace(u);
      });
      tools.appendChild(lg);
      /* نسخة في قائمة الجوّال (الهيدر الضيّق يخفي المبدّل) */
      var mm = document.querySelector('#mobile-menu ul.main-menu, #mobile-menu');
      if (mm && !mm.querySelector('.s-lang')) { var c = lg.cloneNode(true); c.addEventListener('click', function (e) { var b = e.target.closest('button[data-l]'); if (!b) return; lg.querySelector('button[data-l="' + b.getAttribute('data-l') + '"]').click(); }); mm.insertBefore(c, mm.firstChild); }
    }
    var isHome = document.body.classList.contains('index');
    var tick = function () { de.classList.toggle('s-scrolled', !isHome || window.scrollY > 24); };
    tick();
    window.addEventListener('scroll', tick, { passive: true });
  }

  /* ---------- شريط الجوّال: «الألعاب» ---------- */
  function mobileNav() {
    var inner = document.querySelector('footer.mobile-nav-outer .mobile-nav-inner');
    if (!inner || inner.querySelector('.s-nav-cats')) return;
    var first = inner.querySelector('.mobile-nav--item'); if (!first) return;
    var a = document.createElement('a');
    a.className = 'mobile-nav--item s-nav-cats' + (/\/c\d+/.test(location.pathname) ? ' s-on' : '');
    a.href = link(CAT_SCRIPTS);
    a.innerHTML = IC.grid + '<span>' + t('الألعاب', 'Games') + '</span>';
    first.parentNode.insertBefore(a, first.nextSibling);
  }

  /* ---------- بطاقات سلة: ملصق + اسم نظيف + وصف قصير ---------- */
  function skin(card) {
    if (card.classList.contains('s-skin') || card.classList.contains('s-noskin')) return;
    var a = card.querySelector('a[href*="/p"]'), m = a && /\/p(\d+)/.exec(a.getAttribute('href') || '');
    var g = m && BYID[m[1]], thumb = card.querySelector('.product-block__thumb .thumb-wrapper');
    if (!g || !thumb) { if (m) card.classList.add('s-noskin'); return; }
    card.style.setProperty('--s-g', g.rgb);
    card.classList.add('s-skin');
    if (g.w && g.w / g.h > 1.1) card.classList.add('s-wide');
    /* صورة البنر القديمة لا تُحمَّل أصلًا (توفير) */
    var old = thumb.querySelector('img'); if (old) { old.removeAttribute('srcset'); old.removeAttribute('data-src'); old.removeAttribute('data-srcset'); old.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='; old.loading = 'lazy'; }
    thumb.insertAdjacentHTML('beforeend', scene(g.key, false, false, 's-card__scene'));
    var fig = new Image(); fig.className = 's-card__fig'; fig.alt = ''; fig.loading = 'lazy'; fig.decoding = 'async'; fig.src = ART + 'art-s/' + g.key + '.webp'; if (g.w) { fig.width = g.w; fig.height = g.h; }
    var plate = document.createElement('span'); plate.className = 's-card__plate';
    var logo = new Image(); logo.alt = ''; logo.loading = 'lazy'; logo.decoding = 'async'; logo.src = ART + 'logo-s/' + g.key + '.webp'; plate.appendChild(logo);
    thumb.appendChild(fig); thumb.appendChild(plate);
    var h3 = card.querySelector('.product-title h3.title'), sub = card.querySelector('.product-title .product-subtitle');
    if (h3 && h3.textContent.indexOf('|') > -1) h3.textContent = h3.textContent.split('|')[0].trim();
    if (sub && g.tag) sub.textContent = g.tag;
  }
  function unblue(card) { card.querySelectorAll('.s-button-element').forEach(function (b) { if (!b.__s) { b.__s = 1; b.style.setProperty('background-image', 'none', 'important'); } }); }
  function skinCards() {
    var run = function () { document.querySelectorAll('custom-salla-product-card').forEach(function (c) { skin(c); unblue(c); }); };
    run();
    if (window.MutationObserver) {
      var pending = 0;
      new MutationObserver(function () { if (pending) return; pending = setTimeout(function () { pending = 0; run(); }, 120); }).observe(document.body, { childList: true, subtree: true });
    }
  }

  /* ---------- صفحة التصنيف: رأس + أقراص الأقسام ---------- */
  function categoryPage() {
    var m = /\/(c\d+)(?:[/?#]|$)/.exec(location.pathname);
    if (!m || document.querySelector('.s-cat')) return;
    var outer = document.querySelector('.index-outer, .container--products-list'); if (!outer) return;
    var cur = CATS.filter(function (c) { return c.id === m[1]; })[0];
    var crumb = document.querySelector('.breadcrumbs li:last-child, .breadcrumbs a:last-of-type');
    var title = cur ? t(cur.ar, cur.en) : (crumb ? crumb.textContent.trim() : t('المنتجات', 'Products'));
    var wrap = document.createElement('div');
    wrap.className = 's-cat';
    wrap.innerHTML = '<div class="s-cat__head"><span class="s-cat__thumb"><img src="' + ART + 'logo-s/' + (cur ? cur.key : 'bo7') + '.webp" alt="" loading="lazy"></span><div><h1>' + esc(title) + '</h1><p>' + t('اختر لعبتك، وكل سكربت يوصلك فورًا بعد الدفع.', 'Pick your game; every script arrives right after payment.') + '</p></div></div>' +
      '<nav class="s-chips" aria-label="' + t('الأقسام', 'Sections') + '">' + CATS.map(function (c) { return '<a href="' + link(c.href) + '"' + (c.id === m[1] ? ' class="on"' : '') + '>' + esc(t(c.ar, c.en)) + '</a>'; }).join('') + '</nav>';
    outer.parentNode.insertBefore(wrap, outer);
  }

  /* ---------- صفحة المنتج: ملصق بدل صور البنر + شريط الثقة + «كيف يوصلك» ---------- */
  function productPage() {
    if (!document.body.classList.contains('product-single')) return;
    var m = /\/p(\d+)/.exec(location.pathname), g = m && BYID[m[1]];
    if (!g) return;
    document.body.style.setProperty('--s-g', g.rgb);
    var h1 = document.querySelector('h1.product-main-title');
    if (h1 && h1.textContent.indexOf('|') > -1) h1.textContent = h1.textContent.split('|')[0].trim();
    var side = document.querySelector('.p-single-container .sidebar');
    if (side && !side.querySelector('.s-pposter')) {
      var wrap = document.createElement('div');
      wrap.className = 's-pposter';
      var chips = '<span>' + IC.bolt + t('تسليم فوري', 'Instant delivery') + '</span>' + (g.key === 'cronus' ? '<span>' + IC.box + t('توصيل مجاني', 'Free shipping') + '</span>' : g.key === 'ai' ? '<span>' + IC.ps + 'PS5 · PS4</span>' : '<span>' + IC.pad + t('كرونس زين', 'Cronus Zen') + (g.zen ? '' : ' · XIM') + '</span>');
      wrap.innerHTML = poster(g, { big: true, eager: true, chips: chips });
      side.insertBefore(wrap, side.firstChild);
      side.classList.add('s-has-poster');
    }
    /* «وفّر …» من السعرين المعروضين (أرقام سلة عربيّة أو لاتينيّة) */
    var po = document.querySelector('.p-price-outer');
    if (po && !po.querySelector('.s-save')) {
      var dig = function (s) { return parseFloat(String(s || '').replace(/[٠-٩]/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'.indexOf(d); }).replace(/[^\d.]/g, '')); };
      var now = dig((po.querySelector('h4.p-price') || {}).textContent), was = dig((po.querySelector('.line-through') || {}).textContent);
      if (now && was && was > now) { var sv = document.createElement('span'); sv.className = 's-save'; sv.textContent = t('وفّر ', 'Save ') + num(Math.round(was - now)) + ' ' + t('ر.س', 'SAR') + ' (' + Math.round((1 - now / was) * 100) + '%)'; po.appendChild(sv); }
    }
    var form = document.querySelector('form.product-form');
    if (form && !document.querySelector('.s-trust')) {
      var trust = document.createElement('ul');
      trust.className = 's-trust';
      trust.innerHTML = (g.key === 'cronus'
        ? [[IC.box, t('توصيل مجاني', 'Free shipping'), t('داخل المملكة', 'In Saudi Arabia')], [IC.bolt, t('سكربت هدية', 'Free script'), t('من اختيارك', 'Your choice')], [IC.card, t('قسّطها', 'Split it'), t('مع تمارا', 'With Tamara')]]
        : [[IC.bolt, t('تسليم فوري', 'Instant delivery'), t('بعد الدفع مباشرة', 'Right after payment')], [IC.update, t('تحديثات 6 أشهر', '6 months of updates'), t('مجانًا عند توفّرها', 'Free when available')], [IC.card, t('قسّطها', 'Split it'), t('مع تمارا', 'With Tamara')]]
      ).map(function (x) { return '<li>' + x[0] + '<b>' + x[1] + '</b><span>' + x[2] + '</span></li>'; }).join('');
      var how = document.createElement('div');
      how.className = 's-how';
      how.innerHTML = '<h3>' + t('كيف يوصلك؟', 'How does it arrive?') + '</h3><ol>' + (g.key === 'cronus'
        ? ['<b>' + t('تجهيز الطلب 1–4 أيام عمل', 'Order prepared in 1–4 business days') + '</b>', '<b>' + t('التوصيل 1–2 يوم عمل', 'Delivery in 1–2 business days') + '</b> ' + t('حسب شركة الشحن', 'depending on the carrier'), '<b>' + t('توصّلها وتلعب', 'Plug in and play') + '</b> ' + t('مبرمجة ومعها سكربت هدية', 'programmed, with a free script')]
        : ['<b>' + t('ادفع', 'Pay') + '</b> ' + t('بأي طريقة تناسبك', 'any way you like'), '<b>' + t('افتح «طلباتي»', 'Open “My orders”') + '</b> ' + t('تلقى ملف السكربت وخطوات التركيب ومقاطع الشرح فورًا', 'the script file, setup steps and video guides are there instantly'), '<b>' + t('ركّبه والعب', 'Install and play') + '</b> ' + t('ولو تبي موظفًا يركّبه معك أضف «الدعم الخاص»', 'or add private support for a hands-on setup')]
      ).map(function (x) { return '<li><span>' + x + '</span></li>'; }).join('') + '</ol>';
      var anchor = document.querySelector('.prod-main-content section.sticky-product-bar, .p-single-container section.sticky-product-bar') || form;
      anchor.parentNode.insertBefore(trust, anchor.nextSibling);
      trust.parentNode.insertBefore(how, trust.nextSibling);
    }
  }

  /* ---------- السلة: شريط الخطوات + ملصقات العناصر ---------- */
  function cartPage() {
    var lay = document.querySelector('.cart-page-layout');
    if (!lay || document.querySelector('.s-cartsteps')) return;
    var steps = document.createElement('div');
    steps.className = 's-cartsteps';
    steps.innerHTML = [[t('السلة', 'Cart'), 1], [t('الدفع', 'Payment'), 0], [t('الاستلام', 'Delivery'), 0]].map(function (x, i) { return (i ? '<hr>' : '') + '<span' + (x[1] ? ' class="on"' : '') + '><i>' + (i + 1) + '</i>' + x[0] + '</span>'; }).join('');
    lay.parentNode.insertBefore(steps, lay);
    var skinItems = function () {
      lay.querySelectorAll('.cart-item').forEach(function (it) {
        if (it.__s) return;
        var a = it.querySelector('a[href*="/p"]'), m = a && /\/p(\d+)/.exec(a.getAttribute('href') || ''), g = m && BYID[m[1]];
        if (!g) return;
        it.__s = 1; it.style.setProperty('--s-g', g.rgb);
        var img = it.querySelector('img'); if (img) { img.src = ART + 'art-s/' + g.key + '.webp'; img.removeAttribute('srcset'); img.style.cssText += ';object-fit:contain;background:radial-gradient(80% 60% at 50% 100%, rgba(' + g.rgb + ',.6), transparent 70%), linear-gradient(180deg,#1a2130,#0c1017);padding:6px'; }
      });
    };
    /* ملخّص السلة وزرّ «إتمام الطلب»: مكوّنات Twilight تلوّنها طبقة CSS تغلب ملف التخصيص ⟵ inline */
    var fixSummary = function () {
      document.querySelectorAll('.s-cart-summary-card-sheet, .s-cart-summary-card-sheet-wrap, .cart-total-outer > .shadow-default, .cart-total-outer .bg-white, .s-cart-summary-card-bar').forEach(function (el) { if (el.__s) return; el.__s = 1; el.style.setProperty('background-color', '#161b25', 'important'); el.style.setProperty('background-image', 'none', 'important'); el.style.setProperty('color', '#eef3f8', 'important'); el.style.setProperty('box-shadow', 'none', 'important'); });
      document.querySelectorAll('salla-cart-summary-card .s-button-primary, .cart-total-outer .s-button-primary, .s-cart-summary-card-bar .s-button-element').forEach(function (b) { if (b.__s) return; b.__s = 1; b.style.setProperty('background-image', 'none', 'important'); b.style.setProperty('background-color', '#4cc3ff', 'important'); b.style.setProperty('color', '#06121c', 'important'); b.style.setProperty('border-radius', '10px', 'important'); });
      /* أيّ عنصر فاتح الخلفيّة أو داكن النصّ داخل بطاقة الملخّص (مهما كان صنفه) يُقلب للهويّة */
      document.querySelectorAll('salla-cart-summary-card, salla-cart-summary-card *, .cart-total-outer, .cart-total-outer *').forEach(function (el) {
        if (el.__c || el.matches('.s-button-element, .s-button-element *, input, svg, path, img')) return; el.__c = 1;
        var cs = getComputedStyle(el), bg = cs.backgroundColor.match(/\d+/g), c = cs.color.match(/\d+/g);
        if (bg && bg.length >= 3 && (+bg[0] + +bg[1] + +bg[2]) > 600 && (bg.length < 4 || +bg[3] > 0)) { el.style.setProperty('background-color', '#161b25', 'important'); el.style.setProperty('background-image', 'none', 'important'); }
        if (c && (+c[0] + +c[1] + +c[2]) < 300) el.style.setProperty('color', '#eef3f8', 'important');
      });
    };
    var run = function () { skinItems(); fixSummary(); };
    run();
    if (window.MutationObserver) { var pend = 0; new MutationObserver(function () { if (pend) return; pend = setTimeout(function () { pend = 0; run(); }, 150); }).observe(document.body, { childList: true, subtree: true }); }
  }

  /* ---------- بعد الطلب: «وش بعد؟» ---------- */
  function thankYou() {
    if (document.body.classList.contains('product-single')) return;
    var blk = document.querySelector('.thankyou-block');
    if (!blk || document.querySelector('.s-next')) return;
    var orders = link('/profile/orders');
    var n = document.createElement('div');
    n.className = 's-next';
    n.innerHTML = '<h3>' + IC.check + t('تم استلام طلبك. وش بعد؟', 'Order received. What next?') + '</h3><ol>' +
      '<li><span><b>' + t('افتح «طلباتي»', 'Open “My orders”') + '</b> ' + t('ملف السكربت وخطوات التركيب ومقاطع الشرح موجودة هناك فورًا.', 'the script file, setup steps and video guides are there instantly.') + '</span></li>' +
      '<li><span><b>' + t('ركّب السكربت', 'Install the script') + '</b> ' + t('بالشروحات المرفقة، ولو أضفت «الدعم الخاص» نتواصل معك على واتساب.', 'with the included guides; if you added private support we contact you on WhatsApp.') + '</span></li>' +
      '<li><span><b>' + t('أي سؤال؟', 'Questions?') + '</b> ' + t('واتساب أو ديسكورد، ومجتمع C7 بانتظارك.', 'WhatsApp or Discord, and the C7 community awaits.') + '</span></li></ol>' +
      '<div class="s-next__btns"><a class="s-primary" href="' + orders + '">' + IC.file + t('طلباتي', 'My orders') + '</a><a class="s-wa" href="' + WHATSAPP + '" target="_blank" rel="noopener">' + IC.whatsapp + t('واتساب', 'WhatsApp') + '</a><a class="s-dc" href="' + DISCORD + '" target="_blank" rel="noopener">' + IC.discord + t('ديسكورد', 'Discord') + '</a></div>';
    blk.parentNode.insertBefore(n, blk.nextSibling);
  }

  function safe(f) { try { f(); } catch (e) { if (window.console) console.warn('C7 arena', f.name, e); } }
  function start() { safe(build); safe(header); safe(mobileNav); safe(categoryPage); safe(productPage); safe(cartPage); safe(thankYou); safe(skinCards); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
