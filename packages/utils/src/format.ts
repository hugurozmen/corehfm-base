export function formatCurrency(value: number, currency = "TRY", locale = "tr-TR"): string {
  return new Intl.NumberFormat(locale, {
    currency,
    style: "currency",
  }).format(value);
}

export function formatDate(value: Date | string | number, locale = "tr-TR"): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
  }).format(new Date(value));
}
