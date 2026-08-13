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
for (let i = 0; i < 1000; i++) {
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
  const byBase = new Map<string, Pair>();
  for (const p of byCurrency) byBase.set(p.base, p);
  return CATALOG.map((b) => byBase.get(b)).filter(
    (p): p is Pair => Boolean(p)
  );
}

function recordImpl(CATALOG: string[], byCurrency: Pair[]) {
  const byBase: Record<string, Pair> = {};
  for (const p of byCurrency) byBase[p.base] = p;
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

  const startNew = performance.now();
  for (let i = 0; i < ITERS; i++) {
    newImpl(CATALOG, byCurrency);
  }
  const endNew = performance.now();

  const startRecord = performance.now();
  for (let i = 0; i < ITERS; i++) {
    recordImpl(CATALOG, byCurrency);
  }
  const endRecord = performance.now();

  console.log(`Old: ${(endOld - startOld).toFixed(2)}ms`);
  console.log(`New (Map): ${(endNew - startNew).toFixed(2)}ms`);
  console.log(`Record: ${(endRecord - startRecord).toFixed(2)}ms`);
}

runBench();
