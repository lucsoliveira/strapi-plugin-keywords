import { Flex, Status, Typography } from "@strapi/design-system";
import React from "react";
export const KeywordsBox = ({ selectedTags, onRemoveTag, noTagsMessage }) => {
  return (
    <div
      style={{
        marginTop: "10px",
      }}
    >
      {!selectedTags || selectedTags.length === 0 ? (
        <Flex direction="column" alignItems="stretch" gap={3}>
          <Status variant="secondary" showBullet={false}>
            <Typography>{noTagsMessage}</Typography>
          </Status>
        </Flex>
      ) : (
        <div></div>
      )}

      {selectedTags.length > 0 ? (
        <div
          className="tags-input"
          style={{
            marginTop: "15px",
          }}
        >
          <ul id="tags">
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
      ) : (
        <div></div>
      )}
    </div>
  );
};
