
export default function TextFileInput({setTextFileContent}) {

    
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
        setTextFileContent('');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        setTextFileContent(e.target.result);
    };
    reader.readAsText(file)

  };

  return (

    <div>
         <input
          type="file"
          name="text-file"
          id="txt"
          className="file-input"
          onChange={handleFileChange}
        />
    </div>
  )
}
