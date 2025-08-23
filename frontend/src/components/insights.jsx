import { useState, useEffect } from "react";
import { getSummary } from "../api/documents";

export default function SummaryView({ docId }) {
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      if (!docId) return;
      try {
        const res = await getSummary(docId);
        setSummary(res.data.summary);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSummary();
  }, [docId]);

  if (!docId) return null;

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md mt-4">
      <h2 className="text-xl font-bold mb-2">Summary</h2>
      <p>{summary || "Fetching summary..."}</p>
    </div>
  );
}
