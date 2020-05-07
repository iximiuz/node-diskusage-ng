
declare function diskusage(
    path: string,
    callback: (
        err: unknown,
        usage: {
            readonly total: number;
            readonly used: number;
            readonly available: number;
        }
    ) => void
): void;

export = diskusage;
