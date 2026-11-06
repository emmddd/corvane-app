/* Corvane — clickable banking app prototype.
   Sample data only, saved on this device. Brand, accounts and figures are editable under More → Customize. */
(function () {
  "use strict";

  // ---------- Icons ----------
  const I = {
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
    eyeOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 3l18 18M10.6 5.6A10.8 10.8 0 0 1 12 5.5c6.4 0 10 6.5 10 6.5a17.6 17.6 0 0 1-3.2 4M6.6 6.7A17.4 17.4 0 0 0 2 12s3.6 6.5 10 6.5c1.6 0 3-.4 4.3-1"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    transfer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h15l-4-4M20 16H5l4 4"/></svg>',
    bill: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6" stroke-linecap="round"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 4v16M4 12h16"/></svg>',
    pencil: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M4 20l1-5L16 4l4 4L9 19z"/></svg>',
    wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M16 15h1"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/></svg>',
    piggy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M5 11a7 6 0 0 1 13-2h2v4l-2 1v3h-3v-2H9v2H6v-3a6 6 0 0 1-1-3Z"/><circle cx="15" cy="10" r=".8" fill="currentColor"/></svg>',
    card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 9.5h19M6 15h4"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19h16M6 15l4-4 3 3 5-6"/></svg>',
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m9 5 7 7-7 7"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="m15 5-7 7 7 7"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M4 10.5 12 4l8 6.5V20H4z"/><path d="M10 20v-5h4v5"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
  };
  const KINDS = { chequing: ["Chequing", I.wallet], savings: ["Savings", I.piggy], credit: ["Credit card", I.card], invest: ["Investments", I.chart], other: ["Other", I.layers] };
  const CATS = ["Groceries", "Dining", "Transport", "Shopping", "Bills", "Bill payment", "Income", "Transfer", "Payment", "Adjustment", "Other"];
  const SWATCHES = ["#C62D33", "#1F3864", "#0A7C6E", "#5B3FD0", "#D9822B", "#1C1C1E"];
  const DEFAULT_LOGO = '<svg viewBox="0 0 24 24"><path d="M16.5 8.2A5.5 5.5 0 1 0 16.5 15.8" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/><circle cx="18.6" cy="9.9" r="1.3" fill="#fff"/><circle cx="18.6" cy="14.1" r="1.3" fill="#fff"/></svg>';
  const DEFAULT_BRAND = { name: "Corvane", logo: null, color: "#C62D33" };
  const defaultAds = () => [
    { id: "ad1", tag: "New", title: "Earn more on your savings", body: "Open a high-interest savings account in minutes and watch your money grow.", cta: "Open an account" },
    { id: "ad2", tag: "Insights", title: "See where your money goes", body: "Compare your monthly spending with your income using simple charts.", cta: "Try Insights" },
    { id: "ad3", tag: "Rewards", title: "Cash back on everyday purchases", body: "Get money back on groceries, gas and bills with the rewards card.", cta: "Learn more" }
  ];
  const DEFAULT_LENDING = { heading: "Lending accounts", text: "Thinking about your first home? Explore mortgage options built around you." };
  const DEFAULT_FAQS = [
    ["How do I move money between accounts?", "Tap Transfer, enter an amount, choose the From and To accounts, then tap Transfer."],
    ["How do I pay a bill?", "Tap Pay bill, pick a saved payee or add a new one, enter the amount and date, then tap Pay bill."],
    ["Can I hide my balances?", "Yes. Tap the eye icon at the top of the screen to hide or show all balances."],
    ["How do I change an entry?", "Open an account, tap the transaction, then edit or delete it. The balance updates automatically."]
  ];

  // ---------- State ----------
  const KEY = "corvane-proto-v1";
  const today = () => localISO(new Date());
  const daysAgo = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return localISO(d); };
  function localISO(d) { return new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10); }

  function seed() {
    return {
      hide: false,
      brand: { ...DEFAULT_BRAND },
      ads: defaultAds(),
      lending: { ...DEFAULT_LENDING },
      accounts: [
        { id: "chq", name: "Chequing", kind: "chequing", sub: "Everyday account", last4: "4821", balance: 3842.17 },
        { id: "oth", name: "Other", kind: "other", sub: "Account", last4: "7390", balance: 12650.00 },
        ...defaultCards()
      ],
      payees: ["Hydro One", "Rogers", "Enbridge Gas", "City of Mississauga – Property Tax", "Visa Card"],
      tx: [
        { id: 1, acct: "chq", name: "Payroll deposit", amount: 2450.00, date: daysAgo(1), cat: "Income" },
        { id: 2, acct: "chq", name: "Loblaws", amount: -86.42, date: daysAgo(1), cat: "Groceries" },
        { id: 3, acct: "chq", name: "Tim Hortons", amount: -6.35, date: daysAgo(2), cat: "Dining" },
        { id: 4, acct: "chq", name: "Rogers", amount: -95.00, date: daysAgo(3), cat: "Bill payment" },
        { id: 5, acct: "oth", name: "Interest", amount: 21.08, date: daysAgo(5), cat: "Income" },
        { id: 6, acct: "chq", name: "Petro-Canada", amount: -58.10, date: daysAgo(6), cat: "Transport" },
        { id: 7, acct: "oth", name: "Transfer from Chequing", amount: 500.00, date: daysAgo(9), cat: "Transfer" },
        { id: 8, acct: "chq", name: "Transfer to Other", amount: -500.00, date: daysAgo(9), cat: "Transfer" },
        ...defaultCardTx(9)
      ],
      nextId: 20,
      v: 3
    };
  }
  function defaultCards() {
    return [{ id: "cc1", name: "Credit", kind: "credit", sub: "Credit card", last4: "5502", balance: 1245.60, limit: 10000 }];
  }
  function defaultCardTx(startId) {
    return [
      { name: "Best Buy", amount: -899.99, d: 2, cat: "Shopping" },
      { name: "Shell", amount: -62.45, d: 3, cat: "Transport" },
      { name: "Netflix", amount: -20.99, d: 4, cat: "Bills" },
      { name: "Payment — thank you", amount: 500.00, d: 8, cat: "Payment" },
      { name: "Uber Eats", amount: -34.17, d: 10, cat: "Dining" }
    ].map((t, i) => ({ id: startId + i, acct: "cc1", name: t.name, amount: t.amount, date: daysAgo(t.d), cat: t.cat }));
  }
  function isValid(s) { return s && Array.isArray(s.accounts) && s.accounts.length > 0 && Array.isArray(s.tx); }
  function migrate(s) {
    s.brand = Object.assign({}, DEFAULT_BRAND, s.brand || {});
    if (!/^#[0-9a-f]{6}$/i.test(s.brand.color)) s.brand.color = DEFAULT_BRAND.color;
    s.payees = Array.isArray(s.payees) ? s.payees : [];
    s.ads = Array.isArray(s.ads) ? s.ads : defaultAds();
    s.lending = Object.assign({}, DEFAULT_LENDING, s.lending || {});
    s.accounts.forEach((a) => { a.kind = KINDS[a.kind] ? a.kind : "other"; a.balance = Number(a.balance) || 0; a.last4 = String(a.last4 || "0000"); });
    s.nextId = s.nextId || s.tx.reduce((m, t) => Math.max(m, t.id), 0) + 1;
    if (!s.v || s.v < 2) {
      if (!s.accounts.some((a) => a.kind === "credit")) {
        s.accounts.push(...defaultCards());
        s.tx.push(...defaultCardTx(s.nextId)); s.nextId += 10;
        s.tx.sort((x, y) => y.date.localeCompare(x.date) || y.id - x.id);
      }
      s.v = 2;
    }
    if (s.v < 3) {
      const c = s.accounts.find((a) => a.id === "cc1" && a.name === "Rewards Card");
      if (c) c.name = "Credit";
      s.v = 3;
    }
    s.accounts.forEach((a) => { if (a.kind === "credit") a.limit = Number(a.limit) > 0 ? Number(a.limit) : 5000; });
    s.hide = !!s.hide;
    return s;
  }
  let S;
  try { const raw = JSON.parse(localStorage.getItem(KEY)); S = isValid(raw) ? migrate(raw) : seed(); } catch (e) { S = seed(); }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); return true; }
    catch (e) { toast("Couldn't save on this device"); return false; }
  }

  // ---------- Helpers ----------
  let editMode = false;   // unlocked by tapping the profile picture 4 times; resets when the app is reopened
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel, root) => [...(root || document).querySelectorAll(sel)];
  const view = $("#view");
  const fmt = (n) => (n < 0 ? "-" : "") + "$" + Math.abs(n).toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const money = (n) => S.hide ? '<span class="hidden-amt">$••••••</span>' : fmt(n);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const acct = (id) => S.accounts.find((a) => a.id === id);
  const isCard = (a) => a && a.kind === "credit";
  const deposits = () => S.accounts.filter((a) => !isCard(a));
  const cards = () => S.accounts.filter(isCard);
  // Cards hold the amount owed: spending raises it, payments lower it
  const applyAmt = (a, signed) => { a.balance = round2(a.balance + (isCard(a) ? -signed : signed)); };
  const total = () => round2(deposits().reduce((s, a) => s + a.balance, 0));
  const round2 = (n) => Math.round(n * 100) / 100;
  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const parseAmt = (v) => { const n = parseFloat(String(v).replace(/[^0-9.]/g, "")); return isFinite(n) ? round2(n) : NaN; };
  const parseSigned = (v) => { const s = String(v).trim(); const n = parseFloat(s.replace(/[^0-9.]/g, "")); return isFinite(n) ? round2(/^\s*-|^\(.*\)$/.test(s) ? -n : n) : NaN; };
  const prettyDate = (iso) => {
    const d = new Date(iso + "T12:00:00");
    const diff = Math.round((new Date(today() + "T12:00:00") - d) / 864e5);
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    return d.toLocaleDateString("en-CA", { month: "short", day: "numeric" });
  };
  const greeting = () => { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening"; };

  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2200);
  }
  function addTx(acctId, name, amount, cat, date) {
    S.tx.unshift({ id: S.nextId++, acct: acctId, name, amount: round2(amount), date: date || today(), cat });
    sortTx();
  }
  function sortTx() { S.tx.sort((x, y) => y.date.localeCompare(x.date) || y.id - x.id); }
  function acctOptions(selected, exclude, list) {
    return (list || S.accounts).filter((a) => a.id !== exclude).map((a) =>
      `<option value="${a.id}" ${a.id === selected ? "selected" : ""}>${esc(a.name)} ••${esc(a.last4)} — ${S.hide ? "hidden" : fmt(a.balance)}</option>`).join("");
  }
  function catOptions(sel) {
    const list = CATS.includes(sel) || !sel ? CATS : [sel, ...CATS];
    return list.map((c) => `<option ${c === sel ? "selected" : ""}>${esc(c)}</option>`).join("");
  }
  function header(title, backTo) {
    return `<div class="page-title"><a class="back glass round" href="${backTo || "#/"}" aria-label="Back">${I.back}</a><h1>${esc(title)}</h1></div>`;
  }
  function txRow(t, showAcct) {
    const a = acct(t.acct);
    const tag = editMode ? `a class="tx" href="#/tx/${t.id}"` : 'div class="tx"';
    return `<${tag}><div class="tx-dot">${esc(t.name.charAt(0).toUpperCase())}</div>
      <div class="tx-main"><div class="tx-name">${esc(t.name)}</div>
      <div class="tx-meta">${prettyDate(t.date)} · ${esc(t.cat)}${showAcct && a ? " · " + esc(a.name) : ""}</div></div>
      <div class="tx-amt ${t.amount > 0 ? "in" : ""}">${S.hide ? "••••" : (t.amount > 0 ? "+" : "") + fmt(t.amount)}</div></${editMode ? "a" : "div"}>`;
  }
  const fail = (m) => { const e = $("#err"); e.textContent = m; e.scrollIntoView({ block: "center", behavior: reduceMotion() ? "auto" : "smooth" }); };

  // Animated figures: numbers glide from their last value to the new one
  const prevVals = {};
  function countUps() {
    $$("[data-val]", view).forEach((el) => {
      const k = el.dataset.key, to = Number(el.dataset.val), from = prevVals[k];
      prevVals[k] = to;
      if (S.hide || reduceMotion() || from === undefined || from === to) return;
      const t0 = performance.now(), D = 750;
      const step = (now) => {
        const p = Math.min(1, (now - t0) / D), e = 1 - Math.pow(1 - p, 4);
        el.textContent = fmt(round2(from + (to - from) * e));
        if (p < 1) requestAnimationFrame(step);
      };
      el.textContent = fmt(from);
      requestAnimationFrame(step);
    });
  }

  // Logo: scale any image to a crisp 512px square (sharp on 3x Retina) with transparent padding
  function readLogo(file) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onerror = reject;
      r.onload = () => {
        const img = new Image();
        img.onerror = reject;
        img.onload = () => {
          const N = 512, c = document.createElement("canvas"); c.width = c.height = N;
          const w0 = img.naturalWidth || N, h0 = img.naturalHeight || N;
          const s = Math.min(N / w0, N / h0) * 0.86, w = w0 * s, h = h0 * s;
          const x = c.getContext("2d"); x.imageSmoothingQuality = "high";
          x.drawImage(img, (N - w) / 2, (N - h) / 2, w, h);
          resolve(c.toDataURL("image/png"));
        };
        img.src = r.result;
      };
      r.readAsDataURL(file);
    });
  }

  // ---------- Brand ----------
  function logoHTML(src) { return src ? `<img src="${src}" alt="">` : DEFAULT_LOGO; }
  function applyColor(c) {
    document.documentElement.style.setProperty("--red", c);
    const m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute("content", c);
  }
  function paintBrand() {
    const L = $("#logo");
    L.innerHTML = logoHTML(S.brand.logo); L.classList.toggle("custom", !!S.brand.logo);
    $("#brandName").textContent = S.brand.name;
    document.title = S.brand.name;
    const t = document.querySelector('meta[name="apple-mobile-web-app-title"]'); if (t) t.setAttribute("content", S.brand.name);
    applyColor(S.brand.color);
    paintHomeIcon();
  }
  // Home Screen icon + name follow the saved logo and app name (read by the phone when you tap "Add to Home Screen")
  let iconKey = null, manifestUrl = null;
  function iconFromLogo(src, n) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement("canvas"); c.width = c.height = n;
        const x = c.getContext("2d"); x.imageSmoothingQuality = "high";
        x.fillStyle = "#FFFFFF"; x.fillRect(0, 0, n, n);
        x.drawImage(img, 0, 0, n, n);
        resolve(c.toDataURL("image/png"));
      };
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }
  async function paintHomeIcon() {
    const key = (S.brand.logo || "default") + "|" + S.brand.name + "|" + S.brand.color;
    if (key === iconKey) return; iconKey = key;
    let i180 = "apple-touch-icon.png", i192 = "icon-192.png", i512 = "icon-512.png";
    if (S.brand.logo) {
      const [a, b, c] = await Promise.all([iconFromLogo(S.brand.logo, 180), iconFromLogo(S.brand.logo, 192), iconFromLogo(S.brand.logo, 512)]);
      if (key !== iconKey) return;
      if (a) { i180 = a; i192 = b; i512 = c; }
    }
    const link = document.querySelector('link[rel="apple-touch-icon"]'); if (link) link.href = i180;
    try {
      const base = location.href.split("#")[0];
      const abs = (u) => u.startsWith("data:") ? u : new URL(u, base).href;
      const m = { name: S.brand.name, short_name: S.brand.name, start_url: base, scope: new URL("./", base).href, display: "standalone",
        background_color: "#FFFFFF", theme_color: S.brand.color,
        icons: [{ src: abs(i192), sizes: "192x192", type: "image/png" }, { src: abs(i512), sizes: "512x512", type: "image/png", purpose: "any maskable" }] };
      if (manifestUrl) URL.revokeObjectURL(manifestUrl);
      manifestUrl = URL.createObjectURL(new Blob([JSON.stringify(m)], { type: "application/manifest+json" }));
      const ml = document.querySelector('link[rel="manifest"]'); if (ml) ml.href = manifestUrl;
    } catch (e) {}
  }

  // ---------- Views ----------
  function creditInfo(a) {
    const limit = Number(a.limit) || 0, owed = Math.max(0, a.balance), avail = round2(Math.max(0, limit - owed));
    const pct = limit ? Math.min(100, Math.round((owed / limit) * 100)) : 0;
    return `<div class="credit-meter" aria-hidden="true"><span style="width:${S.hide ? 0 : pct}%"></span></div>
      <div class="credit-row"><span>Available credit <b>${money(avail)}</b></span><span>Limit ${money(limit)}</span></div>`;
  }
  function cardBlock(a) {
    return `<div class="acct">
      <a class="acct-head" href="#/account/${a.id}">
        <span class="acct-icon">${KINDS.credit[1]}</span>
        <span><div class="acct-name">${esc(a.name)}</div><div class="acct-sub">${esc(a.sub)} · <span class="nw">•••• ${esc(a.last4)}</span></div></span>
        <span class="chev">${I.chev}</span>
      </a>
      <span class="label">Current balance</span>
      <div class="acct-bal" data-key="acct-${a.id}" data-val="${a.balance}">${money(a.balance)}</div>
      ${creditInfo(a)}
      <div class="btn-row">
        <a class="pill soft" href="#/pay?card=${a.id}">Pay card</a>
        <a class="pill" href="#/add?acct=${a.id}">Add entry</a>
      </div>
    </div>`;
  }
  function Home(q) {
    const query = (q || "").trim().toLowerCase();
    const results = query ? S.tx.filter((t) => (t.name + " " + t.cat).toLowerCase().includes(query)) : [];
    view.innerHTML = `
      <label class="search glass">${I.search}<input id="search" type="search" placeholder="Search transactions and payees" value="${esc(q || "")}" autocomplete="off"></label>
      ${query ? `<div class="section-title">Results</div><div class="tx-list">${results.map((t) => txRow(t, true)).join("") || '<div class="empty">No matches</div>'}</div>` : `
      <p class="greet">${greeting()}</p>
      <span class="label">Total in your accounts</span>
      <div class="total" data-key="total" data-val="${total()}">${money(total())}</div>
      <div class="quick">
        <a href="#/transfer"><span class="q-icon">${I.transfer}</span>Transfer</a>
        <a href="#/pay"><span class="q-icon">${I.bill}</span>Pay bill</a>
        <a href="#/add"><span class="q-icon">${I.plus}</span>Add entry</a>
      </div>
      <div class="section-title">DEPOSIT ACCOUNTS</div>
      ${deposits().map((a) => `
        <div class="acct">
          <a class="acct-head" href="#/account/${a.id}">
            <span class="acct-icon">${KINDS[a.kind][1]}</span>
            <span><div class="acct-name">${esc(a.name)}</div><div class="acct-sub">${esc(a.sub)} · <span class="nw">•••• ${esc(a.last4)}</span></div></span>
            <span class="chev">${I.chev}</span>
          </a>
          <span class="label">Available balance</span>
          <div class="acct-bal" data-key="acct-${a.id}" data-val="${a.balance}">${money(a.balance)}</div>
          <div class="btn-row">
            <a class="pill soft" href="#/transfer?from=${a.id}">Transfer</a>
            <a class="pill" href="#/add?acct=${a.id}">Add entry</a>
          </div>
        </div>`).join("")}
      ${cards().length ? `<div class="section-title" style="margin-top:26px">CREDIT CARDS</div>${cards().map(cardBlock).join("")}` : ""}
      ${S.ads.length ? `
      <div class="section-title" style="margin-top:26px">Offers for you</div>
      <div class="offers" id="offers">${S.ads.map((ad) => `
        <article class="offer">
          ${ad.tag ? `<span class="offer-tag">${esc(ad.tag)}</span>` : ""}
          <h3>${esc(ad.title)}</h3>
          <p>${esc(ad.body)}</p>
          ${ad.cta ? `<button class="offer-cta" type="button">${esc(ad.cta)} ${I.chev}</button>` : ""}
        </article>`).join("")}</div>
      ${S.ads.length > 1 ? `<div class="dots" id="dots">${S.ads.map((_, i) => `<span class="${i === 0 ? "on" : ""}"></span>`).join("")}</div>` : '<div style="height:24px"></div>'}` : ""}
      ${S.lending.text ? `
      <div class="section-title">${esc(S.lending.heading || "Lending accounts")}</div>
      <button class="promo" type="button" id="promo"><span class="promo-plus">${I.plus}</span><span>${esc(S.lending.text)}</span></button>` : ""}
      <div class="help-zone">
        <a href="#/help">Help Centre ${I.chev}</a>
        <a href="#/feedback">Provide feedback ${I.chev}</a>
      </div>`}
    `;
    const off = $("#offers");
    if (off) {
      const dots = $$("#dots span");
      off.addEventListener("scroll", () => {
        const step = (off.firstElementChild ? off.firstElementChild.offsetWidth : off.clientWidth) + 12;
        const i = Math.round(off.scrollLeft / step);
        dots.forEach((d, k) => d.classList.toggle("on", k === i));
      }, { passive: true });
      $$(".offer-cta", off).forEach((b) => b.addEventListener("click", () => toast("Offer details coming soon")));
    }
    const pr = $("#promo"); if (pr) pr.addEventListener("click", () => toast("Lending options coming soon"));
    const s = $("#search");
    s.addEventListener("input", () => { const pos = s.selectionStart; Home(s.value); const n = $("#search"); n.focus(); n.setSelectionRange(pos, pos); });
    countUps();
  }

  function Account(id) {
    const a = acct(id);
    if (!a) return go("#/");
    const list = S.tx.filter((t) => t.acct === id);
    view.innerHTML = `${header(a.name)}
      <div class="acct">
        <div class="acct-sub">${esc(a.sub)} · <span class="nw">•••• ${esc(a.last4)}</span></div>
        <span class="label">${isCard(a) ? "Current balance" : "Available balance"}</span>
        <div class="acct-bal" data-key="acct-${a.id}" data-val="${a.balance}">${money(a.balance)}</div>
        ${isCard(a) ? creditInfo(a) : ""}
        <div class="btn-row">
          ${isCard(a) ? `<a class="pill soft" href="#/pay?card=${a.id}">Pay card</a>` : `<a class="pill soft" href="#/transfer?from=${a.id}">Transfer</a>
          <a class="pill" href="#/pay?from=${a.id}">Pay bill</a>`}
          <a class="pill" href="#/add?acct=${a.id}">Add entry</a>
        </div>
      </div>
      <div class="section-title">Transactions</div>
      <div class="tx-list">${list.map((t) => txRow(t)).join("") || '<div class="empty">No transactions yet</div>'}</div>
`;
    countUps();
  }

  function Transfer(params) {
    const dep = deposits();
    if (dep.length < 2) {
      view.innerHTML = header("Transfer") + '<div class="empty">Add a second account under More → Customize to make transfers.</div>';
      return;
    }
    const from = dep.some((a) => a.id === params.get("from")) ? params.get("from") : dep[0].id;
    const to = dep.find((a) => a.id !== from).id;
    view.innerHTML = `${header("Transfer")}
      <div class="field"><label for="amt">Amount</label><input class="amount-input" id="amt" inputmode="decimal" placeholder="$0.00"></div>
      <div class="field"><label for="from">From</label><select id="from">${acctOptions(from, null, dep)}</select></div>
      <div class="field"><label for="to">To</label><select id="to">${acctOptions(to, from, dep)}</select></div>
      <div class="field"><label for="note">Note (optional)</label><input id="note" maxlength="40" placeholder="e.g. Rent savings"></div>
      <div class="err" id="err"></div>
      <button class="pill solid" id="go">Transfer</button>`;
    $("#from").addEventListener("change", (e) => {
      const f = e.target.value, keep = $("#to").value;
      $("#to").innerHTML = acctOptions(keep !== f ? keep : dep.find((a) => a.id !== f).id, f, dep);
    });
    $("#go").addEventListener("click", () => {
      const amt = parseAmt($("#amt").value), f = acct($("#from").value), t = acct($("#to").value);
      if (!(amt > 0)) return fail("Enter an amount greater than $0.");
      if (amt > f.balance) return fail(`That's more than the ${f.name} balance.`);
      f.balance = round2(f.balance - amt); t.balance = round2(t.balance + amt);
      const note = $("#note").value.trim();
      addTx(f.id, note || `Transfer to ${t.name}`, -amt, "Transfer");
      addTx(t.id, note || `Transfer from ${f.name}`, amt, "Transfer");
      save(); toast(`Moved ${fmt(amt)} to ${t.name}`); go("#/");
    });
  }

  function Pay(params) {
    const dep = deposits(), cardSel = params.get("card");
    const from = dep.some((a) => a.id === params.get("from")) ? params.get("from") : dep[0].id;
    const cardOpts = cards().map((c) => `<option value="card:${c.id}" ${c.id === cardSel ? "selected" : ""}>${esc(c.name)} ••${esc(c.last4)}${S.hide ? "" : " — owing " + fmt(c.balance)}</option>`).join("");
    view.innerHTML = `${header(cardSel ? "Pay card" : "Pay bill")}
      <div class="field"><label for="payee">Payee</label><select id="payee">${cardOpts ? `<optgroup label="Your credit cards">${cardOpts}</optgroup><optgroup label="Payees">` : ""}${S.payees.map((p) => `<option ${!cardSel && p === S.payees[0] ? "selected" : ""}>${esc(p)}</option>`).join("")}<option value="__new">+ Add a payee…</option>${cardOpts ? "</optgroup>" : ""}</select></div>
      <div class="field" id="newPayeeWrap" hidden><label for="newPayee">New payee name</label><input id="newPayee" maxlength="40"></div>
      <div class="field"><label for="amt">Amount</label><input class="amount-input" id="amt" inputmode="decimal" placeholder="$0.00"></div>
      <div class="field"><label for="from">From</label><select id="from">${acctOptions(from, null, dep)}</select></div>
      <div class="field"><label for="date">Date</label><input id="date" type="date" value="${today()}"></div>
      <div class="err" id="err"></div>
      <button class="pill solid" id="go">Pay</button>`;
    if (!S.payees.length) $("#newPayeeWrap").hidden = false;
    $("#payee").addEventListener("change", (e) => { $("#newPayeeWrap").hidden = e.target.value !== "__new"; });
    $("#go").addEventListener("click", () => {
      let payee = $("#payee").value;
      if (payee === "__new") {
        payee = $("#newPayee").value.trim();
        if (!payee) return fail("Enter the payee's name.");
      }
      const amt = parseAmt($("#amt").value), f = acct($("#from").value);
      if (!(amt > 0)) return fail("Enter an amount greater than $0.");
      if (amt > f.balance) return fail(`That's more than the ${f.name} balance.`);
      const date = $("#date").value || today();
      if (payee.startsWith("card:")) {
        const c = acct(payee.slice(5));
        f.balance = round2(f.balance - amt);
        addTx(f.id, `${c.name} payment`, -amt, "Payment", date);
        applyAmt(c, amt);
        addTx(c.id, "Payment — thank you", amt, "Payment", date);
        save(); toast(`Paid ${fmt(amt)} to ${c.name}`); return go("#/account/" + c.id);
      }
      if (!S.payees.includes(payee)) S.payees.push(payee);
      f.balance = round2(f.balance - amt);
      addTx(f.id, payee, -amt, "Bill payment", date);
      save(); toast(`Paid ${fmt(amt)} to ${payee}`); go("#/");
    });
  }

  function entryForm(t) {
    const dirIn = t ? t.amount > 0 : false;
    return `
      <div class="seg"><button type="button" data-d="out" class="${dirIn ? "" : "on"}">Money out</button><button type="button" data-d="in" class="${dirIn ? "on" : ""}">Money in</button></div>
      <div class="field"><label for="amt">Amount</label><input class="amount-input" id="amt" inputmode="decimal" placeholder="$0.00" value="${t ? Math.abs(t.amount).toFixed(2) : ""}"></div>
      <div class="field"><label for="name">Description</label><input id="name" maxlength="40" placeholder="e.g. Groceries at Loblaws" value="${t ? esc(t.name) : ""}"></div>
      <div class="field"><label for="cat">Category</label><select id="cat">${catOptions(t ? t.cat : "Groceries")}</select></div>`;
  }
  function wireSeg(onChange) {
    let dir = $(".seg .on").dataset.d;
    $$(".seg button", view).forEach((b) => b.addEventListener("click", () => {
      dir = b.dataset.d;
      $$(".seg button", view).forEach((x) => x.classList.toggle("on", x === b));
      if (onChange) onChange(dir);
    }));
    return () => dir;
  }

  function AddEntry(params) {
    const sel = acct(params.get("acct")) ? params.get("acct") : S.accounts[0].id;
    view.innerHTML = `${header("Add entry")}
      ${entryForm(null)}
      <div class="field"><label for="acct">Account</label><select id="acct">${acctOptions(sel)}</select></div>
      <div class="field"><label for="date">Date</label><input id="date" type="date" value="${today()}"></div>
      <div class="err" id="err"></div>
      <button class="pill solid" id="go">Save entry</button>`;
    const getDir = wireSeg((d) => { $("#cat").value = d === "in" ? "Income" : "Groceries"; });
    $("#go").addEventListener("click", () => {
      const amt = parseAmt($("#amt").value), name = $("#name").value.trim(), a = acct($("#acct").value);
      if (!(amt > 0)) return fail("Enter an amount greater than $0.");
      if (!name) return fail("Add a short description.");
      const signed = getDir() === "in" ? amt : -amt;
      applyAmt(a, signed);
      addTx(a.id, name, signed, $("#cat").value, $("#date").value || today());
      save(); toast("Entry saved"); go("#/account/" + a.id);
    });
  }

  function TxEdit(id) {
    const t = S.tx.find((x) => x.id === Number(id));
    if (!t) return go("#/");
    const a = acct(t.acct);
    view.innerHTML = `${header("Transaction", "#/account/" + t.acct)}
      ${entryForm(t)}
      <div class="field"><label for="date">Date</label><input id="date" type="date" value="${esc(t.date)}"></div>
      <p class="hint">Account: ${esc(a ? a.name : "—")} ••${esc(a ? a.last4 : "")}. The balance updates to match your change.</p>
      <div class="err" id="err"></div>
      <button class="pill solid" id="go">Save changes</button>
      <button class="pill ghost danger" id="del" style="margin-top:12px">Delete transaction</button>`;
    const getDir = wireSeg();
    $("#go").addEventListener("click", () => {
      const amt = parseAmt($("#amt").value), name = $("#name").value.trim();
      if (!(amt > 0)) return fail("Enter an amount greater than $0.");
      if (!name) return fail("Add a short description.");
      const signed = getDir() === "in" ? amt : -amt;
      if (a) applyAmt(a, signed - t.amount);
      Object.assign(t, { name, amount: signed, cat: $("#cat").value, date: $("#date").value || t.date });
      sortTx(); save(); toast("Transaction updated"); go("#/account/" + t.acct);
    });
    $("#del").addEventListener("click", () => {
      if (!confirm(`Delete "${t.name}"? The balance will be adjusted.`)) return;
      if (a) applyAmt(a, -t.amount);
      S.tx = S.tx.filter((x) => x !== t);
      save(); toast("Transaction deleted"); go("#/account/" + t.acct);
    });
  }

  function acctEditor(a) {
    return `<div class="panel acct-ed" data-id="${esc(a.id)}">
      <div class="ed-head"><strong>${esc(a.name || "New account")}</strong><button type="button" class="link-danger" data-del>Remove</button></div>
      <div class="field"><label>Account name</label><input data-f="name" maxlength="24" value="${esc(a.name)}" placeholder="e.g. Savings"></div>
      <div class="field"><label>Description</label><input data-f="sub" maxlength="28" value="${esc(a.sub)}" placeholder="e.g. High-interest savings"></div>
      <div class="grid2">
        <div class="field"><label>Last 4 digits</label><input data-f="last4" inputmode="numeric" maxlength="4" value="${esc(a.last4)}"></div>
        <div class="field"><label>Balance (owed, for cards)</label><input data-f="balance" inputmode="decimal" value="${Number(a.balance).toFixed(2)}"></div>
      </div>
      <div class="field"><label>Credit limit (cards only)</label><input data-f="limit" inputmode="decimal" value="${a.limit ? Number(a.limit).toFixed(2) : ""}" placeholder="e.g. 10000"></div>
      <div class="field"><label>Type</label><select data-f="kind">${Object.entries(KINDS).map(([k, v]) => `<option value="${k}" ${k === a.kind ? "selected" : ""}>${v[0]}</option>`).join("")}</select></div>
    </div>`;
  }

  function adEditor(ad) {
    return `<div class="panel ad-ed acct-ed">
      <div class="ed-head"><strong>${esc(ad.title || "New advertisement")}</strong><button type="button" class="link-danger" data-del-ad>Remove</button></div>
      <div class="field"><label>Label (optional)</label><input data-a="tag" maxlength="16" value="${esc(ad.tag || "")}" placeholder="e.g. New"></div>
      <div class="field"><label>Headline</label><input data-a="title" maxlength="50" value="${esc(ad.title || "")}"></div>
      <div class="field"><label>Text</label><textarea data-a="body" maxlength="160" style="min-height:90px">${esc(ad.body || "")}</textarea></div>
      <div class="field"><label>Button text (optional)</label><input data-a="cta" maxlength="24" value="${esc(ad.cta || "")}" placeholder="e.g. Learn more"></div>
    </div>`;
  }

  function Customize() {
    let logo = S.brand.logo;
    view.innerHTML = `${header("Customize", "#/more")}
      <p class="hint" style="margin-top:0">Change the logo, name, colour, account details and figures. Saved on this device — use Export setup under More to share it with your team.</p>
      <div class="section-title">Logo &amp; name</div>
      <div class="panel">
        <div class="logo-edit">
          <span class="logo xl" id="logoPrev"></span>
          <div class="btn-row">
            <label class="pill soft">Upload logo<input type="file" id="logoFile" accept="image/*" hidden></label>
            <button class="pill" id="logoReset" type="button">Default</button>
          </div>
        </div>
        <button class="pill ghost" id="iconDl" type="button" style="margin-bottom:6px">Download Home Screen icon</button>
        <p class="hint" style="margin:6px 4px 16px">To use this logo as the iPhone Home Screen icon: download the icon, go to github.com/emmddd/corvane-app → Add file → Upload files, upload <b>apple-touch-icon.png</b> and tap Commit changes. Wait a minute, then remove and re-add the app to your Home Screen.</p>
        <div class="field"><label for="bName">App name</label><input id="bName" maxlength="24" value="${esc(S.brand.name)}"></div>
        <div class="field"><label for="bColor">Accent colour</label>
          <div class="color-row">
            <input type="color" id="bColor" value="${S.brand.color}">
            <div class="swatches">${SWATCHES.map((c) => `<button type="button" class="swatch" data-c="${c}" style="background:${c}" aria-label="${c}"></button>`).join("")}</div>
          </div>
        </div>
      </div>
      <div class="section-title">Accounts &amp; figures</div>
      <div id="acctEds">${S.accounts.map(acctEditor).join("")}</div>
      <button class="pill ghost" id="addAcct" type="button">+ Add account</button>
      <div class="section-title" style="margin-top:28px">Advertisements</div>
      <div id="adEds">${S.ads.map(adEditor).join("")}</div>
      <button class="pill ghost" id="addAd" type="button">+ Add advertisement</button>
      <div class="section-title" style="margin-top:28px">Lending promo</div>
      <div class="panel">
        <div class="field"><label for="lHead">Section heading</label><input id="lHead" maxlength="30" value="${esc(S.lending.heading)}"></div>
        <div class="field"><label for="lText">Promo text (leave empty to hide)</label><textarea id="lText" maxlength="160" style="min-height:90px">${esc(S.lending.text)}</textarea></div>
      </div>
      <div class="err" id="err" style="margin-top:16px"></div>
      <button class="pill solid" id="go">Save changes</button>`;

    const prev = $("#logoPrev");
    const paintPrev = () => { prev.innerHTML = logoHTML(logo); prev.classList.toggle("custom", !!logo); };
    const paintSwatches = () => $$(".swatch", view).forEach((s) => s.classList.toggle("on", s.dataset.c.toLowerCase() === $("#bColor").value.toLowerCase()));
    paintPrev(); paintSwatches();

    $("#logoFile").addEventListener("change", async (e) => {
      const f = e.target.files && e.target.files[0]; if (!f) return;
      try { logo = await readLogo(f); paintPrev(); } catch (err) { toast("Couldn't read that image"); }
      e.target.value = "";
    });
    $("#logoReset").addEventListener("click", () => { logo = null; paintPrev(); });
    $("#iconDl").addEventListener("click", async () => {
      if (!logo) return toast("Upload a logo first");
      const url = await iconFromLogo(logo, 512);
      if (!url) return toast("Couldn't make the icon");
      const blob = await (await fetch(url)).blob();
      const u = URL.createObjectURL(blob), a = document.createElement("a");
      a.href = u; a.download = "apple-touch-icon.png";
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 3000);
      toast("Icon downloaded");
    });
    $("#bColor").addEventListener("input", (e) => { applyColor(e.target.value); paintSwatches(); });
    $$(".swatch", view).forEach((s) => s.addEventListener("click", () => { $("#bColor").value = s.dataset.c; applyColor(s.dataset.c); paintSwatches(); }));

    const eds = $("#acctEds");
    eds.addEventListener("click", (e) => {
      if (!e.target.matches("[data-del]")) return;
      if ($$(".acct-ed", eds).length <= 1) return toast("Keep at least one account");
      const others = $$(".acct-ed", eds).filter((x) => x !== e.target.closest(".acct-ed"));
      if (!others.some((x) => x.querySelector('[data-f="kind"]').value !== "credit")) return toast("Keep at least one deposit account");
      e.target.closest(".acct-ed").remove();
    });
    eds.addEventListener("input", (e) => {
      if (e.target.dataset.f === "name") e.target.closest(".acct-ed").querySelector(".ed-head strong").textContent = e.target.value || "New account";
      if (e.target.dataset.f === "last4") e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
    });
    $("#addAcct").addEventListener("click", () => {
      const last4 = String(Math.floor(1000 + Math.random() * 9000));
      eds.insertAdjacentHTML("beforeend", acctEditor({ id: "new-" + Date.now(), name: "", sub: "Account", last4, balance: 0, kind: "savings" }));
      const added = eds.lastElementChild; added.scrollIntoView({ block: "center", behavior: reduceMotion() ? "auto" : "smooth" });
      added.querySelector('[data-f="name"]').focus({ preventScroll: true });
    });

    const adEds = $("#adEds");
    adEds.addEventListener("click", (e) => { if (e.target.matches("[data-del-ad]")) e.target.closest(".ad-ed").remove(); });
    adEds.addEventListener("input", (e) => {
      if (e.target.dataset.a === "title") e.target.closest(".ad-ed").querySelector(".ed-head strong").textContent = e.target.value || "New advertisement";
    });
    $("#addAd").addEventListener("click", () => {
      adEds.insertAdjacentHTML("beforeend", adEditor({ tag: "", title: "", body: "", cta: "Learn more" }));
      const added = adEds.lastElementChild; added.scrollIntoView({ block: "center", behavior: reduceMotion() ? "auto" : "smooth" });
      added.querySelector('[data-a="title"]').focus({ preventScroll: true });
    });

    $("#go").addEventListener("click", () => {
      const ads = [];
      for (const ed of $$(".ad-ed", adEds)) {
        const g = (f) => ed.querySelector(`[data-a="${f}"]`).value.trim();
        if (!g("title") && !g("body")) continue;
        if (!g("title")) return fail("Each advertisement needs a headline.");
        ads.push({ id: "ad" + Date.now() + ads.length, tag: g("tag"), title: g("title"), body: g("body"), cta: g("cta") });
      }
      const name = $("#bName").value.trim();
      if (!name) return fail("The app needs a name.");
      const next = [];
      for (const ed of $$(".acct-ed", eds)) {
        const g = (f) => ed.querySelector(`[data-f="${f}"]`).value.trim();
        const nm = g("name"), l4 = g("last4"), bal = parseSigned(g("balance"));
        if (!nm) return fail("Each account needs a name.");
        if (!/^\d{4}$/.test(l4)) return fail(`${nm}: the last 4 digits must be 4 numbers.`);
        if (isNaN(bal)) return fail(`${nm}: the balance needs a number.`);
        const old = acct(ed.dataset.id);
        const kind = g("kind"), lim = parseAmt(g("limit"));
        if (kind === "credit" && !(lim > 0)) return fail(`${nm}: enter a credit limit.`);
        next.push({ id: old ? old.id : "a" + Date.now() + next.length, name: nm, sub: g("sub") || (kind === "credit" ? "Credit card" : "Account"), last4: l4, balance: bal, kind, ...(kind === "credit" ? { limit: lim } : {}) });
      }
      if (!next.some((a) => a.kind !== "credit")) return fail("Keep at least one deposit account.");
      const keep = new Set(next.map((a) => a.id));
      const backup = JSON.stringify(S);
      S.tx = S.tx.filter((t) => keep.has(t.acct));
      S.accounts = next;
      S.brand = { name, logo, color: $("#bColor").value };
      S.ads = ads;
      S.lending = { heading: $("#lHead").value.trim() || "Lending accounts", text: $("#lText").value.trim() };
      if (!save()) { S = migrate(JSON.parse(backup)); paintBrand(); return fail("Couldn't save — try a smaller logo image."); }
      paintBrand(); toast("Changes saved"); go("#/");
    });
  }

  function Help() {
    view.innerHTML = `${header("Help Centre")}
      <p class="hint" style="margin-top:0">Answers to common questions about using ${esc(S.brand.name)}.</p>
      ${DEFAULT_FAQS.map(([q, a]) => `<details class="faq"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}
      <a class="pill ghost" href="#/feedback" style="margin-top:14px">Still need help? Send us a message</a>`;
  }

  function Feedback() {
    let rating = 0;
    view.innerHTML = `${header("Provide feedback")}
      <p class="hint" style="margin-top:0">Tell us what you think of the app.</p>
      <div class="field"><label>How would you rate it?</label>
        <div class="btn-row" id="stars">${[1, 2, 3, 4, 5].map((n) => `<button type="button" class="pill" data-n="${n}" style="padding:10px 16px">${n}</button>`).join("")}</div></div>
      <div class="field"><label for="fb">Comments</label><textarea id="fb" maxlength="600" placeholder="What's working well? What could be better?"></textarea></div>
      <div class="err" id="err"></div>
      <button class="pill solid" id="go">Send feedback</button>`;
    $$("#stars button", view).forEach((b) => b.addEventListener("click", () => {
      rating = Number(b.dataset.n);
      $$("#stars button", view).forEach((x) => x.classList.toggle("soft", Number(x.dataset.n) <= rating));
    }));
    $("#go").addEventListener("click", () => {
      if (!rating && !$("#fb").value.trim()) return fail("Pick a rating or write a comment.");
      toast("Thanks for your feedback"); go("#/");
    });
  }

  function More() {
    view.innerHTML = `${header("More")}
      <div class="section-title">App</div>
      <div class="menu">
        <button id="hide" type="button">${S.hide ? "Show" : "Hide"} balances</button>
        <a href="#/help"><span>Help Centre</span>${I.chev}</a>
        <a href="#/feedback"><span>Provide feedback</span>${I.chev}</a>
      </div>
      ${editMode ? `
      <div class="section-title" style="margin-top:24px">Edit access</div>
      <div class="menu">
        <a href="#/customize"><span>Customize<div class="sub">Logo, name, colour, accounts, figures, ads</div></span>${I.chev}</a>
        <button id="lock" type="button">Turn off edit access</button>
      </div>
      <div class="section-title" style="margin-top:24px">Team</div>
      <div class="menu">
        <button id="export" type="button"><span>Export setup<div class="sub">Save a file to share with your team</div></span></button>
        <label><span>Import setup<div class="sub">Load a file a teammate exported</div></span><input type="file" id="import" accept="application/json,.json" hidden></label>
      </div>
      <div class="section-title" style="margin-top:24px">Prototype</div>
      <div class="menu"><button id="reset" type="button">Reset sample data</button></div>` : ""}
      <p class="proto-note">Settings are saved on this device.</p>`;
    $("#hide").addEventListener("click", () => { S.hide = !S.hide; save(); paintHide(); More(); });
    if (!editMode) return;
    $("#lock").addEventListener("click", () => { editMode = false; toast("Edit access off"); More(); });
    $("#reset").addEventListener("click", () => {
      if (!confirm("Reset everything, including the logo and name, to the original sample?")) return;
      S = seed(); save(); paintHide(); paintBrand(); toast("Sample data reset"); go("#/");
    });
    $("#export").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(S, null, 2)], { type: "application/json" });
      const u = URL.createObjectURL(blob), a = document.createElement("a");
      a.href = u; a.download = (S.brand.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase() || "app") + "-setup.json";
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 2000);
      toast("Setup exported");
    });
    $("#import").addEventListener("change", (e) => {
      const f = e.target.files && e.target.files[0]; if (!f) return;
      f.text().then((txt) => {
        const data = JSON.parse(txt);
        if (!isValid(data)) throw new Error("bad");
        S = migrate(data); save(); paintHide(); paintBrand(); toast("Setup imported"); go("#/");
      }).catch(() => toast("That file isn't a valid setup"));
      e.target.value = "";
    });
  }

  // ---------- Chrome ----------
  function paintHide() { $("#toggleHide").innerHTML = S.hide ? I.eyeOff : I.eye; }
  $("#toggleHide").addEventListener("click", () => { S.hide = !S.hide; save(); paintHide(); route(false); });

  const TABS = [["#/", "Accounts", I.home], ["#/transfer", "Transfer", I.transfer], ["#/pay", "Pay", I.bill], ["#/more", "More", I.menu]];
  $("#tabbar").innerHTML = '<span class="tab-ind" id="tabInd"></span>' + TABS.map(([h, l, ic]) => `<a href="${h}" draggable="false">${ic}<span>${l}</span></a>`).join("");
  const tabIndex = (p) => p === "/transfer" ? 1 : p === "/pay" ? 2 : (p === "/more" || p === "/customize") ? 3 : 0;
  // ---------- Liquid tab indicator ----------
  // The glass pill stretches as it travels, squashes as it lands, and can be dragged with a finger.
  const tabbar = $("#tabbar"), ind = $("#tabInd");
  let indPos = 0, indAnim = null, dragging = false, dragMoved = false;
  const setInd = (x, sx, sy) => { ind.style.transform = `translateX(${x * 100}%) scale(${sx || 1}, ${sy || 1})`; };
  function moveInd(to, animate) {
    const from = indPos;
    if (from === to && !dragging) return;
    indPos = to;
    if (indAnim) indAnim.cancel();
    if (!animate || reduceMotion() || from === to || !ind.animate) { setInd(to); return; }
    const dist = Math.abs(to - from), stretch = 1 + Math.min(0.55, 0.22 + 0.12 * dist);
    indAnim = ind.animate([
      { transform: `translateX(${from * 100}%) scale(1, 1)` },
      { transform: `translateX(${(from + (to - from) * 0.18) * 100}%) scale(${1 + (stretch - 1) * 0.6}, 0.94)`, offset: 0.16 },
      { transform: `translateX(${(from + (to - from) * 0.62) * 100}%) scale(${stretch}, 0.86)`, offset: 0.48 },
      { transform: `translateX(${(to + (to - from) * 0.04) * 100}%) scale(0.9, 1.1)`, offset: 0.76 },
      { transform: `translateX(${to * 100}%) scale(1.03, 0.98)`, offset: 0.9 },
      { transform: `translateX(${to * 100}%) scale(1, 1)` }
    ], { duration: 560 + 70 * dist, easing: "cubic-bezier(.25,.75,.25,1)" });
    setInd(to);
    tabbar.classList.add("moving");
    indAnim.onfinish = () => tabbar.classList.remove("moving");
  }
  function paintTabs(i, animate) {
    $$("#tabbar a").forEach((a, k) => { a.classList.toggle("on", k === i); a.setAttribute("aria-current", k === i ? "page" : "false"); });
    moveInd(i, animate);
  }
  // Drag the pill across the bar like iOS
  (function enableDrag() {
    let startX = 0, lastX = 0, lastT = 0, slotW = 1;
    const posFromX = (clientX) => {
      const r = tabbar.getBoundingClientRect();
      return Math.max(0, Math.min(TABS.length - 1, (clientX - r.left - 6) / slotW - 0.5));
    };
    tabbar.addEventListener("pointerdown", (e) => {
      slotW = (tabbar.clientWidth - 12) / TABS.length;
      startX = lastX = e.clientX; lastT = e.timeStamp; dragging = true; dragMoved = false;
      tabbar.classList.add("pressing");
    });
    tabbar.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      if (!dragMoved && Math.abs(e.clientX - startX) < 8) return;
      if (!dragMoved) { dragMoved = true; if (indAnim) indAnim.cancel(); try { tabbar.setPointerCapture(e.pointerId); } catch (err) {} }
      const v = (e.clientX - lastX) / Math.max(1, e.timeStamp - lastT); lastX = e.clientX; lastT = e.timeStamp;
      const sx = 1.08 + Math.min(0.35, Math.abs(v) * 0.25);
      indPos = posFromX(e.clientX);
      setInd(indPos, sx, 1.08 - (sx - 1.08) * 0.4);
      const near = Math.round(indPos);
      $$("#tabbar a").forEach((a, k) => a.classList.toggle("on", k === near));
    });
    const end = (e) => {
      if (!dragging) return;
      dragging = false; tabbar.classList.remove("pressing");
      if (!dragMoved) return;
      const i = Math.round(indPos);
      const from = indPos; indPos = from; moveInd(i, true);
      if (TABS[i][0] !== location.hash && !(TABS[i][0] === "#/" && !location.hash)) go(TABS[i][0]);
      setTimeout(() => { dragMoved = false; }, 0);
    };
    tabbar.addEventListener("pointerup", end);
    tabbar.addEventListener("pointercancel", end);
    tabbar.addEventListener("click", (e) => { if (dragMoved) { e.preventDefault(); e.stopPropagation(); } }, true);
  })();

  // Profile picture: one tap opens More; four quick taps toggle full edit access
  let taps = 0, tapTimer = null;
  $("#avatar").addEventListener("click", () => {
    taps++;
    clearTimeout(tapTimer);
    if (taps >= 4) {
      taps = 0;
      editMode = !editMode;
      toast(editMode ? "Edit access on" : "Edit access off");
      go(editMode ? "#/customize" : "#/");
      return;
    }
    tapTimer = setTimeout(() => { if (taps < 4) go("#/more"); taps = 0; }, 450);
  });

  const topbar = $("#topbar");
  window.addEventListener("scroll", () => topbar.classList.toggle("scrolled", window.scrollY > 4), { passive: true });

  // ---------- Router with direction-aware transitions ----------
  const depthOf = (p) => p === "/" ? 0 : (p.startsWith("/tx/") || p === "/customize") ? 2 : 1;
  let cur = { path: null, depth: 0, tab: 0 };
  function go(hash) { if (location.hash === hash) route(); else location.hash = hash; }
  function dispatch(path, params) {
    if (path === "/") return Home();
    if (path.startsWith("/account/")) return Account(decodeURIComponent(path.split("/")[2]));
    if (path.startsWith("/tx/")) return editMode ? TxEdit(path.split("/")[2]) : go("#/");
    if (path === "/transfer") return Transfer(params);
    if (path === "/pay") return Pay(params);
    if (path === "/add") return AddEntry(params);
    if (path === "/more") return More();
    if (path === "/customize") return editMode ? Customize() : go("#/more");
    if (path === "/help") return Help();
    if (path === "/feedback") return Feedback();
    go("#/");
  }
  function route(animate) {
    const raw = location.hash.slice(1) || "/";
    const [path, qs] = raw.split("?");
    const params = new URLSearchParams(qs || "");
    const d = depthOf(path), ti = tabIndex(path);
    let dir = "fade";
    if (cur.path !== null) {
      if (d > cur.depth) dir = "fwd";
      else if (d < cur.depth) dir = "back";
      else if (ti !== cur.tab) dir = ti > cur.tab ? "fwd" : "back";
    }
    const samePage = cur.path === path;
    cur = { path, depth: d, tab: ti };
    document.documentElement.dataset.dir = dir;
    paintTabs(ti, cur.path !== null && animate !== false);
    const render = () => { paintBrand(); if (!samePage) window.scrollTo(0, 0); dispatch(path, params); };
    if (animate === false || reduceMotion() || cur === null) return render();
    if (document.startViewTransition) {
      const vt = document.startViewTransition(render);
      vt.ready.catch(() => {}); vt.finished.catch(() => {});
    } else {
      render();
      view.classList.remove("enter"); void view.offsetWidth; view.classList.add("enter");
    }
  }
  window.addEventListener("hashchange", () => route());
  paintHide();
  paintBrand();
  route(false);

  // ---------- Opening splash: blurred app, logo in the middle, spinner below ----------
  const splash = $("#splash");
  if (splash) {
    const sl = $("#splashLogo");
    sl.innerHTML = logoHTML(S.brand.logo); sl.classList.toggle("custom", !!S.brand.logo);
    const hold = reduceMotion() ? 500 : 1900;
    setTimeout(() => {
      splash.classList.add("hide");
      setTimeout(() => splash.remove(), 700);
    }, hold);
  }
})();
