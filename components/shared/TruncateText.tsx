import React, { useState } from "react";
interface TruncateTextInterface {
  maxLength: number;
  children: React.ReactNode;
}
export const TruncateText: React.FC<TruncateTextInterface> = ({
  children,
  maxLength,
}) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const handleToggle = () => {
    setIsTruncated(!isTruncated);
  };

  let displayText;
  if (isTruncated) {
    displayText = React.Children.toArray(children).slice(0, maxLength);
  } else {
    displayText = children;
  }

  return (
    <span>
      {displayText}
      {React.Children.count(children) > maxLength && (
        <span
          className="text-blue-500 font-normal text-sm cursor-pointer"
          onClick={handleToggle}
        >
          {isTruncated ? " ... show more" : " show less"}
        </span>
      )}
    </span>
  );
};
