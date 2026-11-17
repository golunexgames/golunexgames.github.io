// Legal pages (privacy, terms, delete-data): one language at a time, an "on this page" list built from the headings,
// the game's icon and links to its other documents. Without JavaScript the page stays as written: both languages,
// one after the other.
(function () {
  var doc = document.documentElement, en = document.getElementById("en"), tr = document.getElementById("tr");
  if (!en || !tr) return;
  var T = {
    en: { toc: "On this page", top: "Back to top", game: "The game", privacy: "Privacy", terms: "Terms", del: "Delete your data" },
    tr: { toc: "Bu sayfada", top: "Başa dön", game: "Oyun", privacy: "Gizlilik", terms: "Koşullar", del: "Verilerini sil" }
  };
  var m = location.pathname.match(/^\/(twicetold|wiserio)\/(privacy|terms|delete-data)\//);
  var game = m ? m[1] : null, page = m ? m[2] : null;

  function langFromHash() {
    var h = location.hash.slice(1);
    if (h === "tr" || h.indexOf("tr-") === 0) return "tr";
    if (h === "en" || h.indexOf("en-") === 0) return "en";
    return null;
  }
  function saved() { try { return localStorage.getItem("golunex-lang"); } catch (e) { return null; } }
  function setLang(lang, remember) {
    doc.setAttribute("data-lang", lang); doc.lang = lang;
    if (remember) try { localStorage.setItem("golunex-lang", lang); } catch (e) {}
    var links = document.querySelectorAll(".lang-switch a");
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute("href") === "#" + lang) links[i].setAttribute("aria-current", "true"); else links[i].removeAttribute("aria-current");
    }
  }

  [["en", en], ["tr", tr]].forEach(function (pair) {
    var lang = pair[0], art = pair[1], t = T[lang];
    // the game's icon beside the title
    var h1 = art.querySelector("h1");
    if (game && h1) {
      var head = document.createElement("div"); head.className = "doc-head";
      var img = document.createElement("img"); img.src = "/assets/" + game + "-icon.png"; img.alt = ""; img.width = 64; img.height = 64; img.className = "doc-icon";
      var box = document.createElement("div");
      var eyebrow = art.querySelector(".eyebrow");
      h1.parentNode.insertBefore(head, eyebrow || h1);
      if (eyebrow) box.appendChild(eyebrow);
      box.appendChild(h1); head.appendChild(img); head.appendChild(box);
    }
    // links to the game's other documents
    var sw = art.querySelector(".lang-switch");
    if (game && sw) {
      var nav = document.createElement("nav"); nav.className = "doc-links"; nav.setAttribute("aria-label", t.game);
      [["", t.game], ["privacy/", t.privacy], ["terms/", t.terms], ["delete-data/", t.del]].forEach(function (d) {
        var a = document.createElement("a"); a.href = "/" + game + "/" + d[0] + (lang === "tr" && d[0] ? "#tr" : ""); a.textContent = d[1];
        if (d[0] === page + "/") a.setAttribute("aria-current", "page");
        nav.appendChild(a);
      });
      var bar = document.createElement("div"); bar.className = "doc-bar";
      sw.parentNode.insertBefore(bar, sw); bar.appendChild(nav); bar.appendChild(sw);
    }
    // "on this page"
    var hs = art.querySelectorAll("h2");
    if (hs.length >= 3) {
      var toc = document.createElement("nav"); toc.className = "toc"; toc.setAttribute("aria-label", t.toc);
      var det = document.createElement("details"), sum = document.createElement("summary"), ol = document.createElement("ol");
      sum.textContent = t.toc; det.appendChild(sum); det.appendChild(ol); toc.appendChild(det);
      if (window.matchMedia("(min-width: 1240px)").matches) det.open = true;
      for (var i = 0; i < hs.length; i++) {
        hs[i].id = lang + "-s" + (i + 1);
        var li = document.createElement("li"), a2 = document.createElement("a");
        a2.href = "#" + hs[i].id; a2.textContent = hs[i].textContent.replace(/^\d+\.\s*/, "");
        li.appendChild(a2); ol.appendChild(li);
      }
      var after = art.querySelector(".doc-bar") || art.querySelector(".lang-switch") || h1;
      after.parentNode.insertBefore(toc, after.nextSibling);
      // highlight the section being read
      if ("IntersectionObserver" in window) {
        var links = ol.querySelectorAll("a");
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (!e.isIntersecting) return;
            for (var k = 0; k < links.length; k++) links[k].classList.toggle("on", links[k].getAttribute("href") === "#" + e.target.id);
          });
        }, { rootMargin: "-20% 0px -70% 0px" });
        for (var j = 0; j < hs.length; j++) io.observe(hs[j]);
      }
    }
    var top = document.createElement("p"); top.className = "to-top";
    var ta = document.createElement("a"); ta.href = "#" + lang; ta.textContent = "↑ " + t.top; top.appendChild(ta); art.appendChild(top);
  });

  setLang(langFromHash() || saved() || ((navigator.language || "").toLowerCase().indexOf("tr") === 0 ? "tr" : "en"), false);
  window.addEventListener("hashchange", function () { var l = langFromHash(); if (l) setLang(l, true); });
  var sws = document.querySelectorAll(".lang-switch a");
  for (var i = 0; i < sws.length; i++) sws[i].addEventListener("click", function (e) {
    e.preventDefault(); var l = this.getAttribute("href").slice(1); setLang(l, true);
    history.replaceState(null, "", "#" + l); window.scrollTo(0, 0);
  });
  // a link straight to a section of the hidden language's article has to be scrolled to once that article is shown
  if (location.hash.length > 3) { var el = document.getElementById(location.hash.slice(1)); if (el) el.scrollIntoView(); }
  else if (location.hash) window.scrollTo(0, 0); // "#tr" / "#en": the top of that language, not wherever the anchor was before the page was arranged
})();
