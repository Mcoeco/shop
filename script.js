var THEMES = [
    { id: 1, name: 'OreUi', code: 'T-01', icon: 'T1' },
    { id: 2, name: 'While', code: 'T-02', icon: 'T2' },
    { id: 3, name: 'Magic', code: 'T-03', icon: 'T3' },
];

var BTNS = [
    { id: 1, name: 'Style 1', code: 'STYLE-01', icon: 'S1' },
    { id: 2, name: 'Style 2', code: 'STYLE-02', icon: 'S2' },
];

var COLORS = [
    { id: 1, name: 'Red', hex: '#ef4444' },
    { id: 2, name: 'Orange', hex: '#f97316' },
    { id: 3, name: 'Yellow', hex: '#eab308' },
    { id: 4, name: 'Green', hex: '#22c55e' },
    { id: 5, name: 'Blue', hex: '#3b82f6' },
    { id: 6, name: 'Purple', hex: '#a855f7' },
    { id: 7, name: 'Black', hex: '#1c1c1c' },
    { id: 8, name: 'White', hex: '#eeeeee' },
];

var COLOR_SUPPORT = {
    '1-1': [1, 2, 3, 4, 5, 6, 7, 8],
    '1-2': [1, 2, 3, 4, 5, 6, 7, 8],
    '2-1': [],
    '2-2': [],
    '3-1': [1, 2, 3, 4, 5, 6, 7, 8],
    '3-2': [1, 2, 3, 4, 5, 6, 7, 8],
};

var PRICE_THEME = 70;
var PRICE_BTN = 150;

var IMG_FOLDER = 'img/';

var selT = 1, selB = 1, selC = 1;
var gT = function (id) { return THEMES.find(function (t) { return t.id === id; }) || THEMES[0]; };
var gB = function (id) { return BTNS.find(function (b) { return b.id === id; }) || BTNS[0]; };
var gC = function (id) { return COLORS.find(function (c) { return c.id === id; }) || COLORS[0]; };

(function init() {
    var tg = document.getElementById('themeGrid');
    THEMES.forEach(function (t) {
        var el = document.createElement('button');
        el.className = 'ore-btn sel-item ' + (t.id === selT ? 'selected' : 'unselected');
        el.dataset.id = t.id;
        el.innerHTML = '<span class="btn-inner">'
            + '<span class="sel-ico">' + t.icon + '</span>'
            + '<span class="sel-info"><span class="sel-name">' + t.name + '</span><span class="sel-code">' + t.code + '</span></span>'
            + '<span class="sel-check"></span>'
            + '</span>';
        el.addEventListener('click', function () { doT(t.id); });
        tg.appendChild(el);
    });

    var bg = document.getElementById('btnGrid');
    BTNS.forEach(function (b) {
        var el = document.createElement('button');
        el.className = 'ore-btn sel-item ' + (b.id === selB ? 'selected' : 'unselected');
        el.dataset.id = b.id;
        el.innerHTML = '<span class="btn-inner">'
            + '<span class="sel-ico">' + b.icon + '</span>'
            + '<span class="sel-info"><span class="sel-name">' + b.name + '</span><span class="sel-code">' + b.code + '</span></span>'
            + '<span class="sel-check"></span>'
            + '</span>';
        el.addEventListener('click', function () { doB(b.id); });
        bg.appendChild(el);
    });

    var cg = document.getElementById('colorGrid');
    COLORS.forEach(function (c) {
        var el = document.createElement('div');
        el.className = 'cc' + (c.id === selC ? ' on' : '');
        el.dataset.id = c.id;
        var extraStyle = (c.id === 7 || c.id === 8) ? 'border:1px solid rgba(255,255,255,.15);' : '';
        el.innerHTML = '<div class="cc-swatch" style="background:' + c.hex + ';' + extraStyle + '"></div><div class="cc-label">' + c.name + '</div><div class="cc-chk">+</div>';
        el.addEventListener('click', function () { doC(c.id); });
        cg.appendChild(el);
    });
})();

function syncColorUI() {
    var key = selT + '-' + selB;
    var sup = COLOR_SUPPORT[key] || [];
    var note = document.getElementById('noColorNote');
    var grid = document.getElementById('colorGrid');
    var tag = document.getElementById('colorAvailTag');

    if (sup.length === 0) {
        grid.style.display = 'none';
        note.style.display = 'block';
        tag.textContent = 'Not supported';
        tag.style.color = 'var(--label-dim)';
    } else {
        grid.style.display = '';
        note.style.display = 'none';
        tag.textContent = sup.length + ' colors';
        tag.style.color = 'var(--label-green)';
        document.querySelectorAll('.cc').forEach(function (el) {
            el.style.display = sup.includes(+el.dataset.id) ? '' : 'none';
        });
        if (!sup.includes(selC)) {
            selC = sup[0];
            document.querySelectorAll('.cc').forEach(function (el) {
                el.classList.toggle('on', +el.dataset.id === selC);
            });
        }
    }
}

function doT(id) {
    selT = id;
    document.querySelectorAll('#themeGrid .ore-btn').forEach(function (c) {
        var isOn = +c.dataset.id === id;
        c.classList.toggle('selected', isOn);
        c.classList.toggle('unselected', !isOn);
    });
    document.getElementById('sum-t').textContent = gT(id).name;
    document.getElementById('chipT').textContent = gT(id).code;
    syncColorUI();
    updatePrev();
}

function doB(id) {
    selB = id;
    document.querySelectorAll('#btnGrid .ore-btn').forEach(function (c) {
        var isOn = +c.dataset.id === id;
        c.classList.toggle('selected', isOn);
        c.classList.toggle('unselected', !isOn);
    });
    document.getElementById('sum-b').textContent = gB(id).name;
    document.getElementById('chipB').textContent = gB(id).code;
    syncColorUI();
    updatePrev();
}

function doC(id) {
    selC = id;
    document.querySelectorAll('.cc').forEach(function (c) { c.classList.toggle('on', +c.dataset.id === id); });
    document.getElementById('chipC').textContent = gC(id).name;
    updatePrev();
}

function updatePrev() {
    var key = selT + '-' + selB;
    var sup = COLOR_SUPPORT[key] || [];
    var fn = sup.length > 0 ? '' + selT + selB + selC + '.png' : '' + selT + selB + '.png';

    document.getElementById('chipF').textContent = fn;
    document.getElementById('chipC').textContent = sup.length > 0 ? gC(selC).name : '-';

    var img = document.getElementById('previewImg');
    var ph = document.getElementById('imgPh');

    img.classList.remove('in');
    img.classList.add('out');

    setTimeout(function () {
        img.src = IMG_FOLDER + fn;
        img.style.display = 'block';
        ph.classList.add('hidden');
        img.onload = function () {
            img.classList.remove('out');
            img.classList.add('in');
        };
        img.onerror = function () {
            img.style.display = 'none';
            ph.classList.remove('hidden');
            ph.querySelector('.pph-txt').textContent = 'No image yet\n' + fn;
        };
    }, 150);
}

window.addEventListener('load', function () {
    document.getElementById('sum-t').textContent = gT(selT).name;
    document.getElementById('sum-b').textContent = gB(selB).name;
    document.getElementById('chipT').textContent = gT(selT).code;
    document.getElementById('chipB').textContent = gB(selB).code;
    syncColorUI();
    updatePrev();
});

function toggleMenu() {
    document.getElementById('burger').classList.toggle('open');
    document.getElementById('mobnav').classList.toggle('open');
}
function closeMenu() {
    document.getElementById('burger').classList.remove('open');
    document.getElementById('mobnav').classList.remove('open');
}

(function () {
    var els = document.querySelectorAll('.rv');
    if (!('IntersectionObserver' in window)) {
        els.forEach(function (e) { e.classList.add('show'); });
        return;
    }
    var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                e.target.classList.add('show');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.04 });
    els.forEach(function (e) { obs.observe(e); });
})();
