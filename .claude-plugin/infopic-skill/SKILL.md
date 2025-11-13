---
name: infopic
description: "Create infographic images from text. Use this skill when Claude needs to create visual infographics from text content or keywords."
license: MIT
---

# Infographic Creation Skill

## Overview

This skill generates HTML-based infographics from text or keywords and converts them to images. The workflow involves:
1. Processing user input (keywords or content)
2. Searching for related content if needed
3. Reading the prompt template
4. Generating HTML infographic
5. Converting HTML to image using Playwright

## Workflow

### 1. Process User Input

When a user provides input for infographic creation:
- If the input is just keywords, use WebSearch to find relevant content first
- If the input is detailed content, proceed directly to generation

### 2. Read Prompt Template

**CRITICAL**: Always read the prompt template file at runtime:

```bash
# Read the prompt template
cat 生成信息图提示词.md
```

This template contains the instructions for generating the HTML infographic. Never hardcode the style or structure - always read it fresh from the file.

### 3. Generate HTML Infographic

Based on the prompt template and user content:
- Create a complete HTML file with inline CSS
- Use modern, visually appealing design
- Ensure responsive layout
- Include all necessary styling
- Save to `生成结果信息图/` folder with timestamp filename

Design principles:
- **Visual hierarchy**: Use size, color, and positioning to guide the eye
- **Color scheme**: Choose 3-5 complementary colors
- **Typography**: Use clear, readable fonts (web-safe fonts)
- **Icons/Graphics**: Use CSS shapes or Unicode symbols (avoid external dependencies)
- **Spacing**: Generous whitespace for clarity
- **Layout**: Grid or flexbox for modern layouts

Common infographic types:
- **Statistical**: Charts, numbers, data visualization
- **Process**: Step-by-step flows, timelines
- **Comparison**: Side-by-side comparisons, pros/cons
- **Hierarchical**: Organization charts, mind maps
- **Geographic**: Maps, location-based data
- **List-based**: Top N, key points, tips

### 4. Convert to Image

Use the screenshot script to convert HTML to image:

```bash
node scripts/screenshot.js 生成结果信息图/filename.html
```

This will create a PNG image in the same directory.

## File Structure

```
infopic-skill/
├── SKILL.md                    # This file - skill documentation
├── 生成信息图提示词.md           # Prompt template (read at runtime)
├── scripts/
│   ├── screenshot.js          # Playwright screenshot script
│   └── package.json           # Node.js dependencies
└── 生成结果信息图/              # Output folder for HTML and images
```

## Dependencies

The skill uses pnpm to manage Node.js dependencies. Required packages:
- `playwright` - For HTML to image conversion
- `playwright-chromium` - Chrome browser for Playwright

To install dependencies:
```bash
cd scripts
pnpm install
```

## Example Usage

User: "Create an infographic about the benefits of exercise"

Assistant workflow:
1. Search for content about exercise benefits
2. Read `生成信息图提示词.md`
3. Generate HTML file combining the prompt template instructions with exercise content
4. Save to `生成结果信息图/exercise-benefits-2024-11-13-123456.html`
5. Run screenshot script to create PNG
6. Present the image to the user

## Design Guidelines

When generating infographics:

**Colors**:
- Use hex colors for consistency
- Ensure sufficient contrast (4.5:1 minimum for text)
- Limit to 3-5 colors plus neutrals
- Consider color psychology (blue = trust, green = growth, red = urgency)

**Typography**:
- Headings: 24-48px, bold
- Subheadings: 18-24px, semi-bold
- Body text: 14-16px, regular
- Small text: 12-14px
- Line height: 1.4-1.6 for readability

**Layout**:
- Maximum width: 1200px for readability
- Use grid or flexbox for alignment
- Consistent spacing (use multiples of 8px)
- Mobile-first responsive design

**Icons and Graphics**:
- Use CSS shapes (circles, triangles, etc.)
- Unicode symbols (✓, ★, ➜, etc.)
- SVG for custom graphics (inline in HTML)
- Avoid external image dependencies

## Code Style

- Write clean, readable HTML
- Use semantic HTML5 elements
- Inline all CSS (no external stylesheets)
- Include comments for complex sections
- Use modern CSS (flexbox, grid, variables)

## Validation

Before finalizing:
- Check all text is readable (sufficient contrast)
- Verify layout works (no overflow)
- Test visual hierarchy (eye flows correctly)
- Ensure consistent spacing
- Validate HTML structure
