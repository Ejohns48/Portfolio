/**
 * API Service for Portfolio Backend
 * Handles all HTTP requests to the Express.js backend
 */

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Token management
const getToken = () => localStorage.getItem('auth_token');
const setToken = (token) => localStorage.setItem('auth_token', token);
const removeToken = () => localStorage.removeItem('auth_token');

// Headers helper
const authHeaders = () => ({
  'Content-Type': 'application/json',
  ...(getToken() && { Authorization: `Bearer ${getToken()}` })
});

// Generic fetch wrapper with error handling
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...authHeaders(),
        ...options.headers
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// ============ AUTH API ============

export const authAPI = {
  login: async (email, password) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (data.token) {
      setToken(data.token);
    }
    return data;
  },

  register: async (name, email, password) => {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
    if (data.token) {
      setToken(data.token);
    }
    return data;
  },

  logout: () => {
    removeToken();
  },

  getMe: async () => {
    return await apiRequest('/auth/me');
  },

  changePassword: async (currentPassword, newPassword) => {
    return await apiRequest('/auth/password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword })
    });
  },

  isLoggedIn: () => !!getToken()
};

// ============ CONTENT API ============

export const contentAPI = {
  // Get all content (public)
  getContent: async () => {
    return await apiRequest('/content');
  },

  // Update all content
  updateContent: async (content) => {
    return await apiRequest('/content', {
      method: 'PUT',
      body: JSON.stringify(content)
    });
  },

  // Update specific section
  updateSection: async (section, data) => {
    return await apiRequest(`/content/${section}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }
};

// ============ PROJECTS API ============

export const projectsAPI = {
  add: async (project) => {
    return await apiRequest('/content/projects', {
      method: 'POST',
      body: JSON.stringify(project)
    });
  },

  update: async (id, project) => {
    return await apiRequest(`/content/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project)
    });
  },

  delete: async (id) => {
    return await apiRequest(`/content/projects/${id}`, {
      method: 'DELETE'
    });
  }
};

// ============ ARTICLES API ============

export const articlesAPI = {
  add: async (article) => {
    return await apiRequest('/content/articles', {
      method: 'POST',
      body: JSON.stringify(article)
    });
  },

  delete: async (id) => {
    return await apiRequest(`/content/articles/${id}`, {
      method: 'DELETE'
    });
  }
};

// ============ UPLOAD API ============

export const uploadAPI = {
  upload: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }

    return data;
  },

  getAll: async () => {
    return await apiRequest('/upload');
  },

  delete: async (id) => {
    return await apiRequest(`/upload/${id}`, {
      method: 'DELETE'
    });
  }
};

// ============ HEALTH CHECK ============

export const healthCheck = async () => {
  return await apiRequest('/health');
};

const api = {
  auth: authAPI,
  content: contentAPI,
  projects: projectsAPI,
  articles: articlesAPI,
  upload: uploadAPI,
  healthCheck
};

export default api;
