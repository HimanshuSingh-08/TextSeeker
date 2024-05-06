import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Textrenderer from "../Textrenderer/Textrenderer";
import TextFileInput from "../TextFileInput/TextFileInput";
import SearchHistory from "../SearchHistory/SearchHistory";

export default function TextSeeker() {
  const [searchTerm, setSearchTerm] = useState("");
  const [textFileContent, setTextFileContent] = useState("");
  const [searchHistory , setSearchHistory] = useState(["this ", "my"]);

  return (
    <>
      <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} setSearchHistory={setSearchHistory} />
      <Textrenderer text={textFileContent} searchTerm={searchTerm} />
      <TextFileInput setTextFileContent={setTextFileContent} />
      <SearchHistory searchHistory={searchHistory} setSearchTerm ={setSearchTerm}/>
    </>
  );
}
