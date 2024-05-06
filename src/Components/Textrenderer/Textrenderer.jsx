import { useEffect, useState } from "react";
import parse from 'html-react-parser';

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
      `<span class="highlight">$1</span>`
    );
    setTotalSearchTermCount(count);
    setTotalWordCount(text.split(/\s+/).filter(word => word !== "").length)
    return parse(highlightedText);
  };

  useEffect(()=>{

    setTextToRender(processText(text ,searchTerm));
  },[text, searchTerm])


  return (
    <>
      {text.length > 0 ? <div>
         <div>{textToRender}</div>
         <div>{totalSearchTermCount}</div>
         <div>{totalWordCount}</div>
         </div> : <div>Please input file</div>
      }
     
    </>
  );
}
