import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CMSContext = createContext();

const STORAGE_KEY = 'cms_content_draft';

export const CMSProvider = ({ children }) => {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDraft, setIsDraft] = useState(false);

  // Load content from public/content.json or localStorage draft
  useEffect(() => {
    const loadContent = async () => {
      try {
        // Check for draft in localStorage first
        const draft = localStorage.getItem(STORAGE_KEY);
        if (draft) {
          setContent(JSON.parse(draft));
          setIsDraft(true);
          setIsLoading(false);
          return;
        }

        // Load from content.json
        const response = await fetch('/content.json');
        if (!response.ok) {
          throw new Error('Failed to load content');
        }
        const data = await response.json();
        setContent(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  // Update content (saves to localStorage as draft)
  const updateContent = useCallback((newContent) => {
    setContent(newContent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
    setIsDraft(true);
  }, []);

  // Update a specific section
  const updateSection = useCallback((section, data) => {
    setContent(prev => {
      const updated = { ...prev, [section]: data };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setIsDraft(true);
      return updated;
    });
  }, []);

  // Discard draft and reload original
  const discardDraft = useCallback(async () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsLoading(true);
    try {
      const response = await fetch('/content.json');
      const data = await response.json();
      setContent(data);
      setIsDraft(false);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  // Export content as JSON file for download
  const exportContent = useCallback(() => {
    const dataStr = JSON.stringify(content, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'content.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [content]);

  // Publish content (clears draft flag - actual publish requires file update)
  const publishContent = useCallback(() => {
    exportContent();
    alert('Content exported! Replace public/content.json with the downloaded file and redeploy to publish.');
  }, [exportContent]);

  const value = {
    content,
    isLoading,
    error,
    isDraft,
    updateContent,
    updateSection,
    discardDraft,
    exportContent,
    publishContent
  };

  return (
    <CMSContext.Provider value={value}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};

export default CMSContext;
