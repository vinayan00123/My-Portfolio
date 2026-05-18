import express from 'express';
import mongoose from 'mongoose';
import Project from '../models/Project.ts';
import { authenticateToken } from '../middleware/auth.ts';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Get all projects
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        message: 'Database is currently offline. Please check your MONGODB_URI and Atlas settings.' 
      });
    }
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server Error: Critical failure during snapshot retrieval' });
  }
});

// Add project (Protected)
router.post('/', authenticateToken, upload.single('image'), async (req: any, res: any) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        message: 'Database is currently offline. Please wait and try again.' 
      });
    }

    const { name, description, techStack, tags, isFeatured, githubUrl, liveUrl } = req.body;
    
    if (!name || !description) {
      return res.status(400).json({ 
        message: 'Name and description are required' 
      });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    
    const newProject = new Project({
      name,
      description,
      techStack: Array.isArray(techStack) ? techStack : (techStack ? techStack.split(',').map((s: string) => s.trim()) : []),
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((s: string) => s.trim()) : []),
      isFeatured: isFeatured === 'true' || isFeatured === true,
      githubUrl: githubUrl || '',
      liveUrl: liveUrl || '',
      imageUrl
    });

    const project = await newProject.save();
    console.log(`✅ Project "${name}" created successfully`);
    res.json(project);
  } catch (err: any) {
    console.error('❌ Error creating project:', err.message);
    res.status(500).json({ message: `Database Failure: ${err.message}` });
  }
});

// Update project (Protected)
router.put('/:id', authenticateToken, upload.single('image'), async (req: any, res: any) => {
  try {
    const { name, description, techStack, tags, isFeatured, githubUrl, liveUrl, removeImage } = req.body;
    const updateData: any = {
      name,
      description,
      techStack: Array.isArray(techStack) ? techStack : (techStack ? techStack.split(',').map((s: string) => s.trim()) : []),
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((s: string) => s.trim()) : []),
      isFeatured: isFeatured === 'true' || isFeatured === true,
      githubUrl,
      liveUrl,
    };

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    } else if (removeImage === 'true') {
      updateData.imageUrl = '';
    }

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    console.log(`✅ Project "${name}" updated successfully`);
    res.json(project);
  } catch (err: any) {
    console.error('❌ Error updating project:', err.message);
    res.status(500).json({ message: `Database Failure: ${err.message}` });
  }
});

// Delete project (Protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
