import { PluginOptions } from 'gatsby';
export declare const trimRightSlash: (path: string) => string;
export declare const trimSlashes: (path: string) => string;
export declare const replaceSegmentsWithSlugs: (path: string, slugs: Record<string, string>) => string;
export declare const addLocalePrefix: (path: string, locale: string, prefix: string, defaultLocale: string) => string;
export declare const translatePagePath: (path: string, slugs: Record<string, string>, locale: string, prefix: string, defaultLocale: string) => string;
export declare const translatePagePaths: (path: string, options: PluginOptions) => {
    locale: string;
    path: string;
}[];
export declare const parsePathPrefix: (path: string, defaultPrefix: string) => string;
export declare const generatePageContextByPath: (path: string, options: PluginOptions) => {
    locale: string | undefined;
    prefix: string | undefined;
};
