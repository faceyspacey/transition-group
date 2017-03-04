'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTransitionGroup = require('react-addons-transition-group');

var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);

var _domUtils = require('./dom-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnimatedTransitionGroup = function (_React$Component) {
  _inherits(AnimatedTransitionGroup, _React$Component);

  function AnimatedTransitionGroup() {
    _classCallCheck(this, AnimatedTransitionGroup);

    return _possibleConstructorReturn(this, (AnimatedTransitionGroup.__proto__ || Object.getPrototypeOf(AnimatedTransitionGroup)).apply(this, arguments));
  }

  _createClass(AnimatedTransitionGroup, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.onEmpty && _react2.default.Children.count(nextProps.children) === this.props.zeroElements && _react2.default.Children.count(this.props.children) > this.props.zeroElements) {
        var _duration = (this.props.leaveDuration || this.props.duration) + (this.props.leaveDelay || this.props.delay);
        (0, _domUtils.setTimeoutAnimationFrame)(this.props.onEmpty, _duration);
      }

      if (this.props.onFull && _react2.default.Children.count(nextProps.children) > this.props.zeroElements && _react2.default.Children.count(this.props.children) === this.props.zeroElements) {
        (0, _domUtils.setTimeoutAnimationFrame)(this.props.onFull, 0);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          prefix = _props.prefix,
          duration = _props.duration,
          delay = _props.delay,
          appear = _props.appear,
          enter = _props.enter,
          leave = _props.leave,
          enterDuration = _props.enterDuration,
          leaveDuration = _props.leaveDuration,
          appearDuration = _props.appearDuration,
          enterDelay = _props.enterDelay,
          leaveDelay = _props.leaveDelay,
          appearDelay = _props.appearDelay,
          onAppear = _props.onAppear,
          onEnter = _props.onEnter,
          onLeave = _props.onLeave,
          onEmpty = _props.onEmpty,
          onFull = _props.onFull,
          zeroElements = _props.zeroElements,
          props = _objectWithoutProperties(_props, ['children', 'prefix', 'duration', 'delay', 'appear', 'enter', 'leave', 'enterDuration', 'leaveDuration', 'appearDuration', 'enterDelay', 'leaveDelay', 'appearDelay', 'onAppear', 'onEnter', 'onLeave', 'onEmpty', 'onFull', 'zeroElements']);

      return _react2.default.createElement(
        _reactAddonsTransitionGroup2.default,
        props,
        _react2.default.Children.map(children || [], function (child) {
          if (!child) return null; // cloneElement won't work on a non-existent child (null will filter it out)

          return _react2.default.cloneElement(child, _extends({
            prefix: prefix,
            duration: duration,
            delay: delay,

            appear: appear,
            enter: enter,
            leave: leave,

            enterDuration: enterDuration,
            leaveDuration: leaveDuration,
            appearDuration: appearDuration,

            enterDelay: enterDelay,
            leaveDelay: leaveDelay,
            appearDelay: appearDelay,

            onAppear: onAppear,
            onEnter: onEnter,
            onLeave: onLeave
          }, child.props));
        }).filter(function (child) {
          return child;
        })
      );
    }
  }]);

  return AnimatedTransitionGroup;
}(_react2.default.Component);

AnimatedTransitionGroup.defaultProps = {
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
};
AnimatedTransitionGroup.propTypes = {
  children: require('react').PropTypes.any,
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
  onLeave: require('react').PropTypes.func,
  onEmpty: require('react').PropTypes.func,
  onFull: require('react').PropTypes.func,
  zeroElements: require('react').PropTypes.number
};
exports.default = AnimatedTransitionGroup;