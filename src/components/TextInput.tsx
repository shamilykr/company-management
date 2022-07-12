import React, { FC } from "react";
import { FormControl, TextField } from "@mui/material";

interface TextInputProps {
  value?: string;
  width?: string;
  onChange?: (arg1) => void;
  label?: string;
  isError?: boolean;
  isRequied?: boolean;
  type?: string;
}
const TextInput: FC<TextInputProps> = ({
  value,
  width,
  onChange,
  label,
  isError,
  isRequied = false,
  type = "text",
}) => (
  <div>
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width }}>
      <TextField
        id="standard-basic"
        label={label}
        variant="standard"
        value={value}
        type={type}
        error={isError}
        required={isRequied}
        onChange={onChange}
      />
    </FormControl>
  </div>
);

export default TextInput;
