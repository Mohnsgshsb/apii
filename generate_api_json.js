// generate_api_json.js
// Usage: node generate_api_json.js
// This script scans ./api/*.js and produces apis.json in project root.

import fs from 'fs';
import path from 'path';

const GITHUB_USER = 'Mohnsgshsb'; // غيّره لو حابب
const REPO = 'apii';               // اسم الريبو

const apiDir = path.join(process.cwd(), 'api');
const outFile = path.join(process.cwd(), 'apis.json');

if (!fs.existsSync(apiDir)) {
  console.error('Directory "api" not found. Create folder named "api" and put your .js files there.');
  process.exit(1);
}

const files = fs.readdirSync(apiDir).filter(f => f.endsWith('.js'));

const apis = files.map(filename => {
  const p = path.join(apiDir, filename);
  const content = fs.readFileSync(p, 'utf8');

  // Try to parse metadata from the top comment block:
  // /* META
  // { "name": "...", "description": "...", "url": "..." }
  // */
  let meta = {};
  const metaMatch = content.match(/\/\*\s*META([\s\S]*?)\*\//i);
  if (metaMatch) {
    try {
      const jsonText = metaMatch[1].replace(/^[\s\r\n]*|[\s\r\n]*$/g,'');
      meta = JSON.parse(jsonText);
    } catch (e) {
      // ignore parse error
    }
  }

  // Defaults if metadata not present:
  const name = meta.name || filename.replace(/\.js$/i, '');
  const description = meta.description || (meta.desc || 'ملف API بدون وصف');
  const url = meta.url || `https://raw.githubusercontent.com/${GITHUB_USER}/${REPO}/main/api/${encodeURIComponent(filename)}`;

  return { name, description, url, file: `api/${filename}` };
});

fs.writeFileSync(outFile, JSON.stringify(apis, null, 2), 'utf8');
console.log(`Generated ${outFile} with ${apis.length} entries.`);
