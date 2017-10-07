# Code.org Grapher
On 10/2/17, in AP Computer Science Principles, I was supposed to draw a black-and-white picture in [code.org](https://code.org)'s b&w image widget. The format is a two-byte header (one byte representing the width and the other the height), and a stream of bits, each one representing a black or white pixel (0 for black, 1 for white).

#### Example:
```
0000 0011
0000 0101
101010000010010
```
becomes

!["A"](doc/a.png)

## So, What Does This Thing Do?
Basically, it's a library that graphs a function by creating an image compatible with the code.org black-and-white or color image tool. Just pass it a few parameters and it'll spit out a string of binary or hex that you can copy and paste into the widget.

## Usage
You can use the grapher either on Web or Node.js, provided there is support for ES6 and CommonJS imports. The reason it is written that way is because I wanted to use ES6 classes and I wanted to use it in the backend. If people really want ES6 imports, you have full license to change that last line to `export default Grapher;`.

### General Use
Just so I don't have to type things twice, here are the instructions applicable to b&w and color graphs:

1. Install from npm `npm i code.org-grapher`
2. Import the library `let Grapher = require('code.org-grapher');`
3. Instantiate a plot `let parabola = new Grapher(254, 254, Math.pow(x, 2));`
4. Graph the plot `parabola.graph().then(pic => console.log(pic));`
5. (optional) include an `options` object somewhere. There are two places you can put your options: as the fourth parameter of the `Grapher` constructor or as the sole parameter of the `graph` method.

### Black-and-white
By default, all plots are drawn in black-and-white. All you have to do is use the class as shown above. However, you do have some options you can use:

```javascript
let options = {
  y: "center" || "left" || "right",
  x: "center" || "top" || "bottom",
  axes: false || true
}
```

* `options.x`
* `options.y`: tells the grapher where to put the y axis on the plot. It DOES move the graph's center to that location.
* `options.axes`: whether or not to draw the x and y axis

*Note: the default for each property is listed first.*

### Color
**Coming Soon**

## API Reference
**Coming Soon**
