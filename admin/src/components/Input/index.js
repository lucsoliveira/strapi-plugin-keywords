import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import "./keywords.css";
import { KeywordsBox } from "../KeywordsBox";
import { InputTextTag } from "../InputTextTag";
const saveDataObj = (name, value, type) => {
  return {
    name: name,
    value: JSON.stringify(value),
    type: type,
  };
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
  const [selectedTags, setSelectedTags] = useState([]);
  const [valueToSave, setValueToSave] = useState(null);
  const [valueText, setValueText] = useState("");
  const [maxLength, sextMaxLength] = useState(null);
  const [maxQuantityTags, setMaxQuantityTags] = useState(null);
  const [maxTagsExceded, setMaxTagsExceded] = useState(false);
  const [isToUnifyEqualTags, setIsToUnifyEqualTags] = useState(false);

  useEffect(() => {
    if (attribute && attribute !== "") {
      const { maxLength, maxTags, unifyEqualTags } = attribute?.options;
      sextMaxLength(maxLength ? maxLength : null);
      setMaxQuantityTags(maxTags ? maxTags : null);
      setIsToUnifyEqualTags(unifyEqualTags ? unifyEqualTags : false);
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

  const unifyEqualValues = (array) => {
    const uniqueValues = [];
    const indexValueObj = {};

    for (const element of array) {
      if (!indexValueObj.hasOwnProperty(element.toLowerCase())) {
        indexValueObj[element] = uniqueValues.length;
        uniqueValues.push(element);
      }
    }

    return uniqueValues;
  };

  useEffect(() => {
    if (valueToSave && valueToSave !== null) {
      let valueAux;

      if (isToUnifyEqualTags) {
        valueAux = unifyEqualValues(valueToSave);
      } else {
        valueAux = valueToSave;
      }
      onChange({
        target: saveDataObj(name, valueAux, attribute.type),
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
