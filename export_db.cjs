const mongoose = require('mongoose');
const fs = require('fs');

async function exportProjects() {
  await mongoose.connect('mongodb://localhost:27017/portfolio');
  const db = mongoose.connection.db;
  const projects = await db.collection('projects').find({}).toArray();
  fs.writeFileSync('src/data/projects.json', JSON.stringify(projects, null, 2));
  console.log('Exported ' + projects.length + ' projects to src/data/projects.json');
  process.exit(0);
}

exportProjects().catch(e => {
  console.error(e);
  process.exit(1);
});
