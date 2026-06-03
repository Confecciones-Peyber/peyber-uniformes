const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src/app');

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (filePath.endsWith('.component.ts')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = getAllFiles(srcDir);

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix the quote-builder syntax error first
  content = content.replace(/const text = \\`¡Hola/g, 'const text = `¡Hola');
  content = content.replace(/_Enviado desde el Cotizador Digital de PeyBer Uniformes_\\`;/g, '_Enviado desde el Cotizador Digital de PeyBer Uniformes_`;');
  content = content.replace(/\\n/g, '\\n');
  content = content.replace(/\\\$/g, '$');
  
  // 1. Replace lucide imports
  // Find import { LucideAngularModule, Icon1, Icon2 } from '@lucide/angular';
  const importMatch = content.match(/import\s+{\s*([^}]+)\s*}\s+from\s+['"]@lucide\/angular['"]/);
  if (importMatch) {
    const importVars = importMatch[1].split(',').map(s => s.trim()).filter(s => s && s !== 'LucideAngularModule');
    const lucideImports = importVars.map(v => 'Lucide' + v);
    
    content = content.replace(importMatch[0], `import { ${lucideImports.join(', ')} } from '@lucide/angular'`);
    
    // 2. Replace LucideAngularModule in imports array
    content = content.replace(/imports:\s*\[([^\]]*)LucideAngularModule([^\]]*)\]/, (match, p1, p2) => {
      const otherImports = [p1, p2].join('').split(',').map(s => s.trim()).filter(s => s);
      const newImports = [...otherImports, ...lucideImports].join(', ');
      return `imports: [${newImports}]`;
    });

    // 3. Replace template usages
    importVars.forEach(iconName => {
      // Find <lucide-icon [img]="IconNameIcon" class="..."></lucide-icon>
      // or <lucide-icon [img]="IconNameIcon"></lucide-icon>
      const regex = new RegExp(`<lucide-icon\\s+\\[img\\]="${iconName}Icon"([^>]*)><\\/lucide-icon>`, 'g');
      content = content.replace(regex, `<svg lucide${iconName}$1></svg>`);
      
      const regex2 = new RegExp(`readonly ${iconName}Icon = ${iconName};\\s*`, 'g');
      content = content.replace(regex2, '');
    });
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated', filePath);
});
