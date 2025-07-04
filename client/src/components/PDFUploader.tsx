import { useState } from 'react';
import axios from 'axios';
import exp from 'constants';

function PDFUploader({ onUploaded }: { onUploaded: (url: string) => void }) {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData);
      onUploaded(res.data.url); // Get the uploaded file URL
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div className="p-4 border rounded space-y-2">
      <input
        type="file"
        accept="application/pdf"
        onChange={e => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
        Upload PDF
      </button>
    </div>
  );
}
export default PDFUploader;