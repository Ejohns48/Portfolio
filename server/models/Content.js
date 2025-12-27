const mongoose = require('mongoose');

// Personal Info Schema
const personalSchema = new mongoose.Schema({
  name: { type: String, default: 'Your Name' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' }
}, { _id: false });

// Home Page Schema
const homeSchema = new mongoose.Schema({
  introLines: [{ type: String }]
}, { _id: false });

// Article Schema
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  backgroundImage: { type: String, default: '' },
  order: { type: Number, default: 0 }
});

// Project Schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  videoSource: { type: String, default: '' },
  thumbnailUrl: { type: String, default: '' },
  className: { type: String, default: 'project-box' },
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true }
});

// About Section Schema
const aboutSectionSchema = new mongoose.Schema({
  header: { type: String, required: true },
  content: { type: String, required: true },
  order: { type: Number, default: 0 }
});

// About Page Schema
const aboutSchema = new mongoose.Schema({
  headerMain: { type: String, default: 'About Me' },
  sections: [aboutSectionSchema]
}, { _id: false });

// Site Settings Schema
const siteSchema = new mongoose.Schema({
  title: { type: String, default: 'Portfolio' },
  description: { type: String, default: 'My Portfolio Website' }
}, { _id: false });

// Main Content Schema
const contentSchema = new mongoose.Schema({
  site: { type: siteSchema, default: () => ({}) },
  personal: { type: personalSchema, default: () => ({}) },
  home: { type: homeSchema, default: () => ({}) },
  articles: [articleSchema],
  projects: [projectSchema],
  about: { type: aboutSchema, default: () => ({}) },
  updatedAt: { type: Date, default: Date.now },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Update timestamp on save
contentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Content', contentSchema);
