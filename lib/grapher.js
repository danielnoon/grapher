class Grapher {
  constructor (width, height, func, options) {
    this.width = width;
    this.height = height;
    this.func = func;
    this.options = options || {};
    this.generateBlankPicture();
    this.header = this.generateHeader(width, height);
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
        .map(() => 1));
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
        return i + (this.width / 2);
        break;
    }
  }
  
  graph(options) {
    Object.assign(this.options, options || {});
    this.picture = this.blank.map((arr) => {
      return arr.slice();
    });
    if (typeof this.func == "function") {
      this.loop(this.func);
    }
    else {
      for (let f of this.func) {
        this.loop(f);
      }
    }
    this.drawAxes();
    return(this.assemble());
  }
  
  loop(func) {
    for (let i = 0; i < this.width; i += 1 / this.height) {
      let value = this.getY(Math.floor(func(this.getX(i))));
      if (value >= 0 && value <= this.height - 1) {
        this.picture[value][Math.floor(i)] = 0;
      }
    }
  }
  
  drawXAxis(i) {
    switch (this.options.x) {
      case "center":
        this.picture[this.height / 2][i] = 0;
        break;
      case "top":
        this.picture[this.height][i] = 0;
        break;
      case "bottom": 
        this.picture[0][i] = 0;
        break;
      default:
        this.picture[this.height / 2][i] = 0;
        break;
    }
  }
  
  drawYAxis(i) {
    switch (this.options.y) {
      case "center":
        this.picture[i][this.width / 2] = 0;
        break;
      case "right":
        this.picture[i][this.width] = 0;
        break;
      case "left": 
        this.picture[i][0] = 0;
        break;
      default:
        this.picture[i][this.width / 2] = 0;
        break;
    }
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
    let reversed = this.picture.reverse();
    let assembled = [];
    for (let i of reversed) {
      assembled = assembled.concat(i);
    }
    return this.options.raw ? assembled : this.header + assembled.join("");
  }
}

module.exports = Grapher;