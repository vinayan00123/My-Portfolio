import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }],
  tags: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  githubUrl: { type: String },
  liveUrl: { type: String },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Project', ProjectSchema);
