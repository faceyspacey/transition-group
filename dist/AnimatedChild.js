'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _domUtils = require('./dom-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnimatedChild = function (_React$Component) {
  _inherits(AnimatedChild, _React$Component);

  function AnimatedChild() {
    _classCallCheck(this, AnimatedChild);

    return _possibleConstructorReturn(this, (AnimatedChild.__proto__ || Object.getPrototypeOf(AnimatedChild)).apply(this, arguments));
  }

  _createClass(AnimatedChild, [{
    key: 'getDefaultProps',
    value: function getDefaultProps() {
      return _extends({
        prefix: '',
        duration: 0,
        delay: 0,

        appear: 'appear',
        enter: 'enter',
        leave: 'leave',

        appearDuration: 0,
        enterDuration: 0,
        leaveDuration: 0,

        appearDelay: 0,
        enterDelay: 0,
        leaveDelay: 0,

        zeroElements: 0
      }, this.props);
    }
  }, {
    key: 'componentWillAppear',
    value: function componentWillAppear(done) {
      var _getDefaultProps = this.getDefaultProps(),
          appear = _getDefaultProps.appear,
          appearDuration = _getDefaultProps.appearDuration,
          duration = _getDefaultProps.duration,
          appearDelay = _getDefaultProps.appearDelay,
          delay = _getDefaultProps.delay;

      var doneTimeout = (appearDuration || duration) + (appearDelay || delay) + 1;

      this.animate(done, appear, doneTimeout, appearDelay || delay);
    }
  }, {
    key: 'componentWillEnter',
    value: function componentWillEnter(done) {
      var _getDefaultProps2 = this.getDefaultProps(),
          enter = _getDefaultProps2.enter,
          enterDuration = _getDefaultProps2.enterDuration,
          duration = _getDefaultProps2.duration,
          enterDelay = _getDefaultProps2.enterDelay,
          delay = _getDefaultProps2.delay;

      var doneTimeout = (enterDuration || duration) + (enterDelay || delay) + 1;

      this.animate(done, enter, doneTimeout, enterDelay || delay);
    }
  }, {
    key: 'componentWillLeave',
    value: function componentWillLeave(done) {
      var _getDefaultProps3 = this.getDefaultProps(),
          leave = _getDefaultProps3.leave,
          leaveDuration = _getDefaultProps3.leaveDuration,
          duration = _getDefaultProps3.duration,
          leaveDelay = _getDefaultProps3.leaveDelay,
          delay = _getDefaultProps3.delay;

      var doneTimeout = (leaveDuration || duration) + (leaveDelay || delay) + 1;

      this.animate(done, leave, doneTimeout, leaveDelay || delay);
    }

    // called when by `done` callbacks above:

  }, {
    key: 'componentDidAppear',
    value: function componentDidAppear() {
      var _getDefaultProps4 = this.getDefaultProps(),
          prefix = _getDefaultProps4.prefix,
          appear = _getDefaultProps4.appear,
          enter = _getDefaultProps4.enter;

      (0, _domUtils.removeAnimationClasses)(this, prefix, appear, enter);

      if (this.props.onAppear) {
        this.props.onAppear();
      }
    }
  }, {
    key: 'componentDidEnter',
    value: function componentDidEnter() {
      var _getDefaultProps5 = this.getDefaultProps(),
          prefix = _getDefaultProps5.prefix,
          appear = _getDefaultProps5.appear,
          enter = _getDefaultProps5.enter;

      (0, _domUtils.removeAnimationClasses)(this, prefix, appear, enter);

      if (this.props.onEnter) {
        this.props.onEnter();
      }
    }
  }, {
    key: 'componentDidLeave',
    value: function componentDidLeave() {
      if (this.props.onLeave) {
        this.props.onLeave();
      }
    }
  }, {
    key: 'animate',
    value: function animate(done, className, duration, delay) {
      var _this2 = this;

      var _props$prefix = this.props.prefix,
          prefix = _props$prefix === undefined ? '' : _props$prefix;

      var activeClass = className + '-active';

      (0, _domUtils.addClass)(this, className, prefix);
      (0, _domUtils.setTimeoutAnimationFrame)(function () {
        return (0, _domUtils.addClass)(_this2, activeClass, prefix);
      }, delay, className);

      (0, _domUtils.setTimeoutAnimationFrame)(done, duration, 'done callbacks'); // final param only recorded in shapshot tests
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return AnimatedChild;
}(_react2.default.Component);

AnimatedChild.propTypes = {
  children: require('react').PropTypes.any.isRequired,
  prefix: require('react').PropTypes.string,
  duration: require('react').PropTypes.number,
  delay: require('react').PropTypes.number,
  appear: require('react').PropTypes.string,
  enter: require('react').PropTypes.string,
  leave: require('react').PropTypes.string,
  appearDuration: require('react').PropTypes.number,
  enterDuration: require('react').PropTypes.number,
  leaveDuration: require('react').PropTypes.number,
  appearDelay: require('react').PropTypes.number,
  enterDelay: require('react').PropTypes.number,
  leaveDelay: require('react').PropTypes.number,
  onAppear: require('react').PropTypes.func,
  onEnter: require('react').PropTypes.func,
  onLeave: require('react').PropTypes.func
};
exports.default = AnimatedChild;