"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useI18nL10nContext = exports.LocalizedLink = exports.LanguageSwitcher = void 0;
const LanguageSwitcher_1 = __importDefault(require("./src/components/LanguageSwitcher"));
exports.LanguageSwitcher = LanguageSwitcher_1.default;
const LocalizedLink_1 = __importDefault(require("./src/components/LocalizedLink"));
exports.LocalizedLink = LocalizedLink_1.default;
const I18nL10nContext_1 = require("./src/contexts/I18nL10nContext");
Object.defineProperty(exports, "useI18nL10nContext", { enumerable: true, get: function () { return I18nL10nContext_1.useI18nL10nContext; } });
