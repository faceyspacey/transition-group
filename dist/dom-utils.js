'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addClass = addClass;
exports.removeAnimationClasses = removeAnimationClasses;
exports.setTimeoutAnimationFrame = setTimeoutAnimationFrame;

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line


function addClass(component, className) {
  var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  try {
    var element = _reactDom2.default.findDOMNode(component);

    className = prefix ? prefix + '-' + className : className;
    element.className = element.className + '  ' + className;
  } catch (e) {
    if (process.env.NODE_ENV !== 'production' && !process.env.STORYBOOK_GIT_BRANCH) {
      console.warn('AnimatedChild had the following issue adding classes: ' + e.toString());
    }
  }
}

function removeAnimationClasses(component) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  try {
    // dom node may have been removed if wrapped by an outer animation with a shorter duration (no big deal)
    var element = _reactDom2.default.findDOMNode(component);
    var classNameReg = !prefix ? 'enter-active|appear-active|enter|appear' : prefix + '-enter-active|' + prefix + '-appear-active|' + prefix + '-enter|' + prefix + '-appear';

    var re = new RegExp(classNameReg, 'g');
    element.className = element.className.replace(re, '');
  } catch (e) {
    if (process.env.NODE_ENV === 'production' && !process.env.STORYBOOK_GIT_BRANCH) {
      console.warn('AnimatedChild had the following issue removing classes: ' + e.toString());
    }
  }
}

function setTimeoutAnimationFrame(func) {
  var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var callback = func;
  if (typeof callback !== 'function') return;

  setTimeout(function () {
    requestAnimationFrame(callback);
  }, ms);
}