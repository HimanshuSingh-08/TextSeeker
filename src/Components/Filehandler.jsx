import { useState } from "react";

export default function Filehandler() {
    // Need a state to store the file
    const [fileContent, setFileContent] = useState('');

    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const content = event.target.result;
        setFileContent(content);
      };
  
      reader.readAsText(selectedFile);
    };

  return (
    <>
      <div>
        <h1>This is file handle</h1>
        <input type="file" 
        name="text-file" 
        id="txt" 
        onChange={handleFileChange}
        />
        <p>This is the content of the file : {fileContent}</p>
      </div>
    </>
  );
}
