export declare function findClosestLocale(locale: string, locales: string[]): string | undefined;
export declare const parseFilenameSuffix: (name: string, defaultLocale: string) => {
    filename: string;
    estimatedLocale: string;
};
export declare const createLocalePagesId: (path: string, prefix?: string) => string;
