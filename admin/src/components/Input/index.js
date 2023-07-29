/**
 *
 * Initializer
 *
 */

import React, { useState, useEffect } from "react";
import PropTypes, { node } from "prop-types";
import { useIntl } from "react-intl";
import "./keywords.css";
import { TextInput } from "@strapi/design-system";
const saveDataObj = (name, value, type) => {
  return {
    name: name,
    value: JSON.stringify(value),
    type: type,
  };
};

const InputTextTag = ({
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

const KeywordsBox = ({ selectedTags, onRemoveTag }) => {
  return (
    <div>
      <div
        className="tags-input"
        style={{
          marginTop: "15px",
        }}
      >
        <ul id="tags">
          {!selectedTags || selectedTags.length === 0 ? (
            <div>Não há tags</div>
          ) : (
            <div></div>
          )}
          {selectedTags.map((tag, index) => (
            <li key={index} className="tag">
              <span className="tag-title">{tag}</span>
              <span
                className="tag-close-icon"
                onClick={() => onRemoveTag(index)}
              >
                x
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const InputKeywords = ({
  value,
  onChange,
  name,
  intlLabel,
  attribute,
  description,
  placeholder,
  disabled,
  error,
  required,
}) => {
  const { formatMessage } = useIntl();
  const [initialTags, setInitialTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [valueToSave, setValueToSave] = useState(null);
  const [valueText, setValueText] = useState("");
  const [maxLength, sextMaxLength] = useState(null);
  const [maxQuantityTags, setMaxQuantityTags] = useState(null);
  const [maxTagsExceded, setMaxTagsExceded] = useState(false);

  useEffect(() => {
    if (attribute && attribute !== "") {
      sextMaxLength(
        attribute.options.maxLength ? attribute.options.maxLength : null
      );
      setMaxQuantityTags(
        attribute.options.maxTags ? attribute.options.maxTags : null
      );
    }
  }, [attribute]);

  const addTags = (event) => {
    const isMaxTagExceded = selectedTags.length === maxQuantityTags;
    if (!isMaxTagExceded) {
      if (event.target.value !== "") {
        const { value } = event.target;
        const valueSanitized = value.replace(" ", "");

        if (valueSanitized.length < maxLength) {
          const tagsAux = [...selectedTags];
          tagsAux.push(valueSanitized);

          setSelectedTags(tagsAux);
          setValueText("");
          setValueToSave(tagsAux);
        }
      }
    }
  };

  const removeTags = (indexToRemove) => {
    if (selectedTags.length > 0) {
      const arrayAux = [...selectedTags];
      arrayAux.splice(indexToRemove, 1);
      setSelectedTags(arrayAux);
      setValueToSave(arrayAux);
    }
  };

  useEffect(() => {
    if (valueToSave && valueToSave !== null) {
      onChange({
        target: saveDataObj(name, valueToSave, attribute.type),
      });
    }
  }, [valueToSave]);

  useEffect(() => {
    if (value && value !== null) {
      const valueParsed = JSON.parse(value);

      if (Array.isArray(valueParsed)) {
        setSelectedTags(valueParsed);
      }
    }
  }, [value]);

  useEffect(() => {
    setMaxTagsExceded(selectedTags.length === maxQuantityTags ? true : false);
  }, [selectedTags]);

  return (
    <div>
      <InputTextTag
        required={required}
        isMaxTagsExceded={maxTagsExceded}
        description={
          maxTagsExceded
            ? "Max tags exceded. If you want to add tags, you need to remove one."
            : null
        }
        maxLength={maxLength}
        error={error}
        label={name}
        placeHolder={"Enter tag value and press space to add"}
        setValueText={setValueText}
        valueText={valueText}
        onAddTag={addTags}
      />
      <KeywordsBox onRemoveTag={removeTags} selectedTags={selectedTags} />
    </div>
  );
};

InputKeywords.defaultProps = {
  description: null,
  disabled: false,
  error: null,
  labelAction: null,
  required: false,
  value: "",
};

InputKeywords.propTypes = {
  intlLabel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  attribute: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.object,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  labelAction: PropTypes.object,
  value: PropTypes.string,
};

export default InputKeywords;
