class Grapher {
  constructor (width, height, func, options) {
    this.width = width;
    this.height = height;
    this.func = func;
    this.options = options || {};
    this.generateBlankPicture();
    this.header = this.options.color ? "" : this.generateHeader(width, height);
  }
  
  generateHeader(w, h) {
    let widthBin = [0, 0, 0, 0, 0, 0, 0, 0];
    let heightBin = [0, 0, 0, 0, 0, 0, 0, 0];
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
  
  generateBlankPicture() {
    this.blank = [...new Array(this.height)]
      .map(() => [...new Array(this.width)]
        .map(() => this.options.color ? (this.options.background ? this.options.background : "ffffff") : 1));
  }
  
  getY(oldVal) {
    switch (this.options.x) {
      case "center":
        return oldVal + (this.height / 2);
        break;
      case "top":
        return oldVal + this.height;
        break;
      case "bottom": 
        return oldVal;
        break;
      default:
        return oldVal + (this.height / 2);
        break;
    }
  }
  
  getX(i) {
    switch (this.options.y) {
      case "center":
        return i - (this.width / 2);
        break;
      case "right":
        return i - this.width;
        break;
      case "left": 
        return i;
        break;
      default:
        return i - (this.width / 2);
        break;
    }
  }

  newPic() {
    this.picture = this.blank.map((arr) => {
      return arr.slice();
    });
  }
  
  graph(options) {
    return new Promise((resolve, reject) => {
      Object.assign(this.options, options || {});
      this.newPic();
      this.drawAxes();
      if (typeof this.func == "function") {
        this.loop(this.func);
      }
      else {
        let c = 0;
        for (let f of this.func) {
          this.loop(f, c);
          c++;
        }
      }
      resolve(this.assemble());
    })
  }
  
  loop(func, num) {
    for (let i = 0; i < this.width; i += 1 / this.height) {
      let value = this.getY(Math.floor(func(this.getX(i))));
      if (value >= 0 && value <= this.height - 1) {
        this.picture[value][Math.floor(i)] = this.options.color ? this.options.colors[num] || this.options.colors[0] || this.options.color : 0;
      }
    }
  }
  
  drawXAxis(i) {
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
  
  drawYAxis(i) {
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

  hline(y, x_1, x_2) {
    if (!this.picture) return false;
    let max = x_1 < x_2 ? x_2 : x_1;
    let min = x_1 > x_2 ? x_2 : x_1;
    for (let i = min; i <= max; i++) {
      if (y < this.height && y >= 0 && i >= 0 && i < this.width) {
        this.picture[y][i] = this.options.color ? "000000" : 0;
      }  
    } 
  }

  vline(x, y_1, y_2) {
    if (!this.picture) return false;
    let max = y_1 < y_2 ? y_2 : y_1;
    let min = y_1 > y_2 ? y_2 : y_1;
    for (let i = min; i <= max; i++) {
      if (i < this.height && i >= 0 && x >= 0 && x < this.width) {
        this.picture[i][x] = this.options.color ? "000000" : 0;
      }  
    } 
  }

  line(one, two) {
    let min = two[0] < one[0];
    let height = two[1] - one[1];
    let width = two[0] - one[0];
    for (let i = 0; i <= width; i++) {
      
    }
  }

  getXOrig(i) {
    switch (this.options.y) {
      case "center":
        return i + (this.width / 2);
        break;
      case "right":
        return i + this.width;
        break;
      case "left":
        return i;
        break;
      default:
        return i + (this.width / 2);
        break;
    }
  }

  getLeftRect(i, r) {
    let bl = [this.getXOrig(Math.floor(i)), this.getY(0)];
    let br = [this.getXOrig(Math.floor(i + r.width)), this.getY(0)];
    let tl = [this.getXOrig(Math.floor(i)), this.getY(Math.floor(this.func(i)))];
    let tr = [this.getXOrig(Math.floor(i + r.width)), this.getY(Math.floor(this.func(i)))];
    return {
      bl: bl,
      br: br,
      tl: tl,
      tr: tr
    }
  }

  getRightRect(i, r) {
    let bl = [this.getXOrig(Math.floor(i)), this.getY(0)];
    let br = [this.getXOrig(Math.floor(i + r.width)), this.getY(0)];
    let tl = [this.getXOrig(Math.floor(i)), this.getY(Math.floor(this.func(i + r.width)))];
    let tr = [this.getXOrig(Math.floor(i + r.width)), this.getY(Math.floor(this.func(i + r.width)))];
    return {
      bl: bl,
      br: br,
      tl: tl,
      tr: tr
    }
  }

  drawRiemann(from, to, parts, rl) {
    let r = this.getRiemannData(from, to, parts, rl);
    console.log(r);
    for (let i = r.start; i <= r.end; i += r.width) {
      let rec = rl == "left" ? this.getLeftRect(i, r) : this.getRightRect(i, r);
      console.log(rec.bl, rec.br, rec.tl, rec.tr);
      this.hline(rec.bl[1], rec.bl[0], rec.br[0]);
      this.hline(rec.tl[1], rec.tl[0], rec.tr[0]);
      this.vline(rec.tl[0], rec.tl[1], rec.bl[1]);
      this.vline(rec.tr[0], rec.br[1], rec.tr[1]);
    }
  }

  getRiemannData(from, to, parts, rl) {
    return {
      width: (to - from) / parts,
      start: rl == "left" ? from : from + 1,
      end: rl == "left" ? to - 1 : to
    }
  }

  riemann(from, to, parts, rl) {
    let sum = 0;
    let r = this.getRiemannData(from, to, parts, rl);
    for (let j = r.start; j <= r.end; j += r.width) {
      sum += this.func(j) * r.width;
    }
    return sum;
  }
  
  drawAxes() {
    if (this.options.axes) {
      for (let i = 0; i < this.height; i++) {
        this.drawYAxis(i);
      }
      for (let i = 0; i < this.width; i++) {
        this.drawXAxis(i);
      }
    }
  }
  
  assemble() {
    let reversed = this.picture.slice().reverse();
    let assembled = [];
    for (let i of reversed) {
      assembled = assembled.concat(i);
    }
    return this.options.raw ? assembled : this.header + assembled.join("");
  }
}

export default Grapher;
