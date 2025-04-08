
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface MoleculeViewerProps {
  smiles?: string;
  name?: string;
  formula?: string;
  imageUrl?: string;
  className?: string;
}

const MoleculeViewer: React.FC<MoleculeViewerProps> = ({
  smiles,
  name = "Molecule",
  formula,
  imageUrl,
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle>{name}</CardTitle>
        {formula && <CardDescription>{formula}</CardDescription>}
      </CardHeader>
      <CardContent className="flex justify-center p-2">
        {imageUrl ? (
          <div className="w-full aspect-square flex items-center justify-center bg-muted/50 rounded-md overflow-hidden">
            <img 
              src={imageUrl} 
              alt={`Structure of ${name}`}
              className={`max-w-full max-h-full object-contain ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setError(true);
              }}
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              </div>
            )}
            {error && (
              <div className="text-center text-muted-foreground">
                Unable to load molecule structure
              </div>
            )}
          </div>
        ) : (
          <div className="w-full aspect-square flex items-center justify-center bg-muted/50 rounded-md">
            <p className="text-muted-foreground">No structure available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoleculeViewer;
