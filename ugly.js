function draw() {
  var names = [
    'Øystein',
    'Kristoffer',
    'William',
    'Vladimir',
    'Reinart',
  ];
  var name = names[Math.floor(Math.random() * names.length)];
  document.getElementById('name').innerHTML = name;
}

(function() {

  window.requestAnimFrame = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
})();

