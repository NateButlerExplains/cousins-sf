/* Shared helpers for the shuttle and stays trackers.
   Data lives in one Google Form ("Cousins Trip: Trackers"); every row has a Tracker column saying what it is. */
(function () {
  const C = window.TRIP_CONFIG || {};
  const T = C.trackers || {};
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
                  del(k) { try { localStorage.removeItem(k); } catch (e) {} } };
  const hash = s => { let h = 2166136261 >>> 0; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return h.toString(36); };
  const isAdmin = () => !!C.adminHash && store.get('cousins-admin') === C.adminHash;

  /* ---------- CSV ---------- */
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
  // Column titles in the form -> field keys (matched by the start of the title, longest first)
  const COLS = { 'tracker': 'tracker', 'name': 'name', 'link': 'link', 'title': 'title', 'more photos': 'photos', 'photo': 'photo',
                 'price per night': 'price', 'total price': 'total', 'bedrooms': 'bedrooms', 'beds': 'beds', 'baths': 'baths', 'sleeps': 'sleeps',
                 'area': 'area', 'vehicle': 'vehicle', 'seats': 'seats', 'luggage': 'luggage', 'flight tracking': 'tracking',
                 'fees and tip included': 'fees', 'status': 'status', 'notes': 'notes', 'timestamp': 'ts' };
  function rowsToObjects(rows) {
    if (!rows.length) return [];
    const keys = Object.keys(COLS).sort((a, b) => b.length - a.length);
    const head = rows[0].map(h => { h = h.trim().toLowerCase(); const k = keys.find(k => h.startsWith(k)); return k ? COLS[k] : null; });
    return rows.slice(1).map((r, i) => { const o = { _i: i }; head.forEach((k, j) => { if (k) o[k] = (r[j] || '').trim(); }); return o; });
  }
  const connected = !!T.csv;
  const canSubmit = !!(T.action && T.entries && T.entries.tracker);
  function load() {
    if (!connected) return Promise.resolve(null);
    return fetch(T.csv + (T.csv.includes('?') ? '&' : '?') + 't=' + Date.now()).then(r => r.text()).then(t => rowsToObjects(parseCSV(t)));
  }
  function submit(fields) {
    if (!canSubmit) return Promise.reject(new Error('preview'));
    const fd = new FormData();
    Object.entries(fields).forEach(([k, v]) => { const e = T.entries[k]; if (e && v != null && String(v).trim() !== '') fd.append(e, String(v).trim()); });
    return fetch(T.action, { method: 'POST', mode: 'no-cors', body: fd });
  }

  /* ---------- pop-up ---------- */
  let popBack;
  function pop(o) {
    let el = $('pop');
    if (!el) { el = document.createElement('div'); el.className = 'pop'; el.id = 'pop'; el.setAttribute('role', 'alertdialog'); el.setAttribute('aria-modal', 'true');
      el.setAttribute('aria-labelledby', 'popTitle'); el.hidden = true;
      el.innerHTML = '<div class="popcard"><div class="popicon" id="popIcon"></div><div class="poptitle" id="popTitle"></div><div class="popmsg" id="popMsg"></div><div class="popextra" id="popExtra"></div><div class="popbtns" id="popBtns"></div></div>';
      document.body.appendChild(el);
      el.addEventListener('keydown', e => { if (e.key === 'Escape') closePop(); }); }
    popBack = document.activeElement;
    const kind = o.kind || 'ok';
    $('popIcon').className = 'popicon ' + kind; $('popIcon').textContent = { ok: '✓', dup: '!', err: '×', ask: '?' }[kind];
    $('popTitle').textContent = o.title; $('popMsg').textContent = o.msg || '';
    $('popExtra').innerHTML = o.html || ''; $('popExtra').hidden = !o.html;
    $('popBtns').innerHTML = '';
    (o.buttons || [{ label: 'Got it' }]).forEach(b => {
      const x = document.createElement('button'); x.type = 'button'; x.className = 'btn' + (b.ghost ? ' ghost' : ''); x.textContent = b.label;
      x.addEventListener('click', () => { if (b.onClick && b.onClick() === false) return; closePop(); }); $('popBtns').appendChild(x);
    });
    el.hidden = false; requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => { const f = $('popExtra').querySelector('input') || $('popBtns').firstChild; f && f.focus(); }, 60);
  }
  function closePop() { const el = $('pop'); if (!el) return; el.classList.remove('show'); setTimeout(() => { el.hidden = true; }, 180); popBack && popBack.focus && popBack.focus(); }

  // Ask for a first name once, then remember it on this phone
  function askName(then) {
    const saved = store.get('cousins-name');
    if (saved) return then(saved);
    pop({ kind: 'ask', title: 'Who’s this?', msg: 'Your first name, so votes are one per person.',
      html: '<input class="field" id="askName" autocomplete="given-name" placeholder="First name">',
      buttons: [{ label: 'Continue', onClick: () => { const v = ($('askName').value || '').trim(); if (!v) { $('askName').focus(); return false; } store.set('cousins-name', v); setTimeout(() => then(v), 200); } },
                { label: 'Cancel', ghost: true }] });
  }

  /* ---------- passcode gate (same passcode as the main site) ---------- */
  function gate() {
    if (!C.passcodeHash || store.get('cousins-pass') === C.passcodeHash) return;
    const g = document.createElement('div'); g.className = 'gate'; g.id = 'gate';
    g.innerHTML = '<form id="gateForm" autocomplete="off"><div class="kick">Cousins Trip</div><div class="script">Family only</div>' +
      '<label class="lead" for="gatePass" style="margin:0">Enter the family passcode.</label>' +
      '<input class="field" id="gatePass" type="password" autocapitalize="none" autocomplete="off" spellcheck="false" placeholder="Passcode" style="text-align:center">' +
      '<button class="btn" type="submit">Let me in</button><div class="err" id="gateErr" role="alert"></div></form>';
    document.body.appendChild(g);
    setTimeout(() => $('gatePass').focus(), 50);
    $('gateForm').addEventListener('submit', e => {
      e.preventDefault();
      if (hash($('gatePass').value.trim().toLowerCase()) === C.passcodeHash) { store.set('cousins-pass', C.passcodeHash); g.remove(); }
      else { $('gateErr').textContent = 'Not quite. Ask the family chat for the passcode.'; $('gatePass').select(); }
    });
  }

  /* ---------- admin bar: only for phones unlocked as admin on the main site ---------- */
  function adminBar(current) {
    if (!isAdmin()) return;
    document.body.classList.add('admin');
    const links = [['main', 'Main site', '../'], ['shuttle', 'Shuttle tracker', '../shuttle/'], ['stays', 'Stays tracker', '../stays/']];
    const bar = document.createElement('nav'); bar.className = 'adminbar'; bar.setAttribute('aria-label', 'Admin');
    bar.innerHTML = '<b>ADMIN</b>' + links.map(([k, label, href]) => '<a href="' + href + '"' + (k === current ? ' aria-current="page"' : '') + '>' + label + '</a>').join('');
    document.body.appendChild(bar);
  }

  window.TRK = { C, T, $, esc, store, connected, canSubmit, load, submit, pop, closePop, askName, gate, adminBar, isAdmin };
})();
