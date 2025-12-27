const express = require('express');
const Content = require('../models/Content');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/content
// @desc    Get all content (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    let content = await Content.findOne();
    
    // If no content exists, create default
    if (!content) {
      content = await Content.create({
        site: { title: 'Portfolio', description: 'My Portfolio Website' },
        personal: { name: 'Your Name', email: '', phone: '', github: '', linkedin: '' },
        home: { introLines: ['Welcome to my portfolio.', 'I build amazing things.'] },
        articles: [],
        projects: [],
        about: { headerMain: 'About Me', sections: [] }
      });
    }

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Get content error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching content'
    });
  }
});

// @route   PUT /api/content
// @desc    Update all content
// @access  Private (Admin)
router.put('/', protect, async (req, res) => {
  try {
    const updateData = { ...req.body, updatedBy: req.user._id };
    
    let content = await Content.findOne();
    
    if (content) {
      content = await Content.findByIdAndUpdate(
        content._id,
        updateData,
        { new: true, runValidators: true }
      );
    } else {
      content = await Content.create(updateData);
    }

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating content'
    });
  }
});

// @route   PUT /api/content/:section
// @desc    Update specific section
// @access  Private (Admin)
router.put('/:section', protect, async (req, res) => {
  try {
    const { section } = req.params;
    const allowedSections = ['site', 'personal', 'home', 'articles', 'projects', 'about'];
    
    if (!allowedSections.includes(section)) {
      return res.status(400).json({
        success: false,
        message: `Invalid section: ${section}`
      });
    }

    let content = await Content.findOne();
    
    if (!content) {
      content = new Content();
    }

    content[section] = req.body;
    content.updatedBy = req.user._id;
    await content.save();

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Update section error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating section'
    });
  }
});

// ============ PROJECTS CRUD ============

// @route   POST /api/content/projects
// @desc    Add a new project
// @access  Private
router.post('/projects', protect, async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = new Content();
    }

    const newProject = {
      title: req.body.title || 'New Project',
      description: req.body.description || '',
      videoSource: req.body.videoSource || '',
      thumbnailUrl: req.body.thumbnailUrl || '',
      className: req.body.className || 'project-box',
      order: content.projects.length
    };

    content.projects.push(newProject);
    content.updatedBy = req.user._id;
    await content.save();

    res.status(201).json({
      success: true,
      data: content.projects[content.projects.length - 1]
    });
  } catch (error) {
    console.error('Add project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error adding project'
    });
  }
});

// @route   PUT /api/content/projects/:id
// @desc    Update a project
// @access  Private
router.put('/projects/:id', protect, async (req, res) => {
  try {
    const content = await Content.findOne();
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    const project = content.projects.id(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    Object.assign(project, req.body);
    content.updatedBy = req.user._id;
    await content.save();

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating project'
    });
  }
});

// @route   DELETE /api/content/projects/:id
// @desc    Delete a project
// @access  Private
router.delete('/projects/:id', protect, async (req, res) => {
  try {
    const content = await Content.findOne();
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    const project = content.projects.id(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    project.deleteOne();
    content.updatedBy = req.user._id;
    await content.save();

    res.json({
      success: true,
      message: 'Project deleted'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting project'
    });
  }
});

// ============ ARTICLES CRUD ============

// @route   POST /api/content/articles
// @desc    Add a new article
// @access  Private
router.post('/articles', protect, async (req, res) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = new Content();
    }

    const newArticle = {
      title: req.body.title || 'New Article',
      url: req.body.url || '',
      backgroundImage: req.body.backgroundImage || '',
      order: content.articles.length
    };

    content.articles.push(newArticle);
    content.updatedBy = req.user._id;
    await content.save();

    res.status(201).json({
      success: true,
      data: content.articles[content.articles.length - 1]
    });
  } catch (error) {
    console.error('Add article error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error adding article'
    });
  }
});

// @route   DELETE /api/content/articles/:id
// @desc    Delete an article
// @access  Private
router.delete('/articles/:id', protect, async (req, res) => {
  try {
    const content = await Content.findOne();
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    const article = content.articles.id(req.params.id);
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    article.deleteOne();
    content.updatedBy = req.user._id;
    await content.save();

    res.json({
      success: true,
      message: 'Article deleted'
    });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting article'
    });
  }
});

module.exports = router;
