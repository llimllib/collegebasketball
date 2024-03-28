# Sweet 16 by Stats

```js
const torvik = await FileAttachment("data/torvik_2024.csv").csv({
  typed: true,
});
torvik.forEach((s) => (s.drb = 100 - s.orb_d));
const activeTeams = [
  "Connecticut",
  "Gonzaga",
  "Marquette",
  "Iowa St.",
  "Tennessee",
  "San Diego St.",
  "Arizona",
  "Clemson",
  "North Carolina St.",
  "Alabama",
  "North Carolina",
  "Houston",
  "Creighton",
  "Purdue",
  "Duke",
  "Illinois",
  "Gonzaga",
];
torvik.forEach((t) => (t.active = activeTeams.includes(t.name)));
const active = torvik.filter((x) => x.active);
const inactive = torvik.filter((x) => !x.active);
```

```js
const stats = [
  { name: "Adjusted Offensive Efficiency", stat: "adjoe" },
  { name: "Adjusted Defensive Efficiency", stat: "adjde", reverse: true },
  { name: "Effective Field Goal %", stat: "efg" },
  { name: "Effective Field Goal % D", stat: "efgd", reverse: true },
  { name: "Offensive Rebouding %", stat: "orb" },
  { name: "Defensive Rebounding %", stat: "drb" },
  { name: "Free Throw Rate", stat: "ftr" },
  { name: "Free Throw %", stat: "ft_pct" },
  { name: "Opponent Free Throw Rate", stat: "ftr_d", reverse: true },
  { name: "Turnover Rate", stat: "to_rate" },
  { name: "Opponent Turnover Rate", stat: "to_rate_d", reverse: true },
  { name: "Two Point FG %", stat: "two_pt_pct" },
  { name: "Opponent Two Point FG %", stat: "two_pt_pct_d", reverse: true },
  { name: "Three Point FG %", stat: "three_pt_pct" },
  { name: "Opponent Three Point FG %", stat: "three_pt_pct_d", reverse: true },
  { name: "Three Point Rate", stat: "three_pt_rate" },
  { name: "Opponent Three Point Rate", stat: "three_pt_rate_d", reverse: true },
  { name: "Block Percentage", stat: "block_pct_d" },
  { name: "Opponent Block Percentage", stat: "block_pct", reverse: true },
  { name: "Assist Rate", stat: "ast_rate" },
  { name: "Opponent Assist Rate", stat: "ast_rate_d", reverse: true },
  { name: "Tempo", stat: "adj_tempo" },
];
const xaxis = view(
  Inputs.select(stats, { format: (t) => t.name, label: "X Axis" }),
);
const yaxis = view(
  Inputs.select(stats, {
    format: (t) => t.name,
    label: "Y Axis",
    value: stats[1],
  }),
);
```

```js
const avgx = d3.sum(torvik, (d) => d[xaxis.stat]) / torvik.length;
const avgy = d3.sum(torvik, (d) => d[yaxis.stat]) / torvik.length;
const p4 = Plot.plot({
  width: 800,
  height: 800,
  x: {
    grid: true,
    reverse: xaxis.reverse,
    label: xaxis.name,
  },
  y: {
    grid: true,
    reverse: yaxis.reverse,
    label: yaxis.name,
  },
  marginTop: "40",
  marks: [
    Plot.image(active, {
      x: (d) => d[xaxis.stat],
      y: (d) => d[yaxis.stat],
      width: 25,
      tip: true,
      title: (d) =>
        `${d.name}:\n${xaxis.name}: ${d[xaxis.stat]}\n${yaxis.name}: ${d[yaxis.stat]}`,
      src: (d) =>
        `https://raw.githubusercontent.com/jwmickey/circle-bracket/85d447fb6bfcb0462b77b84e5f76d30b2bd10285/src/img/logos/${fixName(d.name)}.svg`,
    }),
    Plot.dot(inactive, {
      x: (d) => d[xaxis.stat],
      y: (d) => d[yaxis.stat],
      tip: false, // TODO: add a tip mark that uses all data points
      title: (d) => `${d.name}: ${d.adjoe}`,
      fill: "#66666666",
    }),
    Plot.ruleX([avgx], {
      stroke: "#ff0000cc",
      strokeDasharray: "3,9",
      y1: avgy - avgy * 0.05,
      y2: avgy + avgy * 0.05,
    }),
    Plot.ruleY([avgy], {
      stroke: "red",
      strokeDasharray: "3,9",
      x1: avgx - avgx * 0.05,
      x2: avgx + avgx * 0.05,
    }),
  ],
});
display(p4);
```

```js
function fixName(name) {
  const fixes = {
    "Iowa St.": "iowa-st",
    "North Carolina": "north-carolina",
    "North Carolina St.": "north-carolina-st",
    "San Diego St.": "san-diego-st",
    Connecticut: "uconn",
  };
  return fixes[name] || name.toLowerCase();
}
```
