import React from "react";
import { TextInput } from "@strapi/design-system";

export const InputTextTag = ({
  label,
  name,
  description,
  maxLength,
  isMaxTagsExceded,
  error,
  placeHolder,
  valueText,
  setValueText,
  onAddTag,
  required,
}) => {
  return (
    <div>
      <TextInput
        disabled={isMaxTagsExceded}
        placeholder={placeHolder}
        hint={description}
        label={label}
        required={required}
        error={
          maxLength && valueText.length > maxLength
            ? "Tag max length exceded"
            : undefined || error
            ? error
            : undefined
        }
        onChange={(e) => setValueText(e.target.value)}
        onKeyUp={(event) => {
          event.key === " " ? onAddTag(event) : null;
        }}
        value={valueText}
      />
    </div>
  );
};
