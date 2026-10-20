// Config y helpers compartidos de Hábitos BienSmart (frontend estático).
// Este repo es PÚBLICO: acá solo van valores públicos por diseño (public key de Mercado Pago, client-id de PayPal).
// Nunca claves secretas ni el contenido pago -- eso vive en el Worker, detrás del login y la compra.
window.BS = (function () {
  var cfg = {
    CORE: 'https://cosmart-training-core.conglomeradocosmart.workers.dev',
    MP_WORKER: 'https://mp-productos-ganadores.conglomeradocosmart.workers.dev',
    MP_PUBLIC_KEY: 'APP_USR-057d290b-5af9-4b00-8a08-6753dc47aec4',
    PAYPAL_CLIENT_ID: 'AYuQX3JJShvSkgNn0C195h3GEHGiKNtx44X3wd_5PEoBI1iinpysmDzNRqdZ7blNuZvFWIwcwhc9qiOP',
    PRODUCTO: 'habitos-biensmart',
    // Solo para mostrar: el servidor es quien fija lo que se cobra.
    ARS: 12000,
    USD: 7.8,
  };

  function store(k, v) {
    try {
      if (v === undefined) return localStorage.getItem(k);
      if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v);
    } catch (e) { return null; }
  }
  function cookie(n) {
    var m = document.cookie.match(new RegExp('(?:^|; )' + n + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : '';
  }
  function emailOk(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v || ''); }
  function vid() {
    var v = store('bs_vid');
    if (!v || !/^[a-zA-Z0-9-]{16,64}$/.test(v)) {
      v = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : (Date.now().toString(36) + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2));
      store('bs_vid', v);
    }
    return v;
  }
  function token() { return store('bs_token') || ''; }

  // Llama al Worker. Con auth:true manda la sesión. Siempre devuelve { ok, status, data }.
  function api(path, opts) {
    opts = opts || {};
    var h = { 'Content-Type': 'application/json' };
    if (opts.auth && token()) h.Authorization = 'Bearer ' + token();
    return fetch(cfg.CORE + path, { method: opts.method || 'GET', headers: h, body: opts.body ? JSON.stringify(opts.body) : undefined })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, status: r.status, data: j }; }); })
      .catch(function () { return { ok: false, status: 0, data: { error: 'Sin conexión. Revisá tu internet e intentá de nuevo.' } }; });
  }

  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s);
    });
  }

  var toastEl, tt;
  function toast(m) {
    if (!toastEl) { toastEl = document.getElementById('toast'); }
    if (!toastEl) return;
    toastEl.textContent = m; toastEl.classList.add('show');
    clearTimeout(tt); tt = setTimeout(function () { toastEl.classList.remove('show'); }, 2800);
  }

  return { cfg: cfg, store: store, cookie: cookie, emailOk: emailOk, vid: vid, token: token, api: api, loadScript: loadScript, toast: toast };
})();
