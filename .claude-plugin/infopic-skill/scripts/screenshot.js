#!/usr/bin/env node

/**
 * screenshot.js - Convert HTML infographic to PNG image
 *
 * Usage:
 *   node screenshot.js <html-file> [output-file]
 *
 * Example:
 *   node screenshot.js ../生成结果信息图/example.html
 *   node screenshot.js ../生成结果信息图/example.html custom-output.png
 *
 * If output file is not specified, it will be created in the same directory
 * as the HTML file with a .png extension.
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function captureScreenshot(htmlPath, outputPath = null) {
  // Resolve absolute path
  const absoluteHtmlPath = path.isAbsolute(htmlPath)
    ? htmlPath
    : path.resolve(process.cwd(), htmlPath);

  // Check if HTML file exists
  if (!fs.existsSync(absoluteHtmlPath)) {
    console.error(`Error: HTML file not found: ${absoluteHtmlPath}`);
    process.exit(1);
  }

  // Determine output path
  let absoluteOutputPath;
  if (outputPath) {
    absoluteOutputPath = path.isAbsolute(outputPath)
      ? outputPath
      : path.resolve(process.cwd(), outputPath);
  } else {
    // Default: same directory and name as HTML file, but with .png extension
    const dir = path.dirname(absoluteHtmlPath);
    const basename = path.basename(absoluteHtmlPath, path.extname(absoluteHtmlPath));
    absoluteOutputPath = path.join(dir, `${basename}.png`);
  }

  console.log(`Converting HTML to image...`);
  console.log(`  Input:  ${absoluteHtmlPath}`);
  console.log(`  Output: ${absoluteOutputPath}`);

  let browser;
  try {
    // Launch browser
    browser = await chromium.launch({
      headless: true
    });

    const page = await browser.newPage();

    // Load HTML file
    await page.goto(`file://${absoluteHtmlPath}`, {
      waitUntil: 'networkidle'
    });

    // Get the dimensions of the content
    const dimensions = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;

      const width = Math.max(
        body.scrollWidth,
        body.offsetWidth,
        html.clientWidth,
        html.scrollWidth,
        html.offsetWidth
      );

      const height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );

      return { width, height };
    });

    // Set viewport to content dimensions
    await page.setViewportSize({
      width: Math.ceil(dimensions.width),
      height: Math.ceil(dimensions.height)
    });

    // Take screenshot
    await page.screenshot({
      path: absoluteOutputPath,
      fullPage: true,
      type: 'png'
    });

    console.log(`✓ Screenshot saved successfully!`);
    console.log(`  Dimensions: ${dimensions.width}x${dimensions.height}px`);
    console.log(`  File size: ${(fs.statSync(absoluteOutputPath).size / 1024).toFixed(2)} KB`);

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: node screenshot.js <html-file> [output-file]');
    console.error('');
    console.error('Examples:');
    console.error('  node screenshot.js infographic.html');
    console.error('  node screenshot.js infographic.html output.png');
    console.error('  node screenshot.js ../生成结果信息图/example.html');
    process.exit(1);
  }

  const [htmlPath, outputPath] = args;
  captureScreenshot(htmlPath, outputPath);
}

module.exports = captureScreenshot;
