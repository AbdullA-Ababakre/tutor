(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([["pages/index/parent/intro/index"],{

/***/ "./node_modules/@tarojs/mini-runner/node_modules/babel-loader/lib/index.js!./src/pages/index/parent/intro/index.jsx":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/@tarojs/mini-runner/node_modules/babel-loader/lib!./src/pages/index/parent/intro/index.jsx ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Intro; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/cjs/react.production.min.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tarojs/taro */ "./node_modules/@tarojs/taro/index.js");
/* harmony import */ var _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tarojs_taro__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tarojs_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tarojs/components */ "./node_modules/@tarojs/components/mini/index.js");
/* harmony import */ var _images_parentIntro2_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../images/parentIntro2.png */ "./src/images/parentIntro2.png");
/* harmony import */ var _images_parentIntro2_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_images_parentIntro2_png__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index.scss */ "./src/pages/index/parent/intro/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_4__);






var handleClick = function handleClick() {
  _tarojs_taro__WEBPACK_IMPORTED_MODULE_1___default.a.navigateTo({
    url: "../submitInfo/index"
  });
};

function Intro() {
  var citysArr = ["深圳", "广州", "佛山", "珠海", "东莞", "其它"];
  var citys = citysArr.map(function (item) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__["View"], {
      className: "city"
    }, item);
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__["View"], {
    className: "intro-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__["View"], {
    className: "header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__["Image"], {
    className: "header-image",
    mode: "widthFix",
    src: "cloud://tutor-ghszz.7475-tutor-ghszz-1303852457/images/parent_intro.png"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__["View"], {
    className: "body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__["Image"], {
    className: "topicImg",
    src: _images_parentIntro2_png__WEBPACK_IMPORTED_MODULE_3___default.a,
    mode: "heightFix"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__["View"], {
    className: "intro-text"
  }, "\u5927\u5B66\u751F\u8354\u6559\u7531\u591A\u6240211/985\u9AD8\u6821\u5E08\u751F\u5171\u540C\u521B\u529E\uFF0C\u5165\u90092020\u5E74\u5E7F\u4E1C\u7701\u9752\u521B100\u4F01\u4E1A\u3002\u63D0\u4F9B\u5E7C\u5C0F\u521D\u9AD8\u4E2D\u4E2A\u6027\u5316\u4E0A\u95E8\u5BB6\u6559\u8F85\u5BFC\uFF0C\u4E3A\u5B69\u5B50\u5339\u914D\u6700\u9002\u5408\u7684\u5BB6\u6559\u8001\u5E08\uFF0C\u9996\u521B\u4E00\u8BFE\u4E00\u7ED3\u7684\u6A21\u5F0F\u3002"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__["View"], {
    className: "cityList"
  }, citys), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__["View"], {
    className: "priceBox"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__["View"], {
    className: "box"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__["View"], {
    className: "text-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__["View"], null, "\u5E7C\u513F\u56ED\uFF1A40-60\u5143/h"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__["View"], null, "\u5C0F\u5B66\uFF1A60-90\u5143/h"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__["View"], null, "\u521D\u4E2D\uFF1A70-120\u5143/h"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__["View"], null, "\u9AD8\u4E2D\uFF1A90-150\u5143/h"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__["View"], {
    className: "box"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__["View"], {
    className: "text-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__["View"], null, "\u7F8E\u672F\uFF1A70-120\u5143/h"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__["View"], null, "\u97F3\u4E50\uFF1A70-130\u5143/h"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__["View"], null, "\u4F53\u80B2\uFF1A65-100\u5143/h")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__["View"], {
    className: "online-class"
  }, "\u8FDC\u7A0B\u8F85\u5BFC(\u7F51\u8BFE) \u4EF7\u683C\u53EF\u51CF\u5C1120\u5143/h"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__["Button"], {
    onClick: handleClick
  }, "\u7ACB\u5373\u9884\u7EA6\u514D\u8D39\u8BD5\u8BFE"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tarojs_components__WEBPACK_IMPORTED_MODULE_2__["View"], {
    className: "footer-txt"
  }, "\u8BFE\u65F6\u8D39\u6309\u7167\u57CE\u5E02\u3001\u5B66\u751F\u5E74\u7EA7\u3001\u5BF9\u8001\u5E08\u8981\u6C42\u3001\u8DDD\u79BB\u6709\u6240\u8C03\u6574\uFF0C\u8BD5\u8BFE1\u5C0F\u65F6\u5185\u514D\u8D39\uFF0C\u4E0D\u6EE1\u610F\u53EF\u968F\u65F6\u66F4\u6362\u8001\u5E08\u6216\u53D6\u6D88")));
}

/***/ }),

/***/ "./src/images/parentIntro2.png":
/*!*************************************!*\
  !*** ./src/images/parentIntro2.png ***!
  \*************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/parentIntro2.png";

/***/ }),

/***/ "./src/pages/index/parent/intro/index.jsx":
/*!************************************************!*\
  !*** ./src/pages/index/parent/intro/index.jsx ***!
  \************************************************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tarojs/runtime */ "./node_modules/@tarojs/mini-runner/node_modules/@tarojs/runtime/dist/runtime.esm.js");
/* harmony import */ var _node_modules_tarojs_mini_runner_node_modules_babel_loader_lib_index_js_index_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/@tarojs/mini-runner/node_modules/babel-loader/lib!./index.jsx */ "./node_modules/@tarojs/mini-runner/node_modules/babel-loader/lib/index.js!./src/pages/index/parent/intro/index.jsx");


var config = {};


var inst = Page(Object(_tarojs_runtime__WEBPACK_IMPORTED_MODULE_0__["createPageConfig"])(_node_modules_tarojs_mini_runner_node_modules_babel_loader_lib_index_js_index_jsx__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], 'pages/index/parent/intro/index', {}, config || {}))



/***/ }),

/***/ "./src/pages/index/parent/intro/index.scss":
/*!*************************************************!*\
  !*** ./src/pages/index/parent/intro/index.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

},[["./src/pages/index/parent/intro/index.jsx","runtime","taro","vendors"]]]);
//# sourceMappingURL=index.js.map