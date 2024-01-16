"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceTranslationNodes = void 0;
const TRANSLATION_NODE_TYPE = 'Translation';
const sourceTranslationNodes = ({ actions, createContentDigest, createNodeId }, options) => {
    const { createNode } = actions;
    options === null || options === void 0 ? void 0 : options.locales.forEach((l) => {
        Object.entries(l.messages).forEach(([key, message]) => {
            const translation = { key, message, locale: l.locale };
            createNode(Object.assign(Object.assign({}, translation), { id: createNodeId(`${TRANSLATION_NODE_TYPE}${l.locale}${key}`), internal: { type: TRANSLATION_NODE_TYPE, contentDigest: createContentDigest(translation) } }));
        });
    });
};
exports.sourceTranslationNodes = sourceTranslationNodes;
