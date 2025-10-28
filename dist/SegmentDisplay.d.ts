/**
 * Options for SegmentDisplay constructor
 */
export interface SegmentDisplayOptions {
    /** Initial text to display */
    text?: string;
    /** Number of digits to display */
    digitCount?: number;
    /** Scroll speed in milliseconds */
    scrollSpeed?: number;
    /** Enable scrolling animation */
    scrolling?: boolean;
    /** Enable rainbow color mode */
    rainbowMode?: boolean;
    /** Default segment color (CSS color value) */
    color?: string | null;
}

/**
 * Segment colors for a single digit
 */
export interface SegmentColors {
    a?: string;
    b?: string;
    c?: string;
    d?: string;
    e?: string;
    f?: string;
    g?: string;
}

/**
 * SegmentDisplay - A 7-segment display library with multi-color segments
 */
export declare class SegmentDisplay {
    /**
     * Character mapping for 7-segment display
     */
    static SEGMENT_MAP: Record<string, string[]>;

    /**
     * Create a new SegmentDisplay instance
     * @param container - Container element or CSS selector
     * @param options - Configuration options
     */
    constructor(container: string | HTMLElement, options?: SegmentDisplayOptions);

    /**
     * Render the display
     */
    render(): void;

    /**
     * Set display text
     * @param text - Text to display
     */
    setText(text: string): void;

    /**
     * Set number of digits
     * @param count - Number of digits
     */
    setDigitCount(count: number): void;

    /**
     * Start scrolling animation
     */
    startScrolling(): void;

    /**
     * Stop scrolling animation
     */
    stopScrolling(): void;

    /**
     * Set scroll speed
     * @param speed - Speed in milliseconds
     */
    setScrollSpeed(speed: number): void;

    /**
     * Enable/disable rainbow mode
     * @param enabled - Rainbow mode state
     */
    setRainbowMode(enabled: boolean): void;

    /**
     * Set default segment color
     * @param color - CSS color value
     */
    setColor(color: string): void;

    /**
     * Randomize segment colors
     */
    randomizeColors(): void;

    /**
     * Set custom colors for a specific digit
     * @param digitIndex - Index of the digit
     * @param colors - Object with segment colors
     */
    setDigitColors(digitIndex: number, colors: SegmentColors): void;

    /**
     * Clear all custom colors
     */
    clearColors(): void;

    /**
     * Destroy the display and cleanup
     */
    destroy(): void;
}

export default SegmentDisplay;
