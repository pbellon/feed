/**
 * Utility to convert arbitrary data record to URL search param string
 */
export function constructSearchParams(
  rec: Record<string, string | undefined>,
): string | undefined {
  const res: Record<string, string> = {};
  let entries = 0;

  Object.entries(rec).forEach(([k, v]) => {
    if (v) {
      if (typeof v === "string" && v.length > 0) {
        entries += 1;
        res[k] = v;
      }
    }
  });

  if (entries > 0) {
    return new URLSearchParams(res).toString();
  }

  return undefined;
}
