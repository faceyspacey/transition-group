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
          _props$duration = _props.duration,
          duration = _props$duration === undefined ? 0 : _props$duration,
          appearDuration = _props.appearDuration,
          _props$appearDelay = _props.appearDelay,
          appearDelay = _props$appearDelay === undefined ? 0 : _props$appearDelay;

      var doneTimeout = (appearDuration || duration) + appearDelay + 1;

      this.animate(done, 'appear', doneTimeout, appearDelay);
    }
  }, {
    key: 'componentWillEnter',
    value: function componentWillEnter(done) {
      var _props2 = this.props,
          _props2$duration = _props2.duration,
          duration = _props2$duration === undefined ? 0 : _props2$duration,
          enterDuration = _props2.enterDuration,
          _props2$enterDelay = _props2.enterDelay,
          enterDelay = _props2$enterDelay === undefined ? 0 : _props2$enterDelay;

      var doneTimeout = (enterDuration || duration) + enterDelay + 1;

      this.animate(done, 'enter', doneTimeout, enterDelay);
    }
  }, {
    key: 'componentWillLeave',
    value: function componentWillLeave(done) {
      var _props3 = this.props,
          _props3$duration = _props3.duration,
          duration = _props3$duration === undefined ? 0 : _props3$duration,
          leaveDuration = _props3.leaveDuration,
          _props3$leaveDelay = _props3.leaveDelay,
          leaveDelay = _props3$leaveDelay === undefined ? 0 : _props3$leaveDelay;

      var doneTimeout = (leaveDuration || duration) + leaveDelay + 1;

      this.animate(done, 'leave', doneTimeout, leaveDelay);
    }

    // called when by `done` callbacks above:

  }, {
    key: 'componentDidAppear',
    value: function componentDidAppear() {
      (0, _domUtils.removeAnimationClasses)(this, this.props.prefix);

      if (this.props.onAppear) {
        this.props.onAppear();
      }
    }
  }, {
    key: 'componentDidEnter',
    value: function componentDidEnter() {
      (0, _domUtils.removeAnimationClasses)(this, this.props.prefix);

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
      }, delay || 0, className);

      (0, _domUtils.setTimeoutAnimationFrame)(done, duration, 'done'); // final param only recorded in shapshot tests
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