import { performance } from "perf_hooks";

type Pair = { base: string, quote: string };

const CATALOG = [
  "BTC", "ETH", "SOL", "ADA", "AVAX", "DOT", "ATOM", "NEAR", "ALGO",
  "LINK", "UNI", "AAVE", "MKR", "CRV",
  "XRP", "LTC", "BCH", "XLM",
  "DOGE", "SHIB", "PEPE",
  "USDT", "USDC", "DAI"
];

// generate 5000 random pairs, making sure all CATALOG are in there
const byCurrency: Pair[] = [];
for (let i = 0; i < 5000; i++) {
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

function mapImpl(CATALOG: string[], byCurrency: Pair[]) {
  const byBase = new Map<string, Pair>();
  for (let i = 0; i < byCurrency.length; i++) {
    byBase.set(byCurrency[i].base, byCurrency[i]);
  }
  return CATALOG.map((b) => byBase.get(b)).filter(
    (p): p is Pair => Boolean(p)
  );
}

function mapImpl2(CATALOG: string[], byCurrency: Pair[]) {
  const map = new Map<string, Pair>();
  for (const p of byCurrency) {
    map.set(p.base, p);
  }
  const result: Pair[] = [];
  for (const b of CATALOG) {
    const p = map.get(b);
    if (p) result.push(p);
  }
  return result;
}

function recordImpl(CATALOG: string[], byCurrency: Pair[]) {
  const byBase: Record<string, Pair> = {};
  for (let i = 0; i < byCurrency.length; i++) {
    byBase[byCurrency[i].base] = byCurrency[i];
  }
  return CATALOG.map((b) => byBase[b]).filter(
    (p): p is Pair => Boolean(p)
  );
}

function runBench() {
  const ITERS = 10000;

  const startOld = performance.now();
  for (let i = 0; i < ITERS; i++) {
    oldImpl(CATALOG, byCurrency);
  }
  const endOld = performance.now();

  const startMap = performance.now();
  for (let i = 0; i < ITERS; i++) {
    mapImpl(CATALOG, byCurrency);
  }
  const endMap = performance.now();

  const startMap2 = performance.now();
  for (let i = 0; i < ITERS; i++) {
    mapImpl2(CATALOG, byCurrency);
  }
  const endMap2 = performance.now();

  const startRecord = performance.now();
  for (let i = 0; i < ITERS; i++) {
    recordImpl(CATALOG, byCurrency);
  }
  const endRecord = performance.now();


  console.log(`Old: ${(endOld - startOld).toFixed(2)}ms`);
  console.log(`Map: ${(endMap - startMap).toFixed(2)}ms`);
  console.log(`Map2: ${(endMap2 - startMap2).toFixed(2)}ms`);
  console.log(`Record: ${(endRecord - startRecord).toFixed(2)}ms`);
}

runBench();
