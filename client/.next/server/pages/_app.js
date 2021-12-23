"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 2135:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(6022);
;// CONCATENATED MODULE: external "redux-persist/integration/react"
const react_namespaceObject = require("redux-persist/integration/react");
;// CONCATENATED MODULE: external "redux"
const external_redux_namespaceObject = require("redux");
// EXTERNAL MODULE: ./reducers/store/user.js
var user = __webpack_require__(9530);
;// CONCATENATED MODULE: ./reducers/store/index.js


const appReducer = (0,external_redux_namespaceObject.combineReducers)({
    user: user/* default */.ZP
});
const rootReducer = (state, action)=>{
    return appReducer(state, action);
};
/* harmony default export */ const store = (rootReducer);

;// CONCATENATED MODULE: external "redux-persist"
const external_redux_persist_namespaceObject = require("redux-persist");
;// CONCATENATED MODULE: external "redux-persist/lib/storage"
const storage_namespaceObject = require("redux-persist/lib/storage");
var storage_default = /*#__PURE__*/__webpack_require__.n(storage_namespaceObject);
;// CONCATENATED MODULE: external "redux-devtools-extension"
const external_redux_devtools_extension_namespaceObject = require("redux-devtools-extension");
;// CONCATENATED MODULE: ./config/store.js





const persistConfig = {
    key: "root",
    storage: (storage_default())
};
const enhancedReducer = (0,external_redux_persist_namespaceObject.persistReducer)(persistConfig, store);
function configureStore() {
    const store = (0,external_redux_namespaceObject.createStore)(enhancedReducer, {
    }, (0,external_redux_devtools_extension_namespaceObject.composeWithDevTools)());
    const persistor = (0,external_redux_persist_namespaceObject.persistStore)(store);
    return {
        store,
        persistor
    };
};

;// CONCATENATED MODULE: ./pages/_app.tsx





const { store: _app_store , persistor  } = configureStore();
function App({ Component , pageProps  }) {
    return(/*#__PURE__*/ jsx_runtime_.jsx(external_react_redux_.Provider, {
        store: _app_store,
        children: /*#__PURE__*/ jsx_runtime_.jsx(react_namespaceObject.PersistGate, {
            loading: null,
            persistor: persistor,
            children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            })
        })
    }));
}
/* harmony default export */ const _app = (App);


/***/ }),

/***/ 6022:
/***/ ((module) => {

module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [530], () => (__webpack_exec__(2135)));
module.exports = __webpack_exports__;

})();