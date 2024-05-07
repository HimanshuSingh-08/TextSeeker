import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Textrenderer from "../Textrenderer/Textrenderer";
import TextFileInput from "../TextFileInput/TextFileInput";
import SearchHistory from "../SearchHistory/SearchHistory";

export default function TextSeeker() {
  const [searchTerm, setSearchTerm] = useState("");
  const [textFileContent, setTextFileContent] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  return (
    <>
      <div className="flex items-center flex-col mt-6">
        <div className="text-3xl font-extrabold mb-10">Text Seeker</div>
        <div className="">
          <TextFileInput setTextFileContent={setTextFileContent} />
          {textFileContent.length > 0 ? (
            <SearchBar
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
              setSearchHistory={setSearchHistory}
            />
          ) : (
            <div className="font-bold text-lg">
              Please Select a File to Continue
            </div>
          )}
        </div>
        <div className="w-10/12 mt-16 flex flex-col md:flex-row">
          <div className="w-full md:w-10/12 md:mr-4">
            <Textrenderer text={textFileContent} searchTerm={searchTerm} />
          </div>
          <div>
            <SearchHistory
              searchHistory={searchHistory}
              setSearchTerm={setSearchTerm}
            />
          </div>
        </div>
        <div className="mt-10">
          <div className="font-normal mb-2">Shortcuts:</div>
          <div>
            Press{" "}
            <span className="bg-slate-200 px-2 rounded-md">Ctrl + F </span>
            {"  "}
            to focus on the search input
          </div>
          <div className="mt-2">
            Press{" "}
            <span className="bg-slate-200 px-2 rounded-md ">Ctrl + U </span>
            {"  "}
            to upload a text file
          </div>
        </div>
      </div>
    </>
  );
}
