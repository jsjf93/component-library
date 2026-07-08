import { useMemo, useState, type FormEvent } from "react";
import { Button, Input, Select } from "@borderline/ui";
import { Plus } from "@borderline/icons";
import type { Pair } from "../lib/kraken";
import { usePortfolio } from "../state/PortfolioContext";
import { useSettings } from "../state/SettingsContext";

type AddHoldingFormProps = {
  /** Full pair list (read from Kraken `AssetPairs` higher up via `use()`). */
  pairs: Pair[];
};

/** Form to add a holding: pick an asset priced in the active currency, enter an amount. */
export function AddHoldingForm({ pairs }: AddHoldingFormProps) {
  const { addHolding } = usePortfolio();
  const { currency } = useSettings();
  const [base, setBase] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string>();

  // Only assets quoted in the active display currency, de-duplicated by base.
  const available = useMemo(() => {
    const seen = new Set<string>();
    return pairs.filter((p) => {
      if (p.quote !== currency || seen.has(p.base)) return false;
      seen.add(p.base);
      return true;
    });
  }, [pairs, currency]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const pair = available.find((p) => p.base === base);
    const parsed = Number(amount);
    if (!pair) {
      setError("Choose an asset to add.");
      return;
    }
    if (!Number.isFinite(parsed) || parsed <= 0) {
      setError("Enter an amount greater than zero.");
      return;
    }
    addHolding({
      symbol: pair.wsSymbol,
      restName: pair.restName,
      base: pair.base,
      quote: pair.quote,
      amount: parsed,
    });
    setBase("");
    setAmount("");
    setError(undefined);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-2">
        <Select
          label="Asset"
          placeholder="Select an asset"
          value={base}
          onChange={(e) => setBase(e.target.value)}
          className="sm:w-48"
        >
          {available.map((p) => (
            <option key={p.base} value={p.base}>
              {p.base} / {p.quote}
            </option>
          ))}
        </Select>

        <Input
          label={base ? `Amount (${base})` : "Amount"}
          type="number"
          inputMode="decimal"
          step="any"
          min="0"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          error={error}
          className="sm:w-40"
        />
      </div>

      <Button type="submit" className="sm:w-auto mt-2">
        <Plus className="size-4" />
        Add holding
      </Button>
    </form>
  );
}
