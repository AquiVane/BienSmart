// Bloque "Descargá la app": instala Hábitos BienSmart en el celular (Android o iPhone) con instrucciones paso a paso.
// Uso: <div data-instalar data-app="/descargas/habitos/?instalar=1"></div> y BSInstall.render(). Sin dependencias.
window.BSInstall = (function () {
  var deferred = null;
  var ua = navigator.userAgent || '';
  var ios = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  function instalada() { return (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true; }
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; });
  window.addEventListener('appinstalled', function () { deferred = null; document.querySelectorAll('[data-instalar]').forEach(pintar); });

  var CSS = '.bsi{display:grid;gap:12px}.bsi h2{margin:0}.bsi p{margin:0}.bsi .bsi-tabs{display:flex;gap:8px}' +
    '.bsi .bsi-tab{flex:1;min-height:44px;border-radius:100px;border:1px solid rgba(194,24,91,.25);background:#fff;color:#880E4F;font:600 .9rem var(--body,system-ui,sans-serif);cursor:pointer}' +
    '.bsi .bsi-tab[aria-selected="true"]{background:linear-gradient(135deg,#C2185B,#FF6B8A);color:#fff;border-color:transparent}' +
    '.bsi ol{margin:0;padding-left:1.2rem;display:grid;gap:6px}.bsi ol li::marker{color:#C2185B;font-weight:700}' +
    '.bsi .bsi-go{display:inline-flex;align-items:center;justify-content:center;min-height:50px;padding:13px 28px;border-radius:100px;border:0;background:linear-gradient(135deg,#C2185B,#FF6B8A);color:#fff;font:600 1rem var(--body,system-ui,sans-serif);cursor:pointer;width:100%;box-shadow:0 8px 24px rgba(194,24,91,.28);text-decoration:none}' +
    '.bsi .bsi-small{font-size:.85rem;color:#8A5A6A}.bsi a.bsi-link{color:#880E4F;font-weight:600}.bsi [hidden]{display:none!important}';
  function estilo() { if (document.getElementById('bsi-css')) return; var s = document.createElement('style'); s.id = 'bsi-css'; s.textContent = CSS; document.head.appendChild(s); }

  function pintar(el) {
    var app = el.getAttribute('data-app') || '';
    if (instalada()) {
      el.innerHTML = '<div class="bsi"><h2>Ya tenés la app</h2><p class="bsi-small">Hábitos BienSmart está instalada en este celular.</p></div>';
      return;
    }
    el.innerHTML = '<div class="bsi"><h2>Descargá la app</h2>' +
      '<p>Instalala en tu celular y entrá con un toque, sin pasar por ninguna tienda.</p>' +
      '<button type="button" class="bsi-go" data-act="go">Descargar la app</button>' +
      '<div class="bsi-tabs" role="tablist" aria-label="Tu celular">' +
        '<button type="button" class="bsi-tab" role="tab" data-os="android" aria-selected="' + !ios + '">Android</button>' +
        '<button type="button" class="bsi-tab" role="tab" data-os="ios" aria-selected="' + ios + '">iPhone</button></div>' +
      '<ol data-for="android"' + (ios ? ' hidden' : '') + '>' +
        '<li>Abrí esta página en <b>Chrome</b>.</li>' +
        '<li>Tocá <b>Descargar la app</b> y aceptá. Si no aparece, tocá los tres puntitos de arriba a la derecha y elegí <b>Instalar app</b> o <b>Agregar a la pantalla principal</b>.</li>' +
        '<li>Confirmá y buscá el ícono de Hábitos BienSmart en tu pantalla de inicio.</li></ol>' +
      '<ol data-for="ios"' + (ios ? '' : ' hidden') + '>' +
        '<li>Abrí esta página en <b>Safari</b>.</li>' +
        '<li>Tocá el botón <b>Compartir</b>: el cuadrado con una flecha hacia arriba, abajo en la pantalla.</li>' +
        '<li>Deslizá y elegí <b>Agregar a inicio</b>.</li>' +
        '<li>Tocá <b>Agregar</b>. El ícono queda en tu pantalla de inicio.</li></ol>' +
      (app ? '<p class="bsi-small">Si ya compraste, <a class="bsi-link" href="' + app + '">abrí la app desde acá</a>.</p>' : '') + '</div>';
    el.querySelectorAll('.bsi-tab').forEach(function (b) {
      b.addEventListener('click', function () {
        el.querySelectorAll('.bsi-tab').forEach(function (x) { x.setAttribute('aria-selected', x === b); });
        el.querySelectorAll('ol[data-for]').forEach(function (o) { o.hidden = o.getAttribute('data-for') !== b.getAttribute('data-os'); });
      });
    });
    el.querySelector('[data-act="go"]').addEventListener('click', function () {
      if (deferred) { var p = deferred; deferred = null; p.prompt(); return; }
      // Sin el cartel automático del navegador: se muestran los pasos del celular que corresponde.
      var os = ios ? 'ios' : 'android';
      var t = el.querySelector('.bsi-tab[data-os="' + os + '"]'); if (t) t.click();
      var o = el.querySelector('ol[data-for="' + os + '"]'); if (o && o.scrollIntoView) o.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (window.BS && BS.toast) BS.toast(ios ? 'Seguí los pasos de iPhone de acá abajo.' : 'Seguí los pasos de Android de acá abajo.');
    });
  }
  function render() { estilo(); document.querySelectorAll('[data-instalar]').forEach(pintar); }
  return { render: render };
})();
