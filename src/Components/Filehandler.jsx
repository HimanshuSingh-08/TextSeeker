import { useState, useEffect } from "react";
import "../CSS/Filehandler.css";

export default function Filehandler({ keyword }) {
  // Need a state to store the file and the count of keywords.
  const [fileContent, setFileContent] = useState("");
  const [keywordCount, setKeywordCount] = useState(0);
  const [highlightedContent, setHighlightedContent] = useState("");

  useEffect(() => {
    const countOccurrences = (content, keyword) => {
      if (keyword === '') {
        setKeywordCount(0);
        setHighlightedContent(content); // Display original content when no keyword
        return;
      }

      const regex = new RegExp(`(${keyword})`, 'gi'); // Case insensitive search
      const matches = content.match(regex) || [];
      const count = matches.length;
      setKeywordCount(count);

      // Replace all occurrences of keyword with highlighted version
      const highlighted = content.replace(regex, `<span class="highlight">$1</span>`);
      setHighlightedContent(highlighted);
    };

    // Ensure fileContent is processed only if non-empty and keyword is updated
    if (fileContent) {
      countOccurrences(fileContent, keyword);
    }
  }, [fileContent, keyword]); // Dependencies: only re-run if these change


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
      <div>
        <h3>Select File : </h3>
        <input
          type="file"
          name="text-file"
          id="txt"
          onChange={handleFileChange}
        />

        <div className="file-layout">
          <p className="file-content">
            <h3>File Content is : </h3>
            <div dangerouslySetInnerHTML={{ __html: highlightedContent }} />
          </p>
        </div>
        <div>
          <h1>
            The total number of occurrences of "{keyword}" are : {keywordCount}
          </h1>
        </div>
      
      </div>
    </>
  );
}
