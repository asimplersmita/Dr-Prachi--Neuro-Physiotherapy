/* Dr. Prachi Parkhi — site script
 * TODO before launch: set WA_NUMBER, SITE_URL and replace the demo admin PIN with a real login.
 */
(function(){
  const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const WA_NUMBER = "919800000000"; // placeholder — replace with the doctor's number
  const SITE_URL = "https://www.example.com/"; // TODO: change to the live website address
  const wa = t => "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(t);
  const hello = "Hello Dr. Prachi, I would like to enquire about physiotherapy.";
  document.getElementById("waFloat").href = wa(hello);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) { try { document.getElementById("brainSvg").pauseAnimations(); } catch(e){} }
  function toast(msg){ const t = document.createElement("div"); t.className = "toast"; t.setAttribute("role","status"); t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 2200); }

  /* ---------- mobile menu ---------- */
  const mb = document.getElementById("menuBtn"), mm = document.getElementById("mobileMenu"), mi = document.getElementById("menuIco");
  function setMenu(open){ mm.hidden = !open; mb.setAttribute("aria-expanded", open); mb.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mi.setAttribute("d", open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"); }
  mb.addEventListener("click", () => setMenu(mm.hidden));
  mm.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  addEventListener("resize", () => { if (innerWidth > 1100) setMenu(false); });

  /* ---------- services ---------- */
  const SERVICES = [
    ["Neuro & Balance", [
      ["Neuro Rehabilitation","Stroke, Parkinson's, spinal cord and nerve injuries, and other neurological conditions."],
      ["Balance & Gait Training","Safer, steadier walking and better balance for everyday life."],
      ["Functional Rehabilitation","Practising real tasks: getting up, climbing stairs, self-care."]]],
    ["Bones, Joints & Pain", [
      ["Orthopedic & MSK Rehabilitation","Joint, muscle, back and neck problems, sports injuries and fractures."],
      ["Pain Management","Relief for acute and chronic pain through manual therapy and exercise."],
      ["Post-operative Rehabilitation","Guided recovery after joint replacement, spine and other surgeries."]]],
    ["Every Age & Stage", [
      ["Pediatric Physiotherapy","Play-based therapy for motor milestones, posture and mobility in children."],
      ["Women's Health Physiotherapy","Antenatal and postnatal care, pelvic floor strengthening and posture."],
      ["Geriatric Physiotherapy","Mobility, strength and fall prevention for independent living."]]],
    ["Heart, Lungs & Fitness", [
      ["Cardiorespiratory Physiotherapy","Breathing exercises, chest clearance and endurance for heart and lung conditions."],
      ["Strength & Conditioning","Progressive training to rebuild strength, stamina and confidence."]]]
  ];
  const ALL_SVC = SERVICES.flatMap(g => g[1].map(s => s[0])).concat(["Home Physiotherapy / Online Consultation","Other"]);
  const tabs = document.getElementById("tabs"), panel = document.getElementById("svcPanel");
  let cur = 0;
  tabs.innerHTML = SERVICES.map((g,i) => `<button type="button" role="tab" id="tab${i}" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-i="${i}">${esc(g[0])}</button>`).join("");
  function showTab(i){
    cur = i;
    tabs.querySelectorAll("button").forEach((b,k) => { b.setAttribute("aria-selected", k===i); b.tabIndex = k===i ? 0 : -1; });
    panel.setAttribute("aria-labelledby", "tab"+i);
    const start = SERVICES.slice(0,i).reduce((a,g) => a + g[1].length, 0);
    panel.innerHTML = SERVICES[i][1].map((s,k) => `<article class="svc"><span class="n">${String(start+k+1).padStart(2,"0")} / 12</span><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p><a class="ask" href="#contact" data-svc="${esc(s[0])}">Enquire about this →</a></article>`).join("");
  }
  tabs.addEventListener("click", e => { const b = e.target.closest("button"); if (b) showTab(+b.dataset.i); });
  tabs.addEventListener("keydown", e => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const i = (cur + (e.key === "ArrowRight" ? 1 : -1) + SERVICES.length) % SERVICES.length;
    showTab(i); tabs.children[i].focus();
  });
  showTab(0);
  document.addEventListener("click", e => { const a = e.target.closest("a[data-svc]"); if (a) document.getElementById("eqSvc").value = a.dataset.svc; });

  const opts = ALL_SVC.map(x => `<option>${esc(x)}</option>`).join("");
  document.getElementById("rvSvc").insertAdjacentHTML("beforeend", opts);
  document.getElementById("eqSvc").innerHTML = opts + "<option>Not sure</option>";

  /* ---------- sample photos (drawn placeholders) ---------- */
  function dummy(kind, hx){
    const bg = kind === "before" ? "#DCE5E3" : "#D3EBE4", ink = kind === "before" ? "#5B6D6F" : "#1E6B66";
    const fig = kind === "before"
      ? `<circle cx="140" cy="66" r="17" fill="${ink}"/><path d="M140 86l-4 60-14 62M136 146l12 62" stroke="${ink}" stroke-width="14" stroke-linecap="round" fill="none"/><path d="M139 102l40 18" stroke="${ink}" stroke-width="11" stroke-linecap="round"/><path d="M178 114l4 96M204 114l4 96M176 116h30" stroke="#D9792B" stroke-width="6" stroke-linecap="round" fill="none"/>`
      : `<circle cx="150" cy="58" r="17" fill="${ink}"/><path d="M150 78l-2 64-30 66M148 142l36 62" stroke="${ink}" stroke-width="14" stroke-linecap="round" fill="none"/><path d="M149 96l-30 40M149 96l34 30" stroke="${ink}" stroke-width="11" stroke-linecap="round" fill="none"/>`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 240"><rect width="300" height="240" fill="${bg}"/><circle cx="${hx}" cy="40" r="60" fill="#fff" opacity=".35"/><rect y="210" width="300" height="30" fill="#C4D5D1"/>${fig}<text x="150" y="231" font-family="sans-serif" font-size="12" fill="#56696B" text-anchor="middle">Sample photo</text></svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  /* ---------- reviews data ---------- */
  const RAW = [
    ["R. Kulkarni","Neuro Rehabilitation",5,"2026-09-20","After my father's stroke he couldn't stand without support. After regular home sessions he now walks to the building gate with a stick.",1],
    ["Priya S.","Pediatric Physiotherapy",5,"2026-09-14","Very patient with my daughter and made every session feel like play. Clear improvement in her sitting balance."],
    ["M. Deshpande","Balance & Gait Training",5,"2026-09-08","My mother had two falls last year. After balance training she walks confidently at home and in the society garden.",1],
    ["A. Joshi","Post-operative Rehabilitation",4,"2026-09-02","Recovered well after my knee replacement. Would have liked evening slots, but the sessions were very helpful."],
    ["S. Patil","Neuro Rehabilitation",5,"2026-08-27","Parkinson's had made my steps very small. The cueing exercises helped me walk longer distances without freezing."],
    ["N. Gokhale","Women's Health Physiotherapy",5,"2026-08-21","Postnatal back pain and weak core were troubling me. The exercise plan fit easily into my day with a newborn."],
    ["V. Rao","Functional Rehabilitation",5,"2026-08-15","After a long ICU stay I could not climb stairs. Step by step we worked on it, and now I manage two floors on my own.",1],
    ["K. Bhosale","Geriatric Physiotherapy",4,"2026-08-09","My grandfather is steadier and more confident. Sessions were gentle and he looked forward to them."],
    ["D. Mehta","Pain Management",5,"2026-08-03","Chronic neck pain from desk work is finally under control. Clear explanations and simple stretches that work."],
    ["H. Kulkarni","Neuro Rehabilitation",5,"2026-07-28","Right hand weakness after stroke — now able to hold a cup and write my name again. Very grateful.",1],
    ["P. Nair","Orthopedic & MSK Rehabilitation",5,"2026-07-22","Frozen shoulder that troubled me for months improved within weeks of regular sessions."],
    ["J. Shah","Cardiorespiratory Physiotherapy",4,"2026-07-16","Breathing exercises after my COVID recovery made a real difference to my stamina."],
    ["L. Iyer","Pediatric Physiotherapy",5,"2026-07-10","Our son with cerebral palsy has improved his standing balance. She also taught us how to help at home."],
    ["G. Pawar","Balance & Gait Training",5,"2026-07-04","Vertigo made me afraid to walk alone. After the vestibular exercises I go for my morning walk again.",1],
    ["T. Kale","Strength & Conditioning",5,"2026-06-28","Returned to badminton after an ankle injury with a structured strength plan. No re-injury so far."],
    ["R. Desai","Home Physiotherapy / Online Consultation",5,"2026-06-22","Home visits made it possible for my mother to continue therapy. Punctual and very professional."],
    ["C. Fernandes","Neuro Rehabilitation",4,"2026-06-16","Good progress with walking after my spinal cord injury. Recovery is slow, but every month shows improvement."],
    ["A. Kulkarni","Post-operative Rehabilitation",5,"2026-06-10","Hip replacement recovery went smoothly. Walking without a walker in six weeks.",1],
    ["S. Jadhav","Geriatric Physiotherapy",3,"2026-06-04","Helpful exercises for my father, though scheduling around his routine was sometimes difficult."],
    ["M. Kulkarni","Neuro Rehabilitation",5,"2026-05-29","Bell's palsy recovery — my smile is almost back to normal. Facial exercises were explained very clearly."],
    ["B. Thakur","Pain Management",4,"2026-05-23","Lower back pain much better. I'd have liked a printed exercise sheet, but otherwise excellent."],
    ["E. D'Souza","Women's Health Physiotherapy",5,"2026-05-17","Pelvic floor exercises during pregnancy made a big difference. Felt comfortable and well informed."],
    ["F. Khan","Orthopedic & MSK Rehabilitation",5,"2026-05-11","Tennis elbow gone after years of on-and-off pain. Practical advice for work and home."],
    ["Y. Apte","Functional Rehabilitation",3,"2026-05-05","Progress was slower than I hoped after my fall, but the plan was sensible and I'm improving."],
    ["U. Menon","Neuro Rehabilitation",5,"2026-04-29","After a head injury I struggled with balance and coordination. Today I'm back to cooking and short walks.",1]
  ];
  const SAMPLE = RAW.map((r,i) => { const o = {id:"s"+(i+1), name:r[0], svc:r[1], rating:r[2], date:r[3], text:r[4], sample:true, status:"approved"};
    if (r[5]) { o.before = dummy("before", 40 + (i*37)%220); o.after = dummy("after", 260 - (i*53)%220); } return o; });
  const KEY = "pp_reviews_v4"; // new key: clears earlier test submissions
  let store = [];
  try { store = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch(e) { store = []; }
  function save(){ try { localStorage.setItem(KEY, JSON.stringify(store)); return true; } catch(e) { return false; } }

  const list = document.getElementById("revList"), fSvc = document.getElementById("fSvc"), fSort = document.getElementById("fSort");
  const stars = n => "★★★★★".slice(0,n) + "☆☆☆☆☆".slice(0,5-n);
  const fmt = d => new Date(d + "T00:00:00").toLocaleDateString("en-IN", {day:"numeric", month:"short", year:"numeric"});
  const initials = n => n.split(/\s+/).filter(Boolean).slice(0,2).map(w => w[0].toUpperCase()).join("") || "•";
  const PAGE = 6; let limit = PAGE, rateF = 0;
  const published = () => store.filter(r => r.status === "approved").concat(SAMPLE);

  function photosHTML(r){
    if (!r.before && !r.after) return "";
    const fig = (src, cls, cap) => `<figure class="${cls}"><button type="button" data-zoom="${esc(src)}" data-cap="${cap} · ${esc(r.name)}" aria-label="Enlarge ${cap.toLowerCase()} photo"><img src="${esc(src)}" alt="${cap} photo shared by ${esc(r.name)}" loading="lazy"></button><figcaption>${cap}</figcaption></figure>`;
    if (r.before && r.after) return `<div class="ba">${fig(r.before,"before","Before")}${fig(r.after,"after","After")}</div>`;
    return `<div class="ba">${fig(r.before || r.after, (r.before ? "before" : "after") + " solo", r.before ? "Before" : "After")}</div>`;
  }
  function card(r, extra){
    return `<article class="rev">
      <div class="rev-head">
        <div class="who"><span class="avatar" aria-hidden="true">${esc(initials(r.name))}</span><div><b>${esc(r.name)}</b><small>${fmt(r.date)}</small></div></div>
        <span class="svc-tag">${esc(r.svc)}</span>
      </div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span class="stars" aria-label="${r.rating} out of 5 stars">${stars(r.rating)}</span>${r.sample ? '<span class="tag">Sample</span>' : ''}${r.status === "pending" ? '<span class="tag pending">Pending approval</span>' : ''}</div>
      <p>${esc(r.text)}</p>
      ${photosHTML(r)}
      ${extra || ""}
    </article>`;
  }
  function buildFilter(){
    const all = published(), keep = fSvc.value || "all", counts = {};
    all.forEach(r => counts[r.svc] = (counts[r.svc] || 0) + 1);
    fSvc.innerHTML = `<option value="all">All services (${all.length})</option>` + ALL_SVC.filter(x => counts[x]).map(x => `<option value="${esc(x)}">${esc(x)} (${counts[x]})</option>`).join("");
    fSvc.value = [...fSvc.options].some(o => o.value === keep) ? keep : "all";
  }
  function render(){
    const all = published();
    let rows = fSvc.value === "all" ? all.slice() : all.filter(r => r.svc === fSvc.value);
    if (rateF) rows = rows.filter(r => r.rating === rateF);
    const k = fSort.value, hasP = r => (r.before || r.after) ? 1 : 0;
    rows.sort((a,b) => k === "high" ? b.rating - a.rating || b.date.localeCompare(a.date)
      : k === "low" ? a.rating - b.rating || b.date.localeCompare(a.date)
      : k === "photos" ? hasP(b) - hasP(a) || b.date.localeCompare(a.date)
      : b.date.localeCompare(a.date));
    const shown = rows.slice(0, limit), left = rows.length - shown.length;
    document.getElementById("revShown").innerHTML = rows.length
      ? `Showing ${shown.length} of ${rows.length}${rateF ? ` · ${rateF}★ reviews only <button type="button" class="clear" id="clearRate">Clear</button>` : ""}` : "";
    let body;
    if (matchMedia("(min-width: 861px)").matches && shown.length > 1) {
      const cols = [[],[]], h = [0,0];
      shown.forEach(r => { const w = 1 + ((r.before || r.after) ? 1.6 : 0) + r.text.length / 260; const c = h[0] <= h[1] ? 0 : 1; cols[c].push(r); h[c] += w; });
      body = `<div class="rev-cols">${cols.map(c => `<div class="rev-col">${c.map(r => card(r)).join("")}</div>`).join("")}</div>`;
    } else body = shown.map(r => card(r)).join("");
    list.innerHTML = rows.length ? body +
      ((left > 0 || shown.length > PAGE) ? `<div class="more-row">${left > 0 ? `<button type="button" class="btn-more" id="moreBtn">Show more reviews (${left} left)</button>` : ""}${shown.length > PAGE ? `<button type="button" class="more" id="lessBtn">Show fewer</button>` : ""}</div>` : "")
      : '<div class="empty">No reviews match this filter yet.</div>';
    // summary + star breakdown
    const avg = all.reduce((a,r) => a + r.rating, 0) / all.length;
    document.getElementById("avg").textContent = avg.toFixed(1);
    document.getElementById("avgStars").textContent = stars(Math.round(avg));
    document.getElementById("count").textContent = "from " + all.length + " review" + (all.length === 1 ? "" : "s");
  }
  fSvc.addEventListener("change", () => { limit = PAGE; render(); });
  matchMedia("(min-width: 861px)").addEventListener("change", render);
  fSort.addEventListener("change", () => { limit = PAGE; render(); });
  list.addEventListener("click", e => {
    if (e.target.id === "moreBtn") { limit += PAGE; render(); }
    if (e.target.id === "lessBtn") { limit = PAGE; render(); document.getElementById("reviews").scrollIntoView(); }
  });
  document.getElementById("revShown").addEventListener("click", e => { if (e.target.id === "clearRate") { rateF = 0; limit = PAGE; render(); } });
  buildFilter(); render();

  /* ---------- lightbox ---------- */
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-zoom]"); if (!b) return;
    const lb = document.createElement("div"); lb.className = "lightbox"; lb.setAttribute("role","dialog"); lb.setAttribute("aria-label","Photo");
    lb.innerHTML = `<button type="button">Close</button><div><img src="${b.dataset.zoom}" alt=""><p>${esc(b.dataset.cap)}</p></div>`;
    const close = () => { lb.remove(); b.focus(); };
    lb.addEventListener("click", ev => { if (ev.target === lb || ev.target.tagName === "BUTTON") close(); });
    lb.addEventListener("keydown", ev => { if (ev.key === "Escape") close(); });
    document.body.appendChild(lb); lb.querySelector("button").focus();
  });

  /* ---------- review form ---------- */
  const rf = document.getElementById("reviewForm"), rvText = document.getElementById("rvText"), rvCount = document.getElementById("rvCount");
  const words = {1:"Poor",2:"Fair",3:"Good",4:"Very good",5:"Excellent"};
  rf.addEventListener("change", e => { if (e.target.name === "rating") document.getElementById("rateWord").textContent = words[e.target.value]; });
  rvText.addEventListener("input", () => { rvCount.textContent = rvText.value.length + " / 600"; });

  const pics = {before:null, after:null};
  const rvErr = document.getElementById("rvErr");
  function showErr(m){ rvErr.textContent = m; rvErr.hidden = false; }
  function shrink(file){
    return new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onload = () => { const img = new Image();
        img.onload = () => { const m = 900, s = Math.min(1, m / Math.max(img.width, img.height));
          const c = document.createElement("canvas"); c.width = Math.round(img.width*s); c.height = Math.round(img.height*s);
          c.getContext("2d").drawImage(img, 0, 0, c.width, c.height); res(c.toDataURL("image/jpeg", .78)); };
        img.onerror = rej; img.src = fr.result; };
      fr.onerror = rej; fr.readAsDataURL(file);
    });
  }
  function setupDrop(kind){
    const drop = document.getElementById(kind === "before" ? "dropBefore" : "dropAfter");
    const input = drop.querySelector("input");
    async function take(file){
      if (!file || !file.type.startsWith("image/")) { showErr("Please choose an image file (JPG or PNG)."); return; }
      try { pics[kind] = await shrink(file); rvErr.hidden = true; } catch(e) { showErr("That photo couldn't be read. Try a different one."); return; }
      paint();
    }
    function paint(){
      drop.querySelectorAll("img,.rm,.cap").forEach(n => n.remove());
      if (pics[kind]) {
        drop.insertAdjacentHTML("beforeend", `<img src="${pics[kind]}" alt="${kind} photo preview"><span class="cap">${kind}</span><button type="button" class="rm">Remove</button>`);
        drop.querySelector(".rm").addEventListener("click", ev => { ev.preventDefault(); ev.stopPropagation(); pics[kind] = null; input.value = ""; paint(); });
      }
      document.getElementById("consentRow").hidden = !(pics.before || pics.after);
    }
    drop._paint = paint;
    input.addEventListener("change", () => take(input.files[0]));
    drop.addEventListener("dragover", e => { e.preventDefault(); drop.classList.add("dragover"); });
    drop.addEventListener("dragleave", () => drop.classList.remove("dragover"));
    drop.addEventListener("drop", e => { e.preventDefault(); drop.classList.remove("dragover"); take(e.dataTransfer.files[0]); });
  }
  setupDrop("before"); setupDrop("after");

  rf.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("rvName").value.trim();
    const svc = document.getElementById("rvSvc").value;
    const rating = +(rf.querySelector('input[name=rating]:checked') || {}).value || 0;
    const text = rvText.value.trim();
    const p = [];
    if (!name) p.push("add your name");
    if (!svc) p.push("select the service you received");
    if (!rating) p.push("choose a rating");
    if (text.length < 10) p.push("write a few words of feedback");
    if ((pics.before || pics.after) && !document.getElementById("rvConsent").checked) p.push("tick the photo consent box (or remove the photos)");
    if (p.length) { showErr("Please " + p.join(", ") + "."); return; }
    rvErr.hidden = true;
    const rec = {id:"r" + Date.now(), name, svc, rating, text, date:new Date().toISOString().slice(0,10), status:"pending"};
    if (pics.before) rec.before = pics.before;
    if (pics.after) rec.after = pics.after;
    store.unshift(rec);
    if (!save()) { store.shift(); showErr("The photos are too large to save in this demo. Try smaller photos or remove one."); return; }
    rf.reset(); rvCount.textContent = "0 / 600"; document.getElementById("rateWord").textContent = "";
    pics.before = pics.after = null;
    document.getElementById("dropBefore")._paint(); document.getElementById("dropAfter")._paint();
    document.getElementById("rvOk").hidden = false;
    renderAdmin();
  });

  /* ---------- enquiry ---------- */
  const ef = document.getElementById("enqForm");
  ef.addEventListener("submit", e => {
    e.preventDefault();
    const err = document.getElementById("eqErr");
    const name = ef.eqName.value.trim(), phone = ef.eqPhone.value.replace(/\D/g, "");
    if (!name || phone.length < 10) { err.textContent = !name ? "Please enter a contact name." : "Please enter a 10-digit mobile number."; err.hidden = false; return; }
    err.hidden = true;
    const mode = (ef.querySelector('input[name=mode]:checked') || {}).value;
    const msg = `New enquiry\nName: ${name}\nMobile: ${ef.eqPhone.value}\nService: ${ef.eqSvc.value}\nArea: ${ef.eqArea.value}\nPreferred: ${mode}\n${ef.eqMsg.value}`;
    document.getElementById("eqWa").href = wa(msg);
    document.getElementById("eqOk").hidden = false;
  });

  /* ---------- admin ---------- */
  const admin = document.getElementById("admin"), aList = document.getElementById("aList");
  const PIN = "1234"; let unlocked = false, aTab = "pending";
  document.getElementById("pinForm").addEventListener("submit", e => {
    e.preventDefault();
    if (document.getElementById("pinIn").value === PIN) { unlocked = true; document.getElementById("pinErr").hidden = true; showAdmin(); }
    else document.getElementById("pinErr").hidden = false;
  });
  document.querySelector(".atabs").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return; aTab = b.dataset.t;
    document.querySelectorAll(".atabs button").forEach(x => x.setAttribute("aria-selected", x === b)); renderAdmin();
  });
  function renderAdmin(){
    const pend = store.filter(r => r.status === "pending"), appr = store.filter(r => r.status === "approved");
    document.getElementById("cPending").textContent = pend.length;
    if (!unlocked) return;
    const rows = aTab === "pending" ? pend : appr;
    aList.innerHTML = rows.length ? rows.map(r => card(r, `<div class="acts">${
      aTab === "pending"
        ? `<button class="btn btn-good btn-sm" type="button" data-act="approve" data-id="${r.id}">Approve & publish</button><button class="btn btn-bad btn-sm" type="button" data-act="reject" data-id="${r.id}">Reject</button>`
        : `<button class="btn btn-ghost btn-sm" type="button" data-act="unpublish" data-id="${r.id}">Unpublish</button><button class="btn btn-bad btn-sm" type="button" data-act="reject" data-id="${r.id}">Delete</button>`
    }</div>`)).join("")
      : `<div class="empty">${aTab === "pending" ? "No reviews waiting for approval. New reviews from the form will appear here." : "No approved reviews yet. (The four sample reviews are built into the demo.)"}</div>`;
  }
  aList.addEventListener("click", e => {
    const b = e.target.closest("[data-act]"); if (!b) return;
    const i = store.findIndex(r => r.id === b.dataset.id); if (i < 0) return;
    const act = b.dataset.act;
    if (act === "approve") { store[i].status = "approved"; toast("Review published"); }
    else if (act === "unpublish") { store[i].status = "pending"; toast("Moved back to pending"); }
    else if (act === "reject") {
      if (b.dataset.confirm !== "1") { b.dataset.confirm = "1"; b.textContent = "Tap again to confirm"; return; }
      store.splice(i, 1); toast("Review removed");
    }
    save(); renderAdmin(); buildFilter(); render();
  });
  function showAdmin(){
    document.getElementById("pinForm").hidden = unlocked;
    document.getElementById("adminBody").hidden = !unlocked;
    renderAdmin();
  }

  /* ---------- routes: #review (patient link) and #admin ---------- */
  function route(){
    const h = location.hash.replace("#","");
    const isReview = h === "review", isAdmin = h === "admin";
    document.body.classList.toggle("mode-review", isReview);
    admin.hidden = !isAdmin;
    document.body.style.overflow = isAdmin ? "hidden" : "";
    if (isAdmin) { showAdmin(); admin.scrollTop = 0; if (!unlocked) setTimeout(() => document.getElementById("pinIn").focus(), 50); }
    if (isReview) { scrollTo(0,0); document.getElementById("rvOk").hidden = true; }
    if (!isAdmin && !isReview && ["about","services","reviews","contact"].includes(h)) {
      const el = document.getElementById(h); if (el) requestAnimationFrame(() => el.scrollIntoView());
    }
  }
  addEventListener("hashchange", route);
  route();
})();
