import { Suspense, use, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Input, Skeleton, Tab, TabList, Tabs } from "@borderline/ui";
import { PageHeading } from "../components/PageHeading";
import { PriceTicker } from "../components/PriceTicker";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { useSettings } from "../state/SettingsContext";
import { assetPairsResource, resetAssetPairs } from "../lib/data";
import type { Pair } from "../lib/kraken";
import type { Currency } from "../lib/format";

type Category = "all" | "layer1" | "defi" | "payments" | "meme" | "stablecoin";

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "all", label: "All" },
  { value: "layer1", label: "Layer 1" },
  { value: "defi", label: "DeFi" },
  { value: "payments", label: "Payments" },
  { value: "meme", label: "Meme" },
  { value: "stablecoin", label: "Stablecoins" },
];

const SECTORS: Record<Exclude<Category, "all">, string[]> = {
  layer1: ["BTC", "ETH", "SOL", "ADA", "AVAX", "DOT", "ATOM", "NEAR", "ALGO"],
  defi: ["LINK", "UNI", "AAVE", "MKR", "CRV"],
  payments: ["XRP", "LTC", "BCH", "XLM"],
  meme: ["DOGE", "SHIB", "PEPE"],
  stablecoin: ["USDT", "USDC", "DAI"],
};

const SECTOR_OF: Record<string, Exclude<Category, "all">> = Object.fromEntries(
  Object.entries(SECTORS).flatMap(([sector, bases]) =>
    bases.map((base) => [base, sector as Exclude<Category, "all">]),
  ),
);

const CATALOG = Object.values(SECTORS).flat();

function MarketList() {
  const { currency } = useSettings();
  const pairs = use(assetPairsResource());
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("all");

  const rows = useMemo(() => {
    const byCurrency = pairs.filter((p) => p.quote === currency);
    const q = query.trim().toUpperCase();

    const base = q
      ? byCurrency.filter((p) => p.base.includes(q)).slice(0, 30)
      : CATALOG.map((b) => byCurrency.find((p) => p.base === b)).filter(
          (p): p is Pair => Boolean(p),
        );

    if (category === "all") return base;
    return base.filter((p) => SECTOR_OF[p.base] === category);
  }, [pairs, currency, query, category]);

  const activeLabel = CATEGORIES.find((c) => c.value === category)?.label ?? "";

  return (
    <>
      <Input
        variant="search"
        label="Search assets"
        placeholder="e.g. BTC, ETH, SOL"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-sm"
      />

      <div className="mt-6">
        <Tabs
          value={category}
          onValueChange={(v) => setCategory(v as Category)}
        >
          <TabList aria-label="Filter assets by sector">
            {CATEGORIES.map((c) => (
              <Tab key={c.value} value={c.value}>
                {c.label}
              </Tab>
            ))}
          </TabList>
        </Tabs>
      </div>

      <Card className="mt-4 p-2">
        <ul className="divide-y divide-border">
          {rows.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-muted-foreground">
              {query
                ? `No assets match “${query}”${category === "all" ? "" : ` in ${activeLabel}`} for ${currency}.`
                : `No ${activeLabel} assets available in ${currency}.`}
            </li>
          )}
          {rows.map((pair) => (
            <li key={pair.wsSymbol}>
              <Link
                to={`/markets/${encodeURIComponent(pair.wsSymbol)}`}
                className="flex items-center justify-between gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-semibold text-secondary-foreground">
                    {pair.base.slice(0, 3)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-foreground">
                      {pair.base}
                    </span>
                    <span className="block text-sm text-muted-foreground">
                      {pair.wsSymbol}
                    </span>
                  </span>
                </span>
                <PriceTicker
                  symbol={pair.wsSymbol}
                  quote={pair.quote as Currency}
                />
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}

export default function Markets() {
  return (
    <div className="space-y-2 p-6 md:p-8">
      <PageHeading
        title="Markets"
        subtitle="Live prices for popular pairs, straight from Kraken."
      />
      <div className="pt-4">
        <ErrorBoundary label="market data" onReset={resetAssetPairs}>
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <MarketList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
