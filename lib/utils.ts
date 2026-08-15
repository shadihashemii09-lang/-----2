export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("fa-IR").format(value) + " تومان";
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("fa-IR").format(value);
}
