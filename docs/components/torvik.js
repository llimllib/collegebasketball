import { sum, max, min } from "npm:d3";
import * as Plot from "npm:@observablehq/plot";

function fixName(name) {
  const fixes = {
    "Central Michigan": "central-mich",
    Connecticut: "uconn",
    "Grambling St.": "grambling",
    "Maryland Eastern Shore": "md-east-shore",
    "Mount St. Mary's": "mt-st-marys",
    "Prairie View A&M": "prairie-view",
    "Western Carolina": "western-caro",
    "UC Santa Barbara": "uc-santa-barbara",
  };
  return (
    fixes[name] ||
    name
      .toLowerCase()
      .replaceAll(" ", "-")
      .replaceAll(".", "")
      .replaceAll("&", "")
  );
}

function logoURL(name) {
  return `https://raw.githubusercontent.com/jwmickey/circle-bracket/85d447fb6bfcb0462b77b84e5f76d30b2bd10285/src/img/logos/${fixName(name)}.svg`;
}

const validURLmemo = new Map();
export async function getValidLogoURL(name) {
  if (validURLmemo.has(name)) {
    return validURLmemo.get(name);
  }
  const url = logoURL(name);
  const res = await fetch(url);
  const validURL = res.ok
    ? url
    : `https://raw.githubusercontent.com/jwmickey/circle-bracket/85d447fb6bfcb0462b77b84e5f76d30b2bd10285/src/img/logos/_tbd.svg`;
  validURLmemo.set(name, validURL);
  return validURL;
}

export async function getLogoImage(name) {
  const i = new Image();
  i.src = await getValidLogoURL(name);
  i.width = 40;
  return i;
}

// assumes that t.logoURL has been properly set for the teams in `teams`
export async function graphstat(data, teams, others, stat, options) {
  const average = sum(data, (d) => d[stat]) / data.length;
  const diff = Math.max(
    max(data, (d) => d[stat]) - average,
    average - min(data, (d) => d[stat]),
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
      Plot.image(
        teams,
        Plot.dodgeY({
          src: (t) => t.logoURL,
          width: 40,
          x: stat,
          tip: true,
          padding: 10,
          anchor: "middle",
        }),
      ),
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
