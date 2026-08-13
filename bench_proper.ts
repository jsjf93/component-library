import { performance } from "perf_hooks";

type Pair = { base: string, quote: string };

const CATALOG = [
  "BTC", "ETH", "SOL", "ADA", "AVAX", "DOT", "ATOM", "NEAR", "ALGO",
  "LINK", "UNI", "AAVE", "MKR", "CRV",
  "XRP", "LTC", "BCH", "XLM",
  "DOGE", "SHIB", "PEPE",
  "USDT", "USDC", "DAI"
];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const pairs: Pair[] = [];
for (let c1 of alphabet) {
    for (let c2 of alphabet) {
        for (let c3 of alphabet) {
            pairs.push({ base: c1+c2+c3, quote: 'USD' });
            if (pairs.length > 2000) break;
        }
        if (pairs.length > 2000) break;
    }
    if (pairs.length > 2000) break;
}

// Add CATALOG items if missing
for (const b of CATALOG) {
    if (!pairs.find(p => p.base === b)) {
        pairs.push({ base: b, quote: 'USD' });
    }
}
pairs.sort((a, b) => a.base.localeCompare(b.base));

const byCurrency = pairs;

function oldImpl(CATALOG: string[], byCurrency: Pair[]) {
  return CATALOG.map((b) => byCurrency.find((p) => p.base === b)).filter(
    (p): p is Pair => Boolean(p)
  );
}

function newImpl(CATALOG: string[], byCurrency: Pair[]) {
  const byBase = new Map<string, Pair>();
  for (let i = 0; i < byCurrency.length; i++) {
    byBase.set(byCurrency[i].base, byCurrency[i]);
  }
  return CATALOG.map((b) => byBase.get(b)).filter(
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

  console.log(`Old: ${(endOld - startOld).toFixed(2)}ms`);
  console.log(`New (Map): ${(endNew - startNew).toFixed(2)}ms`);
}

runBench();
