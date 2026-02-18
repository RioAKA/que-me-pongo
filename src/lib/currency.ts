/**
 * Format a number as Argentine Pesos (ARS)
 * Uses dot for thousands separator and comma for decimals
 * e.g., 15000.5 → "$ 15.000,50"
 */
export function formatARS(amount: number): string {
  const formatted = amount.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `$ ${formatted}`;
}
