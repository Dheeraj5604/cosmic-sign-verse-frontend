import { useState } from 'react';
import PDFUploader from '@/components/PDFUploader';

export default function UploadPage() {
  const [pdfUrl, setPdfUrl] = useState('');

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Upload and Preview PDF</h2>
      <PDFUploader onUploaded={setPdfUrl} />

      {pdfUrl && (
        <iframe
          src={pdfUrl}
          width="100%"
          height="600px"
          title="PDF Preview"
          className="mt-8 border"
        />
      )}
    </div>
  );
}
