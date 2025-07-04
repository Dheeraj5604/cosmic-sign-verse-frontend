
import { useState } from 'react';
import Header from '../components/Header';
import FileUpload from '../components/FileUpload';
import SignatureOptions from '../components/SignatureOptions';
import DocumentViewer from '../components/DocumentViewer';
import FeatureList from '../components/FeatureList';
import Footer from '../components/Footer';
import AuthForm from '../components/AuthForm';
import { Signature } from '../components/SignatureOptions';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setSignatures([]);
  };

  const handleSignatureCreate = (signature: Signature) => {
    setSignatures([...signatures, signature]);
    setShowSignatureModal(false);
  };

  const handleAddSignature = () => {
    setShowSignatureModal(true);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header />

        {!isAuthenticated ? (
          <div className="space-y-8">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cosmos-300 to-nebula-300 bg-clip-text text-transparent">
                Get Started with DocSign Universe
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Sign in to access your documents or create an account to start your digital signing journey across the cosmos.
              </p>
            </div>
            
            <AuthForm />
            
            <div className="mt-12">
              <FeatureList />
            </div>
          </div>
        ) : (
          <>
            {!selectedFile ? (
              <>
                <FileUpload
                  onFileSelect={handleFileSelect}
                  selectedFile={selectedFile}
                  onRemoveFile={handleRemoveFile}
                />
                <div className="mt-12">
                  <FeatureList />
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <FileUpload
                  onFileSelect={handleFileSelect}
                  selectedFile={selectedFile}
                  onRemoveFile={handleRemoveFile}
                />
                
                <DocumentViewer
                  file={selectedFile}
                  signatures={signatures}
                  onAddSignature={handleAddSignature}
                />
              </div>
            )}

            {showSignatureModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                  <SignatureOptions
                    onSignatureCreate={handleSignatureCreate}
                    onClose={() => setShowSignatureModal(false)}
                  />
                </div>
              </div>
            )}
          </>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default Index;
