#!/usr/bin/env node

/**
 * Скрипт для генерации скриншотов через amocrm-instruction-builder
 *
 * Использование:
 *   npm run gen:screenshots -- --slug login-kommo --json '[{"action":"click","selector":"#login"}]'
 *
 * Или через Node.js:
 *   node scripts/generate-screenshots.mjs --slug login-kommo --json '[...]'
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const docsDir = path.join(projectRoot, 'public', 'img', 'docs');

/**
 * Парсит аргументы командной строки
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const result = {};

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, '');
    const value = args[i + 1];
    result[key] = value;
  }

  return result;
}

/**
 * Создаёт папку для скриншотов, если её нет
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Создаёт placeholder SVG-картинку
 */
function createPlaceholder(slug, stepNumber) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .bg { fill: #f3f4f6; }
      .border { stroke: #e5e7eb; stroke-width: 2; }
      .text { fill: #6b7280; font-family: system-ui; font-size: 20px; text-anchor: middle; }
      .title { fill: #111827; font-size: 28px; font-weight: bold; }
      .subtitle { fill: #9ca3af; font-size: 16px; }
    </style>
  </defs>

  <rect class="bg" width="800" height="600"/>
  <rect class="border" x="1" y="1" width="798" height="598" fill="none"/>

  <text class="title" x="400" y="200">Скриншот</text>
  <text class="text" x="400" y="260">${slug}</text>
  <text class="text" x="400" y="300">Шаг ${stepNumber}</text>
  <text class="subtitle" x="400" y="450">Placeholder изображение</text>
  <text class="subtitle" x="400" y="480">Будет заменён на реальный скриншот</text>
</svg>`;

  return svg;
}

/**
 * Генерирует скриншоты для статьи
 */
async function generateScreenshots(slug, instructions = []) {
  const slugDir = path.join(docsDir, slug);
  ensureDir(slugDir);

  console.log(`📸 Генерирую скриншоты для: ${slug}`);

  // Если инструкции не переданы, создаём placeholders для демо-статей
  let numSteps = 3;
  if (instructions.length > 0) {
    numSteps = instructions.length;
  }

  const generatedFiles = [];

  for (let i = 1; i <= numSteps; i++) {
    const filename = `step-${i}.png`;
    const filepath = path.join(slugDir, filename);

    // Для демо используем placeholder
    // В будущем сюда подключится реальная генерация из amocrm-instruction-builder
    const svg = createPlaceholder(slug, i);
    const pngPath = filepath.replace('.png', '.svg');

    // Сохраняем SVG как временный файл (позже это будет PNG от Playwright)
    fs.writeFileSync(pngPath, svg);
    generatedFiles.push(filename);

    console.log(`  ✓ ${filename}`);
  }

  console.log(`\n✅ Готово! Создано ${generatedFiles.length} файлов.`);
  console.log(`📁 Папка: ${slugDir}`);

  return generatedFiles;
}

/**
 * Главная функция
 */
async function main() {
  const args = parseArgs();

  if (!args.slug) {
    console.error('❌ Ошибка: укажите --slug');
    console.error('\nУспользование:');
    console.error('  npm run gen:screenshots -- --slug login-kommo');
    console.error('  npm run gen:screenshots -- --slug login-kommo --json \'[{"action":"click"}]\'');
    process.exit(1);
  }

  const instructions = args.json ? JSON.parse(args.json) : [];

  try {
    await generateScreenshots(args.slug, instructions);
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    process.exit(1);
  }
}

main();
