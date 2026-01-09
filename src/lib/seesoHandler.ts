import EasySeeso from 'seeso/easy-seeso';
import { SEESO_LICENSE_KEY } from './constants';

export type GazeData = {
    x: number;
    y: number;
};

// Singleton instance management
let seesoInstance: EasySeeso | null = null;
let gazeCallback: ((data: GazeData) => void) | null = null;
let mockTrackingTimer: any = null;

export const initSeeso = async (): Promise<boolean> => {
    if (seesoInstance) return true;

    return new Promise((resolve) => {
        const afterInitialized = () => {
            console.log('SeeSo Initialized');
            // Start gaze tracking immediately after init
            seesoInstance?.startTracking(
                (gazeInfo: any) => {
                    if (gazeCallback) {
                        // Simple Weighted Smoothing
                        // You could replace this with a OneEuroFilter or Kalman Filter for better results
                        const smoothed = smoothGaze(gazeInfo.x, gazeInfo.y);
                        gazeCallback(smoothed);
                    }
                },
                () => { /* checking callback */ }
            );
            resolve(true);
        };

        const afterFailed = () => {
            console.error('SeeSo Init Failed');
            resolve(false);
        };

        seesoInstance = new EasySeeso();

        // Check if key is set
        if (!SEESO_LICENSE_KEY || SEESO_LICENSE_KEY.length < 10) {
            console.warn("SeeSo License Key not set!");
            setTimeout(() => {
                console.log("Mock SeeSo Init (No Key)");
                startMockTracking();
                resolve(true);
            }, 1000);
            return;
        }

        seesoInstance.init(
            SEESO_LICENSE_KEY,
            afterInitialized,
            afterFailed
        );
    });
};

export const startCalibration = (
    onNextPoint: (pointNum: number, x: number, y: number) => void,
    onProgress: (progress: number) => void,
    onFinish: () => void
) => {
    // Safety check
    if (!seesoInstance) {
        alert("SeeSo Instance not initialized! Falling back to Mock.");
        mockCalibration(onNextPoint, onProgress, onFinish);
        return;
    }

    if (!SEESO_LICENSE_KEY || SEESO_LICENSE_KEY.length < 10) {
        mockCalibration(onNextPoint, onProgress, onFinish);
        return;
    }

    try {
        // Ensure tracking is stopped before calibration
        seesoInstance.stopTracking();

        console.log("Starting SeeSo Calibration...");
        seesoInstance.startCalibration(
            onNextPoint,
            onProgress,
            onFinish
        );

    } catch (e: any) {
        console.error("Calibration Error:", e);
        // Alert only in dev or if critical, but for now helpful for user
        alert("Calibration API Error: " + (e.message || e) + ". Using Mock.");
        mockCalibration(onNextPoint, onProgress, onFinish);
    }
};

export const stopTracking = () => {
    seesoInstance?.stopTracking();
    if (mockTrackingTimer) {
        clearInterval(mockTrackingTimer);
        mockTrackingTimer = null;
    }
};

export const setGazeCallback = (cb: (data: GazeData) => void) => {
    gazeCallback = cb;
};

// --- Mock Helpers ---

const startMockTracking = () => {
    if (mockTrackingTimer) clearInterval(mockTrackingTimer);

    const w = window.innerWidth;
    const h = window.innerHeight;
    let t = 0;

    mockTrackingTimer = setInterval(() => {
        if (gazeCallback) {
            t += 0.05;
            // Figure-8 pattern
            const x = (w / 2) + (Math.cos(t) * (w / 3));
            const y = (h / 2) + (Math.sin(2 * t) * (h / 3));
            gazeCallback({ x, y });
        }
    }, 30); // ~30fps
};

const mockCalibration = (
    onNextPoint: (n: number, x: number, y: number) => void,
    onProgress: (p: number) => void,
    onFinish: () => void
) => {
    // Simulate 5 points
    let points = [
        { x: 0.1, y: 0.1 }, { x: 0.9, y: 0.1 }, { x: 0.5, y: 0.5 }, { x: 0.1, y: 0.9 }, { x: 0.9, y: 0.9 }
    ];
    // Convert to pixels assuming 1920x1080 usually, or window inner
    const w = window.innerWidth;
    const h = window.innerHeight;

    let idx = 0;
    const next = () => {
        if (idx >= points.length) {
            onFinish();
            return;
        }
        const p = points[idx];
        onNextPoint(idx, p.x * w, p.y * h);

        // Sim progress
        let prog = 0;
        const interval = setInterval(() => {
            prog += 0.1;
            onProgress(prog);
            if (prog >= 1) {
                clearInterval(interval);
                idx++;
                next();
            }
        }, 200);
    };

    next();
};

// --- Gaze Smoothing ---
let lastX = 0;
let lastY = 0;
const ALPHA = 0.4; // Smoothing factor (0.1 = very smooth/slow, 0.9 = responsive/jittery)

const smoothGaze = (rawX: number, rawY: number): GazeData => {
    // Initial case
    if (lastX === 0 && lastY === 0) {
        lastX = rawX;
        lastY = rawY;
        return { x: rawX, y: rawY };
    }

    const newX = lastX * (1 - ALPHA) + rawX * ALPHA;
    const newY = lastY * (1 - ALPHA) + rawY * ALPHA;

    lastX = newX;
    lastY = newY;

    return { x: newX, y: newY };
};
