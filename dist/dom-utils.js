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

function addClass(component) {
  var transitionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var className = arguments[2];

  try {
    var element = _reactDom2.default.findDOMNode(component);
    className = transitionName ? transitionName + '-' + className : className;
    element.className = element.className + '  ' + className;
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('AnimatedChild had the following adding classes ' + e.toString());
    }
  }
}

function removeAnimationClasses(component) {
  var transitionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  try {
    //dom node may have been removed if wrapped by an outer animation with a shorter duration (no big deal)
    var element = _reactDom2.default.findDOMNode(component);
    var classNameReg = !transitionName ? 'enter-active|enter' : transitionName + '-enter-active|' + transitionName + '-enter';

    var re = new RegExp(classNameReg, 'g');
    element.className = element.className.replace(re, '');
  } catch (e) {
    if (process.env.NODE_ENV === 'production') {
      console.warn('AnimatedChild had the following issue removing classes: ' + e.toString());
    }
  }
}

function setTimeoutAnimationFrame(func) {
  var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (!func) return;

  setTimeout(function () {
    requestAnimationFrame(func);
  }, ms);
}