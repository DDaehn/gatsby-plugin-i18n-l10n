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
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCreateWebpackConfig = exports.sourceNodes = exports.createSchemaCustomization = exports.onCreatePage = exports.onCreateNode = exports.pluginOptionsSchema = void 0;
const customizeSitePageContext_1 = require("./src/createSchemaCustomization/customizeSitePageContext");
const translateNode_1 = require("./src/onCreateNode/translateNode");
const translatePage_1 = require("./src/onCreatePage/translatePage");
const sourceTranslationNodes_1 = require("./src/sourceNodes/sourceTranslationNodes");
const pluginOptionsSchema = ({ Joi }) => {
    return Joi.object({
        defaultLocale: Joi.string().description('Sets the default locale'),
        siteUrl: Joi.string().required().description('Sets the absolute site url'),
        locales: Joi.array()
            .required()
            .items(Joi.object({
            locale: Joi.string().required().description('Defines the a locale.'),
            prefix: Joi.string().required().description('Defines the corresponding url prefix.'),
            slugs: Joi.object().required().description('Contains the translated slugs.'),
            messages: Joi.object().required().description('Contains the translated messages.'),
        })),
        pathBlacklist: Joi.array().description('Omit certain path segments'),
    });
};
exports.pluginOptionsSchema = pluginOptionsSchema;
const onCreateNode = (args, options) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, translateNode_1.translateNode)(args, options);
});
exports.onCreateNode = onCreateNode;
const onCreatePage = (args, options) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, translatePage_1.translatePage)(args, options);
});
exports.onCreatePage = onCreatePage;
const createSchemaCustomization = (args) => __awaiter(void 0, void 0, void 0, function* () {
    (0, customizeSitePageContext_1.customizeSitePageContext)(args);
});
exports.createSchemaCustomization = createSchemaCustomization;
const sourceNodes = (args, options) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sourceTranslationNodes_1.sourceTranslationNodes)(args, options);
});
exports.sourceNodes = sourceNodes;
const onCreateWebpackConfig = ({ actions }) => __awaiter(void 0, void 0, void 0, function* () {
    actions.setWebpackConfig({
        resolve: {
            fallback: {
                path: require.resolve('path-browserify'),
            },
        },
    });
});
exports.onCreateWebpackConfig = onCreateWebpackConfig;
