"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const gatsby_1 = require("gatsby");
const I18nL10nContext_1 = require("../contexts/I18nL10nContext");
function LanguageSwitcher({ className, resolveLanguageName }) {
    var _a;
    const context = (0, I18nL10nContext_1.useI18nL10nContext)();
    return ((0, jsx_runtime_1.jsx)("nav", { className: className, children: (0, jsx_runtime_1.jsx)("ul", { children: (_a = context.translations) === null || _a === void 0 ? void 0 : _a.map((p) => ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(gatsby_1.Link, { to: p.path, children: resolveLanguageName(p.locale) }) }, p.locale))) }) }));
}
exports.default = LanguageSwitcher;
