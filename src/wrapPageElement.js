"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapPageElement = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_intl_1 = require("react-intl");
const I18nL10nContext_1 = require("./contexts/I18nL10nContext");
const wrapPageElement = ({ element, props }, options) => {
    var _a, _b;
    const translations = props.pageContext.translations || [];
    const locale = (_a = props.pageContext.locale) !== null && _a !== void 0 ? _a : options.defaultLocale;
    const currentLocale = options.locales.find((l) => l.locale === locale);
    const prefix = (_b = props.pageContext.prefix) !== null && _b !== void 0 ? _b : currentLocale === null || currentLocale === void 0 ? void 0 : currentLocale.prefix;
    const currentMessages = Object.assign(Object.assign({}, currentLocale === null || currentLocale === void 0 ? void 0 : currentLocale.messages), currentLocale === null || currentLocale === void 0 ? void 0 : currentLocale.slugs);
    // Inject language names of all available languages into current messages
    options.locales.forEach((l) => {
        currentMessages[`languages.${l.locale}`] = l.messages.language;
    });
    return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    (0, jsx_runtime_1.jsx)(I18nL10nContext_1.I18nL10nContext.Provider, { value: { locale, prefix, translations }, children: (0, jsx_runtime_1.jsx)(react_intl_1.IntlProvider, { defaultLocale: options.defaultLocale, locale: locale, messages: currentMessages, children: element }) }));
};
exports.wrapPageElement = wrapPageElement;
