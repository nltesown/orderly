$(run);

function run() {
  var anim = "wobble";
  var $input = $("#input");
  $(".submit").on("click", function(e) {
    $("#logo")
      .addClass(anim)
      .on(
        "animationend, oAnimationEnd, mozAnimationEnd, webkitAnimationEnd",
        () => {
          $input.val(orderly($input.val()));
          $("#logo").removeClass(anim);
        }
      );
  });
}

function orderly(text) {
  return _(text)
    .thru(d => {
      d = " " + d.trim().replace(/\n/g, "¤") + " ";

      var w = _(d)
        .words(/[^,.;:?! «»"'’\/\(\)¤-]+/g)
        .value();
      var s = _(d)
        .words(/[,.;:?! «»"'’\/\(\)¤-]+/g)
        .value();

      var first = s.shift();

      w = _(w).map(ws =>
        _(ws)
          .thru(w => {
            var first = w[0],
              last = w.length === 1 ? "" : w[w.length - 1];
            return (
              first +
              _(w)
                .drop()
                .dropRight()
                .sort((a, b) => a.localeCompare(b, "fr"))
                .value()
                .join("") +
              last
            );
          })
          .value()
      );

      return (
        first +
        _(w)
          .zip(s)
          .flatten()
          .join("")
          .replace(/¤/g, "\n")
      ).trim();
    })
    .value();
}
