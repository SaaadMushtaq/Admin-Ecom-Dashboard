export function formatCurrency(value: number): string {
  const numericValue = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
}

export function formatNumber(value: number): string {
  const numericValue = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericValue);
}

export function formatPercentage(value: number): string {
  const numericValue = Number.isFinite(value) ? value : 0;
  return `${(numericValue * 100).toFixed(2)}%`;
}

export function formatShortNumber(value: number): string {
  const numericValue = Number.isFinite(value) ? value : 0;

  if (numericValue >= 1_000_000) {
    return `${(numericValue / 1_000_000).toFixed(1)}M`;
  }
  if (numericValue >= 1_000) {
    return `${(numericValue / 1_000).toFixed(1)}K`;
  }
  return numericValue.toFixed(0);
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export function safeFormat(
  value: unknown,
  formatter: (num: number) => string
): string {
  return isNumber(value) ? formatter(value) : formatter(0);
}
