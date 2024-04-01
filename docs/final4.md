# Final 4

```js
import {
  getLogoImage,
  getValidLogoURL,
  graphstat,
} from "./components/torvik.js";
```

<style>
/* table { min-width: 800px }
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
}*/
#observablehq-toc {
  display:none;
}
#observablehq-center {
  margin-right: 0;
  padding-right: 0;
  width: 100%;
}
tr.sep td:first-child { 
  padding-left: 0px;
  font-size: 1.4rem;
  font-weight: bold;
}
abbr {
  cursor: pointer;
}
table {
  max-width: 1024px;
  border: none;
}
tr {
  display: flex;
  flex-wrap: wrap;
  padding-right: 40px;
}
tr td, tr th {
  flex-basis: 10px;
}
tr td:first-child, tr th:first-child {
  flex-basis: 100px;
}
td, th {
  flex: 1;
}
td.graph {
  flex: 10;
  flex-basis: 500px;
  box-sizing: border-box;
}
</style>

```js
const last10 = view(
  Inputs.radio(["all games", "last 10", "last 20"], {
    label: "Data for",
    value: "all games",
  }),
);
```

```js
const rawteams = ["Connecticut", "Alabama", "North Carolina St.", "Purdue"];
const teams = rawteams.map((t) => torvik.filter((x) => x.name == t)[0]);
// set t.logoURL for the selected teams; graphstat assumes this is in place
await Promise.all(
  teams.map(async (t) => (t.logoURL = await getValidLogoURL(t.name))),
);
const others = torvik.filter((x) => !rawteams.includes(x.name));
```

<table>
  <thead>
    <th></th>
    <th>${await getLogoImage(teams[0].name)}</th>
    <th>${await getLogoImage(teams[1].name)}</th>
    <th>${await getLogoImage(teams[2].name)}</th>
    <th>${await getLogoImage(teams[3].name)}</th>
    <td class="graph"></td>
    <th></th>
  </thead>
  <tr class="sep"><td colspan=4>Efficiency</td></tr>
  <tr>
    <td>Offensive</td>
    <td>${fmt(teams[0].adjoe)}</td>
    <td>${fmt(teams[1].adjoe)}</td>
    <td>${fmt(teams[2].adjoe)}</td>
    <td>${fmt(teams[3].adjoe)}</td>
    <td class="graph">${graphstat(torvik, teams, others, "adjoe", { labelAverage: true })}</td>
  </tr>
  <tr>
    <td>Defensive</td>
    <td>${fmt(teams[0].adjde)}</td>
    <td>${fmt(teams[1].adjde)}</td>
    <td>${fmt(teams[2].adjde)}</td>
    <td>${fmt(teams[3].adjde)}</td>
    <td class="graph">${graphstat(torvik, teams, others, "adjde", { reverse: true })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Effective Field Goal %</td></tr>
  <tr>
    <td>Offense</td>
    <td>${teams[0].efg}</td>
    <td>${teams[1].efg}</td>
    <td>${teams[2].efg}</td>
    <td>${teams[3].efg}</td>
    <td class="graph">${graphstat(torvik, teams, others, "efg", { })}</td>
  </tr>
  <tr>
    <td>Defense</td>
    <td>${teams[0].efgd}</td>
    <td>${teams[1].efgd}</td>
    <td>${teams[2].efgd}</td>
    <td>${teams[3].efgd}</td>
    <td class="graph">${graphstat(torvik, teams, others, "efgd", { reverse: true })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Free Throw Rate</td></tr>
  <tr>
    <td>Offense</td>
    <td>${teams[0].ftr}</td>
    <td>${teams[1].ftr}</td>
    <td>${teams[2].ftr}</td>
    <td>${teams[3].ftr}</td>
    <td class="graph">${graphstat(torvik, teams, others, "ftr", { })}</td>
  </tr>
  <tr>
    <td>Opponent</td>
    <td>${teams[0].ftrd}</td>
    <td>${teams[1].ftrd}</td>
    <td>${teams[2].ftrd}</td>
    <td>${teams[3].ftrd}</td>
    <td class="graph">${graphstat(torvik, teams, others, "ftrd", { reverse: true })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Turnover Rate</td></tr>
  <tr>
    <td>Offense</td>
    <td>${teams[0].to_rate}</td>
    <td>${teams[1].to_rate}</td>
    <td>${teams[2].to_rate}</td>
    <td>${teams[3].to_rate}</td>
    <td class="graph">${graphstat(torvik, teams, others, "to_rate", { reverse: true })}</td>
  </tr>
  <tr>
    <td>Defense</td>
    <td>${teams[0].to_rate_d}</td>
    <td>${teams[1].to_rate_d}</td>
    <td>${teams[2].to_rate_d}</td>
    <td>${teams[3].to_rate_d}</td>
    <td class="graph">${graphstat(torvik, teams, others, "to_rate_d", { })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Rebounding</td></tr>
  <tr>
    <td>Offensive</td>
    <td>${teams[0].orb}</td>
    <td>${teams[1].orb}</td>
    <td>${teams[2].orb}</td>
    <td>${teams[3].orb}</td>
    <td class="graph">${graphstat(torvik, teams, others, "orb", { })}</td>
  </tr>
  <tr>
    <td>Defensive</td>
    <td>${teams[0].drb}</td>
    <td>${teams[1].drb}</td>
    <td>${teams[2].drb}</td>
    <td>${teams[3].drb}</td>
    <td class="graph">${graphstat(torvik, teams, others, "drb", { })}</td>
  </tr>
  <tr class="sep"><td colspan=6>Two Point Field Goal Percentage</td></tr>
  <tr>
    <td>Offensive</td>
    <td>${teams[0].two_pt_pct}</td>
    <td>${teams[1].two_pt_pct}</td>
    <td>${teams[2].two_pt_pct}</td>
    <td>${teams[3].two_pt_pct}</td>
    <td class="graph">${graphstat(torvik, teams, others, "two_pt_pct", { })}</td>
  </tr>
  <tr>
    <td>Defensive</td>
    <td>${teams[0].two_pt_pct_d}</td>
    <td>${teams[1].two_pt_pct_d}</td>
    <td>${teams[2].two_pt_pct_d}</td>
    <td>${teams[3].two_pt_pct_d}</td>
    <td class="graph">${graphstat(torvik, teams, others, "two_pt_pct_d", { reverse: true })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Three Point Field Goals</td></tr>
  <tr>
    <td>Offensive %</td>
    <td>${teams[0].three_pt_pct}</td>
    <td>${teams[1].three_pt_pct}</td>
    <td>${teams[2].three_pt_pct}</td>
    <td>${teams[3].three_pt_pct}</td>
    <td class="graph">${graphstat(torvik, teams, others, "three_pt_pct", { })}</td>
  </tr>
  <tr>
    <td>Defensive %</td>
    <td>${teams[0].three_pt_pct_d}</td>
    <td>${teams[1].three_pt_pct_d}</td>
    <td>${teams[2].three_pt_pct_d}</td>
    <td>${teams[3].three_pt_pct_d}</td>
    <td class="graph">${graphstat(torvik, teams, others, "three_pt_pct_d", { reverse: true })}</td>
  </tr>
  <tr>
    <td>Rate</td>
    <td>${teams[0].three_pt_rate}</td>
    <td>${teams[1].three_pt_rate}</td>
    <td>${teams[2].three_pt_rate}</td>
    <td>${teams[3].three_pt_rate}</td>
    <td class="graph">${graphstat(torvik, teams, others, "three_pt_rate", { })}</td>
  </tr>
  <tr>
    <td>Defensive Rate</td>
    <td>${teams[0].three_pt_rate_d}</td>
    <td>${teams[1].three_pt_rate_d}</td>
    <td>${teams[2].three_pt_rate_d}</td>
    <td>${teams[3].three_pt_rate_d}</td>
    <td class="graph">${graphstat(torvik, teams, others, "three_pt_rate_d", { reverse: true })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Block Percentage</td></tr>
  <tr>
    <td>Offensive <abbr title="How often the team gets their shots blocked on offense">ⓘ</abbr></td>
    <td>${teams[0].block_pct}</td>
    <td>${teams[1].block_pct}</td>
    <td>${teams[2].block_pct}</td>
    <td>${teams[3].block_pct}</td>
<td class="graph">${graphstat(torvik, teams, others, "block_pct", { reverse: true })}</td>
  </tr>
  <tr>
    <td>Defensive <abbr title="How often the team blocks opponents' shots">ⓘ</abbr></td>
    <td>${teams[0].block_pct_d}</td>
    <td>${teams[1].block_pct_d}</td>
    <td>${teams[2].block_pct_d}</td>
    <td>${teams[3].block_pct_d}</td>
    <td class="graph">${graphstat(torvik, teams, others, "block_pct_d", { })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Assist Percentage</td></tr>
  <tr>
    <td>Offensive</td>
    <td>${teams[0].ast_rate}</td>
    <td>${teams[1].ast_rate}</td>
    <td>${teams[2].ast_rate}</td>
    <td>${teams[3].ast_rate}</td>
    <td class="graph">${graphstat(torvik, teams, others, "ast_rate", { })}</td>
  </tr>
  <tr>
    <td>Defensive</td>
    <td>${teams[0].ast_rate_d}</td>
    <td>${teams[1].ast_rate_d}</td>
    <td>${teams[2].ast_rate_d}</td>
    <td>${teams[3].ast_rate_d}</td>
    <td class="graph">${graphstat(torvik, teams, others, "ast_rate_d", { reverse: true })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Misc</td></tr>
  <tr>
    <td>Tempo</td>
    <td>${fmt(teams[0].adj_tempo)}</td>
    <td>${fmt(teams[1].adj_tempo)}</td>
    <td>${fmt(teams[2].adj_tempo)}</td>
    <td>${fmt(teams[3].adj_tempo)}</td>
    <td class="graph">${graphstat(torvik, teams, others, "adj_tempo", { })}</td>
  </tr>
  <tr>
    <td>Free Throw %</td>
    <td>${fmt(teams[0].ft_pct)}</td>
    <td>${fmt(teams[1].ft_pct)}</td>
    <td>${fmt(teams[2].ft_pct)}</td>
    <td>${fmt(teams[3].ft_pct)}</td>
    <td class="graph">${graphstat(torvik, teams, others, "ft_pct", { })}</td>
  </tr>
</table>

Data from [Bart Torvik](https://barttorvik.com). [Source code](https://github.com/llimllib/collegebasketball) by [Bill Mill](https://billmill.org). Generated with [observable framework](https://github.com/observablehq/framework)

```js
const torvik_all = await FileAttachment("data/torvik_teams_2024.csv").csv({
  typed: true,
});
const torvik_l10 = await FileAttachment(
  "data/torvik_teams_2024_last10.csv",
).csv({
  typed: true,
});
const torvik_l20 = await FileAttachment(
  "data/torvik_teams_2024_last20.csv",
).csv({
  typed: true,
});
const torvik =
  last10 == "all games"
    ? torvik_all
    : last10 == "last 10"
      ? torvik_l10
      : torvik_l20;

// add `drb` for defensive rebounding rate
torvik.forEach((s) => (s.drb = 100 - s.orb_d));
const fmt = d3.format(".1f");
```
