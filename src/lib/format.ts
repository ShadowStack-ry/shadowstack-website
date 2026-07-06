// Format an ISO date string as e.g. "5 Jul 2026". Stable across server/client.
export function formatDate(iso: string | undefined): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
