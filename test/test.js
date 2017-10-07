const Grapher = require("../lib/grapher");


let parabola = new Grapher(254, 254, x => 2 * x * x + 3 * x);
let line = new Grapher(254, 254, x => .5 * x, { axes: true });
let sin = new Grapher(254, 254, x => 10 * Math.sin(x / 10), { x: "center", y: "center", axes: true });

let multi = new Grapher(254, 254,
  [
    x => .25 * x * x,
    x => 10 * Math.sqrt(x),
    x => Math.abs(x),
    x => 10 * Math.sin(Math.cos(x / 10))
  ],
  { axes: true, x: "center", y: "center", color: true, colors: ["ff0000", "00ff00", "0000ff", "ff00ff"] }
);

multi.graph().then(picture => console.log(picture));
