import { format } from "date-fns/format";
import { parseISO } from "date-fns/parseISO";
import { useMemo } from "react";

export function FeedDateCellContent({ date }: { date: string | undefined }) {
  return useMemo(() => {
    if (!date) {
      return "";
    }
    const parsed = parseISO(date);
    return format(parsed, "dd/MM/yyyy HH:mm");
  }, [date]);
}
