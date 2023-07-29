import React from "react";
export const KeywordsBox = ({ selectedTags, onRemoveTag }) => {
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
