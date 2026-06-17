const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../packages/core/src/services/engines');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
  let original = content;

  // 1. Replace components.push(...) calls
  content = content.replace(/components\.push\(([^)]+)\)/g, (match, argsList) => {
    const args = argsList.split(/,\s*(?![^`]*`|[^']*')/); // split by comma not inside quotes
    const newArgs = args.map(arg => {
      // Find patterns like ${varName.def} or ${varName.id}
      const varMatch = arg.match(/\$\{([a-zA-Z0-9_]+)\.(def|id)\}/);
      if (varMatch) {
        const varName = varMatch[1];
        return `JSON.stringify(${varName})`;
      }
      return arg;
    });
    return `components.push(${newArgs.join(', ')})`;
  });

  // 2. Replace parts.map(p => `[component: "${p.def}"]`) in Chinese/other mappings
  content = content.replace(/parts\.map\(p\s*=>\s*`\[component:\s*"\$\{p\.def\}"\]`\)/g, 'parts.map(p => JSON.stringify(p))');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function traverse(dir) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      traverse(fullPath);
    } else if (file.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

traverse(baseDir);
console.log("Completed parsing and updating all engine files.");
