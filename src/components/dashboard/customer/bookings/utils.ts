
export function isNeedsAttention(status: string | undefined) {
  if (!status) return false;
  return (
    status === "pending" || status === "cancelled" || status === "needs-action"
  );
}
