# 📦 NPM Package Guide - SegmentDisplay

Complete guide to publishing and using the SegmentDisplay library on npm.

## 📋 Pre-Publishing Checklist

### 1. Update package.json
Edit `package.json` and update:
```json
{
  "name": "segment-display",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "url": "https://github.com/YOURUSERNAME/seven-segment.git"
  }
}
```

### 2. Install Build Dependencies
```bash
npm install
```

This installs:
- `terser` - JavaScript minifier
- `clean-css-cli` - CSS minifier

### 3. Build the Package
```bash
npm run build
```

This creates:
- `dist/segment-display.min.js` - Minified JavaScript
- `dist/segment-display.min.css` - Minified CSS

## 🚀 Publishing to NPM

### First Time Setup

1. **Create NPM Account**
   - Go to [npmjs.com](https://www.npmjs.com/signup)
   - Or run: `npm adduser`

2. **Login to NPM**
   ```bash
   npm login
   ```

3. **Check Package Name Availability**
   ```bash
   npm search segment-display
   ```
   
   If taken, update the name in `package.json`:
   ```json
   {
     "name": "@yourusername/segment-display"
   }
   ```

### Publishing

1. **Test Build**
   ```bash
   npm run build
   ```

2. **Check Package Contents**
   ```bash
   npm pack --dry-run
   ```

3. **Publish**
   ```bash
   npm publish
   
   # For scoped packages (if using @username/package-name):
   npm publish --access public
   ```

### Version Updates

Use semantic versioning:
```bash
# Patch: 1.0.0 → 1.0.1 (bug fixes)
npm version patch

# Minor: 1.0.1 → 1.1.0 (new features, backwards compatible)
npm version minor

# Major: 1.1.0 → 2.0.0 (breaking changes)
npm version major

# Then publish
npm publish
```

## 📚 Usage Documentation

### Installation

```bash
npm install segment-display
```

### CDN (unpkg)

```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/segment-display@1.0.0/dist/segment-display.min.css">

<!-- JavaScript -->
<script src="https://unpkg.com/segment-display@1.0.0/dist/segment-display.min.js"></script>
```

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://unpkg.com/segment-display/dist/segment-display.min.css">
</head>
<body>
    <div id="display"></div>

    <script src="https://unpkg.com/segment-display/dist/segment-display.min.js"></script>
    <script>
        const display = new SegmentDisplay('#display', {
            text: 'HELLO',
            digitCount: 5,
            scrolling: false
        });
    </script>
</body>
</html>
```

### ES6 Module

```javascript
import SegmentDisplay from 'segment-display';
import 'segment-display/dist/segment-display.min.css';

const display = new SegmentDisplay('#display', {
    text: 'HELLO WORLD',
    digitCount: 8,
    scrollSpeed: 200,
    scrolling: true,
    rainbowMode: false
});
```

### CommonJS

```javascript
const SegmentDisplay = require('segment-display');

const display = new SegmentDisplay('#display', {
    text: 'NODEJS',
    digitCount: 6
});
```

## 🎯 API Reference

### Constructor

```javascript
new SegmentDisplay(container, options)
```

**Parameters:**
- `container` (string|HTMLElement) - CSS selector or DOM element
- `options` (Object) - Configuration options

**Options:**
```javascript
{
    text: 'HELLO',          // Initial text
    digitCount: 8,          // Number of digits
    scrollSpeed: 200,       // Scroll speed (ms)
    scrolling: true,        // Enable scrolling
    rainbowMode: false,     // Rainbow colors
    color: '#00ff88'        // Default segment color
}
```

### Methods

```javascript
// Update text
display.setText('NEW TEXT');

// Change digit count
display.setDigitCount(10);

// Control scrolling
display.startScrolling();
display.stopScrolling();
display.setScrollSpeed(150);

// Colors
display.setRainbowMode(true);
display.setColor('#ff0000');
display.randomizeColors();

// Per-digit colors
display.setDigitColors(0, {
    a: '#ff0000',
    b: '#00ff00',
    c: '#0000ff'
});

// Cleanup
display.destroy();
```

## 🌟 Examples

### Clock Display

```javascript
const clock = new SegmentDisplay('#clock', {
    text: '00:00:00',
    digitCount: 8,
    scrolling: false
});

setInterval(() => {
    const now = new Date();
    const time = now.toTimeString().slice(0, 8);
    clock.setText(time);
}, 1000);
```

### Scrolling Message

```javascript
const marquee = new SegmentDisplay('#marquee', {
    text: 'WELCOME TO OUR STORE! SPECIAL OFFERS TODAY!',
    digitCount: 16,
    scrollSpeed: 150,
    scrolling: true,
    rainbowMode: true
});
```

### Counter

```javascript
let count = 0;
const counter = new SegmentDisplay('#counter', {
    text: '0',
    digitCount: 4,
    scrolling: false
});

setInterval(() => {
    count++;
    counter.setText(count.toString().padStart(4, '0'));
}, 1000);
```

## 🔧 TypeScript Support

The package includes TypeScript definitions:

```typescript
import SegmentDisplay, { SegmentDisplayOptions } from 'segment-display';

const options: SegmentDisplayOptions = {
    text: 'TYPESCRIPT',
    digitCount: 10,
    scrolling: true
};

const display = new SegmentDisplay('#display', options);
```

## 🎨 Theming

Override CSS variables:

```css
:root {
    --segment-on: #ff00ff;      /* Active segment color */
    --segment-off: rgba(0,0,0,0.1);  /* Inactive segment */
    --glow: rgba(255,0,255,0.6);     /* Glow effect */
}
```

## 🐛 Troubleshooting

### CSS not loading
Make sure to import the CSS file:
```javascript
import 'segment-display/dist/segment-display.min.css';
```

### "Container not found" error
Ensure the DOM element exists before creating the display:
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const display = new SegmentDisplay('#display', {...});
});
```

### Display not updating
Call `render()` manually if needed:
```javascript
display.setText('TEST');
display.render(); // Force re-render
```

## 📊 Bundle Size

- **JS (minified)**: ~8KB
- **CSS (minified)**: ~2KB
- **Total**: ~10KB (no dependencies!)

## 🤝 Contributing

See main [README.md](./README.md) for contribution guidelines.

## 📄 License

MIT License - see [LICENSE](./LICENSE) file.

## 🔗 Links

- [GitHub Repository](https://github.com/yourusername/seven-segment)
- [Live Demo](https://yourusername.github.io/seven-segment/)
- [NPM Package](https://www.npmjs.com/package/segment-display)
- [Issues](https://github.com/yourusername/seven-segment/issues)
