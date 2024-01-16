"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLocalePagesId = exports.parseFilenameSuffix = exports.findClosestLocale = void 0;
const path_1 = require("./path");
const FILENAME_SUFFIX_PATTERN = /^([^.]+)\.?(.*)?(?=\.\w+)/;
const ALL_SLASHES_PATTERN = /\//g;
const INDEX_LOCALE_PAGES_ID = 'index';
function findClosestLocale(locale, locales) {
    if (locale.length === 5) {
        return locales.find((l) => l === locale);
    }
    return locales.find((l) => l.indexOf(locale) !== -1);
}
exports.findClosestLocale = findClosestLocale;
const parseFilenameSuffix = (name, defaultLocale) => {
    const nameMatch = name.match(FILENAME_SUFFIX_PATTERN);
    const filename = nameMatch && nameMatch[1] ? nameMatch[1] : name;
    const estimatedLocale = nameMatch && nameMatch[2] ? nameMatch[2] : defaultLocale;
    return { filename, estimatedLocale };
};
exports.parseFilenameSuffix = parseFilenameSuffix;
const createLocalePagesId = (path, prefix) => {
    let localePageId = (0, path_1.trimSlashes)(path).replace(ALL_SLASHES_PATTERN, '.');
    if (prefix) {
        localePageId = localePageId.replace(new RegExp(`^${prefix}\\.`), '');
    }
    if (localePageId === '.' || localePageId === prefix) {
        return INDEX_LOCALE_PAGES_ID;
    }
    return localePageId;
};
exports.createLocalePagesId = createLocalePagesId;
