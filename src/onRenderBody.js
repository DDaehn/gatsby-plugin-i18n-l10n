"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onRenderBody = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const onRenderBody = ({ loadPageDataSync, pathname, setHtmlAttributes, setHeadComponents }, options) => {
    var _a;
    // loadPageDataSync is not implemented in all run modes like development
    if (!loadPageDataSync) {
        return;
    }
    const { result: { pageContext }, } = loadPageDataSync(pathname);
    const locale = (_a = pageContext.locale) !== null && _a !== void 0 ? _a : options.defaultLocale;
    const siteUrl = new URL(options.siteUrl);
    const translations = pageContext.translations || [];
    setHtmlAttributes({ lang: locale });
    if(options.generateMetaTags){
        setHeadComponents([
            (0, jsx_runtime_1.jsx)("link", { rel: "alternate", hrefLang: "x-default", href: siteUrl.href }),
            (0, jsx_runtime_1.jsx)("link", { rel: "alternate", hrefLang: locale, href: new URL(pathname, siteUrl).href }),
            (0, jsx_runtime_1.jsx)("meta", { property: "og:locale", content: locale.replace(`-`, `_`) }),
            ...translations.map((t) => [
                (0, jsx_runtime_1.jsx)("link", { rel: "alternate", hrefLang: t.locale, href: new URL(t.path, siteUrl).href }, t.locale),
                (0, jsx_runtime_1.jsx)("meta", { property: "og:locale:alternate", content: t.locale.replace(`-`, `_`) }, t.locale),
            ]),
        ]);
    }
};
exports.onRenderBody = onRenderBody;
