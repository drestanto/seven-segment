// ========================================
// 7-Segment Character Mapping
// Each character maps to segments a-g (7 segments)
// ========================================

const SEGMENT_MAP = {
    // Numbers
    '0': ['a', 'b', 'c', 'd', 'e', 'f'],
    '1': ['b', 'c'],
    '2': ['a', 'b', 'd', 'e', 'g'],
    '3': ['a', 'b', 'c', 'd', 'g'],
    '4': ['b', 'c', 'f', 'g'],
    '5': ['a', 'c', 'd', 'f', 'g'],
    '6': ['a', 'c', 'd', 'e', 'f', 'g'],
    '7': ['a', 'b', 'c'],
    '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    '9': ['a', 'b', 'c', 'd', 'f', 'g'],
    
    // Letters (uppercase)
    'A': ['a', 'b', 'c', 'e', 'f', 'g'],
    'B': ['c', 'd', 'e', 'f', 'g'], // lowercase b
    'C': ['a', 'd', 'e', 'f'],
    'D': ['b', 'c', 'd', 'e', 'g'], // lowercase d
    'E': ['a', 'd', 'e', 'f', 'g'],
    'F': ['a', 'e', 'f', 'g'],
    'G': ['a', 'c', 'd', 'e', 'f'],
    'H': ['b', 'c', 'e', 'f', 'g'],
    'I': ['b', 'c'],
    'J': ['b', 'c', 'd', 'e'],
    'K': ['b', 'c', 'e', 'f', 'g'], // approximation
    'L': ['d', 'e', 'f'],
    'M': ['a', 'c', 'e'], // approximation
    'N': ['c', 'e', 'g'],
    'O': ['a', 'b', 'c', 'd', 'e', 'f'],
    'P': ['a', 'b', 'e', 'f', 'g'],
    'Q': ['a', 'b', 'c', 'f', 'g'],
    'R': ['e', 'g'],
    'S': ['a', 'c', 'd', 'f', 'g'],
    'T': ['d', 'e', 'f', 'g'],
    'U': ['b', 'c', 'd', 'e', 'f'],
    'V': ['c', 'd', 'e'], // approximation
    'W': ['b', 'd', 'f'], // approximation
    'X': ['b', 'c', 'e', 'f', 'g'], // approximation
    'Y': ['b', 'c', 'd', 'f', 'g'],
    'Z': ['a', 'b', 'd', 'e'], // approximation
    
    // Special characters
    ' ': [],
    '-': ['g'],
    '_': ['d'],
    '=': ['d', 'g'],
    '°': ['a', 'b', 'f', 'g'],
    '"': ['b', 'f'],
    '\'': ['f'],
    '[': ['a', 'd', 'e', 'f'],
    ']': ['a', 'b', 'c', 'd'],
    '(': ['a', 'd', 'e', 'f'],
    ')': ['a', 'b', 'c', 'd'],
    '*': ['a', 'b', 'c', 'd', 'e', 'f', 'g'], // full display
    '!': ['b', 'c'], // approximation
    '?': ['a', 'b', 'e', 'g'],
    '.': [], // typically shown as decimal point (not implemented here)
    ',': [], // approximation
};

// ========================================
// Global State
// ========================================

let state = {
    text: 'HELLO WORLD',
    digitCount: 8,
    scrollSpeed: 200,
    isScrolling: true,
    rainbowMode: false,
    scrollPosition: 0,
    scrollInterval: null,
    currentColors: [] // Store colors for each digit's segments
};

// ========================================
// Utility Functions
// ========================================

// Generate a random color
function randomColor() {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 80%, 60%)`;
}

// Generate rainbow colors
function rainbowColor(index, total) {
    const hue = (index / total) * 360;
    return `hsl(${hue}, 80%, 60%)`;
}

// Get character segments
function getCharSegments(char) {
    const upper = char.toUpperCase();
    return SEGMENT_MAP[upper] || SEGMENT_MAP['8']; // Default to 8 if unknown
}

// ========================================
// Display Creation & Rendering
// ========================================

// Create a single 7-segment digit
function createDigit() {
    const digit = document.createElement('div');
    digit.className = 'digit';
    
    // Create all 7 segments
    const segments = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    segments.forEach(seg => {
        const segment = document.createElement('div');
        segment.className = `segment segment-${seg}`;
        digit.appendChild(segment);
    });
    
    return digit;
}

// Initialize the display with empty digits
function initDisplay() {
    const display = document.getElementById('segmentDisplay');
    display.innerHTML = '';
    
    // Create digits based on digitCount
    for (let i = 0; i < state.digitCount; i++) {
        const digit = createDigit();
        display.appendChild(digit);
    }
    
    // Initialize color array
    state.currentColors = Array(state.digitCount).fill(null).map(() => ({}));
}

// Render a character on a specific digit
function renderCharacter(digitElement, char, digitIndex) {
    const segments = getCharSegments(char);
    const segmentElements = digitElement.querySelectorAll('.segment');
    
    segmentElements.forEach((seg, idx) => {
        const segmentName = ['a', 'b', 'c', 'd', 'e', 'f', 'g'][idx];
        const shouldBeOn = segments.includes(segmentName);
        
        if (shouldBeOn) {
            seg.classList.add('on');
            
            // Apply color based on mode
            let color;
            if (state.rainbowMode) {
                color = rainbowColor(digitIndex * 7 + idx, state.digitCount * 7);
            } else if (state.currentColors[digitIndex] && state.currentColors[digitIndex][segmentName]) {
                color = state.currentColors[digitIndex][segmentName];
            } else {
                color = getComputedStyle(document.documentElement).getPropertyValue('--segment-on').trim();
            }
            
            seg.style.background = color;
            seg.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
        } else {
            seg.classList.remove('on');
            seg.style.background = '';
            seg.style.boxShadow = '';
        }
    });
}

// Update the entire display
function updateDisplay() {
    const display = document.getElementById('segmentDisplay');
    const digits = display.querySelectorAll('.digit');
    
    // Prepare the text to display (with scrolling offset)
    const displayText = prepareDisplayText();
    
    // Render each digit
    digits.forEach((digit, index) => {
        const char = displayText[index] || ' ';
        renderCharacter(digit, char, index);
    });
}

// Prepare text for display (handle scrolling)
function prepareDisplayText() {
    if (!state.isScrolling) {
        // Static display - pad or truncate
        const padded = state.text.padEnd(state.digitCount, ' ');
        return padded.substring(0, state.digitCount);
    }
    
    // Scrolling display
    const paddedText = '   ' + state.text + '   '; // Add spacing for smooth loop
    const textLength = paddedText.length;
    
    // Create a circular text view
    let result = '';
    for (let i = 0; i < state.digitCount; i++) {
        const charIndex = (state.scrollPosition + i) % textLength;
        result += paddedText[charIndex];
    }
    
    return result;
}

// ========================================
// Scrolling Logic
// ========================================

function startScrolling() {
    stopScrolling(); // Clear any existing interval
    
    if (state.isScrolling) {
        state.scrollInterval = setInterval(() => {
            state.scrollPosition = (state.scrollPosition + 1) % (state.text.length + 6);
            updateDisplay();
        }, state.scrollSpeed);
    }
}

function stopScrolling() {
    if (state.scrollInterval) {
        clearInterval(state.scrollInterval);
        state.scrollInterval = null;
    }
}

// ========================================
// Color Randomization
// ========================================

function randomizeColors() {
    // Generate random colors for each segment of each digit
    state.currentColors = Array(state.digitCount).fill(null).map(() => {
        return {
            'a': randomColor(),
            'b': randomColor(),
            'c': randomColor(),
            'd': randomColor(),
            'e': randomColor(),
            'f': randomColor(),
            'g': randomColor()
        };
    });
    
    state.rainbowMode = false;
    document.getElementById('rainbowMode').checked = false;
    updateDisplay();
}

// ========================================
// Event Handlers
// ========================================

function handleUpdateDisplay() {
    const newText = document.getElementById('textInput').value || ' ';
    const newDigitCount = parseInt(document.getElementById('digitCount').value) || 8;
    
    state.text = newText;
    
    // Reinitialize if digit count changed
    if (newDigitCount !== state.digitCount) {
        state.digitCount = newDigitCount;
        initDisplay();
    }
    
    state.scrollPosition = 0;
    updateDisplay();
    startScrolling();
}

function handleScrollToggle(e) {
    state.isScrolling = e.target.checked;
    if (state.isScrolling) {
        startScrolling();
    } else {
        stopScrolling();
        state.scrollPosition = 0;
        updateDisplay();
    }
}

function handleRainbowMode(e) {
    state.rainbowMode = e.target.checked;
    updateDisplay();
}

function handleScrollSpeed(e) {
    state.scrollSpeed = parseInt(e.target.value);
    document.getElementById('speedValue').textContent = `${state.scrollSpeed}ms`;
    if (state.isScrolling) {
        startScrolling(); // Restart with new speed
    }
}

function handleThemeToggle() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    if (newTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        document.querySelector('.theme-toggle .icon').textContent = '☀️';
    } else {
        document.documentElement.removeAttribute('data-theme');
        document.querySelector('.theme-toggle .icon').textContent = '🌙';
    }
    
    // Reapply colors after theme change
    updateDisplay();
}

// ========================================
// Code Generation
// ========================================

function generateHTMLCode() {
    const text = state.text;
    const digitCount = state.digitCount;
    const scrollSpeed = state.scrollSpeed;
    const isScrolling = state.isScrolling;
    
    const code = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>7-Segment Display</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fun-7-segment@1.1.0/dist/fun-7-segment.min.css">
</head>
<body>
    <div id="display"></div>

    <script src="https://cdn.jsdelivr.net/npm/fun-7-segment@1.1.0/dist/fun-7-segment.min.js"><\/script>
    <script>
        const display = new SegmentDisplay({
            container: '#display',
            digits: ${digitCount},
            text: '${text}',
            scrolling: ${isScrolling},
            scrollSpeed: ${scrollSpeed}
        });
    <\/script>
</body>
</html>`;
    
    return code;
}

function handleGenerateScript() {
    const code = generateHTMLCode();
    const modal = document.getElementById('codeModal');
    const codeElement = document.getElementById('generatedCode');
    
    codeElement.textContent = code;
    modal.classList.add('active');
}

function handleCloseModal() {
    const modal = document.getElementById('codeModal');
    modal.classList.remove('active');
}

function handleCopyCode() {
    const codeElement = document.getElementById('generatedCode');
    const code = codeElement.textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        const button = document.getElementById('copyCode');
        const originalText = button.textContent;
        button.textContent = '✓ Copied!';
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    }).catch(err => {
        alert('Failed to copy code');
    });
}

// ========================================
// Initialization
// ========================================

function init() {
    // Create initial display
    initDisplay();
    updateDisplay();
    startScrolling();
    
    // Attach event listeners
    document.getElementById('updateDisplay').addEventListener('click', handleUpdateDisplay);
    document.getElementById('randomColors').addEventListener('click', randomizeColors);
    document.getElementById('scrollToggle').addEventListener('change', handleScrollToggle);
    document.getElementById('rainbowMode').addEventListener('change', handleRainbowMode);
    document.getElementById('scrollSpeed').addEventListener('input', handleScrollSpeed);
    document.getElementById('themeToggle').addEventListener('click', handleThemeToggle);
    document.getElementById('generateScript').addEventListener('click', handleGenerateScript);
    document.getElementById('closeModal').addEventListener('click', handleCloseModal);
    document.getElementById('copyCode').addEventListener('click', handleCopyCode);
    
    // Close modal when clicking outside
    document.getElementById('codeModal').addEventListener('click', (e) => {
        if (e.target.id === 'codeModal') {
            handleCloseModal();
        }
    });
    
    // Allow Enter key to update display
    document.getElementById('textInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUpdateDisplay();
        }
    });
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
