import { performance } from "perf_hooks";

type Pair = { base: string, quote: string };

const CATALOG = Array.from({ length: 24 }, (_, i) => `BASE_${2000 - i - 1}`);
const byCurrency: Pair[] = Array.from({ length: 2000 }, (_, i) => ({ base: `BASE_${i}`, quote: 'USD' }));

function oldImpl(CATALOG: string[], byCurrency: Pair[]) {
  return CATALOG.map((b) => byCurrency.find((p) => p.base === b)).filter(
    (p): p is Pair => Boolean(p)
  );
}

function newImpl(CATALOG: string[], byCurrency: Pair[]) {
  const map = new Map<string, Pair>();
  for (let i = 0; i < byCurrency.length; i++) {
    map.set(byCurrency[i].base, byCurrency[i]);
  }
  return CATALOG.map((b) => map.get(b)).filter(
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

  console.log(`Old: ${endOld - startOld}ms`);
  console.log(`New: ${endNew - startNew}ms`);
}

runBench();
