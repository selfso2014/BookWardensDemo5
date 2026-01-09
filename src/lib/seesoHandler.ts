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
                        gazeCallback({ x: gazeInfo.x, y: gazeInfo.y });
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
        if (!SEESO_LICENSE_KEY || SEESO_LICENSE_KEY === 'YOUR_LICENSE_KEY_HERE') {
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
    if (!seesoInstance || !SEESO_LICENSE_KEY || SEESO_LICENSE_KEY === 'YOUR_LICENSE_KEY_HERE') {
        // Mock Fallback
        mockCalibration(onNextPoint, onProgress, onFinish);
        return;
    }

    try {
        seesoInstance.startCalibration(
            onNextPoint,
            onProgress,
            onFinish
        );
    } catch (e) {
        console.error("Calibration error", e);
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
