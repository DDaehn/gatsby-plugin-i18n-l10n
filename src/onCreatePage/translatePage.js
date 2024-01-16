"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translatePage = void 0;
const i18n_1 = require("../utils/i18n");
const path_1 = require("../utils/path");
const isPagePathBlacklisted = (path, options, locale) => {
    const localeOptions = options.locales.find((l) => l.locale === locale);
    if (!(localeOptions === null || localeOptions === void 0 ? void 0 : localeOptions.pageBlacklist)) {
        return false;
    }
    if (localeOptions.pageBlacklist.find((pbl) => path.includes(pbl))) {
        return true;
    }
    return false;
};
const createTranslatedPage = (createPage, page, options) => {
    var _a;
    if (!isPagePathBlacklisted(page.path, options, (_a = page.context) === null || _a === void 0 ? void 0 : _a.locale)) {
        createPage(page);
    }
};
const translatePage = ({ page, actions }, options) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { createPage, deletePage } = actions;
    // If this page was already translated, we skip it.
    if (((_a = page.context) === null || _a === void 0 ? void 0 : _a.locale) && page.context.localePagesId) {
        return;
    }
    if (page.isCreatedByStatefulCreatePages) {
        // Translate statefully created pages from `/src/pages` or gatsby-plugin-page-creator
        const paths = (0, path_1.translatePagePaths)(page.path, options);
        deletePage(page);
        paths.forEach((path) => {
            const translations = paths.filter((p) => p.locale !== path.locale && !isPagePathBlacklisted(p.path, options, p.locale));
            const locale = options.locales.find((l) => l.locale === path.locale);
            const context = Object.assign(Object.assign({}, page.context), { locale: path.locale, localePagesId: (0, i18n_1.createLocalePagesId)(page.path), translations, prefix: locale === null || locale === void 0 ? void 0 : locale.prefix });
            createTranslatedPage(createPage, Object.assign(Object.assign({}, page), { path: path.path, context }), options);
        });
    }
    else {
        // Translate programmically created pages
        deletePage(page);
        const _c = page.context || {}, { referTranslations, adjustPath } = _c, restContext = __rest(_c, ["referTranslations", "adjustPath"]);
        let context = restContext;
        let path = context.basePath || page.path;
        // Add locale, localePagesId and prefix from context or path
        const contextLocale = (_b = page.context) === null || _b === void 0 ? void 0 : _b.locale;
        let optionsLocale = options.locales.find((l) => l.locale === contextLocale);
        const localeAndPrefixContext = optionsLocale
            ? { locale: optionsLocale.locale, prefix: optionsLocale.prefix }
            : (0, path_1.generatePageContextByPath)(path, options);
        context = Object.assign(Object.assign(Object.assign({}, context), localeAndPrefixContext), { localePagesId: (0, i18n_1.createLocalePagesId)(page.path, localeAndPrefixContext.prefix) });
        optionsLocale = options.locales.find((l) => l.locale === localeAndPrefixContext.locale);
        // Refer translations if requested
        if (referTranslations && Array.isArray(referTranslations) && referTranslations.length > 0) {
            const translations = (0, path_1.translatePagePaths)(path, options).filter((p) => p.locale !== localeAndPrefixContext.locale &&
                referTranslations.includes(p.locale) &&
                !isPagePathBlacklisted(p.path, options, p.locale));
            context = Object.assign(Object.assign({}, context), { translations });
        }
        // Translate page path if requested
        if (adjustPath && typeof context.locale === 'string' && typeof context.prefix === 'string' && optionsLocale) {
            path = (0, path_1.translatePagePath)(path, optionsLocale.slugs, context.locale, context.prefix, options.defaultLocale);
        }
        createTranslatedPage(createPage, Object.assign(Object.assign({}, page), { context, path }), options);
    }
});
exports.translatePage = translatePage;
