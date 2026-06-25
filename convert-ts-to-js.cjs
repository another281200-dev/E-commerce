const fs = require('fs');
const path = require('path');
const root = process.cwd();
const tsExtensions = ['.ts', '.tsx'];

function listFiles(dir) {
  let entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(listFiles(fullPath));
    } else if (tsExtensions.includes(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

function removeTypeDeclarations(text) {
  let output = text;
  output = output.replace(/import\s+type\s+\{[^}]*\}\s+from\s+['\"][^'\"]+['\"];?/g, '');
  output = output.replace(/import\s+\{[^}]*\}\s+from\s+['\"][^'\"]+\/types['\"];?/g, '');
  output = output.replace(/export\s+interface\s+\w+\s*\{[\s\S]*?\}\s*/g, '');
  output = output.replace(/interface\s+\w+\s*\{[\s\S]*?\}\s*/g, '');
  output = output.replace(/export\s+type\s+\w+\s*=\s*[\s\S]*?;\s*/g, '');
  output = output.replace(/type\s+\w+\s*=\s*[\s\S]*?;\s*/g, '');
  output = output.replace(/<\s*[^>]+\s*>/g, '');
  output = output.replace(/:\s*React\.FC\s*/g, '');
  output = output.replace(/:\s*React\.FC<[^>]+>\s*/g, '');
  output = output.replace(/:\s*[^=;,)\n]+(?=[,)=;\n])/g, '');
  output = output.replace(/\buseState<[^>]+>\(/g, 'useState(');
  output = output.replace(/\buseEffect<[^>]+>\(/g, 'useEffect(');
  output = output.replace(/\bReact\.Dispatch<[^>]+>\s*/g, '');
  output = output.replace(/\bReact\.SetStateAction<[^>]+>\s*/g, '');
  output = output.replace(/\bas const\b/g, '');
  output = output.replace(/(\w+)\s*:\s*\{[^}]*\}/g, '$1');
  output = output.replace(/function\s+(\w+)\s*\([^)]*\)\s*:\s*[^\s{]+\s*\{/g, (m) => m.replace(/:\s*[^\s{]+/g, ''));
  output = output.replace(/const\s+\([^)]*\)\s*:\s*[^\s=]+\s*=\s*\(/g, (m) => m.replace(/:\s*[^\s=]+/g, ''));
  output = output.replace(/\bimport\s+\{([^}]*)\}\s+from\s+['\"](.*)\.tsx['\"];?/g, 'import {$1} from "$2.jsx";');
  output = output.replace(/\bimport\s+\{([^}]*)\}\s+from\s+['\"](.*)\.ts['\"];?/g, 'import {$1} from "$2.js";');
  output = output.replace(/\bimport\s+([^\s{}]+)\s+from\s+['\"](.*)\.tsx['\"];?/g, 'import $1 from "$2.jsx";');
  output = output.replace(/\bimport\s+([^\s{}]+)\s+from\s+['\"](.*)\.ts['\"];?/g, 'import $1 from "$2.js";');
  output = output.replace(/from\s+['\"](.*)\.tsx['\"]/g, 'from "$1.jsx"');
  output = output.replace(/from\s+['\"](.*)\.ts['\"]/g, 'from "$1.js"');
  output = output.replace(/from\s+['\"](.*)\/types['\"]/g, 'from "$1/types.js"');
  output = output.replace(/from\s+['\"]\.\/types['\"]/g, 'from "./types.js"');
  output = output.replace(/from\s+['\"]\.\.\/types['\"]/g, 'from "../types.js"');
  output = output.replace(/from\s+['\"]\.\.\/\.\.\/types['\"]/g, 'from "../../types.js"');

  return output;
}

const files = listFiles(root);
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const noTypes = removeTypeDeclarations(content);
  fs.writeFileSync(file, noTypes, 'utf8');
  const ext = path.extname(file);
  const newExt = ext === '.tsx' ? '.jsx' : '.js';
  const newPath = file.slice(0, -ext.length) + newExt;
  fs.renameSync(file, newPath);
  console.log(`Converted ${file} -> ${newPath}`);
}
