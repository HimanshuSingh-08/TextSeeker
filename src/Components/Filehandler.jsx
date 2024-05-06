import { useState, useEffect } from "react";
import "../CSS/Filehandler.css";

export default function Filehandler({ keyword, onCountUpdate }) {
  // Need a state to store the file and the count of keywords.
  const [fileContent, setFileContent] = useState("");
  const [keywordCount, setKeywordCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [highlightedContent, setHighlightedContent] = useState("");

  useEffect(() => {
    const countOccurrences = (content, keyword) => {
      console.log(keyword);
      if (keyword === "") {
        setKeywordCount(0);
        setHighlightedContent(content); // Display original content when no keyword
        return;
      }

      const regex = new RegExp(`(${keyword})`, "gi"); // Case insensitive search
      const matches = content.match(regex) || [];
      const count = matches.length;
      setKeywordCount(count);
      onCountUpdate(count); // Call the callback function with the count

      // Replace all occurrences of keyword with highlighted version
      const highlighted = content.replace(
        regex,
        `<span class="highlight">$1</span>`
      );
      setHighlightedContent(highlighted);
    };

    // Ensure fileContent is processed only if non-empty and keyword is updated
    if (fileContent) {
      countOccurrences(fileContent, keyword);

      // Count words
      const words = fileContent.split(/\s+/).filter((word) => word !== "");
      setWordCount(words.length);
    }
  }, [fileContent, keyword, onCountUpdate]); // Dependencies: only re-run if these change

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Capture the input file using event
    const reader = new FileReader(); // create an instance to read the file

    reader.onload = (event) => {
      // async function to read the file
      const content = event.target.result;
      setFileContent(content); // set the result
    };

    reader.readAsText(selectedFile); // read as a text.
  };

  return (
    <>
      <div className="file-handler-container" >
        <h3>Select File : </h3>
        <input
          type="file"
          name="text-file"
          id="txt"
          className="file-input"
          onChange={handleFileChange}
        />

        <div className="file-layout">
          <div 
           className="file-content"
          dangerouslySetInnerHTML={{ __html: highlightedContent }} />
        </div>
        <div className="details">
          <h3>
            The total number of occurrences of "{keyword}" are : {keywordCount}
          </h3>
          <h3>The total number of words in the text are: {wordCount}</h3>
        </div>
      </div>
       
    </>
  );
}
