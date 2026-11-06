/* Corvane — clickable banking app prototype (sample data, stored on this device only) */
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
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m9 5 7 7-7 7"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="m15 5-7 7 7 7"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M4 10.5 12 4l8 6.5V20H4z"/><path d="M10 20v-5h4v5"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
  };
  const ICONS_BY_KIND = { chequing: I.wallet, savings: I.piggy, other: I.layers };

  // ---------- State ----------
  const KEY = "corvane-proto-v1";
  const today = () => new Date().toISOString().slice(0, 10);
  const daysAgo = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10); };

  function seed() {
    return {
      hide: false,
      accounts: [
        { id: "chq", name: "Chequing", kind: "chequing", sub: "Everyday account", last4: "4821", balance: 3842.17 },
        { id: "oth", name: "Other", kind: "other", sub: "Account", last4: "7390", balance: 12650.00 }
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
        { id: 8, acct: "chq", name: "Transfer to Other", amount: -500.00, date: daysAgo(9), cat: "Transfer" }
      ],
      nextId: 9
    };
  }
  let S;
  try { S = JSON.parse(localStorage.getItem(KEY)) || seed(); } catch (e) { S = seed(); }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

  // ---------- Helpers ----------
  const fmt = (n) => (n < 0 ? "-" : "") + "$" + Math.abs(n).toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const money = (n) => S.hide ? '<span class="hidden-amt">$••••••</span>' : fmt(n);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const acct = (id) => S.accounts.find((a) => a.id === id);
  const total = () => S.accounts.reduce((s, a) => s + a.balance, 0);
  const round2 = (n) => Math.round(n * 100) / 100;
  const prettyDate = (iso) => {
    const d = new Date(iso + "T12:00:00");
    const diff = Math.round((new Date(today() + "T12:00:00") - d) / 864e5);
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    return d.toLocaleDateString("en-CA", { month: "short", day: "numeric" });
  };
  const greeting = () => { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening"; };
  const $ = (sel) => document.querySelector(sel);
  const view = $("#view");

  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2200);
  }
  function addTx(acctId, name, amount, cat, date) {
    S.tx.unshift({ id: S.nextId++, acct: acctId, name, amount: round2(amount), date: date || today(), cat });
  }
  function acctOptions(selected, exclude) {
    return S.accounts.filter((a) => a.id !== exclude).map((a) =>
      `<option value="${a.id}" ${a.id === selected ? "selected" : ""}>${esc(a.name)} ••${a.last4} — ${S.hide ? "hidden" : fmt(a.balance)}</option>`).join("");
  }
  function parseAmt(v) { const n = parseFloat(String(v).replace(/[^0-9.]/g, "")); return isFinite(n) ? round2(n) : NaN; }
  function header(title, backTo) {
    return `<div class="page-title"><a class="back" href="${backTo || "#/"}" aria-label="Back">${I.back}</a><h1>${esc(title)}</h1></div>`;
  }
  function txRow(t, showAcct) {
    const a = acct(t.acct);
    return `<div class="tx"><div class="tx-dot">${esc(t.name.charAt(0).toUpperCase())}</div>
      <div class="tx-main"><div class="tx-name">${esc(t.name)}</div>
      <div class="tx-meta">${prettyDate(t.date)} · ${esc(t.cat)}${showAcct && a ? " · " + esc(a.name) : ""}</div></div>
      <div class="tx-amt ${t.amount > 0 ? "in" : ""}">${S.hide ? "••••" : (t.amount > 0 ? "+" : "") + fmt(t.amount)}</div></div>`;
  }

  // ---------- Views ----------
  function Home(q) {
    const query = (q || "").trim().toLowerCase();
    const results = query ? S.tx.filter((t) => (t.name + " " + t.cat).toLowerCase().includes(query)) : [];
    view.innerHTML = `
      <label class="search">${I.search}<input id="search" type="search" placeholder="Search transactions and payees" value="${esc(q || "")}" autocomplete="off"></label>
      ${query ? `<div class="section-title">Results</div><div class="tx-list">${results.map((t) => txRow(t, true)).join("") || '<div class="empty">No matches</div>'}</div>` : `
      <p class="greet">${greeting()}</p>
      <span class="label">Total in your accounts</span>
      <div class="total">${money(total())}</div>
      <div class="quick">
        <a href="#/transfer"><span class="q-icon" style="color:var(--red)">${I.transfer}</span>Transfer</a>
        <a href="#/pay"><span class="q-icon" style="color:var(--red)">${I.bill}</span>Pay bill</a>
        <a href="#/add"><span class="q-icon" style="color:var(--red)">${I.plus}</span>Add entry</a>
        <a href="#/edit"><span class="q-icon" style="color:var(--red)">${I.pencil}</span>Edit balances</a>
      </div>
      <div class="section-title">Deposit accounts</div>
      ${S.accounts.map((a) => `
        <div class="acct">
          <a class="acct-head" href="#/account/${a.id}">
            <span class="acct-icon" style="color:var(--red)">${ICONS_BY_KIND[a.kind] || I.layers}</span>
            <span><div class="acct-name">${esc(a.name)}</div><div class="acct-sub">${esc(a.sub)} · <span style="white-space:nowrap">•••• ${a.last4}</span></div></span>
            <span class="chev" style="color:var(--muted)">${I.chev}</span>
          </a>
          <span class="label">Available balance</span>
          <div class="acct-bal">${money(a.balance)}</div>
          <div class="btn-row">
            <a class="pill soft" href="#/transfer?from=${a.id}">Transfer</a>
            <a class="pill" href="#/add?acct=${a.id}">Add entry</a>
          </div>
        </div>`).join("")}
      <div class="section-title" style="margin-top:26px">Recent activity</div>
      <div class="tx-list">${S.tx.slice(0, 5).map((t) => txRow(t, true)).join("")}</div>`}
    `;
    const s = $("#search");
    s.addEventListener("input", () => { const pos = s.selectionStart; Home(s.value); const n = $("#search"); n.focus(); n.setSelectionRange(pos, pos); });
  }

  function Account(id) {
    const a = acct(id);
    if (!a) return go("#/");
    const list = S.tx.filter((t) => t.acct === id);
    view.innerHTML = `${header(a.name)}
      <div class="acct">
        <div class="acct-sub">${esc(a.sub)} · •••• ${a.last4}</div>
        <span class="label">Available balance</span>
        <div class="acct-bal">${money(a.balance)}</div>
        <div class="btn-row">
          <a class="pill soft" href="#/transfer?from=${a.id}">Transfer</a>
          <a class="pill" href="#/pay?from=${a.id}">Pay bill</a>
          <a class="pill" href="#/add?acct=${a.id}">Add entry</a>
        </div>
      </div>
      <div class="section-title">Transactions</div>
      <div class="tx-list">${list.map((t) => txRow(t)).join("") || '<div class="empty">No transactions yet</div>'}</div>`;
  }

  function Transfer(params) {
    if (S.accounts.length < 2) {
      view.innerHTML = header("Transfer") + '<div class="empty">Add a second account under More to make transfers.</div>';
      return;
    }
    const from = params.get("from") || S.accounts[0].id;
    const to = S.accounts.find((a) => a.id !== from).id;
    view.innerHTML = `${header("Transfer")}
      <div class="field"><label>Amount</label><input class="amount-input" id="amt" inputmode="decimal" placeholder="$0.00"></div>
      <div class="field"><label>From</label><select id="from">${acctOptions(from)}</select></div>
      <div class="field"><label>To</label><select id="to">${acctOptions(to, from)}</select></div>
      <div class="field"><label>Note (optional)</label><input id="note" maxlength="40" placeholder="e.g. Rent savings"></div>
      <div class="err" id="err"></div>
      <button class="pill solid" id="go">Transfer</button>`;
    $("#from").addEventListener("change", (e) => {
      const f = e.target.value; const keep = $("#to").value;
      $("#to").innerHTML = acctOptions(keep !== f ? keep : S.accounts.find((a) => a.id !== f).id, f);
    });
    $("#go").addEventListener("click", () => {
      const amt = parseAmt($("#amt").value), f = acct($("#from").value), t = acct($("#to").value);
      const err = $("#err");
      if (!(amt > 0)) return (err.textContent = "Enter an amount greater than $0.");
      if (amt > f.balance) return (err.textContent = `That's more than the ${f.name} balance.`);
      f.balance = round2(f.balance - amt); t.balance = round2(t.balance + amt);
      const note = $("#note").value.trim();
      addTx(f.id, note || `Transfer to ${t.name}`, -amt, "Transfer");
      addTx(t.id, note || `Transfer from ${f.name}`, amt, "Transfer");
      save(); toast(`Moved ${fmt(amt)} to ${t.name}`); go("#/");
    });
  }

  function Pay(params) {
    const from = params.get("from") || S.accounts[0].id;
    view.innerHTML = `${header("Pay bill")}
      <div class="field"><label>Payee</label><select id="payee">${S.payees.map((p) => `<option>${esc(p)}</option>`).join("")}<option value="__new">+ Add a payee…</option></select></div>
      <div class="field" id="newPayeeWrap" hidden><label>New payee name</label><input id="newPayee" maxlength="40"></div>
      <div class="field"><label>Amount</label><input class="amount-input" id="amt" inputmode="decimal" placeholder="$0.00"></div>
      <div class="field"><label>From</label><select id="from">${acctOptions(from)}</select></div>
      <div class="field"><label>Date</label><input id="date" type="date" value="${today()}"></div>
      <div class="err" id="err"></div>
      <button class="pill solid" id="go">Pay bill</button>`;
    $("#payee").addEventListener("change", (e) => { $("#newPayeeWrap").hidden = e.target.value !== "__new"; });
    $("#go").addEventListener("click", () => {
      const err = $("#err");
      let payee = $("#payee").value;
      if (payee === "__new") {
        payee = $("#newPayee").value.trim();
        if (!payee) return (err.textContent = "Enter the payee's name.");
        if (!S.payees.includes(payee)) S.payees.push(payee);
      }
      const amt = parseAmt($("#amt").value), f = acct($("#from").value);
      if (!(amt > 0)) return (err.textContent = "Enter an amount greater than $0.");
      if (amt > f.balance) return (err.textContent = `That's more than the ${f.name} balance.`);
      f.balance = round2(f.balance - amt);
      addTx(f.id, payee, -amt, "Bill payment", $("#date").value || today());
      save(); toast(`Paid ${fmt(amt)} to ${payee}`); go("#/");
    });
  }

  function AddEntry(params) {
    const sel = params.get("acct") || S.accounts[0].id;
    let dir = "out";
    view.innerHTML = `${header("Add entry")}
      <div class="seg"><button data-d="out" class="on">Money out</button><button data-d="in">Money in</button></div>
      <div class="field"><label>Amount</label><input class="amount-input" id="amt" inputmode="decimal" placeholder="$0.00"></div>
      <div class="field"><label>Description</label><input id="name" maxlength="40" placeholder="e.g. Groceries at Loblaws"></div>
      <div class="field"><label>Category</label><select id="cat">${["Groceries", "Dining", "Transport", "Shopping", "Bills", "Income", "Other"].map((c) => `<option>${c}</option>`).join("")}</select></div>
      <div class="field"><label>Account</label><select id="acct">${acctOptions(sel)}</select></div>
      <div class="field"><label>Date</label><input id="date" type="date" value="${today()}"></div>
      <div class="err" id="err"></div>
      <button class="pill solid" id="go">Save entry</button>`;
    view.querySelectorAll(".seg button").forEach((b) => b.addEventListener("click", () => {
      dir = b.dataset.d;
      view.querySelectorAll(".seg button").forEach((x) => x.classList.toggle("on", x === b));
      $("#cat").value = dir === "in" ? "Income" : "Groceries";
    }));
    $("#go").addEventListener("click", () => {
      const amt = parseAmt($("#amt").value), name = $("#name").value.trim(), a = acct($("#acct").value);
      const err = $("#err");
      if (!(amt > 0)) return (err.textContent = "Enter an amount greater than $0.");
      if (!name) return (err.textContent = "Add a short description.");
      const signed = dir === "in" ? amt : -amt;
      a.balance = round2(a.balance + signed);
      addTx(a.id, name, signed, $("#cat").value, $("#date").value || today());
      S.tx.sort((x, y) => y.date.localeCompare(x.date) || y.id - x.id);
      save(); toast("Entry saved"); go("#/account/" + a.id);
    });
  }

  function EditBalances() {
    view.innerHTML = `${header("Edit balances")}
      <p class="hint" style="margin-top:0">Set each account's starting balance for this prototype. A balance adjustment is recorded in the account's history.</p>
      ${S.accounts.map((a) => `
        <div class="field"><label>${esc(a.name)} •••• ${a.last4}</label>
        <input data-id="${a.id}" class="bal" inputmode="decimal" value="${a.balance.toFixed(2)}"></div>`).join("")}
      <div class="err" id="err"></div>
      <button class="pill solid" id="go">Save balances</button>`;
    $("#go").addEventListener("click", () => {
      const inputs = [...view.querySelectorAll(".bal")];
      for (const i of inputs) if (isNaN(parseAmt(i.value))) return ($("#err").textContent = "Each balance needs a number.");
      inputs.forEach((i) => {
        const a = acct(i.dataset.id), nb = parseAmt(i.value), diff = round2(nb - a.balance);
        if (diff !== 0) { a.balance = nb; addTx(a.id, "Balance adjustment", diff, "Adjustment"); }
      });
      save(); toast("Balances updated"); go("#/");
    });
  }

  function More() {
    view.innerHTML = `${header("More")}
      <div class="section-title">Accounts</div>
      <div class="menu">
        <button id="addAcct">Add an account <span style="color:var(--muted)">${I.chev.replace("<svg", '<svg width="20" height="20"')}</span></button>
        <button id="hide">${S.hide ? "Show" : "Hide"} balances</button>
      </div>
      <div class="section-title" style="margin-top:24px">Prototype</div>
      <div class="menu">
        <button id="reset">Reset sample data</button>
      </div>
      <p class="proto-note">Corvane prototype · sample data saved on this device only</p>`;
    $("#hide").addEventListener("click", () => { S.hide = !S.hide; save(); paintHide(); More(); });
    $("#reset").addEventListener("click", () => { if (confirm("Reset all sample data?")) { S = seed(); save(); paintHide(); toast("Sample data reset"); go("#/"); } });
    $("#addAcct").addEventListener("click", () => {
      const name = (prompt("Account name (e.g. Savings)") || "").trim();
      if (!name) return;
      const last4 = String(Math.floor(1000 + Math.random() * 9000));
      S.accounts.push({ id: "a" + Date.now(), name, kind: /sav/i.test(name) ? "savings" : "other", sub: /sav/i.test(name) ? "Savings account" : "Account", last4, balance: 0 });
      save(); toast(`${name} added`); go("#/");
    });
  }

  // ---------- Chrome ----------
  function paintHide() { $("#toggleHide").innerHTML = S.hide ? I.eyeOff : I.eye; }
  $("#toggleHide").addEventListener("click", () => { S.hide = !S.hide; save(); paintHide(); route(); });

  function paintTabs(path) {
    const tabs = [["#/", "Accounts", I.home], ["#/transfer", "Transfer", I.transfer], ["#/pay", "Pay", I.bill], ["#/more", "More", I.menu]];
    const active = path === "/" || path.startsWith("/account") || path === "/add" || path === "/edit" ? "#/" : "#" + path;
    $("#tabbar").innerHTML = tabs.map(([h, l, ic]) => `<a href="${h}" class="${h === active ? "on" : ""}">${ic}${l}</a>`).join("");
  }

  function go(hash) { if (location.hash === hash) route(); else location.hash = hash; }
  function route() {
    const raw = location.hash.slice(1) || "/";
    const [path, qs] = raw.split("?");
    const params = new URLSearchParams(qs || "");
    paintTabs(path);
    window.scrollTo(0, 0);
    if (path === "/") return Home();
    if (path.startsWith("/account/")) return Account(path.split("/")[2]);
    if (path === "/transfer") return Transfer(params);
    if (path === "/pay") return Pay(params);
    if (path === "/add") return AddEntry(params);
    if (path === "/edit") return EditBalances();
    if (path === "/more") return More();
    go("#/");
  }
  window.addEventListener("hashchange", route);
  paintHide();
  route();
})();
