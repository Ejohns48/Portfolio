/**
 * Seed script to initialize the database with default content
 * Run with: npm run seed
 */

require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import models
const User = require('../models/User');
const Content = require('../models/Content');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Create admin user if doesn't exist
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    let admin = await User.findOne({ email: adminEmail });
    
    if (!admin) {
      admin = await User.create({
        email: adminEmail,
        password: adminPassword,
        name: 'Admin',
        role: 'admin'
      });
      console.log(`✅ Admin user created: ${adminEmail}`);
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Create default content if doesn't exist
    let content = await Content.findOne();
    
    if (!content) {
      content = await Content.create({
        site: {
          title: 'My Portfolio',
          description: 'Welcome to my portfolio website'
        },
        personal: {
          name: 'Your Name',
          email: 'your.email@example.com',
          phone: '',
          github: 'https://github.com/yourusername',
          linkedin: 'https://linkedin.com/in/yourusername'
        },
        home: {
          introLines: [
            'Hello, I\'m a developer',
            'I build amazing web experiences',
            'Let\'s create something together'
          ]
        },
        articles: [
          {
            title: 'Getting Started with React',
            url: 'https://reactjs.org',
            backgroundImage: '',
            order: 0
          },
          {
            title: 'Modern JavaScript Tips',
            url: 'https://javascript.info',
            backgroundImage: '',
            order: 1
          }
        ],
        projects: [
          {
            title: 'Project One',
            description: 'A sample project description',
            videoSource: '/assets/videos/sample.mp4',
            className: 'project-box',
            order: 0,
            isVisible: true
          },
          {
            title: 'Project Two',
            description: 'Another project description',
            videoSource: '/assets/videos/sample.mp4',
            className: 'project-box',
            order: 1,
            isVisible: true
          }
        ],
        about: {
          headerMain: 'About Me',
          sections: [
            {
              header: 'My Background',
              content: 'I am a passionate developer with experience in modern web technologies.',
              order: 0
            },
            {
              header: 'My Skills',
              content: 'React, Node.js, MongoDB, JavaScript, TypeScript, and more.',
              order: 1
            }
          ]
        },
        updatedBy: admin._id
      });
      console.log('✅ Default content created');
    } else {
      console.log('ℹ️  Content already exists');
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log(`\n📧 Admin Login:\n   Email: ${adminEmail}\n   Password: ${adminPassword}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
