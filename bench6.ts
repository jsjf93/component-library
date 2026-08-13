import { performance } from "perf_hooks";

type Pair = { base: string, quote: string };

const CATALOG = [
  "BTC", "ETH", "SOL", "ADA", "AVAX", "DOT", "ATOM", "NEAR", "ALGO",
  "LINK", "UNI", "AAVE", "MKR", "CRV",
  "XRP", "LTC", "BCH", "XLM",
  "DOGE", "SHIB", "PEPE",
  "USDT", "USDC", "DAI"
];

// generate ~200 pairs to reflect a realistic number for a single quote currency
const byCurrency: Pair[] = [];
for (let i = 0; i < 200; i++) {
  byCurrency.push({ base: `RAND_${i}`, quote: 'USD' });
}
// randomly insert CATALOG ones
for (const b of CATALOG) {
  byCurrency.splice(Math.floor(Math.random() * byCurrency.length), 0, { base: b, quote: 'USD' });
}

function oldImpl(CATALOG: string[], byCurrency: Pair[]) {
  return CATALOG.map((b) => byCurrency.find((p) => p.base === b)).filter(
    (p): p is Pair => Boolean(p)
  );
}

function dictImpl(CATALOG: string[], byCurrency: Pair[]) {
  const dict = Object.create(null);
  for (let i = 0; i < byCurrency.length; i++) {
    dict[byCurrency[i].base] = byCurrency[i];
  }
  const result: Pair[] = [];
  for (let i = 0; i < CATALOG.length; i++) {
    const p = dict[CATALOG[i]];
    if (p) result.push(p);
  }
  return result;
}

function mapImpl(CATALOG: string[], byCurrency: Pair[]) {
  const map = new Map<string, Pair>();
  for (let i = 0; i < byCurrency.length; i++) {
    map.set(byCurrency[i].base, byCurrency[i]);
  }
  const result: Pair[] = [];
  for (let i = 0; i < CATALOG.length; i++) {
    const p = map.get(CATALOG[i]);
    if (p) result.push(p);
  }
  return result;
}

function runBench() {
  const ITERS = 100000; // Increased iterations for more stable results

  const startOld = performance.now();
  for (let i = 0; i < ITERS; i++) {
    oldImpl(CATALOG, byCurrency);
  }
  const endOld = performance.now();

  const startDict = performance.now();
  for (let i = 0; i < ITERS; i++) {
    dictImpl(CATALOG, byCurrency);
  }
  const endDict = performance.now();

  const startMap = performance.now();
  for (let i = 0; i < ITERS; i++) {
    mapImpl(CATALOG, byCurrency);
  }
  const endMap = performance.now();

  console.log(`Old: ${(endOld - startOld).toFixed(2)}ms`);
  console.log(`Dict: ${(endDict - startDict).toFixed(2)}ms`);
  console.log(`Map: ${(endMap - startMap).toFixed(2)}ms`);
}

runBench();
