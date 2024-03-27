---
toc: false
---

This started based on a [tootstorm](https://elk.zone/hachyderm.io/@llimllib/112165080007633415)

To get the torvik data, go to https://barttorvik.com/, set the filters you want, and add `&csv=1` to the URL.

To get the last 10 days' data from that site, add `&lastx=10` to the URL to limit to the last 10 games; this is not accessible from anywhere in the UI that I can find.

The headers for the main page data are, as best as I could reverse engineer are:

```
team_name,adjoe,adjde,barthag,record,unknown,games,efg,efgd,ftr,ftrd,to_rate,to_rate_d,orb,orb_d,unknown,two_pt_pct,two_pt_pct_d,three_pt_pct,three_pt_pct_d,block_pct_d,block_pct,ast_rate,ast_rate_d,three_pt_rate,three_pt_rate_d,adj_tempo,unknown,unknown,unknown,season,unknown,unknown,unknown,wab,ft_pct,ft_pct_d
```

with a note that data from <2010 may be missing a few columns:

> I think what's going on is that in 2008 and 2009 the blank columns (stats from play by play, such as shot locations, dunks, etc) are being skipped when the csv is created. All years from 2010 to present should have the same columns as shown in that dropbox link.

TODO:

- why are builds so slow?
- how can I hack image support into framework?
  - look into how the build process works

```js
const torvik = await FileAttachment("data/torvik_2024_last10.csv").csv({
  typed: true,
});
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
const avgOE = d3.sum(torvik, (d) => d.adjoe) / torvik.length;
const avgDE = d3.sum(torvik, (d) => d.adjde) / torvik.length;
const plot = Plot.plot({
  title: "offensive efficency",
  x: {
    grid: true,
    label: "Torvik Adjusted OE",
  },
  y: {
    domain: [-1, 1],
    grid: false,
    ticks: false,
  },
  height: "100",
  marks: [
    Plot.dot(inactive, { x: "adjoe", fill: "#666" }),
    Plot.dot(active, { x: "adjoe", fill: "#f00" }),
    Plot.ruleX([avgOE], {
      stroke: "red",
      y1: 0.3,
      y2: -0.3,
    }),
    Plot.text([[avgOE]], {
      text: ["NCAA average"],
      x: avgOE,
      y: 0.5,
    }),
  ],
});
display(plot);
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
const p2 = Plot.plot({
  title: "Offensive Efficency",
  subtitle: "sweet 16 teams, last 10 games",
  x: {
    grid: true,
    label: "Torvik Adjusted OE",
  },
  y: {
    domain: [-1, 1],
    grid: false,
    ticks: false,
  },
  height: "170",
  marks: [
    Plot.image(
      active,
      Plot.dodgeY({
        anchor: "middle",
        x: "adjoe",
        padding: 30,
        width: 40,
        tip: true,
        title: (d) => `${d.name}: ${d.adjoe}`,
        // There's currently no way to put images into observable framework sensibly:
        // https://github.com/observablehq/framework/discussions/1149#discussioncomment-8926857
        // I'd prefer to do something like:
        // src: (d) => `data/logos/${d.name.toLowerCase()}.svg`,
        // logos stolen from https://github.com/jwmickey/circle-bracket/.
        src: (d) =>
          `https://raw.githubusercontent.com/jwmickey/circle-bracket/85d447fb6bfcb0462b77b84e5f76d30b2bd10285/src/img/logos/${fixName(d.name)}.svg`,
      }),
    ),
    Plot.ruleX([avgOE], {
      stroke: "red",
      y1: 0.3,
      y2: -0.3,
    }),
    Plot.text([[avgOE]], {
      text: ["NCAA average"],
      x: avgOE,
      y: 0.5,
    }),
  ],
});
display(p2);
```

```js
const p3 = Plot.plot({
  title: "Offensive and Defensive Efficency",
  subtitle: "sweet 16 teams, last 10 games",
  x: {
    grid: true,
    label: "Torvik Adjusted OE (higher is better)",
    domain: [
      d3.min([avgOE].concat(active.map((d) => d.adjoe))),
      d3.max(active, (d) => d.adjoe),
    ],
  },
  y: {
    grid: true,
    label: "Torvik Adjusted DE (lower is better)",
    domain: [
      d3.max([avgDE].concat(active.map((d) => d.adjde))),
      d3.min(active, (d) => d.adjde),
    ],
  },
  marginTop: "40",
  marks: [
    Plot.image(active, {
      x: "adjoe",
      y: "adjde",
      width: 40,
      tip: true,
      title: (d) => `${d.name}: ${d.adjoe}`,
      // There's currently no way to put images into observable framework sensibly:
      // https://github.com/observablehq/framework/discussions/1149#discussioncomment-8926857
      // I'd prefer to do something like:
      // src: (d) => `data/logos/${d.name.toLowerCase()}.svg`,
      // logos stolen from https://github.com/jwmickey/circle-bracket/.
      src: (d) =>
        `https://raw.githubusercontent.com/jwmickey/circle-bracket/85d447fb6bfcb0462b77b84e5f76d30b2bd10285/src/img/logos/${fixName(d.name)}.svg`,
    }),
    Plot.ruleX([avgOE], {
      stroke: "red",
      y1: 97,
      y2: 95,
    }),
    Plot.text([[avgOE]], {
      text: ["NCAA average OE"],
      x: avgOE + 0.25,
      textAnchor: "start",
      y: 96,
    }),
    Plot.ruleY([avgDE], {
      stroke: "red",
      x1: 116,
      x2: 119,
    }),
    Plot.text([[avgDE]], {
      text: ["NCAA average DE"],
      x: 117.5,
      textAnchor: "middle",
      y: avgDE - 0.5,
    }),
  ],
});
display(p3);
```

```js
const p4 = Plot.plot({
  title: "Offensive and Defensive Efficency",
  subtitle: "sweet 16 teams, last 10 games. Average in red",
  x: {
    grid: true,
    label: "Torvik Adjusted OE (higher is better)",
  },
  y: {
    grid: true,
    label: "Torvik Adjusted DE (lower is better)",
    reverse: true,
  },
  marginTop: "40",
  marks: [
    Plot.image(active, {
      x: "adjoe",
      y: "adjde",
      width: 25,
      tip: true,
      title: (d) => `${d.name}: ${d.adjoe}`,
      src: (d) =>
        `https://raw.githubusercontent.com/jwmickey/circle-bracket/85d447fb6bfcb0462b77b84e5f76d30b2bd10285/src/img/logos/${fixName(d.name)}.svg`,
    }),
    Plot.dot(inactive, {
      x: "adjoe",
      y: "adjde",
      tip: true,
      title: (d) => `${d.name}: ${d.adjoe}`,
      fill: "#66666666",
    }),
    Plot.ruleX([avgOE], {
      stroke: "#ff0000cc",
      strokeDasharray: "3,9",
      y1: avgDE - 8,
      y2: avgDE + 8,
    }),
    Plot.ruleY([avgDE], {
      stroke: "red",
      strokeDasharray: "3,9",
      x1: avgOE - 5,
      x2: avgOE + 5,
    }),
  ],
});
display(p4);
```
