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
  const [uploadedFiles, setUploadedFiles] = React.useState({});
  const [previewUrls, setPreviewUrls] = React.useState({});

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...content];
    newProjects[index] = { ...newProjects[index], [field]: value };
    onUpdate(newProjects);
  };

  const handleFileUpload = (index, event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreviewUrls(prev => ({ ...prev, [index]: previewUrl }));
    setUploadedFiles(prev => ({ ...prev, [index]: file }));

    // Set the video source to the expected path
    const fileName = file.name.replace(/\s+/g, '-').toLowerCase();
    const videoPath = `/assets/videos/${fileName}`;
    handleProjectChange(index, 'videoSource', videoPath);
    handleProjectChange(index, 'uploadedFileName', fileName);
  };

  const downloadFile = (index) => {
    const file = uploadedFiles[index];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name.replace(/\s+/g, '-').toLowerCase();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const clearUpload = (index) => {
    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index]);
    }
    setPreviewUrls(prev => {
      const newUrls = { ...prev };
      delete newUrls[index];
      return newUrls;
    });
    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[index];
      return newFiles;
    });
    handleProjectChange(index, 'videoSource', '');
    handleProjectChange(index, 'uploadedFileName', '');
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
    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index]);
    }
    onUpdate(content.filter((_, i) => i !== index));
  };

  return (
    <div className="editor-section">
      <h2>Portfolio Projects</h2>
      <div className="info-box">
        <p>📁 <strong>Upload videos:</strong> Select a video file to upload. After publishing, 
        download the file and add it to your <code>public/assets/videos/</code> folder, then redeploy.</p>
      </div>
      
      {(content || []).map((project, index) => (
        <div key={project.id} className="item-card">
          <div className="item-card-header">
            <h4>Project {index + 1}: {project.title}</h4>
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
            <label>Video/Media Source</label>
            <div className="file-upload-container">
              <input
                type="text"
                value={project.videoSource || ''}
                onChange={(e) => handleProjectChange(index, 'videoSource', e.target.value)}
                placeholder="Enter URL or upload a file..."
                className="file-path-input"
              />
              
              <label className="file-upload-btn">
                📤 Upload File
                <input
                  type="file"
                  accept="video/*,image/*"
                  onChange={(e) => handleFileUpload(index, e)}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            
            {/* Preview Section */}
            {(previewUrls[index] || project.videoSource) && (
              <div className="media-preview">
                <div className="preview-header">
                  <span>Preview</span>
                  {uploadedFiles[index] && (
                    <div className="preview-actions">
                      <button 
                        className="btn-small success"
                        onClick={() => downloadFile(index)}
                        title="Download file to add to your project"
                      >
                        📥 Download
                      </button>
                      <button 
                        className="btn-small danger"
                        onClick={() => clearUpload(index)}
                        title="Clear upload"
                      >
                        ✕ Clear
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="preview-content">
                  {(previewUrls[index] || project.videoSource)?.match(/\.(mp4|webm|ogg|mov)$/i) || 
                   uploadedFiles[index]?.type?.startsWith('video/') ? (
                    <video 
                      src={previewUrls[index] || project.videoSource} 
                      controls 
                      muted
                      style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }}
                    >
                      Your browser does not support video.
                    </video>
                  ) : (previewUrls[index] || project.videoSource)?.match(/\.(jpg|jpeg|png|gif|webp)$/i) ||
                       uploadedFiles[index]?.type?.startsWith('image/') ? (
                    <img 
                      src={previewUrls[index] || project.videoSource} 
                      alt="Preview"
                      style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }}
                    />
                  ) : (
                    <p className="preview-placeholder">
                      📹 Video will display here when loaded
                    </p>
                  )}
                </div>
                
                {uploadedFiles[index] && (
                  <div className="upload-info">
                    <span className="file-name">📁 {uploadedFiles[index].name}</span>
                    <span className="file-size">
                      ({(uploadedFiles[index].size / (1024 * 1024)).toFixed(2)} MB)
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label>Layout Class (optional)</label>
            <select
              value={project.className || 'project-box'}
              onChange={(e) => handleProjectChange(index, 'className', e.target.value)}
              className="form-select"
            >
              <option value="project-box">Default</option>
              <option value="project-box project-box-left">Left</option>
              <option value="project-box project-box-middle">Middle</option>
              <option value="project-box project-box-right">Right</option>
              <option value="project-box project-box-left2">Left Row 2</option>
              <option value="project-box project-box-middle2">Middle Row 2</option>
              <option value="project-box project-box-right2">Right Row 2</option>
            </select>
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
