export function getInitial(text?: string): string {
  if (!text) return "";
  return text.trim().charAt(0).toUpperCase();
}
