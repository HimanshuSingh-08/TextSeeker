import { useState, useEffect } from "react";
import "../CSS/Filehandler.css";

export default function Filehandler({ keyword }) {
  // Need a state to store the file and the count of keywords.
  const [fileContent, setFileContent] = useState("");
  const [keywordCount, setKeywordCount] = useState(0);

  useEffect(() => {
    // Function to count occurrences of the keyword
    const countOccurrences = (content, keyword) => {
      // If the keyword is empty, set the count to 0
      if (keyword === '') {
        setKeywordCount(0);
        return;
      }
      // Count occurrences of the keyword
      const count = content.split(keyword).length - 1;
      setKeywordCount(count);
    };

    // Call countOccurrences function with fileContent and keyword
    countOccurrences(fileContent, keyword);
  }, [fileContent, keyword]);

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
            <h3>File Content :</h3>: {fileContent}
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
