(function () {
  var walker = document.querySelector(".walker");
  var stage = document.querySelector(".stage");
  var button = document.querySelector(".menu");
  var nav = document.querySelector(".nav");
  var poses = ["lie", "stand", "climb"];
  var index = 1;

  if (button && nav) {
    button.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      button.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
      }
    });
  }

  function place() {
    if (!walker || !stage) return;
    var pose = poses[index];
    var anchor = stage.querySelector('[data-anchor="' + pose + '"]');
    if (!anchor) return;
    var stageBox = stage.getBoundingClientRect();
    var anchorBox = anchor.getBoundingClientRect();
    var x = anchorBox.left - stageBox.left - walker.offsetWidth / 2;
    var y = anchorBox.top - stageBox.top - walker.offsetHeight + 8;
    if (pose === "climb") {
      y = anchorBox.top - stageBox.top;
    }
    walker.dataset.pose = pose;
    walker.style.transform = "translate(" + Math.round(x) + "px, " + Math.round(y) + "px)";
  }

  function next() {
    index = (index + 1) % poses.length;
    place();
  }

  place();
  window.addEventListener("resize", place);

  var motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!motion.matches) {
    window.setInterval(next, 2800);
  }
})();
