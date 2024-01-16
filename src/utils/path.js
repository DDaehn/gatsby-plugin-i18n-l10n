"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePageContextByPath = exports.parsePathPrefix = exports.translatePagePaths = exports.translatePagePath = exports.addLocalePrefix = exports.replaceSegmentsWithSlugs = exports.trimSlashes = exports.trimRightSlash = void 0;
const path_1 = require("path");
const trimRightSlash = (path) => {
    return path === '/' ? path : path.replace(/\/$/, '');
};
exports.trimRightSlash = trimRightSlash;
const trimSlashes = (path) => {
    return path === '/' ? path : path.replace(/^\/|\/$/g, '');
};
exports.trimSlashes = trimSlashes;
const replaceSegmentsWithSlugs = (path, slugs) => {
    const keys = Object.keys(slugs);
    if (keys.length > 0) {
        const exp = new RegExp(keys.join('|'), 'g');
        return path.replace(exp, (match) => slugs[match]);
    }
    return path;
};
exports.replaceSegmentsWithSlugs = replaceSegmentsWithSlugs;
const addLocalePrefix = (path, locale, prefix, defaultLocale) => {
    return locale !== defaultLocale ? (0, exports.trimRightSlash)(`/${path_1.posix.join(prefix, path)}`) : path;
};
exports.addLocalePrefix = addLocalePrefix;
const translatePagePath = (path, slugs, locale, prefix, defaultLocale) => {
    let translatedPath = path;
    translatedPath = (0, exports.replaceSegmentsWithSlugs)(translatedPath, slugs);
    translatedPath = (0, exports.addLocalePrefix)(translatedPath, locale, prefix, defaultLocale);
    return translatedPath;
};
exports.translatePagePath = translatePagePath;
const translatePagePaths = (path, options) => {
    return options.locales.map((locale) => {
        var _a;
        const trimmedPath = (0, exports.trimRightSlash)(path);
        const newPath = (_a = locale.slugs[trimmedPath]) !== null && _a !== void 0 ? _a : trimmedPath;
        return { locale: locale.locale, path: (0, exports.addLocalePrefix)(newPath, locale.locale, locale.prefix, options.defaultLocale) };
    });
};
exports.translatePagePaths = translatePagePaths;
const parsePathPrefix = (path, defaultPrefix) => {
    if (path === '/') {
        return defaultPrefix;
    }
    // Regex literals are evaluated when the script is loaded,
    // whereas the RegExp instantiation is done when it's reached
    // during execution. Safari doesn't support look behinds,
    // which causes an error when the script is loaded. This is
    // only needed in SSG.
    // eslint-disable-next-line prefer-regex-literals
    const splitPathExpression = new RegExp('(?<=^/)\\w{2}(-\\w{2})?(?=/)', 'g');
    const splittedPath = path.match(splitPathExpression);
    return splittedPath && splittedPath[0] ? splittedPath[0] : defaultPrefix;
};
exports.parsePathPrefix = parsePathPrefix;
const generatePageContextByPath = (path, options) => {
    var _a;
    const defaultPrefix = (_a = options.locales.find((l) => l.locale === options.defaultLocale)) === null || _a === void 0 ? void 0 : _a.prefix;
    const parsedPrefix = (0, exports.parsePathPrefix)(path, defaultPrefix !== null && defaultPrefix !== void 0 ? defaultPrefix : '');
    const locale = options.locales.find((l) => l.prefix === parsedPrefix);
    return { locale: locale === null || locale === void 0 ? void 0 : locale.locale, prefix: locale === null || locale === void 0 ? void 0 : locale.prefix };
};
exports.generatePageContextByPath = generatePageContextByPath;
