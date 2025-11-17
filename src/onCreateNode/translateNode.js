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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateNode = void 0;
const path_1 = require("path");
const limax_1 = __importDefault(require("limax"));
const path_2 = require("../utils/path");
const i18n_1 = require("../utils/i18n");
const MARKDOWN_TYPES = ['MarkdownRemark', 'Mdx'];
const findLocale = (estimatedLocale, options) => {
    return ((0, i18n_1.findClosestLocale)(estimatedLocale, options.locales.map((l) => l.locale)) || estimatedLocale);
};
const extractFrontmatter = (node) => {
    if ((node === null || node === void 0 ? void 0 : node.frontmatter) && typeof node.frontmatter === 'object') {
        const frontmatter = node.frontmatter;
        return frontmatter;
    }
    return undefined;
};
const extractFieldsTranslations = (node) => {
    if ((node === null || node === void 0 ? void 0 : node.fields) && typeof node.fields === 'object') {
        const fields = node.fields;
        return fields.translations || [];
    }
    return [];
};
/**
 * Find siblings (files which are translations of the given file)
 *
 * @param nodes a list of file system nodes
 * @param absolutePath of the file which siblings should be searched
 * @param options is the configuration of the current plugin instance
 * @returns sibling nodes
 */
const findTranslations = (nodes, absolutePath, options) => {
    const fileNodes = nodes.filter((n) => n.internal.type === 'File');
    const fileSiblings = fileNodes.filter((n) => n.dir === path_1.posix.dirname(absolutePath));
    const { filename } = (0, i18n_1.parseFilenameSuffix)(path_1.posix.basename(absolutePath), options.defaultLocale);
    return fileSiblings.filter((f) => {
        const { filename: siblingFilename } = (0, i18n_1.parseFilenameSuffix)(f.base, options.defaultLocale);
        return f.base !== path_1.posix.basename(absolutePath) && siblingFilename === filename;
    });
};
const getMarkdownNode = (sibling, getNode) => {
    return sibling.children.map((c) => getNode(c)).find((c) => c !== undefined && MARKDOWN_TYPES.includes(c.internal.type));
};
/**
 * Returns a list of paths and locales to the sibling nodes
 *
 * @param siblings of the current node
 * @param getNode gets a node
 * @param options is the configuration of the current plugin instance
 * @returns a list of translations for the current node
 */
const getAvailableTranslations = (siblings, getNode, options) => {
    return siblings.flatMap((s) => {
        var _a;
        const { filename: siblingFilename, estimatedLocale: siblingEstimatedLocale } = (0, i18n_1.parseFilenameSuffix)(s.base, options.defaultLocale);
        const markdownNode = getMarkdownNode(s, getNode);
        if (!markdownNode) {
            return [];
        }
        const title = (_a = extractFrontmatter(markdownNode)) === null || _a === void 0 ? void 0 : _a.title;
        const locale = findLocale(siblingEstimatedLocale, options);
        return { filename: siblingFilename, locale, title };
    });
};
/**
 * Propagate the current node and its translation to the existing nodes
 *
 * @param translation of the current node
 * @param siblings of the current node
 * @param getNode gets a node
 * @param createNodeField action to create new or overwrite node fields
 */
const propagateCurrentNode = (translation, siblings, getNode, createNodeField) => {
    siblings.forEach((s) => {
        const markdownNode = getMarkdownNode(s, getNode);
        if (!markdownNode) {
            return;
        }
        const currentTranslations = [translation, ...extractFieldsTranslations(markdownNode)].filter(
        // filter duplicates
        (v, i, a) => a.findIndex((vv) => vv.locale === v.locale) === i);
        createNodeField({ node: markdownNode, name: 'translations', value: currentTranslations });
    });
};
/**
 * Translates paths based on filename, location, locale and plugin options
 *
 * @param filename of the designated file
 * @param relativeDirectory of the relative directory where the designated file resides in
 * @param locale of the designated file
 * @param options is the configuration of the current plugin instance
 * @param title which was read from frontmatter or elsewhere which belongs to this file
 * @returns a translated slug, a kind (relativeDirectory) and its filepath
 */
const translatePath = (filename, relativeDirectory, locale, options, title) => {
    var _a;
    let slug = '';
    if (filename.indexOf('index') === -1) {
        slug = title ? (0, limax_1.default)(title) : filename;
    }
    // 'relativeDirectory' is a synonym of 'kind'
    const localeOption = options.locales.find((l) => l.locale === locale);
    const currentPath = path_1.posix.join('/', relativeDirectory, slug);
    // add locale prefix to path
    let filepath = (0, path_2.addLocalePrefix)(currentPath, locale, (localeOption === null || localeOption === void 0 ? void 0 : localeOption.prefix) || '', options.defaultLocale);
    // remove path segments which are on the path blacklist
    filepath = ((_a = options.pathBlacklist) === null || _a === void 0 ? void 0 : _a.reduce((prev, curr) => prev.replace(curr, ''), filepath)) || filepath;
    // replace path segments with slugs
    if (localeOption) {
        filepath = (0, path_2.replaceSegmentsWithSlugs)(filepath, localeOption.slugs);
    }
    return { slug, kind: relativeDirectory, filepath };
};
const getTagsField = (tags) => {
    if (!tags) {
        return [];
    }
    return tags.map((t) => ({ title: t, slug: (0, limax_1.default)(t) }));
};
const translateNode = ({ getNode, getNodes, node, actions }, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { createNodeField } = actions;
    if (MARKDOWN_TYPES.includes(node.internal.type) && node.parent && options) {
        const fileSystemNode = getNode(node.parent);
        const { base, relativeDirectory, absolutePath } = fileSystemNode;
        const { filename, estimatedLocale } = (0, i18n_1.parseFilenameSuffix)(base, options.defaultLocale);
        const frontmatter = extractFrontmatter(node);
        const locale = findLocale(estimatedLocale, options);
        const localeOption = options.locales.find((l) => l.locale === locale);
        const prefix = locale === options.defaultLocale ? '' : localeOption === null || localeOption === void 0 ? void 0 : localeOption.prefix;
        const { slug, kind, filepath } = translatePath(filename, relativeDirectory, locale, options, frontmatter === null || frontmatter === void 0 ? void 0 : frontmatter.title);
        const tags = getTagsField(frontmatter === null || frontmatter === void 0 ? void 0 : frontmatter.tags);
        // propagate translations
        const siblings = findTranslations(getNodes(), absolutePath, options);
        const translations = getAvailableTranslations(siblings, getNode, options).map((t) => {
            const { filepath: translatedFilepath } = translatePath(t.filename, relativeDirectory, t.locale, options, t.title);
            return { path: (0, path_2.trimRightSlash)(translatedFilepath), locale: t.locale };
        });
        createNodeField({ node, name: 'locale', value: locale });
        createNodeField({ node, name: 'filename', value: filename });
        createNodeField({ node, name: 'kind', value: kind });
        createNodeField({ node, name: 'slug', value: slug });
        createNodeField({ node, name: 'path', value: filepath });
        createNodeField({ node, name: 'pathPrefix', value: prefix });
        createNodeField({ node, name: 'translations', value: translations });
        propagateCurrentNode({ locale, path: filepath }, siblings, getNode, createNodeField);
        createNodeField({ node, name: 'tags', value: tags });
    }
});
exports.translateNode = translateNode;
