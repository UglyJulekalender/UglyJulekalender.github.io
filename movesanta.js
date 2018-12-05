(function() {
    var b;
    var x = 0,
      y = 0;
    var dx = 600;
    var dy = 80;
    b = document.getElementById('santa');
    function moveSanta() {
      
      x += (dx - x) * 0.075;
      y += (dy - x) * 0.075;
      b.style.left = x + 'px';
      b.style.top = 280 + 'px';
      if (Math.abs(x - dx) < 1) {
        if (dx > 10) {
          b.style.transform = 'scaleX(-1)';
          dx = 10;
        } else {
          b.style.transform = 'scaleX(1)';
          dx = document.documentElement.clientWidth - 360;
        }
      }
      requestAnimFrame(moveSanta, b);
    }
    moveSanta();
})();
