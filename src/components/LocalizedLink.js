"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const path_1 = require("path");
const gatsby_1 = require("gatsby");
const react_intl_1 = require("react-intl");
const I18nL10nContext_1 = require("../contexts/I18nL10nContext");
const path_2 = require("../utils/path");
function LocalizedLink({ to, children, className, activeClassName = 'active', activeStyle = {}, partiallyActive = true, replace, onClick, }) {
    var _a;
    const pageContext = (0, I18nL10nContext_1.useI18nL10nContext)();
    const prefix = (_a = pageContext.prefix) !== null && _a !== void 0 ? _a : '';
    const intl = (0, react_intl_1.useIntl)();
    const getSlug = () => (intl.messages[to] ? intl.formatMessage({ id: to }) : to);
    const localizedPath = to !== '/' ? getSlug() : '/';
    const prefixedPath = intl.defaultLocale === intl.locale ? localizedPath : (0, path_2.trimRightSlash)(path_1.posix.join('/', prefix, localizedPath));
    return ((0, jsx_runtime_1.jsx)(gatsby_1.Link, { to: prefixedPath, className: className, activeClassName: activeClassName, activeStyle: activeStyle, partiallyActive: partiallyActive, replace: replace, onClick: onClick, children: children }));
}
exports.default = LocalizedLink;
