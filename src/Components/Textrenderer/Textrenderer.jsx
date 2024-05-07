import { useEffect, useState } from "react";
import parse from "html-react-parser";

export default function Textrenderer({ text, searchTerm }) {
  const [textToRender, setTextToRender] = useState(text);
  const [totalWordCount, setTotalWordCount] = useState(0);
  const [totalSearchTermCount, setTotalSearchTermCount] = useState(0);

  const processText = (text, searchTerm) => {
    const regex = new RegExp(`(${searchTerm})`, "gi"); // Case insensitive search
    const matches = text.match(regex) || [];
    const count = matches.length;
    const highlightedText = text.replace(
      regex,
      `<span class="highlight">$1</span>`,
    );
    searchTerm.length > 0
      ? setTotalSearchTermCount(count)
      : setTotalSearchTermCount(0);

    setTotalWordCount(text.split(/\s+/).filter((word) => word !== "").length);
    return parse(highlightedText);
  };

  useEffect(() => {
    setTextToRender(processText(text, searchTerm));
  }, [text, searchTerm]);

  return (
    <>
      {text.length > 0 ? (
        <div className="flex flex-col">
          <div className="text-gray-400  pr-6 mb-2 ">
            Word Found: {totalSearchTermCount} / Total Words: {totalWordCount}
          </div>
          <div className="text-lg ">{textToRender}</div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
