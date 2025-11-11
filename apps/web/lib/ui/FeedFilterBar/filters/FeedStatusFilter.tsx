import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { SyntheticEvent, useCallback, useMemo } from "react";

import { FeedEventStatus } from "@feed/types";

import { EventStatusText } from "@/lib/ui/EventStatus";

type StatusOption = {
  label: string;
  status: FeedEventStatus;
};

type FeedStatusFilterProps = {
  className?: string;
  onChange: (value: FeedEventStatus | "") => void;
  value: FeedEventStatus | "";
};

const options = Object.values(FeedEventStatus).map(
  (value): StatusOption => ({
    label: EventStatusText({ status: value }),
    status: value,
  }),
);

export function FeedStatusFilter({
  className,
  onChange,
  value,
}: FeedStatusFilterProps) {
  const handleChange = useCallback(
    (
      _: SyntheticEvent,
      value: { label: string; status: FeedEventStatus } | null,
    ) => {
      onChange(value?.status ?? "");
    },
    [onChange],
  );
  const selectedValue = useMemo(() => {
    if (value === "") return null;
    return options.find((opt) => opt.status === value);
  }, [value]);

  return (
    <Autocomplete
      disablePortal
      size="small"
      className={className}
      options={options}
      value={selectedValue}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} label="Status" />}
    />
  );
}
