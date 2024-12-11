/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!************************!*\
  !*** ./src/preload.ts ***!
  \************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const electron_1 = __webpack_require__(/*! electron */ "electron");
// You can use Node.js APIs here, but avoid exposing them directly to the renderer
// Exposing a safe API to the renderer process
electron_1.contextBridge.exposeInMainWorld('electron', {
    // Example: Minimize the window
    minimizeWindow: () => electron_1.ipcRenderer.send('window:minimize'),
    // Example: Maximize or unmaximize the window
    toggleMaximizeWindow: () => electron_1.ipcRenderer.send('window:maximize'),
    // Example: Close the window
    closeWindow: () => electron_1.ipcRenderer.send('window:close'),
});

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=preload.js.map