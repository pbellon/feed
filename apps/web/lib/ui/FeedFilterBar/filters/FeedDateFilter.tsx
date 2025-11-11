import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { PickerValue } from "@mui/x-date-pickers/internals";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import type {
  DateValidationError,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers/models";
import { enGB } from "date-fns/locale";
import { useCallback, useEffect, useState } from "react";

import { formatLocalDate, parseLocalDate } from "@/lib/date";

type FeedDateFilterProps = {
  className?: string;
  label?: string;
  onChange: (value: string | "") => void;
  value: string | "";
};

export function FeedDateFilter({
  className,
  label,
  onChange,
  value,
}: FeedDateFilterProps) {
  const [currentValue, setCurrentValue] = useState(
    () => parseLocalDate(value) ?? null,
  );

  const handleChange = useCallback(
    (
      value: PickerValue,
      ctx: PickerChangeHandlerContext<DateValidationError>,
    ) => {
      setCurrentValue(value);
      try {
        if (ctx.validationError === null) {
          const date = value ? formatLocalDate(value) : "";
          onChange(date);
        }
      } catch (err) {
        console.warn("[FeedDateFilter] invalid date", err);
        // do nothing, current value is not a valid date and should not trigger
        // onChange
      }
    },
    [onChange],
  );

  // sync locale state with outside value
  useEffect(() => {
    setCurrentValue(parseLocalDate(value) ?? null);
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <DatePicker
        className={className}
        label={label}
        onChange={handleChange}
        slotProps={{
          field: { clearable: true },
          textField: { size: "small" },
        }}
        value={currentValue}
      />
    </LocalizationProvider>
  );
}
