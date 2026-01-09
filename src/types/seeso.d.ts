declare module 'seeso/easy-seeso' {
    export default class EasySeeso {
        init(key: string, afterInitialized: () => void, afterFailed: () => void): void;
        startTracking(callback: (gazeInfo: any) => void, onStatus: () => void): void;
        stopTracking(): void;
        startCalibration(
            onNextPoint: (pointNum: number, x: number, y: number) => void,
            onProgress: (progress: number) => void,
            onFinish: () => void
        ): void;
    }
}
