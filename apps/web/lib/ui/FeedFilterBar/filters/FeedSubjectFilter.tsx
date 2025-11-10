import { EventSubjectText } from "@/lib/ui/EventSubject";
import { FeedEventSubject } from "@feed/types";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { SyntheticEvent, useCallback, useMemo } from "react";

type Option = {
  label: string;
  subject: FeedEventSubject;
};

type FeedStatusFilterProps = {
  className?: string;
  onChange: (value: FeedEventSubject | "") => void;
  value: FeedEventSubject | "";
};

const options = Object.values(FeedEventSubject).map(
  (value): Option => ({
    label: EventSubjectText({ subject: value }),
    subject: value,
  })
);

export function FeedSubjectFilter({
  className,
  onChange,
  value,
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
      className={className}
      onChange={handleChange}
      options={options}
      renderInput={(params) => <TextField {...params} label="Subject" />}
      size="small"
      value={selectedValue}
    />
  );
}
