"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

interface FontContextType {
  isOpenDyslexic: boolean;
  toggleOpenDyslexic: () => void;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [isOpenDyslexic, setIsOpenDyslexic] = useState(false);

  const toggleOpenDyslexic = () => {
    setIsOpenDyslexic(prev => !prev);
  };

  useEffect(() => {
    // Apply font to body element
    if (isOpenDyslexic) {
      document.body.style.fontFamily = 'OpenDyslexic, sans-serif';
    } else {
      document.body.style.fontFamily = '';
    }
  }, [isOpenDyslexic]);

  return (
    <FontContext.Provider value={{ isOpenDyslexic, toggleOpenDyslexic }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = useContext(FontContext);
  if (context === undefined) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return context;
}
