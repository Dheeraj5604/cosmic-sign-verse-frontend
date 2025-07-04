
import { useState } from 'react';
import { PenTool, Type, Upload, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DrawSignature from './DrawSignature';
import TypeSignature from './TypeSignature';
import UploadSignature from './UploadSignature';

export interface Signature {
  type: 'draw' | 'type' | 'upload';
  data: string;
  width?: number;
  height?: number;
}

interface SignatureOptionsProps {
  onSignatureCreate: (signature: Signature) => void;
  onClose: () => void;
}

const SignatureOptions = ({ onSignatureCreate, onClose }: SignatureOptionsProps) => {
  const [activeTab, setActiveTab] = useState<'draw' | 'type' | 'upload'>('draw');

  const tabs = [
    { id: 'draw', label: 'Draw', icon: PenTool },
    { id: 'type', label: 'Type', icon: Type },
    { id: 'upload', label: 'Upload', icon: Upload },
  ];

  return (
    <div className="cosmic-card p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-foreground">Create Your Signature</h3>
        <Button variant="ghost" onClick={onClose} className="text-muted-foreground">
          ×
        </Button>
      </div>

      <div className="flex border-b border-border mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-cosmos-500 text-cosmos-400'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="min-h-[300px]">
        {activeTab === 'draw' && (
          <DrawSignature onSignatureCreate={onSignatureCreate} />
        )}
        {activeTab === 'type' && (
          <TypeSignature onSignatureCreate={onSignatureCreate} />
        )}
        {activeTab === 'upload' && (
          <UploadSignature onSignatureCreate={onSignatureCreate} />
        )}
      </div>
    </div>
  );
};

export default SignatureOptions;
