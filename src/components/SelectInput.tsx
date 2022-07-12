import React, { FC } from "react";
import { FormControl, MenuItem, TextField } from "@mui/material";

interface SelectInputProps {
  value?: string;
  width?: string;
  onChange?: (arg1) => void;
  label?: string;
  options?: { value: string }[];
  isError?: boolean;
  isRequied?: boolean;
}
const SelectInput: FC<SelectInputProps> = ({
  value,
  width,
  onChange,
  label,
  options,
  isRequied,
  isError,
}) => (
  <div>
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width }}>
      <TextField
        id="standard-select-currency"
        select
        label={label}
        value={value}
        onChange={onChange}
        error={isError}
        required={isRequied}
        variant="standard"
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  </div>
);

export default SelectInput;
