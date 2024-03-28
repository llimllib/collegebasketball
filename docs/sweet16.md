# Sweet 16 Matchups

<style>
table { min-width: 800px }
td { vertical-align: middle }
tr { height: 75px; padding-left: 10px }
tr td:first-child { 
  padding-left: 10px;
  width: 90px;
}
tr.sep {
  height: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  border-bottom: none;
  margin-left: 0px;
}
tr.sep td:first-child { 
  padding-left: 0px;
}
</style>

Select a matchup to see detailed statistics:

```js
const rawteams = view(
  Inputs.select(games, { format: (t) => `${t.a} vs ${t.b}` }),
);
```

```js
const teams = [
  torvik.filter((x) => x.name == rawteams.a)[0],
  torvik.filter((x) => x.name == rawteams.b)[0],
];
const others = torvik.filter((x) => ![rawteams.a, rawteams.b].includes(x.name));
```

<table>
  <thead>
    <th></th>
    <th>${logo(teams[0].name)}</th>
    <th>${logo(teams[1].name)}</th>
    <th></th>
  </thead>
  <tr class="sep"><td colspan=4>Efficiency</td></tr>
  <tr>
    <td>Offensive</td>
    <td>${fmt(teams[0].adjoe)}</td>
    <td>${fmt(teams[1].adjoe)}</td>
    <td>${graphstat(teams, others, "adjoe", { labelAverage: true })}</td>
  </tr>
  <tr>
    <td>Defensive</td>
    <td>${fmt(teams[0].adjde)}</td>
    <td>${fmt(teams[1].adjde)}</td>
    <td>${graphstat(teams, others, "adjde", { reverse: true })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Effective Field Goal %</td></tr>
  <tr>
    <td>Offense</td>
    <td>${teams[0].efg}</td>
    <td>${teams[1].efg}</td>
    <td>${graphstat(teams, others, "efg", { })}</td>
  </tr>
  <tr>
    <td>Defense</td>
    <td>${teams[0].efgd}</td>
    <td>${teams[1].efgd}</td>
    <td>${graphstat(teams, others, "efgd", { reverse: true })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Free Throw Rate</td></tr>
  <tr>
    <td>Offense</td>
    <td>${teams[0].ftr}</td>
    <td>${teams[1].ftr}</td>
    <td>${graphstat(teams, others, "ftr", { })}</td>
  </tr>
  <tr>
    <td>Opponent</td>
    <td>${teams[0].ftrd}</td>
    <td>${teams[1].ftrd}</td>
    <td>${graphstat(teams, others, "ftrd", { reverse: true })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Turnover Rate</td></tr>
  <tr>
    <td>Offense</td>
    <td>${teams[0].to_rate}</td>
    <td>${teams[1].to_rate}</td>
    <td>${graphstat(teams, others, "to_rate", { })}</td>
  </tr>
  <tr>
    <td>Opponent</td>
    <td>${teams[0].to_rate_d}</td>
    <td>${teams[1].to_rate_d}</td>
    <td>${graphstat(teams, others, "to_rate_d", { })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Rebounding</td></tr>
  <tr>
    <td>Offensive</td>
    <td>${teams[0].orb}</td>
    <td>${teams[1].orb}</td>
    <td>${graphstat(teams, others, "orb", { })}</td>
  </tr>
  <tr>
    <td>Defensive</td>
    <td>${teams[0].drb}</td>
    <td>${teams[1].drb}</td>
    <td>${graphstat(teams, others, "drb", { })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Two Point Field Goals</td></tr>
  <tr>
    <td>Offensive</td>
    <td>${teams[0].two_pt_pct}</td>
    <td>${teams[1].two_pt_pct}</td>
    <td>${graphstat(teams, others, "two_pt_pct", { })}</td>
  </tr>
  <tr>
    <td>Defensive</td>
    <td>${teams[0].two_pt_pct_d}</td>
    <td>${teams[1].two_pt_pct_d}</td>
    <td>${graphstat(teams, others, "two_pt_pct_d", { reverse: true })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Three Point Field Goals</td></tr>
  <tr>
    <td>Offensive %</td>
    <td>${teams[0].three_pt_pct}</td>
    <td>${teams[1].three_pt_pct}</td>
    <td>${graphstat(teams, others, "three_pt_pct", { })}</td>
  </tr>
  <tr>
    <td>Defensive %</td>
    <td>${teams[0].three_pt_pct_d}</td>
    <td>${teams[1].three_pt_pct_d}</td>
    <td>${graphstat(teams, others, "three_pt_pct_d", { reverse: true })}</td>
  </tr>
  <tr>
    <td>Rate</td>
    <td>${teams[0].three_pt_rate}</td>
    <td>${teams[1].three_pt_rate}</td>
    <td>${graphstat(teams, others, "three_pt_rate", { })}</td>
  </tr>
  <tr>
    <td>Defensive Rate</td>
    <td>${teams[0].three_pt_rate_d}</td>
    <td>${teams[1].three_pt_rate_d}</td>
    <td>${graphstat(teams, others, "three_pt_rate_d", { reverse: true })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Block Percentage</td></tr>
  <tr>
    <td>Offensive</td>
    <td>${teams[0].block_pct}</td>
    <td>${teams[1].block_pct}</td>
    <td>${graphstat(teams, others, "block_pct", { reverse: true })}</td>
  </tr>
  <tr>
    <td>Defensive</td>
    <td>${teams[0].block_pct_d}</td>
    <td>${teams[1].block_pct_d}</td>
    <td>${graphstat(teams, others, "block_pct_d", { })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Assist Percentage</td></tr>
  <tr>
    <td>Offensive</td>
    <td>${teams[0].ast_rate}</td>
    <td>${teams[1].ast_rate}</td>
    <td>${graphstat(teams, others, "ast_rate", { })}</td>
  </tr>
  <tr>
    <td>Defensive</td>
    <td>${teams[0].ast_rate_d}</td>
    <td>${teams[1].ast_rate_d}</td>
    <td>${graphstat(teams, others, "ast_rate_d", { reverse: true })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Misc</td></tr>
  <tr>
    <td>Tempo</td>
    <td>${fmt(teams[0].adj_tempo)}</td>
    <td>${fmt(teams[1].adj_tempo)}</td>
    <td>${graphstat(teams, others, "adj_tempo", { })}</td>
  </tr>
  <tr>
    <td>Free Throw %</td>
    <td>${fmt(teams[0].ft_pct)}</td>
    <td>${fmt(teams[1].ft_pct)}</td>
    <td>${graphstat(teams, others, "ft_pct", { })}</td>
  </tr>
</table>

[source code](https://github.com/llimllib/collegebasketball) by [Bill Mill](https://billmill.org). generated with [observable framework](https://github.com/observablehq/framework)

```js
const torvik = await FileAttachment("data/torvik_2024.csv").csv({
  typed: true,
});
// add `drb` for defensive rebounding rate
torvik.forEach((s) => (s.drb = 100 - s.orb_d));
const fmt = d3.format(".1f");
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

function logoURL(name) {
  return `https://raw.githubusercontent.com/jwmickey/circle-bracket/85d447fb6bfcb0462b77b84e5f76d30b2bd10285/src/img/logos/${fixName(name)}.svg`;
}

function logo(name) {
  const i = new Image();
  i.src = logoURL(name);
  i.width = 40;
  return i;
}

function graphstat(teams, others, stat, options) {
  const average = d3.sum(torvik, (d) => d[stat]) / torvik.length;
  const diff = Math.max(
    d3.max(torvik, (d) => d[stat]) - average,
    average - d3.min(torvik, (d) => d[stat]),
  );
  return Plot.plot({
    title: options.title,
    x: {
      grid: true,
      label: options.label,
      reverse: options.reverse,
      domain: [average - diff, average + diff],
    },
    y: {
      domain: [-1, 1],
      grid: false,
      ticks: false,
    },
    height: "80",
    marks: [
      Plot.dot(others, { x: stat, fill: "#66666633" }),
      Plot.image(teams, {
        src: (d) =>
          `https://raw.githubusercontent.com/jwmickey/circle-bracket/85d447fb6bfcb0462b77b84e5f76d30b2bd10285/src/img/logos/${fixName(d.name)}.svg`,
        width: 40,
        x: stat,
        tip: true,
      }),
      Plot.ruleX([average], {
        stroke: "red",
        y1: 0.5,
        y2: -0.5,
      }),
      options.labelAverage
        ? Plot.text([[average]], {
            text: ["NCAA average"],
            x: average,
            y: 0.8,
          })
        : null,
    ],
  });
}
```

```js
const games = [
  { a: "Connecticut", b: "San Diego St." },
  { a: "Iowa St.", b: "Illinois" },
  { a: "Houston", b: "Duke" },
  { a: "Marquette", b: "North Carolina St." },
  { a: "Purdue", b: "Gonzaga" },
  { a: "Tennessee", b: "Creighton" },
  { a: "North Carolina", b: "Alabama" },
  { a: "Arizona", b: "Clemson" },
];
```
