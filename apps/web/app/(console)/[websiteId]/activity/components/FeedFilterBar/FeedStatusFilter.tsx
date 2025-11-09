import { eventStatusAsText } from "@/lib/eventStatus";
import { FeedEventStatus } from "@feed/types";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { SyntheticEvent, useCallback, useMemo } from "react";

type Option = {
  label: string;
  status: FeedEventStatus;
};

type FeedStatusFilterProps = {
  sx?: AutocompleteProps<Option, false, false, false>["sx"];
  value: FeedEventStatus | "";
  onChange: (value: FeedEventStatus | "") => void;
};

const options = Object.values(FeedEventStatus).map((value) => ({
  label: eventStatusAsText(value),
  status: value,
}));

export function FeedStatusFilter({
  sx,
  value,
  onChange,
}: FeedStatusFilterProps) {
  const handleChange = useCallback(
    (
      _: SyntheticEvent,
      value: { label: string; status: FeedEventStatus } | null
    ) => {
      onChange(value?.status ?? "");
    },
    [onChange]
  );
  const selectedValue = useMemo(() => {
    if (value === "") return null;
    return options.find((opt) => opt.status === value);
  }, [value]);

  return (
    <Autocomplete
      sx={sx}
      options={options}
      value={selectedValue}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} label="Status" />}
    />
  );
}
