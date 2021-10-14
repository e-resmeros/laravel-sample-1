(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./resources/app/components/ChangePasswordForm/styles.scss":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/sass-loader/dist/cjs.js??ref--6-3!./resources/app/components/ChangePasswordForm/styles.scss ***!
  \****************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".ChangePassword {\n  display: flex;\n  background: #f7f9f9;\n  width: 100vw;\n  height: 100vh;\n  justify-content: center;\n  align-items: center;\n}\n\n.cp-container {\n  width: 425px;\n  max-width: 425px;\n}\n.cp-container .custom-card {\n  padding: 40px;\n}\n.cp-container form {\n  margin-top: 12px;\n}\n.cp-container .button {\n  margin-top: 12px;\n}\n.cp-container .button .icon {\n  position: absolute;\n  color: white;\n  font-size: 27px;\n  vertical-align: middle;\n  margin-top: -5px;\n  margin-left: 1px;\n  transition: 500ms;\n}\n.cp-container .button:hover .icon {\n  margin-left: 8px;\n  transition: 500ms;\n}\n.cp-container .label {\n  font-size: 12px;\n  font-style: italic;\n  color: red;\n  text-align: center;\n}\n\n.logo-container {\n  text-align: center;\n  margin: 10px 0 30px 0;\n}\n.logo-container .logo {\n  margin: 15px 0;\n  width: 100px;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n.logo-container .logo-text {\n  color: #e43d2c;\n  font-size: 60px;\n  font-weight: 700;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}", ""]);



/***/ }),

/***/ "./resources/app/components/ChangePasswordForm/ChangePasswordForm.js":
/*!***************************************************************************!*\
  !*** ./resources/app/components/ChangePasswordForm/ChangePasswordForm.js ***!
  \***************************************************************************/
/*! exports provided: ChangePasswordForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangePasswordForm", function() { return ChangePasswordForm; });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_icons_all__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-icons/all */ "./node_modules/react-icons/all.js");
/* harmony import */ var _assets_images_logo_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../assets/images/logo.png */ "./resources/app/assets/images/logo.png");
/* harmony import */ var _assets_images_logo_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_assets_images_logo_png__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../elements */ "./resources/app/components/elements/index.js");
/* harmony import */ var _TextInputField__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../TextInputField */ "./resources/app/components/TextInputField/index.js");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./styles.scss */ "./resources/app/components/ChangePasswordForm/styles.scss");
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_styles_scss__WEBPACK_IMPORTED_MODULE_7__);
/* eslint-disable indent */








var ChangePasswordForm = function ChangePasswordForm(_ref) {
  var onSubmit = _ref.onSubmit,
      error = _ref.error,
      isLoading = _ref.isLoading;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "ChangePassword"
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "cp-container"
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_elements__WEBPACK_IMPORTED_MODULE_5__["Card"], {
    block: true,
    className: "custom-card"
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "logo-container"
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Row"], {
    className: "col-2",
    gutter: [0, 0]
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Col"], {
    span: 6
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("img", {
    className: "logo",
    src: _assets_images_logo_png__WEBPACK_IMPORTED_MODULE_4___default.a,
    alt: "San Miguel's Logo"
  })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Col"], {
    span: 16
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
    className: "logo-text"
  }, "MASS"))), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Row"], null, "Mobile Apps for Sales Supervisors")), error ? error.map(function (_ref2) {
    var code = _ref2.code,
        message = _ref2.message;
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Alert"], {
      message: message,
      type: "error",
      showIcon: true,
      key: code
    });
  }) : null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("form", {
    onSubmit: onSubmit
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Row"], {
    className: "label"
  }, "Your password has been reset by the Administrator."), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Row"], {
    className: "label"
  }, "Please provide a new password."), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_TextInputField__WEBPACK_IMPORTED_MODULE_6__["TextInputField"], {
    type: "password",
    label: "Password",
    name: "password",
    icon: react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_icons_all__WEBPACK_IMPORTED_MODULE_3__["IoIosKey"], null),
    required: true
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_TextInputField__WEBPACK_IMPORTED_MODULE_6__["TextInputField"], {
    type: "password",
    label: "Confirm Password",
    name: "password_confirmation",
    icon: react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_icons_all__WEBPACK_IMPORTED_MODULE_3__["IoIosKey"], null),
    required: true
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_elements__WEBPACK_IMPORTED_MODULE_5__["Button"], {
    disabled: isLoading,
    primary: true,
    block: true,
    className: "button"
  }, isLoading ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_0__["Icon"], {
    type: "loading"
  }) : react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, "Change Password"), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_icons_all__WEBPACK_IMPORTED_MODULE_3__["TiArrowRight"], {
    className: "icon"
  })))))));
};
ChangePasswordForm.propTypes = {
  onSubmit: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  error: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  isLoading: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
};

/***/ }),

/***/ "./resources/app/components/ChangePasswordForm/index.js":
/*!**************************************************************!*\
  !*** ./resources/app/components/ChangePasswordForm/index.js ***!
  \**************************************************************/
/*! exports provided: ChangePasswordForm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ChangePasswordForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChangePasswordForm */ "./resources/app/components/ChangePasswordForm/ChangePasswordForm.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ChangePasswordForm", function() { return _ChangePasswordForm__WEBPACK_IMPORTED_MODULE_0__["ChangePasswordForm"]; });



/***/ }),

/***/ "./resources/app/components/ChangePasswordForm/styles.scss":
/*!*****************************************************************!*\
  !*** ./resources/app/components/ChangePasswordForm/styles.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--6-3!./styles.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./resources/app/components/ChangePasswordForm/styles.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./resources/app/containers/ChangePassword/index.js":
/*!**********************************************************!*\
  !*** ./resources/app/containers/ChangePassword/index.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reselect */ "./node_modules/reselect/es/index.js");
/* harmony import */ var _components_ChangePasswordForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/ChangePasswordForm */ "./resources/app/components/ChangePasswordForm/index.js");
/* harmony import */ var _ducks_user__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../ducks/user */ "./resources/app/ducks/user.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var ChangePassword = function ChangePassword(_ref) {
  var user = _ref.user,
      changePassword = _ref.changePassword;

  // States
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(null),
      _useState2 = _slicedToArray(_useState, 2),
      changePasswordError = _useState2[0],
      setChangePasswordError = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isLoading = _useState4[0],
      setLoading = _useState4[1]; // Functions


  var onSubmit = function onSubmit(event) {
    setChangePasswordError(null);
    event.preventDefault();
    event.persist();
    setLoading(true);
    var formData = new FormData(event.target);
    changePassword({
      id: user.id,
      new_password: formData.get('password'),
      new_password_confirmation: formData.get('password_confirmation'),
      callback: function callback(_ref2) {
        var error = _ref2.error;
        setLoading(false);

        if (error) {
          setChangePasswordError(error);
        }
      }
    });
  };

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_ChangePasswordForm__WEBPACK_IMPORTED_MODULE_5__["ChangePasswordForm"], {
    isLoading: isLoading,
    error: changePasswordError,
    onSubmit: onSubmit
  });
};

ChangePassword.propTypes = {
  user: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object,
  changePassword: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
};
var mapStateToProps = Object(reselect__WEBPACK_IMPORTED_MODULE_4__["createStructuredSelector"])({
  accessToken: _ducks_user__WEBPACK_IMPORTED_MODULE_6__["selectors"].makeSelectAccessToken(),
  user: _ducks_user__WEBPACK_IMPORTED_MODULE_6__["selectors"].makeSelectUser()
});

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return _objectSpread({}, Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_objectSpread({}, _ducks_user__WEBPACK_IMPORTED_MODULE_6__["actions"]), dispatch));
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(ChangePassword));

/***/ })

}]);