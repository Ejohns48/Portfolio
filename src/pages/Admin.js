import React, { useState, memo } from 'react';
import { useCMS } from '../context/CMSContext';
import '../css/Admin.css';

const Admin = memo(() => {
  const { 
    content, 
    isLoading, 
    error, 
    isDraft, 
    updateSection,
    discardDraft, 
    exportContent,
    publishContent 
  } = useCMS();
  
  const [activeTab, setActiveTab] = useState('personal');

  if (isLoading) {
    return <div className="admin-loading">Loading CMS...</div>;
  }

  if (error) {
    return <div className="admin-loading">Error: {error}</div>;
  }

  if (!content) {
    return <div className="admin-loading">No content found</div>;
  }

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'home', label: 'Home Page' },
    { id: 'articles', label: 'Articles' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About Page' },
  ];

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>📝 Content Management System</h1>
        <div className="admin-status">
          {isDraft && <span className="draft-badge">Unsaved Draft</span>}
          <div className="admin-actions">
            <button className="admin-btn secondary" onClick={exportContent}>
              📥 Export JSON
            </button>
            {isDraft && (
              <button className="admin-btn danger" onClick={discardDraft}>
                🗑️ Discard Draft
              </button>
            )}
            <button className="admin-btn success" onClick={publishContent}>
              🚀 Publish
            </button>
          </div>
        </div>
      </header>

      <nav className="admin-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="editor-panel">
        {activeTab === 'personal' && (
          <PersonalEditor content={content.personal} onUpdate={(data) => updateSection('personal', data)} />
        )}
        {activeTab === 'home' && (
          <HomeEditor content={content.home} onUpdate={(data) => updateSection('home', data)} />
        )}
        {activeTab === 'articles' && (
          <ArticlesEditor content={content.articles} onUpdate={(data) => updateSection('articles', data)} />
        )}
        {activeTab === 'projects' && (
          <ProjectsEditor content={content.projects} onUpdate={(data) => updateSection('projects', data)} />
        )}
        {activeTab === 'about' && (
          <AboutEditor content={content.about} onUpdate={(data) => updateSection('about', data)} />
        )}
      </div>
    </div>
  );
});

// Personal Info Editor
const PersonalEditor = ({ content, onUpdate }) => {
  const handleChange = (field, value) => {
    onUpdate({ ...content, [field]: value });
  };

  return (
    <div className="editor-section">
      <h2>Personal Information</h2>
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          value={content.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Phone Number</label>
        <input
          type="text"
          value={content.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          value={content.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>GitHub URL</label>
        <input
          type="url"
          value={content.github || ''}
          onChange={(e) => handleChange('github', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>LinkedIn URL</label>
        <input
          type="url"
          value={content.linkedin || ''}
          onChange={(e) => handleChange('linkedin', e.target.value)}
        />
      </div>
    </div>
  );
};

// Home Page Editor
const HomeEditor = ({ content, onUpdate }) => {
  const handleIntroChange = (index, value) => {
    const newIntroLines = [...(content.introLines || [])];
    newIntroLines[index] = value;
    onUpdate({ ...content, introLines: newIntroLines });
  };

  const addIntroLine = () => {
    const newIntroLines = [...(content.introLines || []), ''];
    onUpdate({ ...content, introLines: newIntroLines });
  };

  const removeIntroLine = (index) => {
    const newIntroLines = content.introLines.filter((_, i) => i !== index);
    onUpdate({ ...content, introLines: newIntroLines });
  };

  return (
    <div className="editor-section">
      <h2>Home Page Content</h2>
      <h3>Introduction Lines</h3>
      {(content.introLines || []).map((line, index) => (
        <div key={index} className="item-card">
          <div className="item-card-header">
            <h4>Line {index + 1}</h4>
            <button 
              className="btn-icon delete" 
              onClick={() => removeIntroLine(index)}
              title="Remove line"
            >
              ✕
            </button>
          </div>
          <div className="form-group">
            <input
              type="text"
              value={line}
              onChange={(e) => handleIntroChange(index, e.target.value)}
              placeholder="Enter introduction text..."
            />
          </div>
        </div>
      ))}
      <button className="add-item-btn" onClick={addIntroLine}>
        + Add Introduction Line
      </button>
    </div>
  );
};

// Articles Editor
const ArticlesEditor = ({ content, onUpdate }) => {
  const handleArticleChange = (index, field, value) => {
    const newArticles = [...content];
    newArticles[index] = { ...newArticles[index], [field]: value };
    onUpdate(newArticles);
  };

  const addArticle = () => {
    const newArticle = {
      id: Date.now(),
      title: 'New Article',
      url: '',
      backgroundImage: ''
    };
    onUpdate([...content, newArticle]);
  };

  const removeArticle = (index) => {
    onUpdate(content.filter((_, i) => i !== index));
  };

  return (
    <div className="editor-section">
      <h2>Featured Articles</h2>
      {(content || []).map((article, index) => (
        <div key={article.id} className="item-card">
          <div className="item-card-header">
            <h4>Article {index + 1}</h4>
            <button 
              className="btn-icon delete" 
              onClick={() => removeArticle(index)}
              title="Remove article"
            >
              ✕
            </button>
          </div>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={article.title || ''}
              onChange={(e) => handleArticleChange(index, 'title', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>URL</label>
            <input
              type="url"
              value={article.url || ''}
              onChange={(e) => handleArticleChange(index, 'url', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Background Image URL</label>
            <input
              type="url"
              value={article.backgroundImage || ''}
              onChange={(e) => handleArticleChange(index, 'backgroundImage', e.target.value)}
            />
          </div>
        </div>
      ))}
      <button className="add-item-btn" onClick={addArticle}>
        + Add Article
      </button>
    </div>
  );
};

// Projects Editor
const ProjectsEditor = ({ content, onUpdate }) => {
  const handleProjectChange = (index, field, value) => {
    const newProjects = [...content];
    newProjects[index] = { ...newProjects[index], [field]: value };
    onUpdate(newProjects);
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: 'New Project',
      description: '',
      videoSource: '',
      className: 'project-box'
    };
    onUpdate([...content, newProject]);
  };

  const removeProject = (index) => {
    onUpdate(content.filter((_, i) => i !== index));
  };

  return (
    <div className="editor-section">
      <h2>Portfolio Projects</h2>
      {(content || []).map((project, index) => (
        <div key={project.id} className="item-card">
          <div className="item-card-header">
            <h4>Project {index + 1}</h4>
            <button 
              className="btn-icon delete" 
              onClick={() => removeProject(index)}
              title="Remove project"
            >
              ✕
            </button>
          </div>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={project.title || ''}
              onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={project.description || ''}
              onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Video Source URL</label>
            <input
              type="text"
              value={project.videoSource || ''}
              onChange={(e) => handleProjectChange(index, 'videoSource', e.target.value)}
            />
          </div>
        </div>
      ))}
      <button className="add-item-btn" onClick={addProject}>
        + Add Project
      </button>
    </div>
  );
};

// About Page Editor
const AboutEditor = ({ content, onUpdate }) => {
  const handleHeaderChange = (value) => {
    onUpdate({ ...content, headerMain: value });
  };

  const handleSectionChange = (index, field, value) => {
    const newSections = [...(content.sections || [])];
    newSections[index] = { ...newSections[index], [field]: value };
    onUpdate({ ...content, sections: newSections });
  };

  const addSection = () => {
    const newSection = {
      id: Date.now(),
      header: 'New Section',
      content: ''
    };
    onUpdate({ ...content, sections: [...(content.sections || []), newSection] });
  };

  const removeSection = (index) => {
    onUpdate({ 
      ...content, 
      sections: content.sections.filter((_, i) => i !== index) 
    });
  };

  return (
    <div className="editor-section">
      <h2>About Page Content</h2>
      <div className="form-group">
        <label>Main Header</label>
        <input
          type="text"
          value={content.headerMain || ''}
          onChange={(e) => handleHeaderChange(e.target.value)}
        />
      </div>
      
      <h3>Sections</h3>
      {(content.sections || []).map((section, index) => (
        <div key={section.id} className="item-card">
          <div className="item-card-header">
            <h4>Section {index + 1}</h4>
            <button 
              className="btn-icon delete" 
              onClick={() => removeSection(index)}
              title="Remove section"
            >
              ✕
            </button>
          </div>
          <div className="form-group">
            <label>Section Header</label>
            <input
              type="text"
              value={section.header || ''}
              onChange={(e) => handleSectionChange(index, 'header', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              value={section.content || ''}
              onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
              rows={4}
            />
          </div>
        </div>
      ))}
      <button className="add-item-btn" onClick={addSection}>
        + Add Section
      </button>
    </div>
  );
};

Admin.displayName = 'Admin';

export default Admin;
