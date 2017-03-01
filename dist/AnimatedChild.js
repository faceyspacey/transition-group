'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    key: 'componentWillAppear',
    value: function componentWillAppear(done) {
      var _props = this.props,
          appear = _props.appear,
          appearDuration = _props.appearDuration,
          duration = _props.duration,
          appearDelay = _props.appearDelay,
          delay = _props.delay;

      var doneTimeout = (appearDuration || duration) + (appearDelay || delay) + 1;

      this.animate(done, appear, doneTimeout, appearDelay || delay);
    }
  }, {
    key: 'componentWillEnter',
    value: function componentWillEnter(done) {
      var _props2 = this.props,
          enter = _props2.enter,
          enterDuration = _props2.enterDuration,
          duration = _props2.duration,
          enterDelay = _props2.enterDelay,
          delay = _props2.delay;

      var doneTimeout = (enterDuration || duration) + (enterDelay || delay) + 1;

      this.animate(done, enter, doneTimeout, enterDelay || delay);
    }
  }, {
    key: 'componentWillLeave',
    value: function componentWillLeave(done) {
      var _props3 = this.props,
          leave = _props3.leave,
          leaveDuration = _props3.leaveDuration,
          duration = _props3.duration,
          leaveDelay = _props3.leaveDelay,
          delay = _props3.delay;

      var doneTimeout = (leaveDuration || duration) + (leaveDelay || delay) + 1;

      this.animate(done, leave, doneTimeout, leaveDelay || delay);
    }

    // called when by `done` callbacks above:

  }, {
    key: 'componentDidAppear',
    value: function componentDidAppear() {
      var _props4 = this.props,
          prefix = _props4.prefix,
          appear = _props4.appear,
          enter = _props4.enter;

      (0, _domUtils.removeAnimationClasses)(this, prefix, appear, enter);

      if (this.props.onAppear) {
        this.props.onAppear();
      }
    }
  }, {
    key: 'componentDidEnter',
    value: function componentDidEnter() {
      var _props5 = this.props,
          prefix = _props5.prefix,
          appear = _props5.appear,
          enter = _props5.enter;

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

      var prefix = this.props.prefix;

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
  prefix: require('react').PropTypes.string.isRequired,
  duration: require('react').PropTypes.number.isRequired,
  delay: require('react').PropTypes.number.isRequired,
  appear: require('react').PropTypes.string.isRequired,
  enter: require('react').PropTypes.string.isRequired,
  leave: require('react').PropTypes.string.isRequired,
  appearDuration: require('react').PropTypes.number.isRequired,
  enterDuration: require('react').PropTypes.number.isRequired,
  leaveDuration: require('react').PropTypes.number.isRequired,
  appearDelay: require('react').PropTypes.number.isRequired,
  enterDelay: require('react').PropTypes.number.isRequired,
  leaveDelay: require('react').PropTypes.number.isRequired,
  onAppear: require('react').PropTypes.func,
  onEnter: require('react').PropTypes.func,
  onLeave: require('react').PropTypes.func
};
exports.default = AnimatedChild;