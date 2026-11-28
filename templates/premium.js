/* =========================================================
   Shared motion helpers for SaaSQube premium 3D templates.
   Needs GSAP + ScrollTrigger (and optionally Lenis) loaded first.
   Everything degrades gracefully: if a library fails to load or the
   visitor prefers reduced motion, content simply shows without motion.
   ========================================================= */
(function () {
  var root = document.documentElement;
  var inFrame = window.self !== window.top;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var P = (window.PREMIUM = { inFrame: inFrame, reduce: reduce, lenis: null });
  P.desktop = window.matchMedia("(min-width: 901px)").matches;
  // Phones and tablets: render 3D at lower resolution and with less geometry to stay within mobile memory limits.
  P.lite = !P.desktop || window.matchMedia("(pointer: coarse)").matches;
  P.dpr = Math.min(window.devicePixelRatio || 1, P.lite ? 1.25 : 1.75);
  // Overridden below when GSAP is available and motion is allowed.
  P.reel = function () { return null; };
  if (inFrame) root.classList.add("in-frame");

  /* ---------- Split text into words / characters ---------- */
  // <h1 data-split="chars"> or data-split="words">. Keeps <em>, <br> and other inline tags.
  function split(el, mode) {
    var nodes = Array.prototype.slice.call(el.childNodes);
    el.textContent = "";
    nodes.forEach(function (n) {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach(function (word) {
          if (!word) return;
          if (/^\s+$/.test(word)) { el.appendChild(document.createTextNode(" ")); return; }
          var w = document.createElement("span");
          w.className = "sw";
          if (mode === "chars") {
            word.split("").forEach(function (c) {
              var ch = document.createElement("span");
              ch.className = "sc";
              ch.textContent = c;
              w.appendChild(ch);
            });
          } else {
            var inner = document.createElement("span");
            inner.className = "sc";
            inner.textContent = word;
            w.appendChild(inner);
          }
          el.appendChild(w);
        });
      } else if (n.nodeType === 1 && n.tagName !== "BR") {
        var clone = n.cloneNode(false);
        clone.textContent = n.textContent;
        split(clone, mode);
        el.appendChild(clone);
      } else {
        el.appendChild(n);
      }
    });
  }
  document.querySelectorAll("[data-split]").forEach(function (el) {
    el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
    split(el, el.dataset.split);
    el.querySelectorAll(".sw").forEach(function (w) { w.setAttribute("aria-hidden", "true"); });
  });

  /* ---------- 3D tilt on hover (pointer devices only) ---------- */
  if (!reduce && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll("[data-tilt]").forEach(function (el) {
      var max = parseFloat(el.dataset.tilt) || 10;
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = "perspective(900px) rotateX(" + (-y * max) + "deg) rotateY(" + (x * max) + "deg) translateZ(0)";
        el.style.setProperty("--gx", (x + 0.5) * 100 + "%");
        el.style.setProperty("--gy", (y + 0.5) * 100 + "%");
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
  }

  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  root.classList.add("motion");

  /* ---------- Smooth scrolling ---------- */
  if (!reduce && !inFrame && window.Lenis) {
    var lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    P.lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -70, duration: 1.4 });
      });
    });
  }

  if (reduce) return;

  /* ---------- Scroll reveals ---------- */
  gsap.utils.toArray("[data-split]").forEach(function (el) {
    if (el.hasAttribute("data-no-auto")) return;
    gsap.from(el.querySelectorAll(".sc"), {
      yPercent: 115, opacity: 0, duration: 1.1, ease: "expo.out",
      stagger: el.dataset.split === "chars" ? 0.025 : 0.06,
      scrollTrigger: { trigger: el, start: "top 88%" }
    });
  });
  gsap.utils.toArray("[data-reveal]").forEach(function (el) {
    gsap.from(el, {
      y: 48, opacity: 0, duration: 1.1, ease: "power3.out",
      delay: parseFloat(el.dataset.delay) || 0,
      scrollTrigger: { trigger: el, start: "top 90%" }
    });
  });
  gsap.utils.toArray("[data-stagger]").forEach(function (group) {
    gsap.from(group.children, {
      y: 60, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.1,
      scrollTrigger: { trigger: group, start: "top 85%" }
    });
  });
  // Clip-path image reveal: <div data-unveil>
  gsap.utils.toArray("[data-unveil]").forEach(function (el) {
    gsap.fromTo(el, { clipPath: "inset(18% 18% 18% 18% round 24px)" }, {
      clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none",
      scrollTrigger: { trigger: el, start: "top 90%", end: "top 25%", scrub: true }
    });
  });
  // Parallax: data-speed="-0.2" (negative = moves up faster)
  gsap.utils.toArray("[data-speed]").forEach(function (el) {
    var s = parseFloat(el.dataset.speed) || 0;
    gsap.fromTo(el, { yPercent: -s * 50 }, {
      yPercent: s * 50, ease: "none",
      scrollTrigger: { trigger: el.parentElement.tagName === "PICTURE" ? el.parentElement.parentElement : el.parentElement, start: "top bottom", end: "bottom top", scrub: true }
    });
  });
  // Scrubbed word-by-word highlight: <p data-scrub-words>
  gsap.utils.toArray("[data-scrub-words]").forEach(function (el) {
    split(el, "words");
    gsap.fromTo(el.querySelectorAll(".sc"), { opacity: 0.14 }, {
      opacity: 1, stagger: 0.08, ease: "none",
      scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true }
    });
  });

  /* ---------- Count-up numbers: <span data-countup="384400" data-prefix="₹" data-suffix=" km" data-decimals="1"> ---------- */
  // The element's text should already hold the final value (shown when motion is off).
  gsap.utils.toArray("[data-countup]").forEach(function (el) {
    var end = parseFloat(el.dataset.countup), dec = +el.dataset.decimals || 0;
    var pre = el.dataset.prefix || "", suf = el.dataset.suffix || "";
    var o = { v: parseFloat(el.dataset.from) || 0 };
    var fmt = function () { el.textContent = pre + o.v.toLocaleString("en-IN", { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf; };
    if (el.hasAttribute("data-scrub")) {
      gsap.to(o, { v: end, ease: "none", onUpdate: fmt,
        scrollTrigger: { trigger: el.dataset.trigger || el, start: el.dataset.start || "top 80%", end: el.dataset.end || "bottom 30%", scrub: true } });
    } else {
      fmt();
      gsap.to(o, { v: end, duration: 2.2, ease: "power2.out", onUpdate: fmt, scrollTrigger: { trigger: el, start: "top 90%" } });
    }
  });

  /* ---------- Self-drawing SVG lines: <path data-draw> (optional data-trigger, data-start, data-end) ---------- */
  gsap.utils.toArray("[data-draw]").forEach(function (el) {
    if (!el.getTotalLength) return;
    var len = el.getTotalLength();
    gsap.fromTo(el, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, ease: "none",
      scrollTrigger: { trigger: el.dataset.trigger || el.ownerSVGElement || el, start: el.dataset.start || "top 80%", end: el.dataset.end || "bottom 40%", scrub: true } });
  });

  /* ---------- Horizontal reel: pinned sideways scroll on desktop, native swipe on phones ---------- */
  P.reel = function (section, track, opts) {
    var sec = typeof section === "string" ? document.querySelector(section) : section;
    var tr = typeof track === "string" ? document.querySelector(track) : track;
    if (!sec || !tr) return null;
    if (!P.desktop) { sec.classList.add("reel-native"); return null; }
    var dist = function () { return Math.max(0, tr.scrollWidth - innerWidth); };
    return gsap.to(tr, { x: function () { return -dist(); }, ease: "none",
      scrollTrigger: { trigger: sec, start: "top top", end: function () { return "+=" + dist(); }, pin: true, scrub: 0.8,
        invalidateOnRefresh: true, refreshPriority: (opts && opts.priority) || 0, onUpdate: opts && opts.onUpdate } });
  };

  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
