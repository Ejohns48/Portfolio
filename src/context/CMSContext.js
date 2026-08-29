import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { contentAPI, authAPI } from '../services/api';

const CMSContext = createContext();

const STORAGE_KEY = 'cms_content_draft';

// Check if backend API is available
const API_ENABLED = process.env.REACT_APP_API_URL || false;

export const CMSProvider = ({ children }) => {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDraft, setIsDraft] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [useAPI, setUseAPI] = useState(API_ENABLED);

  // Load content on mount
  useEffect(() => {
    const loadContent = async () => {
      try {
        // Check for draft in localStorage first (works in both modes)
        const draft = localStorage.getItem(STORAGE_KEY);
        if (draft) {
          setContent(JSON.parse(draft));
          setIsDraft(true);
          setIsLoading(false);
          return;
        }

        // Try API first if enabled
        if (useAPI) {
          try {
            const response = await contentAPI.getContent();
            if (response.success) {
              setContent(response.data);
              setIsLoading(false);
              return;
            }
          } catch (apiError) {
            console.log('API not available, falling back to static content');
            setUseAPI(false);
          }
        }

        // Fallback to static content.json
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
  }, [useAPI]);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (!useAPI || !authAPI.isLoggedIn()) return;
      
      try {
        const response = await authAPI.getMe();
        if (response.success) {
          setIsAuthenticated(true);
          setUser(response.user);
        }
      } catch (err) {
        // Token expired or invalid
        authAPI.logout();
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();
  }, [useAPI]);

  // Login function
  const login = useCallback(async (email, password) => {
    if (!useAPI) {
      throw new Error('Backend API not configured');
    }
    
    const response = await authAPI.login(email, password);
    if (response.success) {
      setIsAuthenticated(true);
      setUser(response.user);
    }
    return response;
  }, [useAPI]);

  // Logout function
  const logout = useCallback(() => {
    authAPI.logout();
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  // Update content (saves to localStorage as draft, or to API if enabled)
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
      if (useAPI) {
        const response = await contentAPI.getContent();
        if (response.success) {
          setContent(response.data);
        }
      } else {
        const response = await fetch('/content.json');
        const data = await response.json();
        setContent(data);
      }
      setIsDraft(false);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [useAPI]);

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

  // Publish content - saves to API or exports for static
  const publishContent = useCallback(async () => {
    if (useAPI && isAuthenticated) {
      try {
        const response = await contentAPI.updateContent(content);
        if (response.success) {
          localStorage.removeItem(STORAGE_KEY);
          setIsDraft(false);
          setContent(response.data);
          return { success: true, message: 'Content published successfully!' };
        }
      } catch (err) {
        return { success: false, message: err.message };
      }
    } else {
      // Static mode - export JSON
      exportContent();
      return { 
        success: true, 
        message: 'Content exported! Replace public/content.json with the downloaded file and redeploy to publish.' 
      };
    }
  }, [useAPI, isAuthenticated, content, exportContent]);

  const value = {
    content,
    isLoading,
    error,
    isDraft,
    isAuthenticated,
    user,
    useAPI,
    login,
    logout,
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
