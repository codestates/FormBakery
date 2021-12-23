/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./config/store.js":
/*!*************************!*\
  !*** ./config/store.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ configureStore)\n/* harmony export */ });\n/* harmony import */ var _reducers_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reducers/store */ \"./reducers/store/index.js\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-persist */ \"redux-persist\");\n/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_persist__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-persist/lib/storage */ \"redux-persist/lib/storage\");\n/* harmony import */ var redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux-devtools-extension */ \"redux-devtools-extension\");\n/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nconst persistConfig = {\n    key: \"root\",\n    storage: (redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_3___default())\n};\nconst enhancedReducer = (0,redux_persist__WEBPACK_IMPORTED_MODULE_2__.persistReducer)(persistConfig, _reducers_store__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\nfunction configureStore() {\n    const store = (0,redux__WEBPACK_IMPORTED_MODULE_1__.createStore)(enhancedReducer, {\n    }, (0,redux_devtools_extension__WEBPACK_IMPORTED_MODULE_4__.composeWithDevTools)());\n    const persistor = (0,redux_persist__WEBPACK_IMPORTED_MODULE_2__.persistStore)(store);\n    return {\n        store,\n        persistor\n    };\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb25maWcvc3RvcmUuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUF3QztBQUNMO0FBQ3lCO0FBQ2I7QUFDZTtBQUU5RCxLQUFLLENBQUNNLGFBQWEsR0FBRyxDQUFDO0lBQ25CQyxHQUFHLEVBQUUsQ0FBTTtJQUNYSCxPQUFPO0FBQ1gsQ0FBQztBQUVELEtBQUssQ0FBQ0ksZUFBZSxHQUFHTCw2REFBYyxDQUFDRyxhQUFhLEVBQUVOLHVEQUFRO0FBRS9DLFFBQVEsQ0FBQ1MsY0FBYyxHQUFHLENBQUM7SUFDdEMsS0FBSyxDQUFDQyxLQUFLLEdBQUdULGtEQUFXLENBQUNPLGVBQWUsRUFBRSxDQUFDO0lBQUEsQ0FBQyxFQUFFSCw2RUFBbUI7SUFDbEUsS0FBSyxDQUFDTSxTQUFTLEdBQUdULDJEQUFZLENBQUNRLEtBQUs7SUFDcEMsTUFBTSxDQUFDLENBQUM7UUFBQ0EsS0FBSztRQUFFQyxTQUFTO0lBQUMsQ0FBQztBQUMvQixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpZW50Ly4vY29uZmlnL3N0b3JlLmpzP2I2MGIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlZHVjZXJzIGZyb20gXCIuLi9yZWR1Y2Vycy9zdG9yZVwiO1xyXG5pbXBvcnQgeyBjcmVhdGVTdG9yZSB9IGZyb20gXCJyZWR1eFwiO1xyXG5pbXBvcnQgeyBwZXJzaXN0U3RvcmUsIHBlcnNpc3RSZWR1Y2VyIH0gZnJvbSBcInJlZHV4LXBlcnNpc3RcIjtcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSBcInJlZHV4LXBlcnNpc3QvbGliL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgY29tcG9zZVdpdGhEZXZUb29scyB9IGZyb20gXCJyZWR1eC1kZXZ0b29scy1leHRlbnNpb25cIjtcclxuXHJcbmNvbnN0IHBlcnNpc3RDb25maWcgPSB7XHJcbiAgICBrZXk6IFwicm9vdFwiLFxyXG4gICAgc3RvcmFnZSxcclxufTtcclxuXHJcbmNvbnN0IGVuaGFuY2VkUmVkdWNlciA9IHBlcnNpc3RSZWR1Y2VyKHBlcnNpc3RDb25maWcsIHJlZHVjZXJzKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbmZpZ3VyZVN0b3JlKCkge1xyXG4gICAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShlbmhhbmNlZFJlZHVjZXIsIHt9LCBjb21wb3NlV2l0aERldlRvb2xzKCkpO1xyXG4gICAgY29uc3QgcGVyc2lzdG9yID0gcGVyc2lzdFN0b3JlKHN0b3JlKTtcclxuICAgIHJldHVybiB7IHN0b3JlLCBwZXJzaXN0b3IgfTtcclxufVxyXG4iXSwibmFtZXMiOlsicmVkdWNlcnMiLCJjcmVhdGVTdG9yZSIsInBlcnNpc3RTdG9yZSIsInBlcnNpc3RSZWR1Y2VyIiwic3RvcmFnZSIsImNvbXBvc2VXaXRoRGV2VG9vbHMiLCJwZXJzaXN0Q29uZmlnIiwia2V5IiwiZW5oYW5jZWRSZWR1Y2VyIiwiY29uZmlndXJlU3RvcmUiLCJzdG9yZSIsInBlcnNpc3RvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./config/store.js\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-persist/integration/react */ \"redux-persist/integration/react\");\n/* harmony import */ var redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _config_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config/store */ \"./config/store.js\");\n\n\n\n\n\nconst { store , persistor  } = (0,_config_store__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\nfunction App({ Component , pageProps  }) {\n    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_redux__WEBPACK_IMPORTED_MODULE_2__.Provider, {\n        store: store,\n        __source: {\n            fileName: \"C:\\\\vsCode_sketchBook\\\\codestate\\\\FormBakery\\\\client\\\\pages\\\\_app.tsx\",\n            lineNumber: 11,\n            columnNumber: 9\n        },\n        __self: this,\n        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_3__.PersistGate, {\n            loading: null,\n            persistor: persistor,\n            __source: {\n                fileName: \"C:\\\\vsCode_sketchBook\\\\codestate\\\\FormBakery\\\\client\\\\pages\\\\_app.tsx\",\n                lineNumber: 12,\n                columnNumber: 13\n            },\n            __self: this,\n            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Component, {\n                ...pageProps,\n                __source: {\n                    fileName: \"C:\\\\vsCode_sketchBook\\\\codestate\\\\FormBakery\\\\client\\\\pages\\\\_app.tsx\",\n                    lineNumber: 13,\n                    columnNumber: 17\n                },\n                __self: this\n            })\n        })\n    }));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUE4QjtBQUVRO0FBQ3VCO0FBQ2pCO0FBRTVDLEtBQUssQ0FBQyxDQUFDLENBQUNHLEtBQUssR0FBRUMsU0FBUyxFQUFDLENBQUMsR0FBR0YseURBQWM7U0FFbENHLEdBQUcsQ0FBQyxDQUFDLENBQUNDLFNBQVMsR0FBRUMsU0FBUyxFQUFXLENBQUMsRUFBRSxDQUFDO0lBQzlDLE1BQU0sc0VBQ0RQLGlEQUFRO1FBQUNHLEtBQUssRUFBRUEsS0FBSzs7Ozs7Ozt1RkFDakJGLHdFQUFXO1lBQUNPLE9BQU8sRUFBRSxJQUFJO1lBQUVKLFNBQVMsRUFBRUEsU0FBUzs7Ozs7OzsyRkFDM0NFLFNBQVM7bUJBQUtDLFNBQVM7Ozs7Ozs7Ozs7QUFJeEMsQ0FBQztBQUVELGlFQUFlRixHQUFHLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGllbnQvLi9wYWdlcy9fYXBwLnRzeD8yZmJlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4uL3N0eWxlcy9nbG9iYWxzLmNzc1wiO1xyXG5pbXBvcnQgeyBBcHBQcm9wcyB9IGZyb20gXCJuZXh0L2FwcFwiO1xyXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xyXG5pbXBvcnQgeyBQZXJzaXN0R2F0ZSB9IGZyb20gXCJyZWR1eC1wZXJzaXN0L2ludGVncmF0aW9uL3JlYWN0XCI7XHJcbmltcG9ydCBjb25maWd1cmVTdG9yZSBmcm9tIFwiLi4vY29uZmlnL3N0b3JlXCI7XHJcblxyXG5jb25zdCB7IHN0b3JlLCBwZXJzaXN0b3IgfSA9IGNvbmZpZ3VyZVN0b3JlKCk7XHJcblxyXG5mdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cclxuICAgICAgICAgICAgPFBlcnNpc3RHYXRlIGxvYWRpbmc9e251bGx9IHBlcnNpc3Rvcj17cGVyc2lzdG9yfT5cclxuICAgICAgICAgICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuICAgICAgICAgICAgPC9QZXJzaXN0R2F0ZT5cclxuICAgICAgICA8L1Byb3ZpZGVyPlxyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXBwO1xyXG4iXSwibmFtZXMiOlsiUHJvdmlkZXIiLCJQZXJzaXN0R2F0ZSIsImNvbmZpZ3VyZVN0b3JlIiwic3RvcmUiLCJwZXJzaXN0b3IiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJsb2FkaW5nIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./reducers/store/index.js":
/*!*********************************!*\
  !*** ./reducers/store/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user */ \"./reducers/store/user.js\");\n\n\nconst appReducer = (0,redux__WEBPACK_IMPORTED_MODULE_0__.combineReducers)({\n    user: _user__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n});\nconst rootReducer = (state, action)=>{\n    return appReducer(state, action);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rootReducer);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZWR1Y2Vycy9zdG9yZS9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQXVDO0FBRWQ7QUFFekIsS0FBSyxDQUFDRSxVQUFVLEdBQUdGLHNEQUFlLENBQUMsQ0FBQztJQUNoQ0MsSUFBSTtBQUNSLENBQUM7QUFFRCxLQUFLLENBQUNFLFdBQVcsSUFBSUMsS0FBSyxFQUFFQyxNQUFNLEdBQUssQ0FBQztJQUNwQyxNQUFNLENBQUNILFVBQVUsQ0FBQ0UsS0FBSyxFQUFFQyxNQUFNO0FBQ25DLENBQUM7QUFFRCxpRUFBZUYsV0FBVyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpZW50Ly4vcmVkdWNlcnMvc3RvcmUvaW5kZXguanM/MTcwZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tIFwicmVkdXhcIjtcclxuXHJcbmltcG9ydCB1c2VyIGZyb20gXCIuL3VzZXJcIjtcclxuXHJcbmNvbnN0IGFwcFJlZHVjZXIgPSBjb21iaW5lUmVkdWNlcnMoe1xyXG4gICAgdXNlcixcclxufSk7XHJcblxyXG5jb25zdCByb290UmVkdWNlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XHJcbiAgICByZXR1cm4gYXBwUmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvb3RSZWR1Y2VyO1xyXG4iXSwibmFtZXMiOlsiY29tYmluZVJlZHVjZXJzIiwidXNlciIsImFwcFJlZHVjZXIiLCJyb290UmVkdWNlciIsInN0YXRlIiwiYWN0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./reducers/store/index.js\n");

/***/ }),

/***/ "./reducers/store/user.js":
/*!********************************!*\
  !*** ./reducers/store/user.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SET_USER_INFO\": () => (/* binding */ SET_USER_INFO),\n/* harmony export */   \"LOGOUT\": () => (/* binding */ LOGOUT),\n/* harmony export */   \"SET_ACCESS_TOKEN\": () => (/* binding */ SET_ACCESS_TOKEN),\n/* harmony export */   \"SET_REFRESH_TOKEN\": () => (/* binding */ SET_REFRESH_TOKEN),\n/* harmony export */   \"SET_ALERT\": () => (/* binding */ SET_ALERT),\n/* harmony export */   \"SET_MODAL\": () => (/* binding */ SET_MODAL),\n/* harmony export */   \"MODIFY_USER_INFO\": () => (/* binding */ MODIFY_USER_INFO),\n/* harmony export */   \"setUserInfo\": () => (/* binding */ setUserInfo),\n/* harmony export */   \"logout\": () => (/* binding */ logout),\n/* harmony export */   \"setAccessToken\": () => (/* binding */ setAccessToken),\n/* harmony export */   \"setRefreshToken\": () => (/* binding */ setRefreshToken),\n/* harmony export */   \"setAlert\": () => (/* binding */ setAlert),\n/* harmony export */   \"setModal\": () => (/* binding */ setModal),\n/* harmony export */   \"modifyUserInfo\": () => (/* binding */ modifyUserInfo),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst SET_USER_INFO = \"SET_USER_INFO\";\nconst LOGOUT = \"LOGOUT\";\nconst SET_ACCESS_TOKEN = \"SET_ACCESS_TOKEN\";\nconst SET_REFRESH_TOKEN = \"SET_REFRESH_TOKEN\";\nconst SET_ALERT = \"SET_ALERT\";\nconst SET_MODAL = \"SET_MODAL\";\nconst MODIFY_USER_INFO = \"MODIFY_USER_INFO\";\nconst setUserInfo = (userInfo)=>({\n        type: SET_USER_INFO,\n        payload: userInfo\n    })\n;\nconst logout = ()=>({\n        type: LOGOUT\n    })\n;\nconst setAccessToken = (token)=>({\n        type: SET_ACCESS_TOKEN,\n        payload: token\n    })\n;\nconst setRefreshToken = (token)=>({\n        type: SET_REFRESH_TOKEN,\n        payload: token\n    })\n;\nconst setAlert = (boolean)=>({\n        type: SET_ALERT,\n        payload: boolean\n    })\n;\nconst setModal = (boolean)=>({\n        type: SET_MODAL,\n        payload: boolean\n    })\n;\nconst modifyUserInfo = (userInfo)=>({\n        type: MODIFY_USER_INFO,\n        payload: userInfo\n    })\n;\nconst initialState = {\n    userInfo: {\n        email: \"\",\n        profilePicture: null,\n        name: \"\",\n        nickname: \"\",\n        createdAt: \"\",\n        updatedAt: \"\"\n    },\n    userToken: {\n        accessToken: \"\",\n        refreshToken: \"\"\n    },\n    login: false,\n    alert: false,\n    modal: false\n};\nconst user = (state = initialState, action)=>{\n    switch(action.type){\n        case SET_USER_INFO:\n            {\n                return {\n                    ...state,\n                    userInfo: action.payload,\n                    login: true\n                };\n            }\n        case LOGOUT:\n            {\n                return {\n                    userInfo: {\n                        email: \"\",\n                        profilePicture: null,\n                        name: \"\",\n                        nickname: \"\",\n                        createdAt: \"\",\n                        updatedAt: \"\"\n                    },\n                    userToken: {\n                        accessToken: \"\",\n                        refreshToken: \"\"\n                    },\n                    login: false\n                };\n            }\n        case SET_ACCESS_TOKEN:\n            {\n                return {\n                    ...state,\n                    userToken: {\n                        ...state.userToken,\n                        accessToken: action.payload\n                    }\n                };\n            }\n        case SET_REFRESH_TOKEN:\n            {\n                return {\n                    ...state,\n                    userToken: {\n                        ...state.userToken,\n                        refreshToken: action.payload\n                    }\n                };\n            }\n        case SET_ALERT:\n            {\n                return {\n                    ...state,\n                    alert: action.payload\n                };\n            }\n        case SET_MODAL:\n            {\n                return {\n                    ...state,\n                    modal: action.payload\n                };\n            }\n        case MODIFY_USER_INFO:\n            {\n                return {\n                    ...state,\n                    userInfo: {\n                        ...state.userInfo,\n                        ...action.payload\n                    }\n                };\n            }\n        default:\n            return state;\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (user);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFNLENBQUN1QixLQUFLOztBQUV4QixDQUFDO0FBRUQsaUVBQWVELElBQUksRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NsaWVudC8uL3JlZHVjZXJzL3N0b3JlL3VzZXIuanM/YmRjNiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgU0VUX1VTRVJfSU5GTyA9IFwiU0VUX1VTRVJfSU5GT1wiO1xyXG5leHBvcnQgY29uc3QgTE9HT1VUID0gXCJMT0dPVVRcIjtcclxuZXhwb3J0IGNvbnN0IFNFVF9BQ0NFU1NfVE9LRU4gPSBcIlNFVF9BQ0NFU1NfVE9LRU5cIjtcclxuZXhwb3J0IGNvbnN0IFNFVF9SRUZSRVNIX1RPS0VOID0gXCJTRVRfUkVGUkVTSF9UT0tFTlwiO1xyXG5leHBvcnQgY29uc3QgU0VUX0FMRVJUID0gXCJTRVRfQUxFUlRcIjtcclxuZXhwb3J0IGNvbnN0IFNFVF9NT0RBTCA9IFwiU0VUX01PREFMXCI7XHJcbmV4cG9ydCBjb25zdCBNT0RJRllfVVNFUl9JTkZPID0gXCJNT0RJRllfVVNFUl9JTkZPXCI7XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0VXNlckluZm8gPSAodXNlckluZm8pID0+ICh7XHJcbiAgICB0eXBlOiBTRVRfVVNFUl9JTkZPLFxyXG4gICAgcGF5bG9hZDogdXNlckluZm8sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IGxvZ291dCA9ICgpID0+ICh7XHJcbiAgICB0eXBlOiBMT0dPVVQsXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNldEFjY2Vzc1Rva2VuID0gKHRva2VuKSA9PiAoe1xyXG4gICAgdHlwZTogU0VUX0FDQ0VTU19UT0tFTixcclxuICAgIHBheWxvYWQ6IHRva2VuLFxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXRSZWZyZXNoVG9rZW4gPSAodG9rZW4pID0+ICh7XHJcbiAgICB0eXBlOiBTRVRfUkVGUkVTSF9UT0tFTixcclxuICAgIHBheWxvYWQ6IHRva2VuLFxyXG59KTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXRBbGVydCA9IChib29sZWFuKSA9PiAoe1xyXG4gICAgdHlwZTogU0VUX0FMRVJULFxyXG4gICAgcGF5bG9hZDogYm9vbGVhbixcclxufSk7XHJcblxyXG5leHBvcnQgY29uc3Qgc2V0TW9kYWwgPSAoYm9vbGVhbikgPT4gKHtcclxuICAgIHR5cGU6IFNFVF9NT0RBTCxcclxuICAgIHBheWxvYWQ6IGJvb2xlYW4sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IG1vZGlmeVVzZXJJbmZvID0gKHVzZXJJbmZvKSA9PiAoe1xyXG4gICAgdHlwZTogTU9ESUZZX1VTRVJfSU5GTyxcclxuICAgIHBheWxvYWQ6IHVzZXJJbmZvLFxyXG59KTtcclxuXHJcbmNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcclxuICAgIHVzZXJJbmZvOiB7XHJcbiAgICAgICAgZW1haWw6IFwiXCIsXHJcbiAgICAgICAgcHJvZmlsZVBpY3R1cmU6IG51bGwsXHJcbiAgICAgICAgbmFtZTogXCJcIixcclxuICAgICAgICBuaWNrbmFtZTogXCJcIixcclxuICAgICAgICBjcmVhdGVkQXQ6IFwiXCIsXHJcbiAgICAgICAgdXBkYXRlZEF0OiBcIlwiLFxyXG4gICAgfSxcclxuICAgIHVzZXJUb2tlbjoge1xyXG4gICAgICAgIGFjY2Vzc1Rva2VuOiBcIlwiLFxyXG4gICAgICAgIHJlZnJlc2hUb2tlbjogXCJcIixcclxuICAgIH0sXHJcbiAgICBsb2dpbjogZmFsc2UsXHJcbiAgICBhbGVydDogZmFsc2UsXHJcbiAgICBtb2RhbDogZmFsc2UsXHJcbn07XHJcblxyXG5jb25zdCB1c2VyID0gKHN0YXRlID0gaW5pdGlhbFN0YXRlLCBhY3Rpb24pID0+IHtcclxuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICAgICAgICBjYXNlIFNFVF9VU0VSX0lORk86IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgdXNlckluZm86IGFjdGlvbi5wYXlsb2FkLFxyXG4gICAgICAgICAgICAgICAgbG9naW46IHRydWUsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlIExPR09VVDoge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgdXNlckluZm86IHtcclxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBwcm9maWxlUGljdHVyZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5pY2tuYW1lOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWRBdDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVkQXQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdXNlclRva2VuOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjZXNzVG9rZW46IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVmcmVzaFRva2VuOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxvZ2luOiBmYWxzZSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgU0VUX0FDQ0VTU19UT0tFTjoge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICB1c2VyVG9rZW46IHtcclxuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZS51c2VyVG9rZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgYWNjZXNzVG9rZW46IGFjdGlvbi5wYXlsb2FkLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgU0VUX1JFRlJFU0hfVE9LRU46IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgdXNlclRva2VuOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUudXNlclRva2VuLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2hUb2tlbjogYWN0aW9uLnBheWxvYWQsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSBTRVRfQUxFUlQ6IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgYWxlcnQ6IGFjdGlvbi5wYXlsb2FkLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSBTRVRfTU9EQUw6IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgbW9kYWw6IGFjdGlvbi5wYXlsb2FkLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSBNT0RJRllfVVNFUl9JTkZPOiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgICAgIHVzZXJJbmZvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUudXNlckluZm8sXHJcbiAgICAgICAgICAgICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB1c2VyO1xyXG4iXSwibmFtZXMiOlsiU0VUX1VTRVJfSU5GTyIsIkxPR09VVCIsIlNFVF9BQ0NFU1NfVE9LRU4iLCJTRVRfUkVGUkVTSF9UT0tFTiIsIlNFVF9BTEVSVCIsIlNFVF9NT0RBTCIsIk1PRElGWV9VU0VSX0lORk8iLCJzZXRVc2VySW5mbyIsInVzZXJJbmZvIiwidHlwZSIsInBheWxvYWQiLCJsb2dvdXQiLCJzZXRBY2Nlc3NUb2tlbiIsInRva2VuIiwic2V0UmVmcmVzaFRva2VuIiwic2V0QWxlcnQiLCJib29sZWFuIiwic2V0TW9kYWwiLCJtb2RpZnlVc2VySW5mbyIsImluaXRpYWxTdGF0ZSIsImVtYWlsIiwicHJvZmlsZVBpY3R1cmUiLCJuYW1lIiwibmlja25hbWUiLCJjcmVhdGVkQXQiLCJ1cGRhdGVkQXQiLCJ1c2VyVG9rZW4iLCJhY2Nlc3NUb2tlbiIsInJlZnJlc2hUb2tlbiIsImxvZ2luIiwiYWxlcnQiLCJtb2RhbCIsInVzZXIiLCJzdGF0ZSIsImFjdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./reducers/store/user.js\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux");

/***/ }),

/***/ "redux-devtools-extension":
/*!*******************************************!*\
  !*** external "redux-devtools-extension" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux-devtools-extension");

/***/ }),

/***/ "redux-persist":
/*!********************************!*\
  !*** external "redux-persist" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux-persist");

/***/ }),

/***/ "redux-persist/integration/react":
/*!**************************************************!*\
  !*** external "redux-persist/integration/react" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux-persist/integration/react");

/***/ }),

/***/ "redux-persist/lib/storage":
/*!********************************************!*\
  !*** external "redux-persist/lib/storage" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux-persist/lib/storage");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();