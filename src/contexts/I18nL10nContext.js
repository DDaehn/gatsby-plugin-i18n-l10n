"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useI18nL10nContext = exports.I18nL10nContext = void 0;
const react_1 = require("react");
exports.I18nL10nContext = (0, react_1.createContext)({});
const useI18nL10nContext = () => (0, react_1.useContext)(exports.I18nL10nContext);
exports.useI18nL10nContext = useI18nL10nContext;
