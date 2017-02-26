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

      var duration = (appearTimeout || timeout) + appearDelay + 1;

      this.animate(done, 'appear', duration, appearDelay);
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

      var duration = (enterTimeout || timeout) + enterDelay + 1;

      this.animate(done, 'enter', duration, enterDelay);
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

      var duration = (leaveTimeout || timeout) + leaveDelay + 1;

      this.animate(done, 'leave', duration, leaveDelay);
    }
  }, {
    key: 'animate',
    value: function animate(done, className, duration, delay) {
      var _this2 = this;

      var _props$name = this.props.name,
          name = _props$name === undefined ? '' : _props$name;

      var activeClass = className + '-active';

      (0, _domUtils.addClass)(this, className, name);
      (0, _domUtils.setTimeoutAnimationFrame)(function () {
        return (0, _domUtils.addClass)(_this2, activeClass, name);
      }, delay);

      (0, _domUtils.setTimeoutAnimationFrame)(done, duration);
    }
  }, {
    key: 'componentDidAppear',
    value: function componentDidAppear() {
      (0, _domUtils.removeAnimationClasses)(this, this.props.name);

      if (this.props.onlyEnter && this.props.onEnter) {
        this.props.onEnter();
      } else if (this.props.onAppear) {
        this.props.onAppear();
      }
    }
  }, {
    key: 'componentDidEnter',
    value: function componentDidEnter() {
      (0, _domUtils.removeAnimationClasses)(this, this.props.name);

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
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return AnimatedChild;
}(_react2.default.Component);

AnimatedChild.propTypes = {
  children: require('react').PropTypes.any.isRequired,
  onlyEnter: require('react').PropTypes.bool,
  name: require('react').PropTypes.string,
  timeout: require('react').PropTypes.number,
  appearTimeout: require('react').PropTypes.number,
  enterTimeout: require('react').PropTypes.number,
  leaveTimeout: require('react').PropTypes.number,
  appearDelay: require('react').PropTypes.number,
  enterDelay: require('react').PropTypes.number,
  leaveDelay: require('react').PropTypes.number,
  onAppear: require('react').PropTypes.func,
  onEnter: require('react').PropTypes.func,
  onLeave: require('react').PropTypes.func
};
exports.default = AnimatedChild;