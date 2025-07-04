import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PDFUploader from "@/components/PDFUploader";
import UploadPage from './pages/UploadPage';

const queryClient = new QueryClient();

const App = () => {
  const [pdfUrl, setPdfUrl] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/upload"
              element={
                <div className="p-6 space-y-4">
                  <h1 className="text-2xl font-bold">Upload a PDF</h1>
                  <PDFUploader onUploaded={setPdfUrl} />
                  {pdfUrl && (
                    <div className="mt-4">
                      <p className="text-green-600 font-medium">PDF uploaded!</p>
                      <a href={pdfUrl} target="_blank" className="text-blue-500 underline">
                        View PDF
                      </a>
                    </div>
                  )}
                </div>
              }
            />
            {/* CATCH-ALL ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
