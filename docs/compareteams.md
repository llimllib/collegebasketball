# Compare any 2 teams

```js
import {
  getLogoImage,
  getValidLogoURL,
  graphstat,
} from "./components/torvik.js";
```

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
const randElt = (arr) => arr[Math.floor(Math.random() * arr.length)];
const teama = view(
  Inputs.select(torvik, {
    format: (t) => `${t.name}`,
    label: "team 1",
    value: randElt(torvik),
  }),
);
const teamb = view(
  Inputs.select(torvik, {
    format: (t) => `${t.name}`,
    label: "team 2",
    value: randElt(torvik),
  }),
);
```

```js
const teams = [teama, teamb];
// set t.logoURL for the selected teams; graphstat assumes this is in place
await Promise.all(
  teams.map(async (t) => (t.logoURL = await getValidLogoURL(t.name))),
);
const others = torvik.filter((x) => ![teama.name, teamb.name].includes(x.name));
```

<table>
  <thead>
    <th></th>
    <th>${await getLogoImage(teams[0].name)}</th>
    <th>${await getLogoImage(teams[1].name)}</th>
    <th></th>
  </thead>
  <tr class="sep"><td colspan=4>Efficiency</td></tr>
  <tr>
    <td>Offensive</td>
    <td>${fmt(teams[0].adjoe)}</td>
    <td>${fmt(teams[1].adjoe)}</td>
    <td>${graphstat(torvik, teams, others, "adjoe", { labelAverage: true })}</td>
  </tr>
  <tr>
    <td>Defensive</td>
    <td>${fmt(teams[0].adjde)}</td>
    <td>${fmt(teams[1].adjde)}</td>
    <td>${graphstat(torvik, teams, others, "adjde", { reverse: true })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Effective Field Goal %</td></tr>
  <tr>
    <td>Offense</td>
    <td>${teams[0].efg}</td>
    <td>${teams[1].efg}</td>
    <td>${graphstat(torvik, teams, others, "efg", { })}</td>
  </tr>
  <tr>
    <td>Defense</td>
    <td>${teams[0].efgd}</td>
    <td>${teams[1].efgd}</td>
    <td>${graphstat(torvik, teams, others, "efgd", { reverse: true })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Free Throw Rate</td></tr>
  <tr>
    <td>Offense</td>
    <td>${teams[0].ftr}</td>
    <td>${teams[1].ftr}</td>
    <td>${graphstat(torvik, teams, others, "ftr", { })}</td>
  </tr>
  <tr>
    <td>Opponent</td>
    <td>${teams[0].ftrd}</td>
    <td>${teams[1].ftrd}</td>
    <td>${graphstat(torvik, teams, others, "ftrd", { reverse: true })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Turnover Rate</td></tr>
  <tr>
    <td>Offense</td>
    <td>${teams[0].to_rate}</td>
    <td>${teams[1].to_rate}</td>
    <td>${graphstat(torvik, teams, others, "to_rate", { reverse: true })}</td>
  </tr>
  <tr>
    <td>Opponent</td>
    <td>${teams[0].to_rate_d}</td>
    <td>${teams[1].to_rate_d}</td>
    <td>${graphstat(torvik, teams, others, "to_rate_d", { })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Rebounding</td></tr>
  <tr>
    <td>Offensive</td>
    <td>${teams[0].orb}</td>
    <td>${teams[1].orb}</td>
    <td>${graphstat(torvik, teams, others, "orb", { })}</td>
  </tr>
  <tr>
    <td>Defensive</td>
    <td>${teams[0].drb}</td>
    <td>${teams[1].drb}</td>
    <td>${graphstat(torvik, teams, others, "drb", { })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Two Point Field Goals</td></tr>
  <tr>
    <td>Offensive</td>
    <td>${teams[0].two_pt_pct}</td>
    <td>${teams[1].two_pt_pct}</td>
    <td>${graphstat(torvik, teams, others, "two_pt_pct", { })}</td>
  </tr>
  <tr>
    <td>Defensive</td>
    <td>${teams[0].two_pt_pct_d}</td>
    <td>${teams[1].two_pt_pct_d}</td>
    <td>${graphstat(torvik, teams, others, "two_pt_pct_d", { reverse: true })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Three Point Field Goals</td></tr>
  <tr>
    <td>Offensive %</td>
    <td>${teams[0].three_pt_pct}</td>
    <td>${teams[1].three_pt_pct}</td>
    <td>${graphstat(torvik, teams, others, "three_pt_pct", { })}</td>
  </tr>
  <tr>
    <td>Defensive %</td>
    <td>${teams[0].three_pt_pct_d}</td>
    <td>${teams[1].three_pt_pct_d}</td>
    <td>${graphstat(torvik, teams, others, "three_pt_pct_d", { reverse: true })}</td>
  </tr>
  <tr>
    <td>Rate</td>
    <td>${teams[0].three_pt_rate}</td>
    <td>${teams[1].three_pt_rate}</td>
    <td>${graphstat(torvik, teams, others, "three_pt_rate", { })}</td>
  </tr>
  <tr>
    <td>Defensive Rate</td>
    <td>${teams[0].three_pt_rate_d}</td>
    <td>${teams[1].three_pt_rate_d}</td>
    <td>${graphstat(torvik, teams, others, "three_pt_rate_d", { reverse: true })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Block Percentage</td></tr>
  <tr>
    <td>Offensive</td>
    <td>${teams[0].block_pct}</td>
    <td>${teams[1].block_pct}</td>
    <td>${graphstat(torvik, teams, others, "block_pct", { reverse: true })}</td>
  </tr>
  <tr>
    <td>Defensive</td>
    <td>${teams[0].block_pct_d}</td>
    <td>${teams[1].block_pct_d}</td>
    <td>${graphstat(torvik, teams, others, "block_pct_d", { })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Assist Percentage</td></tr>
  <tr>
    <td>Offensive</td>
    <td>${teams[0].ast_rate}</td>
    <td>${teams[1].ast_rate}</td>
    <td>${graphstat(torvik, teams, others, "ast_rate", { })}</td>
  </tr>
  <tr>
    <td>Defensive</td>
    <td>${teams[0].ast_rate_d}</td>
    <td>${teams[1].ast_rate_d}</td>
    <td>${graphstat(torvik, teams, others, "ast_rate_d", { reverse: true })}</td>
  </tr>
  <tr class="sep"><td colspan=4>Misc</td></tr>
  <tr>
    <td>Tempo</td>
    <td>${fmt(teams[0].adj_tempo)}</td>
    <td>${fmt(teams[1].adj_tempo)}</td>
    <td>${graphstat(torvik, teams, others, "adj_tempo", { })}</td>
  </tr>
  <tr>
    <td>Free Throw %</td>
    <td>${fmt(teams[0].ft_pct)}</td>
    <td>${fmt(teams[1].ft_pct)}</td>
    <td>${graphstat(torvik, teams, others, "ft_pct", { })}</td>
  </tr>
</table>

[source code](https://github.com/llimllib/collegebasketball) by [Bill Mill](https://billmill.org). generated with [observable framework](https://github.com/observablehq/framework)

```js
const torvik = await FileAttachment("data/torvik_teams_2024.csv").csv({
  typed: true,
});
torvik.sort((a, b) => (a.name > b.name ? 1 : -1));
// add `drb` for defensive rebounding rate
torvik.forEach((s) => (s.drb = 100 - s.orb_d));
const fmt = d3.format(".1f");
```
