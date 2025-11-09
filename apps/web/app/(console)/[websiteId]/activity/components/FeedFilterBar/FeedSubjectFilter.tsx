import { EventSubjectText } from "@/lib/ui/EventSubject";
import { FeedEventSubject } from "@feed/types";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { SyntheticEvent, useCallback, useMemo } from "react";

type Option = {
  label: string;
  subject: FeedEventSubject;
};

type FeedStatusFilterProps = {
  sx?: AutocompleteProps<Option, false, false, false>["sx"];
  value: FeedEventSubject | "";
  onChange: (value: FeedEventSubject | "") => void;
};

const options = Object.values(FeedEventSubject).map(
  (value): Option => ({
    label: EventSubjectText({ subject: value }),
    subject: value,
  })
);

export function FeedSubjectFilter({
  sx,
  value,
  onChange,
}: FeedStatusFilterProps) {
  const handleChange = useCallback(
    (_: SyntheticEvent, value: Option | null) => {
      onChange(value?.subject ?? "");
    },
    [onChange]
  );
  const selectedValue = useMemo(() => {
    if (value === "") return null;
    return options.find((opt) => opt.subject === value);
  }, [value]);

  return (
    <Autocomplete
      sx={sx}
      size="small"
      options={options}
      value={selectedValue}
      onChange={handleChange}
      renderInput={(params) => <TextField {...params} label="Subject" />}
    />
  );
}
