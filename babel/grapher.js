"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grapher = function () {
  function Grapher(width, height, func, options) {
    _classCallCheck(this, Grapher);

    this.width = width;
    this.height = height;
    this.func = func;
    this.options = options || {};
    this.generateBlankPicture();
    this.header = this.options.color ? "" : this.generateHeader(width, height);
  }

  _createClass(Grapher, [{
    key: "generateHeader",
    value: function generateHeader(w, h) {
      var widthBin = [0, 0, 0, 0, 0, 0, 0, 0];
      var heightBin = [0, 0, 0, 0, 0, 0, 0, 0];
      if (w >= 128) {
        widthBin[0] = 1;
        w -= 128;
      }
      if (w >= 64) {
        widthBin[1] = 1;
        w -= 64;
      }
      if (w >= 32) {
        widthBin[2] = 1;
        w -= 32;
      }
      if (w >= 16) {
        widthBin[3] = 1;
        w -= 16;
      }
      if (w >= 8) {
        widthBin[4] = 1;
        w -= 8;
      }
      if (w >= 4) {
        widthBin[5] = 1;
        w -= 4;
      }
      if (w >= 2) {
        widthBin[6] = 1;
        w -= 2;
      }
      if (w == 1) {
        widthBin[7] = 1;
        w -= 1;
      }
      if (h >= 128) {
        heightBin[0] = 1;
        h -= 128;
      }
      if (h >= 64) {
        heightBin[1] = 1;
        h -= 64;
      }
      if (h >= 32) {
        heightBin[2] = 1;
        h -= 32;
      }
      if (h >= 16) {
        heightBin[3] = 1;
        h -= 16;
      }
      if (h >= 8) {
        heightBin[4] = 1;
        h -= 8;
      }
      if (h >= 4) {
        heightBin[5] = 1;
        h -= 4;
      }
      if (h >= 2) {
        heightBin[6] = 1;
        h -= 2;
      }
      if (h == 1) {
        heightBin[7] = 1;
        h -= 1;
      }
      return widthBin.join("") + heightBin.join("");
    }
  }, {
    key: "generateBlankPicture",
    value: function generateBlankPicture() {
      var _this = this;

      this.blank = [].concat(_toConsumableArray(new Array(this.height))).map(function () {
        return [].concat(_toConsumableArray(new Array(_this.width))).map(function () {
          return _this.options.color ? _this.options.background ? _this.options.background : "ffffff" : 1;
        });
      });
    }
  }, {
    key: "getY",
    value: function getY(oldVal) {
      switch (this.options.x) {
        case "center":
          return oldVal + this.height / 2;
          break;
        case "top":
          return oldVal + this.height;
          break;
        case "bottom":
          return oldVal;
          break;
        default:
          return oldVal + this.height / 2;
          break;
      }
    }
  }, {
    key: "getX",
    value: function getX(i) {
      switch (this.options.y) {
        case "center":
          return i - this.width / 2;
          break;
        case "right":
          return i - this.width;
          break;
        case "left":
          return i;
          break;
        default:
          return i - this.width / 2;
          break;
      }
    }
  }, {
    key: "graph",
    value: function graph(options) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        Object.assign(_this2.options, options || {});
        _this2.picture = _this2.blank.map(function (arr) {
          return arr.slice();
        });
        _this2.drawAxes();
        if (typeof _this2.func == "function") {
          _this2.loop(_this2.func);
        } else {
          var c = 0;
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = _this2.func[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var f = _step.value;

              _this2.loop(f, c);
              c++;
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
        resolve(_this2.assemble());
      });
    }
  }, {
    key: "loop",
    value: function loop(func, num) {
      for (var i = 0; i < this.width; i += 1 / this.height) {
        var value = this.getY(Math.floor(func(this.getX(i))));
        if (value >= 0 && value <= this.height - 1) {
          this.picture[value][Math.floor(i)] = this.options.color ? this.options.colors[num] || this.options.colors[0] || this.options.color : 0;
        }
      }
    }
  }, {
    key: "drawXAxis",
    value: function drawXAxis(i) {
      switch (this.options.x) {
        case "center":
          this.picture[this.height / 2][i] = this.options.color ? "000000" : 0;
          break;
        case "top":
          this.picture[this.height][i] = this.options.color ? "000000" : 0;
          break;
        case "bottom":
          this.picture[0][i] = this.options.color ? "000000" : 0;
          break;
        default:
          this.picture[this.height / 2][i] = this.options.color ? "000000" : 0;
          break;
      }
    }
  }, {
    key: "drawYAxis",
    value: function drawYAxis(i) {
      switch (this.options.y) {
        case "center":
          this.picture[i][this.width / 2] = this.options.color ? "000000" : 0;
          break;
        case "right":
          this.picture[i][this.width] = this.options.color ? "000000" : 0;
          break;
        case "left":
          this.picture[i][0] = this.options.color ? "000000" : 0;
          break;
        default:
          this.picture[i][this.width / 2] = this.options.color ? "000000" : 0;
          break;
      }
    }
  }, {
    key: "drawAxes",
    value: function drawAxes() {
      if (this.options.axes) {
        for (var i = 0; i < this.height; i++) {
          this.drawYAxis(i);
        }
        for (var _i = 0; _i < this.width; _i++) {
          this.drawXAxis(_i);
        }
      }
    }
  }, {
    key: "assemble",
    value: function assemble() {
      var reversed = this.picture.reverse();
      var assembled = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = reversed[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var i = _step2.value;

          assembled = assembled.concat(i);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return this.options.raw ? assembled : this.header + assembled.join("");
    }
  }]);

  return Grapher;
}();

exports.default = Grapher;