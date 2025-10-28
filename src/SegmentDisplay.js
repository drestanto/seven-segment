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
        
        // Uppercase Letters
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
        
        // Lowercase Letters (fun approximations!)
        'a': ['a', 'b', 'c', 'd', 'e', 'g'],
        'b': ['c', 'd', 'e', 'f', 'g'],
        'c': ['d', 'e', 'g'],
        'd': ['b', 'c', 'd', 'e', 'g'],
        'e': ['a', 'b', 'd', 'e', 'f', 'g'],
        'f': ['a', 'e', 'f', 'g'],
        'g': ['a', 'b', 'c', 'd', 'f', 'g'],
        'h': ['c', 'e', 'f', 'g'],
        'i': ['c'],
        'j': ['b', 'c', 'd'],
        'k': ['b', 'c', 'e', 'f', 'g'],
        'l': ['e', 'f'],
        'm': ['a', 'c', 'e', 'g'],
        'n': ['c', 'e', 'g'],
        'o': ['c', 'd', 'e', 'g'],
        'p': ['a', 'b', 'e', 'f', 'g'],
        'q': ['a', 'b', 'c', 'f', 'g'],
        'r': ['e', 'g'],
        's': ['a', 'c', 'd', 'f', 'g'],
        't': ['d', 'e', 'f', 'g'],
        'u': ['c', 'd', 'e'],
        'v': ['c', 'd', 'e'],
        'w': ['b', 'd', 'f'],
        'x': ['b', 'c', 'e', 'f', 'g'],
        'y': ['b', 'c', 'd', 'f', 'g'],
        'z': ['a', 'b', 'd', 'e', 'g'],
        
        // Math & Common Symbols
        '+': ['b', 'f', 'g'],
        '/': ['b', 'e', 'g'],
        '\\': ['c', 'f', 'g'],
        '<': ['e', 'f'],
        '>': ['b', 'c'],
        '^': ['a', 'b', 'f'],
        '|': ['b', 'c', 'e', 'f'],
        '~': ['a', 'g'],
        '`': ['f'],
        '@': ['a', 'b', 'c', 'd', 'e', 'f'],
        '#': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        '$': ['a', 'c', 'd', 'f', 'g'],
        '%': ['a', 'c', 'f'],
        '&': ['a', 'c', 'd', 'e', 'f', 'g'],
        
        // Brackets & Punctuation
        ' ': [],
        '-': ['g'],
        '_': ['d'],
        '=': ['d', 'g'],
        '°': ['a', 'b', 'f', 'g'],
        '"': ['b', 'f'],
        "'": ['f'],
        '[': ['a', 'd', 'e', 'f'],
        ']': ['a', 'b', 'c', 'd'],
        '{': ['a', 'd', 'e', 'f'],
        '}': ['a', 'b', 'c', 'd'],
        '(': ['a', 'd', 'e', 'f'],
        ')': ['a', 'b', 'c', 'd'],
        '*': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        '!': ['b', 'c'],
        '?': ['a', 'b', 'e', 'g'],
        '.': ['c'],
        ',': ['c'],
        ':': ['b', 'e'],
        ';': ['b', 'c'],
        
        // Fun extras
        '♥': ['b', 'c', 'd', 'f', 'g'],
        '☺': ['a', 'b', 'c', 'd', 'e', 'f'],
        '→': ['a', 'b', 'c', 'g'],
        '←': ['a', 'd', 'e', 'f', 'g'],
        '↑': ['a', 'b', 'f'],
        '↓': ['c', 'd', 'e'],
    };

    constructor(container, options = {}) {
        this.container = typeof container === 'string' 
            ? document.querySelector(container) 
            : container;
        
        if (!this.container) {
            throw new Error('Container element not found');
        }

        this.options = {
            text: options.text || 'HELLO',
            digitCount: options.digitCount || 8,
            scrollSpeed: options.scrollSpeed || 200,
            scrolling: options.scrolling !== undefined ? options.scrolling : true,
            rainbowMode: options.rainbowMode || false,
            color: options.color || null,
        };

        this.scrollPosition = 0;
        this.scrollInterval = null;
        this.currentColors = [];
        this.digits = [];

        this._init();
    }

    _init() {
        this.container.classList.add('segment-display');
        this._createDigits();
        this.render();
        
        if (this.options.scrolling) {
            this.startScrolling();
        }
    }

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

    _getCharSegments(char) {
        // Try exact match first (preserves lowercase)
        if (SegmentDisplay.SEGMENT_MAP[char]) {
            return SegmentDisplay.SEGMENT_MAP[char];
        }
        // Fallback to uppercase
        const upper = char.toUpperCase();
        return SegmentDisplay.SEGMENT_MAP[upper] || SegmentDisplay.SEGMENT_MAP['8'];
    }

    _randomColor() {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 80%, 60%)`;
    }

    _rainbowColor(index, total) {
        const hue = (index / total) * 360;
        return `hsl(${hue}, 80%, 60%)`;
    }

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

    render() {
        const displayText = this._prepareDisplayText();
        
        this.digits.forEach((digit, index) => {
            const char = displayText[index] || ' ';
            this._renderCharacter(digit, char, index);
        });
    }

    setText(text) {
        this.options.text = text;
        this.scrollPosition = 0;
        this.render();
    }

    setDigitCount(count) {
        this.options.digitCount = count;
        this._createDigits();
        this.render();
        
        if (this.options.scrolling) {
            this.startScrolling();
        }
    }

    startScrolling() {
        this.stopScrolling();
        this.options.scrolling = true;
        
        this.scrollInterval = setInterval(() => {
            this.scrollPosition = (this.scrollPosition + 1) % (this.options.text.length + 6);
            this.render();
        }, this.options.scrollSpeed);
    }

    stopScrolling() {
        if (this.scrollInterval) {
            clearInterval(this.scrollInterval);
            this.scrollInterval = null;
        }
        this.options.scrolling = false;
    }

    setScrollSpeed(speed) {
        this.options.scrollSpeed = speed;
        
        if (this.options.scrolling) {
            this.startScrolling();
        }
    }

    setRainbowMode(enabled) {
        this.options.rainbowMode = enabled;
        this.render();
    }

    setColor(color) {
        this.options.color = color;
        this.render();
    }

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

    setDigitColors(digitIndex, colors) {
        if (digitIndex >= 0 && digitIndex < this.options.digitCount) {
            this.currentColors[digitIndex] = { ...colors };
            this.render();
        }
    }

    clearColors() {
        this.currentColors = Array(this.options.digitCount).fill(null).map(() => ({}));
        this.render();
    }

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
