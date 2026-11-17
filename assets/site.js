// Sections and cards rise into place the first time they scroll into view. Without JavaScript, or with reduced
// motion, everything is simply visible.
(function () {
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var items = document.querySelectorAll(".section-head, .feature, .tile, .step, .facts, .cta, .about .copy");
  if (!items.length) return;
  document.documentElement.classList.add("reveal-on");
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px" });
  for (var i = 0; i < items.length; i++) {
    var r = items[i].getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92) items[i].classList.add("in"); else io.observe(items[i]);
  }
})();
