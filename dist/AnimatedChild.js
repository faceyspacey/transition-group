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
      var _props = this.props,
          _props$timeout = _props.timeout,
          timeout = _props$timeout === undefined ? 0 : _props$timeout,
          appearTimeout = _props.appearTimeout,
          _props$appearDelay = _props.appearDelay,
          appearDelay = _props$appearDelay === undefined ? 0 : _props$appearDelay;

      timeout = (appearTimeout || timeout) + appearDelay + 1;
      this.animate(done, 'appear', timeout, appearDelay);
    }
  }, {
    key: 'handleEntrance',
    value: function handleEntrance(done) {
      var _props2 = this.props,
          _props2$timeout = _props2.timeout,
          timeout = _props2$timeout === undefined ? 0 : _props2$timeout,
          enterTimeout = _props2.enterTimeout,
          _props2$enterDelay = _props2.enterDelay,
          enterDelay = _props2$enterDelay === undefined ? 0 : _props2$enterDelay;

      timeout = (enterTimeout || timeout) + enterDelay + 1;
      this.animate(done, 'enter', timeout, enterDelay);
    }
  }, {
    key: 'handleLeave',
    value: function handleLeave(done) {
      var _props3 = this.props,
          _props3$timeout = _props3.timeout,
          timeout = _props3$timeout === undefined ? 0 : _props3$timeout,
          leaveTimeout = _props3.leaveTimeout,
          _props3$leaveDelay = _props3.leaveDelay,
          leaveDelay = _props3$leaveDelay === undefined ? 0 : _props3$leaveDelay;

      timeout = (leaveTimeout || timeout) + leaveDelay + 1;
      this.animate(done, 'leave', timeout, leaveDelay);
    }
  }, {
    key: 'animate',
    value: function animate(done, className, timeout, delay) {
      var _this2 = this;

      var _props$transitionName = this.props.transitionName,
          transitionName = _props$transitionName === undefined ? '' : _props$transitionName;

      var activeClass = className + '-active';

      (0, _domUtils.addClass)(this, transitionName, className);
      (0, _domUtils.setTimeoutAnimationFrame)(function () {
        return (0, _domUtils.addClass)(_this2, transitionName, activeClass);
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

exports.default = AnimatedChild;