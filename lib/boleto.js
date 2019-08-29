(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Boleto"] = factory();
	else
		root["Boleto"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/boleto.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/boleto.js":
/*!***********************!*\
  !*** ./src/boleto.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const SVG = __webpack_require__(/*! ./svg */ \"./src/svg.js\");\nconst ITF = __webpack_require__(/*! ./itf */ \"./src/itf.js\");\nconst { modulo11 } = __webpack_require__(/*! ./helpers */ \"./src/helpers.js\");\n\nclass Boleto {\n  /**\n   * Initializes the class\n   *\n   * @constructor\n   * @param {String} bankSlipNumber The bank slip number\n   */\n  constructor(bankSlipNumber) {\n    this.bankSlipNumber = bankSlipNumber.replace(/[^\\d]/g, '');\n\n    if (!this.valid()) {\n      throw new Error('Invalid bank slip number');\n    }\n  }\n\n  /**\n   * Validates whether the bank slip number is valid or not\n   *\n   * The validation function ensures that the bank slip number is exactly 47\n   * characters long, then applies the modulo-11 algorithm to the bank slip's\n   * barcode. Finally, it verifies that the result of the algorithm equals the\n   * checksum digit from the bank slip number.\n   *\n   * @return {Boolean} Whether the bank slip number is valid or not\n   */\n  valid() {\n    if (this.bankSlipNumber.length !== 47) return false;\n\n    const barcodeDigits = this.barcode().split('');\n    const checksum = barcodeDigits.splice(4, 1);\n\n    return (modulo11(barcodeDigits).toString() === checksum.toString());\n  }\n\n  /**\n   * Converts the printed bank slip number into the barcode number\n   *\n   * The bank slip's number is a rearrangement of its barcode, plus three\n   * checksum digits. This function executes the inverse process and returns the\n   * original arrangement of the code. Specifications can be found at\n   * https://portal.febraban.org.br/pagina/3166/33/pt-br/layour-arrecadacao\n   *\n   * @return {String} The barcode extracted from the bank slip number\n   */\n  barcode() {\n    return this.bankSlipNumber.replace(\n      /^(\\d{4})(\\d{5})\\d{1}(\\d{10})\\d{1}(\\d{10})\\d{1}(\\d{15})$/,\n      '$1$5$2$3$4',\n    );\n  }\n\n  /**\n   * Returns the bank slip's raw number\n   *\n   * @return {String} The raw bank slip number\n   */\n  number() {\n    return this.bankSlipNumber;\n  }\n\n  /**\n   * Returns the bank slip number with the usual, easy-to-read mask:\n   * 00000.00000 00000.000000 00000.000000 0 00000000000000\n   *\n   * @return {String} The formatted bank slip number\n   */\n  prettyNumber() {\n    return this.bankSlipNumber.replace(\n      /^(\\d{5})(\\d{5})(\\d{5})(\\d{6})(\\d{5})(\\d{6})(\\d{1})(\\d{14})$/,\n      '$1.$2 $3.$4 $5.$6 $7 $8',\n    );\n  }\n\n  /**\n   * Returns the name of the bank that issued the bank slip\n   *\n   * This function is able to identify the most popular or commonly used banks\n   * in Brazil, but not all of them are included here.\n   *\n   * A comprehensive list of all Brazilian banks and their codes can be found at\n   * http://www.buscabanco.org.br/AgenciasBancos.asp\n   *\n   * @return {String} The bank name\n   */\n  bank() {\n    switch (this.barcode().substr(0, 3)) {\n      case '001': return 'Banco do Brasil';\n      case '007': return 'BNDES';\n      case '033': return 'Santander';\n      case '069': return 'Crefisa';\n      case '077': return 'Banco Inter';\n      case '102': return 'XP Investimentos';\n      case '104': return 'Caixa Econômica Federal';\n      case '140': return 'Easynvest';\n      case '197': return 'Stone';\n      case '208': return 'BTG Pactual';\n      case '212': return 'Banco Original';\n      case '237': return 'Bradesco';\n      case '260': return 'Nu Pagamentos';\n      case '341': return 'Itaú';\n      case '389': return 'Banco Mercantil do Brasil';\n      case '422': return 'Banco Safra';\n      case '505': return 'Credit Suisse';\n      case '633': return 'Banco Rendimento';\n      case '652': return 'Itaú Unibanco';\n      case '735': return 'Banco Neon';\n      case '739': return 'Banco Cetelem';\n      case '745': return 'Citibank';\n      default: return 'Unknown';\n    }\n  }\n\n  /**\n   * Returns the currency of the bank slip\n   *\n   * The currency is determined by the currency code, the fourth digit of the\n   * barcode. A list of values other than 9 (Brazilian Real) could not be found.\n   *\n   * @return {String} The currency code, symbol and decimal separator\n   */\n  currency() {\n    switch (this.barcode()[3]) {\n      case '9': return { code: 'BRL', symbol: 'R$', decimal: ',' };\n      default: return 'Unknown';\n    }\n  }\n\n  /**\n   * Returns the verification digit of the barcode\n   *\n   * The barcode has its own checksum digit, which is the fifth digit of itself.\n   *\n   * @return {String} The checksum of the barcode\n   */\n  checksum() {\n    return this.barcode()[4];\n  }\n\n  /**\n   * Returns the date when the bank slip is due\n   *\n   * The portion of the barcode ranging from its sixth to its nineth digits\n   * represent the number of days since the 7th of October, 1997 up to when the\n   * bank slip is good to be paid. Attempting to pay a bank slip after this date\n   * may incurr in extra fees.\n   *\n   * @return {Date} The expiration date of the bank slip\n   */\n  expirationDate() {\n    const refDate = new Date('1997-10-07');\n    const days = this.barcode().substr(5, 4);\n\n    return new Date(refDate.getTime() + (days * 86400000));\n  }\n\n  /**\n   * Returns the bank slip's nominal amount\n   *\n   * @return {String} The bank slip's raw amount\n   */\n  amount() {\n    return (this.barcode().substr(9, 10) / 100.0).toFixed(2);\n  }\n\n  /**\n   * Returns the bank slip's formatted nominal amount\n   *\n   * @return {String} The bank slip's formatted amount\n   */\n  prettyAmount() {\n    const currency = this.currency();\n\n    if (currency === 'Unknown') {\n      return this.amount();\n    }\n\n    return `${currency.symbol} ${this.amount().replace('.', currency.decimal)}`;\n  }\n\n  /**\n   * Generates an array of stripes that can be used to create a SVG\n   *\n   * @param {Integer} beginningHeight Where the SVG would be rendered\n   * @param {Integer} beginningWidth Where the SVG would start to be rendered\n   *\n   */\n  mapRectangles(beginningHeight = 0, beginningWidth = 0) {\n    const stripes = ITF.encode(this.barcode());\n    return new SVG(stripes).mapRectangles(beginningHeight, beginningWidth);\n  }\n}\n\nmodule.exports = Boleto;\n\n\n//# sourceURL=webpack://Boleto/./src/boleto.js?");

/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Calculates the modulo 11 checksum digit\n *\n * The specifications of the algorithm can be found at\n * https://portal.febraban.org.br/pagina/3166/33/pt-br/layour-arrecadacao\n *\n * @params {Array|String} number\n * @return {Integer} The modulo 11 checksum digit\n *\n * @example\n * // Returns 7\n * modulo11('123456789');\n */\nfunction modulo11(number) {\n  let digits = number;\n\n  if (typeof digits === 'string') {\n    digits = digits.split('');\n  }\n\n  digits.reverse();\n\n  let sum = 0;\n\n  for (let i = 0; i < digits.length; i += 1) {\n    sum += ((i % 8) + 2) * digits[i];\n  }\n\n  return (11 - (sum % 11)) % 10 || 1;\n}\n\nmodule.exports = { modulo11 };\n\n\n//# sourceURL=webpack://Boleto/./src/helpers.js?");

/***/ }),

/***/ "./src/itf.js":
/*!********************!*\
  !*** ./src/itf.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * @module ITF\n */\n\n/**\n * Representations of each decimal digit\n *\n * @default\n * @constant\n */\nconst WEIGHTS = [\n  '11221', // 0\n  '21112', // 1\n  '12112', // 2\n  '22111', // 3\n  '11212', // 4\n  '21211', // 5\n  '12211', // 6\n  '11122', // 7\n  '21121', // 8\n  '12121', // 9\n];\n\n/**\n * Representation of Start portion of the barcode\n *\n * @default\n * @constant\n */\nconst START = '1111';\n\n/**\n * Representation of Stop portion of the barcode\n *\n * @default\n * @constant\n */\nconst STOP = '211';\n\n/**\n * Converts a pair of digits into their ITF representation and interleave them\n *\n * @param {String} pair The pair to be interleaved\n * @return {String} The input pair encoded into its ITF representation\n *\n * @example\n * // Returns \"1211212112\"\n * ITF.interleavePair('01');\n */\nfunction interleavePair(pair) {\n  const black = WEIGHTS[Math.floor(pair / 10)];\n  const white = WEIGHTS[pair % 10];\n\n  let p = '';\n\n  for (let i = 0; i < 5; i += 1) {\n    p += black[i];\n    p += white[i];\n  }\n\n  return p;\n}\n\n/**\n * Encodes a base-10 number into its Interleaved 2 of 5 (ITF) representation\n *\n * @param {String} number The number to be encoded\n * @return {String} The input number encoded into its ITF representation\n *\n * @example\n * // Returns \"111121121111222121121112211222111112111122211121122211211\"\n * ITF.encode('1234567890');\n */\nfunction encode(number) {\n  return START + number.match(/(..?)/g).map(interleavePair).join('') + STOP;\n}\n\nmodule.exports = { encode };\n\n\n//# sourceURL=webpack://Boleto/./src/itf.js?");

/***/ }),

/***/ "./src/svg.js":
/*!********************!*\
  !*** ./src/svg.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class SVG {\n  /**\n   * Initializes the class\n   *\n   * @constructor\n   * @param {Array} stripes The list of stripes to be drawn\n   * @param {Integer} stripeWidth The width of a single-weighted stripe\n   */\n  constructor(stripes, stripeWidth) {\n    this.stripes = stripes.split('').map(a => parseInt(a, 10));\n    this.stripeWidth = stripeWidth || 4;\n  }\n\n  /**\n   * Generates an array of stripes that can be used to create a SVG\n   *\n   * @param {Integer} beginningHeight Where the SVG would be rendered\n   * @param {Integer} beginningWidth Where the SVG would start to be rendered\n   *\n   */\n  mapRectangles(beginningHeight, beginningWidth) {\n    const rectangles = [];\n    let pos = beginningWidth;\n    let width = 0;\n\n    for (let i = 0; i < this.stripes.length; i += 1, pos += width) {\n      width = this.stripeWidth * this.stripes[i];\n      const rectangle = {\n        width,\n        height: 100,\n        fill: !(i % 2),\n        x: pos,\n        y: beginningHeight,\n      }\n      rectangles.push(rectangle);\n    }\n\n    return rectangles;\n  }\n\n  /**\n   * Calculates the total width of the barcode\n   *\n   * The calculation method is the sum of the weight of the stripes multiplied\n   * by the width of a single-wighted stripe\n   *\n   * @return {Integer} The width of a view box that fits the barcode\n   */\n  viewBoxWidth() {\n    return this.stripes.reduce((a, b) => a + b, 0) * this.stripeWidth;\n  }\n\n  /**\n   * Returns the appropriate color for each stripe\n   *\n   * Odd numbers will return white, even will return black\n   *\n   * @param {Integer} i The index of the stripe\n   * @return {String} The stripe color\n   *\n   * @example\n   * // Returns \"#ffffff\"\n   * svg.color(1);\n   * // Returns \"#000000\"\n   * svg.color(2);\n   */\n  static color(i) {\n    return i % 2 ? '#ffffff' : '#000000';\n  }\n}\n\nmodule.exports = SVG;\n\n\n//# sourceURL=webpack://Boleto/./src/svg.js?");

/***/ })

/******/ });
});