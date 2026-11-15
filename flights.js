/* Flights: arrivals board, van runs and the airport → van → our place map.
   Data comes from the "Cousins Trip: Flights" Google Form (published CSV). Until that is connected, sample data is shown and labeled. */
(function () {
  const C = window.TRIP_CONFIG || {};
  const F = C.flights || {};
  const connected = !!(F.csv);
  const canSubmit = !!(F.action && F.entries && F.entries.name);
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

  const AIRPORTS = {
    SFO: { name: 'SFO', full: 'San Francisco Intl', ll: [37.6213, -122.3790], drive: 30 },
    OAK: { name: 'OAK', full: 'Oakland Intl', ll: [37.7126, -122.2197], drive: 35 },
    SJC: { name: 'SJC', full: 'San Jose Intl', ll: [37.3639, -121.9289], drive: 60 }
  };
  // The house: shown only as an icon in the general city area. No address is used anywhere.
  const HOME = [37.7700, -122.4400];
  const DAYORDER = ['Wed Jul 21', 'Thu Jul 22', 'Fri Jul 23', 'Sat Jul 24', 'Sun Jul 25', 'Mon Jul 26'];
  const GROUP_MIN = 90;      // arrivals within 90 minutes share a van run
  const BAGS_MIN = 30;       // time from landing to curb
  const EARLY_MIN = 150;     // leave the house this long before the first flight in a group

  const SAMPLE = [
    { name: 'Cousin A', arrAirport: 'SFO', arrDate: 'Thu Jul 22', arrTime: '12:40', arrFlight: 'UA 1525', depAirport: 'SFO', depDate: 'Sun Jul 25', depTime: '16:10', depFlight: 'UA 2290' },
    { name: 'Cousin B', arrAirport: 'SFO', arrDate: 'Thu Jul 22', arrTime: '13:15', arrFlight: 'AA 2418', depAirport: 'SFO', depDate: 'Sun Jul 25', depTime: '15:45', depFlight: 'AA 1977' },
    { name: 'Cousin C', arrAirport: 'SFO', arrDate: 'Thu Jul 22', arrTime: '13:55', arrFlight: 'DL 1120', depAirport: 'SFO', depDate: 'Sun Jul 25', depTime: '16:30', depFlight: 'DL 2345' },
    { name: 'Cousin D', arrAirport: 'SFO', arrDate: 'Thu Jul 22', arrTime: '17:20', arrFlight: 'WN 3310', depAirport: 'OAK', depDate: 'Sun Jul 25', depTime: '18:05', depFlight: 'WN 1462' },
    { name: 'Cousin E', arrAirport: 'OAK', arrDate: 'Thu Jul 22', arrTime: '11:05', arrFlight: 'WN 2207', depAirport: 'OAK', depDate: 'Sun Jul 25', depTime: '17:40', depFlight: 'WN 889' },
    { name: 'Cousin F', arrAirport: 'SFO', arrDate: 'Wed Jul 21', arrTime: '21:30', arrFlight: 'AS 1311', depAirport: 'SFO', depDate: 'Mon Jul 26', depTime: '09:15', depFlight: 'AS 1290' }
  ];

  /* ---------- helpers ---------- */
  function mins(t) {
    if (!t) return null;
    const m = String(t).trim().toLowerCase().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm|a|p)?/);
    if (!m) return null;
    let h = +m[1], mi = +(m[2] || 0);
    if (m[3]) { const pm = m[3][0] === 'p'; if (h === 12) h = 0; if (pm) h += 12; }
    return h * 60 + mi;
  }
  function clock(x) {
    x = ((x % 1440) + 1440) % 1440;
    let h = Math.floor(x / 60), m = x % 60, ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return h + ':' + String(m).padStart(2, '0') + ' ' + ap;
  }
  const dayIdx = d => DAYORDER.indexOf(d);
  const absMin = (d, t) => dayIdx(d) * 1440 + t;
  const flightUrl = f => 'https://www.flightaware.com/live/flight/' + encodeURIComponent(String(f).replace(/\s+/g, '').toUpperCase());
  const flightLink = f => f ? '<a href="' + flightUrl(f) + '" target="_blank" rel="noopener">' + esc(f.toUpperCase()) + '</a>' : '—';

  function parseCSV(text) {
    const rows = []; let row = [], cur = '', q = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (q) { if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
      else if (c === '"') q = true;
      else if (c === ',') { row.push(cur); cur = ''; }
      else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; row.push(cur); rows.push(row); row = []; cur = ''; }
      else cur += c;
    }
    if (cur !== '' || row.length) { row.push(cur); rows.push(row); }
    return rows.filter(r => r.some(v => v.trim() !== ''));
  }
  const COLS = { 'first name': 'name', 'arriving airport': 'arrAirport', 'arrival date': 'arrDate', 'arrival time': 'arrTime', 'arrival flight': 'arrFlight',
                 'departing airport': 'depAirport', 'departure date': 'depDate', 'departure time': 'depTime', 'departure flight': 'depFlight' };
  function rowsToFlights(rows) {
    if (!rows.length) return [];
    const head = rows[0].map(h => COLS[h.trim().toLowerCase()] || null);
    const latest = new Map();   // newest submission per first name wins
    rows.slice(1).forEach(r => {
      const o = {}; head.forEach((k, i) => { if (k) o[k] = (r[i] || '').trim(); });
      if (o.name) latest.set(o.name.toLowerCase(), o);
    });
    return [...latest.values()];
  }

  /* ---------- planning ---------- */
  function groups(list, kind) {
    const isArr = kind === 'arr';
    const items = list.map(f => {
      const ap = (isArr ? f.arrAirport : (f.depAirport || f.arrAirport) || '').toUpperCase();
      const d = isArr ? f.arrDate : f.depDate, t = mins(isArr ? f.arrTime : f.depTime);
      return { f, ap, d, t, abs: (dayIdx(d) >= 0 && t != null) ? absMin(d, t) : null };
    }).filter(x => x.abs != null && AIRPORTS[x.ap]).sort((a, b) => a.abs - b.abs);
    const out = [];
    items.forEach(x => {
      const g = out.find(g => g.ap === x.ap && g.d === x.d && x.abs - g.first <= GROUP_MIN);
      if (g) { g.items.push(x); g.last = x.abs; } else out.push({ ap: x.ap, d: x.d, first: x.abs, last: x.abs, items: [x] });
    });
    return out;
  }

  /* ---------- render ---------- */
  let data = [], map, layers = [], vans = [], raf;
  const plane = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg>';
  const houseSvg = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3 2 11.5h3V21h5.5v-6h3v6H19v-9.5h3z"/></svg>';
  const vanSvg = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2 7a2 2 0 0 1 2-2h11l4 4 3 1.5V16a1 1 0 0 1-1 1h-1.2a2.8 2.8 0 0 1-5.6 0H9.8a2.8 2.8 0 0 1-5.6 0H3a1 1 0 0 1-1-1zm2 0v3h4V7zm6 0v3h4.6l-3-3zM7 15.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8zm9.2 0a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/></svg>';

  function curve(a, b, bend) {
    const pts = [], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
    const dx = b[1] - a[1], dy = b[0] - a[0];
    const c = [mx - dx * bend, my + dy * bend];
    for (let i = 0; i <= 40; i++) { const t = i / 40, u = 1 - t; pts.push([u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]]); }
    return pts;
  }
  function drawMap() {
    const L = window.L; if (!L) return;
    if (!map) {
      map = L.map('fmap', { zoomControl: false, attributionControl: true });
      L.tileLayer('https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png' + (C.cartoKey ? '?key=' + encodeURIComponent(C.cartoKey) : ''), {
        maxZoom: 16, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(map);
      L.control.zoom({ position: 'bottomright' }).addTo(map);
    }
    layers.forEach(l => map.removeLayer(l)); layers = []; vans = [];
    const used = [...new Set(data.map(f => (f.arrAirport || '').toUpperCase()).filter(a => AIRPORTS[a]))];
    if (!used.length) used.push('SFO', 'OAK');
    const home = L.marker(HOME, { icon: L.divIcon({ className: '', html: '<div class="fpin home">' + houseSvg + '</div>', iconSize: [46, 46], iconAnchor: [23, 23] }), title: 'Our place' })
      .bindTooltip('OUR PLACE', { permanent: true, direction: 'top', offset: [0, -24], className: 'flabel' }).addTo(map);
    layers.push(home);
    const bounds = [HOME];
    used.forEach((code, k) => {
      const A = AIRPORTS[code]; bounds.push(A.ll);
      const n = data.filter(f => (f.arrAirport || '').toUpperCase() === code).length;
      const m = L.marker(A.ll, { icon: L.divIcon({ className: '', html: '<div class="fpin air">' + plane + '</div>', iconSize: [40, 40], iconAnchor: [20, 20] }), title: A.full })
        .bindTooltip(code + (n ? ' · ' + n : ''), { permanent: true, direction: 'right', offset: [22, 0], className: 'flabel' }).addTo(map);
      const path = curve(A.ll, HOME, k % 2 ? -0.18 : 0.18);
      const line = L.polyline(path, { color: '#120B27', weight: 4, opacity: .9, className: 'fdash' }).addTo(map);
      const van = L.marker(path[0], { icon: L.divIcon({ className: '', html: '<div class="fpin van">' + vanSvg + '</div>', iconSize: [34, 34], iconAnchor: [17, 17] }), title: 'Sprinter van', interactive: false }).addTo(map);
      layers.push(m, line, van); vans.push({ van, path, off: k * 0.37 });
    });
    map.fitBounds(bounds, { padding: [40, 40] });
    cancelAnimationFrame(raf);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t0 = performance.now();
    (function step(now) {
      vans.forEach(v => {
        const p = reduce ? 0.5 : ((((now - t0) / 7000 + v.off) % 1) + 1) % 1;
        const i = p * (v.path.length - 1), a = Math.floor(i), b = Math.min(a + 1, v.path.length - 1), f = i - a;
        v.van.setLatLng([v.path[a][0] + (v.path[b][0] - v.path[a][0]) * f, v.path[a][1] + (v.path[b][1] - v.path[a][1]) * f]);
      });
      if (!reduce && sheet.classList.contains('open')) raf = requestAnimationFrame(step);
    })(t0);
  }

  function runCards(gs, kind) {
    if (!gs.length) return '<div class="empty">No ' + (kind === 'arr' ? 'arrivals' : 'departures') + ' yet. Add yours below.</div>';
    return gs.map((g, i) => {
      const A = AIRPORTS[g.ap], solo = g.items.length === 1;
      const names = g.items.map(x => '<span class="chip">' + esc(x.f.name) + '</span>').join('');
      let when;
      if (kind === 'arr') {
        const land = g.first % 1440, lastLand = g.last % 1440;
        when = 'Lands <strong>' + clock(land) + (g.items.length > 1 ? '–' + clock(lastLand) : '') + '</strong> · van leaves the curb ~<strong>' + clock(lastLand + BAGS_MIN) + '</strong>, home ~' + clock(lastLand + BAGS_MIN + A.drive);
      } else {
        const fly = g.first % 1440;
        when = 'Flights from <strong>' + clock(fly) + (g.items.length > 1 ? '–' + clock(g.last % 1440) : '') + '</strong> · van leaves our place ~<strong>' + clock(fly - EARLY_MIN) + '</strong>';
      }
      return '<div class="run' + (solo ? ' solo' : '') + '"><div class="rt"><b>' + (kind === 'arr' ? 'Pickup ' : 'Drop-off ') + (i + 1) + ' · ' + g.ap + ' · ' + esc(g.d) + '</b><i>' +
        (solo ? 'Riding solo so far' : g.items.length + ' riding together') + '</i></div><div class="rw">' + when + '</div><div class="chips">' + names + '</div></div>';
    }).join('');
  }
  function sweetSpot(gs) {
    if (!gs.length) return '';
    const best = gs.slice().sort((a, b) => b.items.length - a.items.length || a.first - b.first)[0];
    const from = best.first % 1440, to = Math.max(best.last % 1440, from + 60);
    return '<div class="sweet"><b>Still booking? Aim for ' + best.ap + ', ' + esc(best.d) + ', landing ' + clock(from) + '–' + clock(to) + '</b>' +
      '<span>That’s when the most cousins land, so you’ll ride in with ' + (best.items.length - 1) + (best.items.length === 2 ? ' other' : ' others') + ' in the same van run.</span></div>';
  }
  function board(list, kind) {
    const isArr = kind === 'arr';
    const rows = list.map(f => ({ f, d: isArr ? f.arrDate : f.depDate, t: mins(isArr ? f.arrTime : f.depTime), ap: ((isArr ? f.arrAirport : (f.depAirport || f.arrAirport)) || '').toUpperCase(), fl: isArr ? f.arrFlight : f.depFlight }))
      .filter(r => r.d && r.t != null).sort((a, b) => absMin(a.d, a.t) - absMin(b.d, b.t));
    if (!rows.length) return '<div class="empty">Nothing here yet.</div>';
    return '<div class="brow hd"><span>TIME</span><span>COUSIN</span><span>FLIGHT</span><span class="ap">AIRPORT</span></div>' +
      rows.map(r => '<div class="brow"><span class="tm">' + clock(r.t).replace(' ', '') + '<span class="dy">' + esc(r.d.replace(/ Jul /, ' ')) + '</span></span><span>' + esc(r.f.name) +
        '</span><span>' + flightLink(r.fl) + '</span><span class="ap">' + esc(r.ap) + '</span></div>').join('');
  }

  function render() {
    const arr = groups(data, 'arr'), dep = groups(data, 'dep');
    document.getElementById('fSample').hidden = connected;
    document.getElementById('fSweet').innerHTML = sweetSpot(arr);
    document.getElementById('fRuns').innerHTML = runCards(arr, 'arr');
    document.getElementById('fArr').innerHTML = board(data, 'arr');
    document.getElementById('fDepRuns').innerHTML = runCards(dep, 'dep');
    document.getElementById('fDep').innerHTML = board(data, 'dep');
    if (sheet.classList.contains('open')) drawMap();
  }

  function load() {
    if (!connected) { data = SAMPLE; render(); return; }
    fetch(F.csv + (F.csv.includes('?') ? '&' : '?') + 't=' + Date.now()).then(r => r.text())
      .then(t => { data = rowsToFlights(parseCSV(t)); render(); })
      .catch(() => { data = []; render(); });
  }

  /* ---------- build the sheet ---------- */
  const opt = list => list.map(v => '<option>' + v + '</option>').join('');
  const btn = document.createElement('button');
  btn.className = 'flybtn'; btn.id = 'flyBtn'; btn.setAttribute('aria-haspopup', 'dialog'); btn.setAttribute('aria-controls', 'fsheet');
  btn.innerHTML = plane + 'Flights';
  document.body.appendChild(btn);

  const sheet = document.createElement('section');
  sheet.className = 'fsheet'; sheet.id = 'fsheet'; sheet.setAttribute('role', 'dialog'); sheet.setAttribute('aria-modal', 'true'); sheet.setAttribute('aria-labelledby', 'fTitle');
  sheet.innerHTML =
    '<div class="fwrap">' +
    '<div class="fhead"><h2 id="fTitle">Flights <span>&amp; vans</span></h2><button class="fx" id="fClose" type="button">&#10005; Back</button></div>' +
    '<div class="fsub">Land close together, ride together. Add your flight and we’ll line everyone up for the Sprinter van.</div>' +
    '<div class="fsample" id="fSample">Sample flights · real ones show up once the form is connected</div>' +
    '<div class="fmap" id="fmap" role="region" aria-label="Map: airports, the Sprinter van route and our place"></div>' +
    '<div class="fmapnote">The house icon is just the general area. We’ll share the address closer to the trip.</div>' +
    '<div class="fsec"><div id="fSweet"></div></div>' +
    '<div class="fsec"><h3>Airport pickups</h3><p class="lead">Arrivals within 90 minutes at the same airport share one van run. We wait for the last flight, plus about 30 minutes for bags.</p><div class="runs" id="fRuns"></div></div>' +
    '<div class="fsec"><h3>Arrivals board</h3><p class="lead">Tap a flight number for live status on trip day.</p><div class="board" id="fArr"></div></div>' +
    '<div class="fsec"><h3>Sunday drop-offs</h3><p class="lead">Departures grouped the same way. The van leaves about 2½ hours before the first flight in each group.</p><div class="runs" id="fDepRuns"></div></div>' +
    '<div class="fsec"><h3>Departures board</h3><div class="board" id="fDep"></div></div>' +
    '<div class="fsec"><h3>Add my flight</h3><p class="lead">Changed plans? Send it again with the same first name and the board updates.</p>' +
      '<form class="fform" id="fForm" novalidate>' +
        '<label>First name<input class="ffield" name="name" autocomplete="given-name" required></label>' +
        '<div class="grp">Landing in SF</div>' +
        '<div class="fgrid"><label>Airport<select class="ffield" name="arrAirport">' + opt(['SFO', 'OAK', 'SJC']) + '</select></label>' +
        '<label>Day<select class="ffield" name="arrDate">' + opt(['Thu Jul 22', 'Wed Jul 21', 'Fri Jul 23']) + '</select></label>' +
        '<label>Lands at<input class="ffield" name="arrTime" type="time" required></label>' +
        '<label>Flight #<input class="ffield" name="arrFlight" placeholder="UA 1525" autocapitalize="characters"></label></div>' +
        '<div class="grp">Flying home</div>' +
        '<div class="fgrid"><label>Airport<select class="ffield" name="depAirport">' + opt(['SFO', 'OAK', 'SJC']) + '</select></label>' +
        '<label>Day<select class="ffield" name="depDate">' + opt(['Sun Jul 25', 'Sat Jul 24', 'Mon Jul 26']) + '</select></label>' +
        '<label>Takes off<input class="ffield" name="depTime" type="time"></label>' +
        '<label>Flight #<input class="ffield" name="depFlight" placeholder="UA 2290" autocapitalize="characters"></label></div>' +
        '<button class="fbtn" type="submit">Add my flight</button>' +
        '<div class="fnote" id="fNote" aria-live="polite"></div>' +
      '</form></div>' +
    '<div class="fback"><button class="fx" id="fClose2" type="button">&#10005; Back to the trip</button></div>' +
    '</div>';
  document.body.appendChild(sheet);

  let lastFocus;
  function open() {
    lastFocus = document.activeElement; sheet.classList.add('open'); document.body.classList.add('fopen');
    if (location.hash !== '#flights') history.replaceState(null, '', location.pathname + location.search + '#flights');
    setTimeout(() => { drawMap(); map && map.invalidateSize(); document.getElementById('fClose').focus(); }, 80);
  }
  function close() {
    sheet.classList.remove('open'); document.body.classList.remove('fopen'); cancelAnimationFrame(raf);
    if (location.hash === '#flights') history.replaceState(null, '', location.pathname + location.search);
    (lastFocus || btn).focus();
  }
  btn.addEventListener('click', open);
  document.getElementById('fClose').addEventListener('click', close);
  document.getElementById('fClose2').addEventListener('click', close);
  addEventListener('keydown', e => { if (e.key === 'Escape' && sheet.classList.contains('open')) close(); }, true);
  sheet.addEventListener('keydown', e => e.stopPropagation());   // arrow keys stay inside the sheet

  document.getElementById('fForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target).entries());
    const note = document.getElementById('fNote');
    if (!f.name.trim()) { note.textContent = 'Add your first name.'; return; }
    if (!f.arrTime) { note.textContent = 'Add the time you land.'; return; }
    if (!canSubmit) { note.textContent = 'Preview mode: the flights form isn’t connected yet.'; return; }
    const fd = new FormData();
    Object.entries(F.entries).forEach(([k, entry]) => { if (entry && f[k] != null && f[k] !== '') fd.append(entry, k.endsWith('Time') ? clock(mins(f[k])) : (k.endsWith('Flight') ? f[k].toUpperCase() : f[k].trim())); });
    fetch(F.action, { method: 'POST', mode: 'no-cors', body: fd }).then(() => {
      note.textContent = 'Got it, ' + f.name.trim() + '! The board updates in a minute or two.';
      e.target.reset(); setTimeout(load, 5000);
    }).catch(() => { note.textContent = 'That didn’t send. Check your connection and try again.'; });
  });

  load();
  if (location.hash === '#flights') open();
})();
