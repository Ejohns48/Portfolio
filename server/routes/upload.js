const express = require('express');
const path = require('path');
const fs = require('fs');
const Upload = require('../models/Upload');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// @route   POST /api/upload
// @desc    Upload a file
// @access  Private
router.post('/', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Create upload record
    const uploadRecord = await Upload.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      url: `/uploads/${req.file.filename}`,
      uploadedBy: req.user._id
    });

    res.status(201).json({
      success: true,
      data: {
        id: uploadRecord._id,
        filename: uploadRecord.filename,
        originalName: uploadRecord.originalName,
        url: uploadRecord.url,
        mimetype: uploadRecord.mimetype,
        size: uploadRecord.size
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during upload'
    });
  }
});

// @route   GET /api/upload
// @desc    Get all uploads
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const uploads = await Upload.find()
      .sort({ createdAt: -1 })
      .populate('uploadedBy', 'name email');

    res.json({
      success: true,
      count: uploads.length,
      data: uploads
    });
  } catch (error) {
    console.error('Get uploads error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching uploads'
    });
  }
});

// @route   DELETE /api/upload/:id
// @desc    Delete an upload
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const uploadRecord = await Upload.findById(req.params.id);

    if (!uploadRecord) {
      return res.status(404).json({
        success: false,
        message: 'Upload not found'
      });
    }

    // Delete file from disk
    const filePath = path.join(__dirname, '..', uploadRecord.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete record
    await uploadRecord.deleteOne();

    res.json({
      success: true,
      message: 'Upload deleted'
    });
  } catch (error) {
    console.error('Delete upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting upload'
    });
  }
});

module.exports = router;
