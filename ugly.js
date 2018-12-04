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
  var SwirlNode,
    Tree,
    TreeSwirl,
    height,
    swirls,
    width,
    __bind = function(fn, me) {
      return function() {
        return fn.apply(me, arguments);
      };
    };

  width = 600;
  height = 450;

  swirls = [
    {
      color: 'gold',
      nodes: 300,
      speed: -1,
      radius: 3,
    },
    {
      color: 'green',
      nodes: 200,
      speed: 1,
      radius: 1.5,
    },
    {
      color: 'blue',
      nodes: 80,
      speed: -3,
      radius: 6,
    },
    {
      color: 'green',
      nodes: 250,
      speed: 3,
      radius: 3,
    },
  ];

  Tree = (function() {
    function Tree(w, h, swirls) {
      this.run = __bind(this.run, this);
      var i;
      this.width = w;
      this.height = h;
      this.canvas = document.getElementById('tree');
      this.context = this.canvas.getContext('2d');
      this.canvas.width = w;
      this.canvas.height = h;
      this.swirls = function() {
        var _i, _ref, _results;
        _results = [];
        for (
          i = _i = 0, _ref = swirls.length;
          0 <= _ref ? _i < _ref : _i > _ref;
          i = 0 <= _ref ? ++_i : --_i
        ) {
          _results.push(new TreeSwirl(this, swirls[i], i / swirls.length));
        }
        return _results;
      }.call(this);
      this.run();
    }

    Tree.prototype.run = function(t) {
      if (t == null) {
        t = 0;
      }
      window.requestAnimationFrame(this.run);
      return this.draw(t);
    };

    Tree.prototype.draw = function(t) {
      var s, _i, _j, _len, _len1, _ref, _ref1, _results;
      this.context.clearRect(0, 0, this.width, this.height);
      _ref = this.swirls;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        s = _ref[_i];
        s.drawBack(t);
      }
      _ref1 = this.swirls;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        s = _ref1[_j];
        _results.push(s.drawFront(t));
      }
      return _results;
    };

    return Tree;
  })();

  TreeSwirl = (function() {
    function TreeSwirl(tree, s, offset) {
      var i;
      this.tree = tree;
      this.offset = offset;
      this.color = s.color;
      this.speed = s.speed;
      this.radius = s.radius;
      this.nodes = function() {
        var _i, _ref, _results;
        _results = [];
        for (
          i = _i = 0, _ref = s.nodes;
          0 <= _ref ? _i < _ref : _i > _ref;
          i = 0 <= _ref ? ++_i : --_i
        ) {
          _results.push(new SwirlNode(this, i / s.nodes));
        }
        return _results;
      }.call(this);
    }

    TreeSwirl.prototype.drawBack = function(t) {
      var n, _i, _len, _ref, _results;
      _ref = this.nodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        if (n.inBack(t)) {
          _results.push(n.draw(t));
        }
      }
      return _results;
    };

    TreeSwirl.prototype.drawFront = function(t) {
      var n, _i, _len, _ref, _results;
      _ref = this.nodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        n = _ref[_i];
        if (n.inFront(t)) {
          _results.push(n.draw(t));
        }
      }
      return _results;
    };

    return TreeSwirl;
  })();

  SwirlNode = (function() {
    function SwirlNode(swirl, offset) {
      this.swirl = swirl;
      this.offset = offset;
    }

    SwirlNode.prototype.yPos = function() {
      var d, od;
      d = (this.t / 800) * this.swirl.speed;
      od = d + this.offset * this.swirl.tree.height;
      return (
        (this.swirl.tree.height - (od % this.swirl.tree.height)) %
        this.swirl.tree.height
      );
    };

    SwirlNode.prototype.xDeg = function() {
      return this.yPos() * 5 + 100 * this.swirl.offset;
    };

    SwirlNode.prototype.xRad = function() {
      return (this.xDeg() * Math.PI) / 60;
    };

    SwirlNode.prototype.xPos = function() {
      return (
        (Math.sin(this.xRad()) * this.swirl.tree.width * this.yPos()) /
          this.swirl.tree.height /
          3 +
        this.swirl.tree.width / 2
      );
    };

    SwirlNode.prototype.shade = function() {
      return (Math.cos(this.xRad()) + 1) / 2;
    };

    SwirlNode.prototype.inBack = function(t) {
      this.t = t;
      return Math.cos(this.xRad()) > 0;
    };

    SwirlNode.prototype.inFront = function(t) {
      this.t = t;
      return !this.inBack(t);
    };

    SwirlNode.prototype.draw = function(t) {
      this.t = t - 600;
      this.drawNode(this.swirl.radius * 0.6, this.shade() + 0.9);
      this.t = t - 180;
      this.drawNode(this.swirl.radius * 0.8, this.shade() + 0.4);
      this.t = t;
      return this.drawNode(this.swirl.radius, this.shade());
    };

    SwirlNode.prototype.drawNode = function(size, shade) {
      var c;
      c = this.swirl.tree.context;
      c.beginPath();
      c.arc(this.xPos(), this.yPos(), size, 0, 2 * Math.PI);
      c.fillStyle = this.swirl.color;
      c.fill();
      c.fillStyle = 'rgba(0,0,0,' + shade + ')';
      return c.fill();
    };

    return SwirlNode;
  })();

  new Tree(width, height, swirls);
  document.body.className = new Date().getDay() === 5 ? 'yes' : 'no';
}.call(this));

(function() {
  var b;
  var x = 0,
    y = 0;
  /*var dx = Math.random()*300;
  var dy = Math.random()*300;*/
  var dx = 600;
  var dy = 80;

  function init() {
    b = document.getElementById('santa');
    console.log('started...');
    moveSanta();
  }

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

  function moveSanta() {
    x += (dx - x) * 0.015;
    y += (dy - x) * 0.015;
    b.style.left = x + 'px';
    /*b.style.top = y + "px";*/
    b.style.top = 80 + 'px';
    if (Math.abs(x - dx) < 1) {
      /*    dx = Math.random()*300;
      dy = Math.random()*300;
      x = 10;*/
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

  init();
})();
