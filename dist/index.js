'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimatedChild = exports.AnimatedTransitionGroup = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTransitionGroup = require('react-addons-transition-group');

var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _domUtils = require('./dom-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnimatedTransitionGroup = exports.AnimatedTransitionGroup = function (_React$Component) {
  _inherits(AnimatedTransitionGroup, _React$Component);

  function AnimatedTransitionGroup() {
    _classCallCheck(this, AnimatedTransitionGroup);

    return _possibleConstructorReturn(this, (AnimatedTransitionGroup.__proto__ || Object.getPrototypeOf(AnimatedTransitionGroup)).apply(this, arguments));
  }

  _createClass(AnimatedTransitionGroup, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.onEmpty && _react2.default.Children.count(nextProps.children) === this.props.zeroElements && _react2.default.Children.count(this.props.children) > this.props.zeroElements) {
        (0, _domUtils.setTimeoutAnimationFrame)(this.props.onEmpty, this.props.timeout || 0);
      }

      if (this.props.onFull && _react2.default.Children.count(nextProps.children) > this.props.zeroElements && _react2.default.Children.count(this.props.children) === this.props.zeroElements) {
        (0, _domUtils.setTimeoutAnimationFrame)(this.props.onFull);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          onEmpty = _props.onEmpty,
          onFull = _props.onFull,
          zeroElements = _props.zeroElements,
          onlyEnter = _props.onlyEnter,
          transitionName = _props.transitionName,
          timeout = _props.timeout,
          enterTimeout = _props.enterTimeout,
          leaveTimeout = _props.leaveTimeout,
          appearTimeout = _props.appearTimeout,
          enterDelay = _props.enterDelay,
          leaveDelay = _props.leaveDelay,
          appearDelay = _props.appearDelay,
          onAppear = _props.onAppear,
          onEnter = _props.onEnter,
          onLeave = _props.onLeave,
          props = _objectWithoutProperties(_props, ['children', 'onEmpty', 'onFull', 'zeroElements', 'onlyEnter', 'transitionName', 'timeout', 'enterTimeout', 'leaveTimeout', 'appearTimeout', 'enterDelay', 'leaveDelay', 'appearDelay', 'onAppear', 'onEnter', 'onLeave']);

      return _react2.default.createElement(
        _reactAddonsTransitionGroup2.default,
        props,
        _react2.default.Children.map(children, function (child) {
          if (!child) return null; //cloneElement won't work on a non-existent child (then filter it out)

          return _react2.default.cloneElement(child, _extends({
            onlyEnter: onlyEnter,
            transitionName: transitionName,
            timeout: timeout,

            enterTimeout: enterTimeout,
            leaveTimeout: leaveTimeout,
            appearTimeout: appearTimeout,

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
  zeroElements: 0
};

var AnimatedChild = exports.AnimatedChild = function (_React$Component2) {
  _inherits(AnimatedChild, _React$Component2);

  function AnimatedChild() {
    _classCallCheck(this, AnimatedChild);

    return _possibleConstructorReturn(this, (AnimatedChild.__proto__ || Object.getPrototypeOf(AnimatedChild)).apply(this, arguments));
  }

  _createClass(AnimatedChild, [{
    key: 'componentWillAppear',
    value: function componentWillAppear(done) {
      if (this.props.onlyEnter) {
        this.handleEntrance(done);
      } else {
        this.handleAppear(done);
      }
    }
  }, {
    key: 'componentWillEnter',
    value: function componentWillEnter(done) {
      this.handleEntrance(done);
    }
  }, {
    key: 'componentWillLeave',
    value: function componentWillLeave(done) {
      this.handleLeave(done);
    }
  }, {
    key: 'handleAppear',
    value: function handleAppear(done) {
      var _props2 = this.props,
          _props2$timeout = _props2.timeout,
          timeout = _props2$timeout === undefined ? 0 : _props2$timeout,
          appearTimeout = _props2.appearTimeout,
          _props2$appearDelay = _props2.appearDelay,
          appearDelay = _props2$appearDelay === undefined ? 0 : _props2$appearDelay;

      timeout = (appearTimeout || timeout) + appearDelay + 1;
      this.animate(done, 'appear', timeout, appearDelay);
    }
  }, {
    key: 'handleEntrance',
    value: function handleEntrance(done) {
      var _props3 = this.props,
          _props3$timeout = _props3.timeout,
          timeout = _props3$timeout === undefined ? 0 : _props3$timeout,
          enterTimeout = _props3.enterTimeout,
          _props3$enterDelay = _props3.enterDelay,
          enterDelay = _props3$enterDelay === undefined ? 0 : _props3$enterDelay;

      timeout = (enterTimeout || timeout) + enterDelay + 1;
      this.animate(done, 'enter', timeout, enterDelay);
    }
  }, {
    key: 'handleLeave',
    value: function handleLeave(done) {
      var _props4 = this.props,
          _props4$timeout = _props4.timeout,
          timeout = _props4$timeout === undefined ? 0 : _props4$timeout,
          leaveTimeout = _props4.leaveTimeout,
          _props4$leaveDelay = _props4.leaveDelay,
          leaveDelay = _props4$leaveDelay === undefined ? 0 : _props4$leaveDelay;

      timeout = (leaveTimeout || timeout) + leaveDelay + 1;
      this.animate(done, 'leave', timeout, leaveDelay);
    }
  }, {
    key: 'animate',
    value: function animate(done, className, timeout, delay) {
      var _this3 = this;

      var _props$transitionName = this.props.transitionName,
          transitionName = _props$transitionName === undefined ? '' : _props$transitionName;

      var activeClass = className + '-active';

      (0, _domUtils.addClass)(this, transitionName, className);
      (0, _domUtils.setTimeoutAnimationFrame)(function () {
        return (0, _domUtils.addClass)(_this3, transitionName, activeClass);
      }, delay);

      (0, _domUtils.setTimeoutAnimationFrame)(done, timeout);
    }
  }, {
    key: 'componentDidAppear',
    value: function componentDidAppear() {
      (0, _domUtils.removeAnimationClasses)(this, this.props.transitionName);

      if (this.props.onlyEnter) {
        this.props.onEntered && this.props.onEntered();
      } else {
        this.props.onAppeared && this.props.onAppeared();
      }
    }
  }, {
    key: 'componentDidEnter',
    value: function componentDidEnter() {
      (0, _domUtils.removeAnimationClasses)(this, this.props.transitionName);
      this.props.onEntered && this.props.onEntered();
    }
  }, {
    key: 'componentDidLeave',
    value: function componentDidLeave() {
      this.props.onLeave && this.props.onLeave();
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return AnimatedChild;
}(_react2.default.Component);