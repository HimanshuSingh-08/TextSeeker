import { useEffect, useRef } from "react";

export default function TextFileInput({ setTextFileContent }) {
  const inputFileRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedExtensions = /\.txt$/i;
    if (!file) {
      setTextFileContent("");
      return;
    }
    // only allow .txt files to be uploaded
    if (!allowedExtensions.exec(file.name)) {
      alert("Invalid file type. Please upload a.txt file.");
      setTextFileContent("");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setTextFileContent(e.target.result);
    };
    reader.readAsText(file);
  };

  const handleKeyDown = (e) => {
    if (
      e.keyCode === 85 &&
      (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
    ) {
      e.preventDefault();
      console.log("click shortcut");
      inputFileRef.current.click();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown, false);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div>
      <input
        type="file"
        ref={inputFileRef}
        name="text-file"
        id="txt"
        className="mb-6 cursor-pointer"
        onChange={handleFileChange}
      />
    </div>
  );
}
