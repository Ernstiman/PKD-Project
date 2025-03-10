// postprocess.js
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

function addJsExtension(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // This helper function gets 3 parameters:
  // p1: the import/export prefix (including the opening quote)
  // p2: the relative path (without an extension)
  // p3: the closing quote (or closing quote plus parenthesis for dynamic imports)
  const addExtension = (match, p1, p2, p3) => {
    // Only modify relative paths that have no file extension
    if ((p2.startsWith('./') || p2.startsWith('../')) && !path.extname(p2)) {
      return `${p1}${p2}.js${p3}`;
    }
    return match;
  };

  // For static import statements
  content = content.replace(
    /(import\s+[^'"]+['"])(\.\/[^'"]+|(?:\.\.\/)[^'"]+)(['"])/g,
    addExtension
  );

  // For export-from statements
  content = content.replace(
    /(export\s+.*from\s+['"])(\.\/[^'"]+|(?:\.\.\/)[^'"]+)(['"])/g,
    addExtension
  );

  // For dynamic import statements
  content = content.replace(
    /(import\(['"])(\.\/[^'"]+|(?:\.\.\/)[^'"]+)(['"]\))/g,
    addExtension
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

function processDirectory(directory) {
  const entries = fs.readdirSync(directory);
  entries.forEach(entry => {
    const fullPath = path.join(directory, entry);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.js')) {
      addJsExtension(fullPath);
    }
  });
}

processDirectory(distDir);
