const numPoints = 10000;
let data = [];
const width = 700;
const height = 350;

const x = d3.scaleLinear().domain([0, 1]);
const y = d3.scaleLinear().domain([0, 1]);
const generateData = () => {
  const dataCount = 10000;
  let a = generateArray(1000, 10);
  data = d3.range(0, dataCount).map((_, i) => ({
    x: a[i].x,
    y: a[i].y,
    data: "node-" + i,
  }));
};
const boxHeight = 300;
const svg = d3.create('svg').attr('viewBox', [0, 0, width, boxHeight]);
const webglSeries = fc
  .seriesWebglPoint()
  .type(svg)
  .size(64)
//   .
//   .decorate(program => {

//     console.log(program.pixelRatio(2))

//   })
//   .crossValue((d) => d.x)
//   .mainValue((d) => d.y);

const canvasSeries = fc
  .seriesCanvasPoint()
  .crossValue((d) => d.x)
  .mainValue((d) => d.y);

const zoom = fc.zoom().on("zoom", function (a) {
  render();
});

const chart = fc
  .chartCartesian(x, y)
  .canvasPlotArea(null)
  .webglPlotArea(webglSeries)
  .decorate((sel) => {
    sel.textAlign = "center";
    sel.fillStyle = "#333";
    sel.font = "15px Arial";
    // sel.fillText(d3.format('.3f')(sel), 0, -10);
    // reset the fill style for the point rendering
    sel.fillStyle = "#999";
    sel.enter().call(zoom, x, y);
    console.log(sel.enter())
  });
const render = () => {
  d3.select("#chart").datum(data).call(chart);
  console.log(d3.select("#chart").datum(data).call(chart));
};
generateData();
render();

d3.select("#chart-type").on("change", () => {
  const chartType = d3.select("#chart-type").property("value");

  chart
    .canvasPlotArea(chartType === "canvas" ? canvasSeries : null)
    .webglPlotArea(chartType === "webgl" ? webglSeries : null);

  x.domain([0, 1]);
  y.domain([0, 1]);

  render();
});

const canvas = d3.select("d3fc-canvas canvas").node();
const context = canvas.getContext("webgl");
const ext = context.getExtension("WEBGL_lose_context");

d3.select("#lose-context").on("click", () => {
  ext.loseContext();
});
d3.select("#restore-context").on("click", () => {
  ext.restoreContext();
});

function generateArray(numRows, numCols) {
  let arr = [];
  let x = 0;
  let y = 0;
  for (let i = 0; i < numRows * numCols; i++) {
    arr.push({ x: x, y: y });
    x += 0.1;
    if (x > numCols - 1) {
      x = 0;
      y += 0.1;
    }
  }
  return arr;
}
// const zoom = fc.zoom().on("zoom", function (a) {
//   render();
// });
// const ctx = document.querySelector("canvas").getContext("2d");
// console.log(fc
//     .shapeBar())
// const candlestick = fc
//   .shapeCandlestick()
//   .context(ctx)
//   .x((d, i) => i)
//   .open((d) => d.open)
//   .high((d) => d.high)
//   .low((d) => d.low)
//   .close((d) => d.close);

// candlestick([{ open: 4, high: 5, low: 3, close: 3 }]);

// ctx.stroke();
