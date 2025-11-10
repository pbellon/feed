import { parseISO } from "date-fns/parseISO";
import { format } from "date-fns/format";
import { useMemo } from "react";

export function FeedDateCellContent({ date }: { date: string }) {
  return useMemo(() => {
    const parsed = parseISO(date);
    return format(parsed, "dd/MM/yyyy HH:mm");
  }, [date]);
}
