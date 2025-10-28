/**
 * SegmentDisplay - A 7-segment display library with multi-color segments
 * @class
 */
class SegmentDisplay {
    /**
     * Character mapping for 7-segment display
     * Each character maps to segments a-g
     */
    static SEGMENT_MAP = {
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
        
        // Letters
        'A': ['a', 'b', 'c', 'e', 'f', 'g'],
        'B': ['c', 'd', 'e', 'f', 'g'],
        'C': ['a', 'd', 'e', 'f'],
        'D': ['b', 'c', 'd', 'e', 'g'],
        'E': ['a', 'd', 'e', 'f', 'g'],
        'F': ['a', 'e', 'f', 'g'],
        'G': ['a', 'c', 'd', 'e', 'f'],
        'H': ['b', 'c', 'e', 'f', 'g'],
        'I': ['b', 'c'],
        'J': ['b', 'c', 'd', 'e'],
        'K': ['b', 'c', 'e', 'f', 'g'],
        'L': ['d', 'e', 'f'],
        'M': ['a', 'c', 'e'],
        'N': ['c', 'e', 'g'],
        'O': ['a', 'b', 'c', 'd', 'e', 'f'],
        'P': ['a', 'b', 'e', 'f', 'g'],
        'Q': ['a', 'b', 'c', 'f', 'g'],
        'R': ['e', 'g'],
        'S': ['a', 'c', 'd', 'f', 'g'],
        'T': ['d', 'e', 'f', 'g'],
        'U': ['b', 'c', 'd', 'e', 'f'],
        'V': ['c', 'd', 'e'],
        'W': ['b', 'd', 'f'],
        'X': ['b', 'c', 'e', 'f', 'g'],
        'Y': ['b', 'c', 'd', 'f', 'g'],
        'Z': ['a', 'b', 'd', 'e'],
        
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
        '*': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        '!': ['b', 'c'],
        '?': ['a', 'b', 'e', 'g'],
        '.': [],
        ',': [],
    };

    /**
     * Create a new SegmentDisplay instance
     * @param {string|HTMLElement} container - Container element or selector
     * @param {Object} options - Configuration options
     * @param {string} options.text - Initial text to display
     * @param {number} options.digitCount - Number of digits to display
     * @param {number} options.scrollSpeed - Scroll speed in milliseconds
     * @param {boolean} options.scrolling - Enable scrolling
     * @param {boolean} options.rainbowMode - Enable rainbow color mode
     * @param {string} options.color - Default segment color
     */
    constructor(container, options = {}) {
        // Parse container
        this.container = typeof container === 'string' 
            ? document.querySelector(container) 
            : container;
        
        if (!this.container) {
            throw new Error('Container element not found');
        }

        // Default options
        this.options = {
            text: options.text || 'HELLO',
            digitCount: options.digitCount || 8,
            scrollSpeed: options.scrollSpeed || 200,
            scrolling: options.scrolling !== undefined ? options.scrolling : true,
            rainbowMode: options.rainbowMode || false,
            color: options.color || null,
        };

        // Internal state
        this.scrollPosition = 0;
        this.scrollInterval = null;
        this.currentColors = [];
        this.digits = [];

        // Initialize
        this._init();
    }

    /**
     * Initialize the display
     * @private
     */
    _init() {
        this.container.classList.add('segment-display');
        this._createDigits();
        this.render();
        
        if (this.options.scrolling) {
            this.startScrolling();
        }
    }

    /**
     * Create digit elements
     * @private
     */
    _createDigits() {
        this.container.innerHTML = '';
        this.digits = [];
        
        for (let i = 0; i < this.options.digitCount; i++) {
            const digit = this._createDigit();
            this.container.appendChild(digit);
            this.digits.push(digit);
        }
        
        this.currentColors = Array(this.options.digitCount).fill(null).map(() => ({}));
    }

    /**
     * Create a single digit element
     * @private
     */
    _createDigit() {
        const digit = document.createElement('div');
        digit.className = 'digit';
        
        const segments = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
        segments.forEach(seg => {
            const segment = document.createElement('div');
            segment.className = `segment segment-${seg}`;
            digit.appendChild(segment);
        });
        
        return digit;
    }

    /**
     * Get segments for a character
     * @private
     */
    _getCharSegments(char) {
        const upper = char.toUpperCase();
        return SegmentDisplay.SEGMENT_MAP[upper] || SegmentDisplay.SEGMENT_MAP['8'];
    }

    /**
     * Generate a random color
     * @private
     */
    _randomColor() {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 80%, 60%)`;
    }

    /**
     * Generate rainbow color
     * @private
     */
    _rainbowColor(index, total) {
        const hue = (index / total) * 360;
        return `hsl(${hue}, 80%, 60%)`;
    }

    /**
     * Render a character on a digit
     * @private
     */
    _renderCharacter(digitElement, char, digitIndex) {
        const segments = this._getCharSegments(char);
        const segmentElements = digitElement.querySelectorAll('.segment');
        
        segmentElements.forEach((seg, idx) => {
            const segmentName = ['a', 'b', 'c', 'd', 'e', 'f', 'g'][idx];
            const shouldBeOn = segments.includes(segmentName);
            
            if (shouldBeOn) {
                seg.classList.add('on');
                
                let color;
                if (this.options.rainbowMode) {
                    color = this._rainbowColor(digitIndex * 7 + idx, this.options.digitCount * 7);
                } else if (this.currentColors[digitIndex] && this.currentColors[digitIndex][segmentName]) {
                    color = this.currentColors[digitIndex][segmentName];
                } else if (this.options.color) {
                    color = this.options.color;
                } else {
                    color = getComputedStyle(document.documentElement)
                        .getPropertyValue('--segment-on').trim() || '#00ff88';
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

    /**
     * Prepare text for display
     * @private
     */
    _prepareDisplayText() {
        if (!this.options.scrolling) {
            const padded = this.options.text.padEnd(this.options.digitCount, ' ');
            return padded.substring(0, this.options.digitCount);
        }
        
        const paddedText = '   ' + this.options.text + '   ';
        const textLength = paddedText.length;
        
        let result = '';
        for (let i = 0; i < this.options.digitCount; i++) {
            const charIndex = (this.scrollPosition + i) % textLength;
            result += paddedText[charIndex];
        }
        
        return result;
    }

    /**
     * Render the display
     */
    render() {
        const displayText = this._prepareDisplayText();
        
        this.digits.forEach((digit, index) => {
            const char = displayText[index] || ' ';
            this._renderCharacter(digit, char, index);
        });
    }

    /**
     * Set display text
     * @param {string} text - Text to display
     */
    setText(text) {
        this.options.text = text;
        this.scrollPosition = 0;
        this.render();
    }

    /**
     * Set number of digits
     * @param {number} count - Number of digits
     */
    setDigitCount(count) {
        this.options.digitCount = count;
        this._createDigits();
        this.render();
        
        if (this.options.scrolling) {
            this.startScrolling();
        }
    }

    /**
     * Start scrolling animation
     */
    startScrolling() {
        this.stopScrolling();
        this.options.scrolling = true;
        
        this.scrollInterval = setInterval(() => {
            this.scrollPosition = (this.scrollPosition + 1) % (this.options.text.length + 6);
            this.render();
        }, this.options.scrollSpeed);
    }

    /**
     * Stop scrolling animation
     */
    stopScrolling() {
        if (this.scrollInterval) {
            clearInterval(this.scrollInterval);
            this.scrollInterval = null;
        }
        this.options.scrolling = false;
    }

    /**
     * Set scroll speed
     * @param {number} speed - Speed in milliseconds
     */
    setScrollSpeed(speed) {
        this.options.scrollSpeed = speed;
        
        if (this.options.scrolling) {
            this.startScrolling();
        }
    }

    /**
     * Enable/disable rainbow mode
     * @param {boolean} enabled - Rainbow mode state
     */
    setRainbowMode(enabled) {
        this.options.rainbowMode = enabled;
        this.render();
    }

    /**
     * Set default segment color
     * @param {string} color - CSS color value
     */
    setColor(color) {
        this.options.color = color;
        this.render();
    }

    /**
     * Randomize segment colors
     */
    randomizeColors() {
        this.currentColors = Array(this.options.digitCount).fill(null).map(() => {
            return {
                'a': this._randomColor(),
                'b': this._randomColor(),
                'c': this._randomColor(),
                'd': this._randomColor(),
                'e': this._randomColor(),
                'f': this._randomColor(),
                'g': this._randomColor()
            };
        });
        
        this.options.rainbowMode = false;
        this.render();
    }

    /**
     * Set custom colors for a specific digit
     * @param {number} digitIndex - Index of the digit
     * @param {Object} colors - Object with segment colors {a: 'color', b: 'color', ...}
     */
    setDigitColors(digitIndex, colors) {
        if (digitIndex >= 0 && digitIndex < this.options.digitCount) {
            this.currentColors[digitIndex] = { ...colors };
            this.render();
        }
    }

    /**
     * Clear all custom colors
     */
    clearColors() {
        this.currentColors = Array(this.options.digitCount).fill(null).map(() => ({}));
        this.render();
    }

    /**
     * Destroy the display and cleanup
     */
    destroy() {
        this.stopScrolling();
        this.container.innerHTML = '';
        this.digits = [];
        this.currentColors = [];
    }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SegmentDisplay;
}

if (typeof define === 'function' && define.amd) {
    define([], function() {
        return SegmentDisplay;
    });
}

if (typeof window !== 'undefined') {
    window.SegmentDisplay = SegmentDisplay;
}
