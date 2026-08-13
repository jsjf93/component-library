import { performance } from "perf_hooks";

type Pair = { base: string, quote: string };

const CATALOG = [
  "BTC", "ETH", "SOL", "ADA", "AVAX", "DOT", "ATOM", "NEAR", "ALGO",
  "LINK", "UNI", "AAVE", "MKR", "CRV",
  "XRP", "LTC", "BCH", "XLM",
  "DOGE", "SHIB", "PEPE",
  "USDT", "USDC", "DAI"
];

const byCurrency: Pair[] = [];
for (let i = 0; i < 10000; i++) {
  byCurrency.push({ base: `RAND_${i}`, quote: 'USD' });
}
for (const b of CATALOG) {
  byCurrency.splice(Math.floor(Math.random() * byCurrency.length), 0, { base: b, quote: 'USD' });
}

function oldImpl(CATALOG: string[], byCurrency: Pair[]) {
  return CATALOG.map((b) => byCurrency.find((p) => p.base === b)).filter(
    (p): p is Pair => Boolean(p)
  );
}

function newImpl(CATALOG: string[], byCurrency: Pair[]) {
  const dict = Object.create(null);
  for (let i = 0; i < byCurrency.length; i++) {
    dict[byCurrency[i].base] = byCurrency[i];
  }
  return CATALOG.map((b) => dict[b]).filter((p): p is Pair => Boolean(p));
}

function mapImpl(CATALOG: string[], byCurrency: Pair[]) {
  const map = new Map<string, Pair>();
  for (let i = 0; i < byCurrency.length; i++) {
    map.set(byCurrency[i].base, byCurrency[i]);
  }
  return CATALOG.map((b) => map.get(b)).filter((p): p is Pair => Boolean(p));
}

function buildMapThenMap(CATALOG: string[], byCurrency: Pair[]) {
  const byBase = new Map<string, Pair>(byCurrency.map(p => [p.base, p]));
  return CATALOG.map((b) => byBase.get(b)).filter((p): p is Pair => Boolean(p));
}

function runBench() {
  const ITERS = 1000;

  const startOld = performance.now();
  for (let i = 0; i < ITERS; i++) {
    oldImpl(CATALOG, byCurrency);
  }
  const endOld = performance.now();

  const startNew = performance.now();
  for (let i = 0; i < ITERS; i++) {
    newImpl(CATALOG, byCurrency);
  }
  const endNew = performance.now();

  const startMap = performance.now();
  for (let i = 0; i < ITERS; i++) {
    mapImpl(CATALOG, byCurrency);
  }
  const endMap = performance.now();

  const startBuildMap = performance.now();
  for (let i = 0; i < ITERS; i++) {
    buildMapThenMap(CATALOG, byCurrency);
  }
  const endBuildMap = performance.now();

  console.log(`Old: ${(endOld - startOld).toFixed(2)}ms`);
  console.log(`New (Dict): ${(endNew - startNew).toFixed(2)}ms`);
  console.log(`Map: ${(endMap - startMap).toFixed(2)}ms`);
  console.log(`BuildMap: ${(endBuildMap - startBuildMap).toFixed(2)}ms`);
}

runBench();
