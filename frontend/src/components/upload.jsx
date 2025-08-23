import { useState } from "react";
import { uploadDocument } from "../api/documents";

export default function UploadDoc() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadDocument(formData);
      alert("Upload successful: " + response.data.message);
    } catch (error) {
      console.error(error);
      alert("Upload failed!");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
