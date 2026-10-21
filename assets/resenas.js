// Testimonios reales de Hábitos BienSmart. Trae las reseñas aprobadas del Worker y arma un carrusel continuo
// (de derecha a izquierda, sin cortes). Si todavía no hay ninguna, la sección queda oculta.
(function () {
  function card(r) {
    var c = document.createElement('article'); c.className = 'res-card';
    var st = document.createElement('div'); st.className = 'res-stars'; st.setAttribute('aria-label', r.estrellas + ' de 5 estrellas');
    st.textContent = '★★★★★'.slice(0, r.estrellas || 5); c.appendChild(st);
    var t = document.createElement('p'); t.className = 'res-txt'; t.textContent = r.texto; c.appendChild(t);
    var w = document.createElement('div'); w.className = 'res-who'; w.textContent = r.nombre;
    if (r.lugar) { var s = document.createElement('small'); s.textContent = r.lugar; w.appendChild(s); }
    c.appendChild(w); return c;
  }
  function grupo(items, oculto) {
    var g = document.createElement('div'); g.className = 'mq-group'; if (oculto) g.setAttribute('aria-hidden', 'true');
    items.forEach(function (r) { g.appendChild(card(r)); }); return g;
  }
  function montar(sec, items) {
    sec.hidden = false; // visible antes de medir el ancho
    var host = sec.querySelector('[data-mq]'); host.textContent = '';
    var track = document.createElement('div'); track.className = 'mq-track'; host.appendChild(track);
    var g1 = grupo(items, false); track.appendChild(g1);
    // repetir el set hasta cubrir al menos el ancho de la pantalla; después se duplica el grupo para el loop sin saltos
    var w1 = g1.getBoundingClientRect().width || 1, veces = Math.max(1, Math.ceil((window.innerWidth + 40) / w1));
    var base = items.slice(); for (var i = 1; i < veces; i++) items.forEach(function (r) { base.push(r); });
    if (veces > 1) { track.textContent = ''; g1 = grupo(base, false); track.appendChild(g1); }
    track.appendChild(grupo(base, true));
    var ancho = g1.getBoundingClientRect().width || w1;
    if (!sec.querySelector('.res-nota')) { var nota = document.createElement('p'); nota.className = 'res-nota'; nota.textContent = 'Son experiencias personales: los resultados pueden variar según cada persona.'; host.insertAdjacentElement('afterend', nota); }
    track.style.setProperty('--mq-dur', Math.max(24, Math.round(ancho / 55)) + 's');
  }
  window.BSRes = {
    montar: function (selector) {
      var sec = document.querySelector(selector); if (!sec || !window.BS) return;
      BS.api('/api/bs/resenas').then(function (r) {
        var items = (r.ok && r.data && r.data.items) || [];
        if (items.length) montar(sec, items);
      });
    }
  };
})();
