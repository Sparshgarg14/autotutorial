import { useEffect, useState } from "react";
import { listDocuments, downloadDocument, getInsights } from "../api/documents";

export default function DocumentList() {
  const [docs, setDocs] = useState([]);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    const res = await listDocuments();
    setDocs(res.data); // backend should return list of filenames
  };

  const handleDownload = async (filename) => {
    const res = await downloadDocument(filename);
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
  };

  const handleInsights = async (filename) => {
    const res = await getInsights(filename);
    setSummary(res.data.summary);
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md mt-4">
      <h2 className="text-xl font-bold mb-2">Uploaded Documents</h2>
      <ul>
        {docs.map((file, i) => (
          <li key={i} className="flex justify-between items-center mb-2">
            {file}
            <div>
              <button
                onClick={() => handleDownload(file)}
                className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
              >
                Download
              </button>
              <button
                onClick={() => handleInsights(file)}
                className="px-2 py-1 bg-green-500 text-white rounded"
              >
                Insights
              </button>
            </div>
          </li>
        ))}
      </ul>

      {summary && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <strong>Summary:</strong> {summary}
        </div>
      )}
    </div>
  );
}
