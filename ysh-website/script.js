// ---- CONFIG: the only two things to edit before launch ----
const CONFIG = {
  email: "",      // e.g. "hello@yourdomain.com"
  formspree: ""   // the ID from your Formspree form URL, e.g. "xyzabcde"
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

$("#yr").textContent = new Date().getFullYear();

// Email links: filled from CONFIG; hidden in the footer until set
$$("[data-email]").forEach(a => {
  const t = $(".t", a);
  if (CONFIG.email) { a.href = "mailto:" + CONFIG.email; if (t) t.textContent = CONFIG.email; }
  else if (a.closest("footer")) a.parentElement.hidden = true;
});

// Header border on scroll
const hd = $("header");
const onScroll = () => hd.classList.toggle("s", scrollY > 8);
addEventListener("scroll", onScroll, { passive: true }); onScroll();

// Mobile menu
const nav = $("#nav"), mb = $(".menu");
const setMenu = o => { nav.classList.toggle("open", o); mb.setAttribute("aria-expanded", o); mb.textContent = o ? "Close" : "Menu"; };
mb.onclick = () => { const o = !nav.classList.contains("open"); setMenu(o); if (o) $("a", nav).focus(); };
nav.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
addEventListener("keydown", e => { if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); mb.focus(); } });

// Reveal on scroll
const rv = $$(".rv");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
  rv.forEach(n => io.observe(n));
} else rv.forEach(n => n.classList.add("in"));

// Service buttons preselect the form
$$("[data-service]").forEach(a => a.addEventListener("click", () => { $("#service").value = a.dataset.service; }));

// Inquiry form (Formspree)
const f = $("#form"), st = $("#st"), btn = $("button", f);
const say = (m, c = "") => { st.textContent = m; st.className = c; };
f.addEventListener("submit", async e => {
  e.preventDefault();
  if ($("[name=_gotcha]", f).value) return;
  if (!CONFIG.formspree) { say("This form isn't connected yet. Please message us on Telegram or Instagram instead.", "err"); return; }
  btn.disabled = true; say("Sending…");
  try {
    const r = await fetch("https://formspree.io/f/" + CONFIG.formspree, { method: "POST", body: new FormData(f), headers: { Accept: "application/json" } });
    if (r.ok) { f.reset(); say("Thank you. Your inquiry has been sent, and we'll reply by email.", "ok"); }
    else {
      const d = await r.json().catch(() => ({}));
      say((d.errors && d.errors.map(x => x.message).join(", ")) || "Something went wrong. Please try again or message us on Telegram.", "err");
    }
  } catch { say("Network error. Please try again or message us on Telegram.", "err"); }
  btn.disabled = false;
});

// ---- v2: cinematic motion ----
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
let wi = 0;
const split = el => {
  wi = 0;
  const walk = n => [...n.childNodes].forEach(c => {
    if (c.nodeType === 3) {
      const f = document.createDocumentFragment();
      c.textContent.split(/(\s+)/).forEach(t => {
        if (!t) return;
        if (!t.trim()) { f.append(t); return; }
        const w = document.createElement("span"), i = document.createElement("span");
        w.className = "w"; i.textContent = t; i.style.setProperty("--i", wi++); w.append(i); f.append(w);
      });
      c.replaceWith(f);
    } else if (c.nodeType === 1) walk(c);
  });
  walk(el); el.classList.add("split");
};
const heads = $$("h1,h2");
if (!calm) heads.forEach(split); else heads.forEach(h => h.classList.add("in"));
$("h1").style.setProperty("--b", ".75s");
$$(".hero .rv").forEach((n, i) => { if (!n.classList.contains("split")) n.style.transitionDelay = (1 + i * .1) + "s"; });
if ("IntersectionObserver" in window) {
  const io2 = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io2.unobserve(e.target); } }), { threshold: .2 });
  $$(".split").forEach(n => io2.observe(n));
} else $$(".split").forEach(n => n.classList.add("in"));

// Scroll progress + portrait parallax (one rAF-throttled handler)
const prog = $(".prog"); let tick = false;
const frame = () => {
  tick = false;
  const max = document.documentElement.scrollHeight - innerHeight;
  prog.style.transform = "scaleX(" + (max > 0 ? scrollY / max : 0) + ")";
  const im = $(".portrait img");
  if (im && !calm) { const r = im.parentElement.getBoundingClientRect(); im.style.transform = "scale(1.12) translateY(" + ((r.top / innerHeight - .5) * -28).toFixed(1) + "px)"; }
};
addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(frame); } }, { passive: true });
frame();
