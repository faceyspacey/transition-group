import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import ReactDOM from 'react-dom';

import { addClass, removeAnimationClasses, setTimeoutAnimationFrame } from './dom-utils';


export class AnimatedTransitionGroup extends React.Component {
  static defaultProps = {
    zeroElements: 0
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.onEmpty 
        && React.Children.count(nextProps.children) === this.props.zeroElements 
        && React.Children.count(this.props.children) > this.props.zeroElements
    ) {
      setTimeoutAnimationFrame(this.props.onEmpty, this.props.timeout || 0);
    }

    if(this.props.onFull 
        && React.Children.count(nextProps.children) > this.props.zeroElements 
        && React.Children.count(this.props.children) === this.props.zeroElements
    ) {
      setTimeoutAnimationFrame(this.props.onFull);
    }
  }
  
  render() {
    let { 
      children, 
      onEmpty,
      onFull,
      zeroElements,

      onlyEnter,
      transitionName, 
      timeout, 

      enterTimeout,
      leaveTimeout,
      appearTimeout,

      enterDelay,
      leaveDelay,
      appearDelay,

      onAppear,
      onEnter,
      onLeave,
  
      ...props
    } = this.props;

    return (
      <ReactTransitionGroup {...props}>
        {React.Children.map(children, child => {
          if(!child) return null; //cloneElement won't work on a non-existent child (then filter it out)

          return React.cloneElement(child, {
            onlyEnter,
            transitionName, 
            timeout, 

            enterTimeout,
            leaveTimeout,
            appearTimeout,

            enterDelay,
            leaveDelay,
            appearDelay,
            
            onAppear,
            onEnter,
            onLeave,
            ...child.props
          });
        }).filter(child => child)}
      </ReactTransitionGroup>
    );
  }
}


export class AnimatedChild extends React.Component {
  componentWillAppear(done) {
    if(this.props.onlyEnter) {
      this.handleEntrance(done);
    }
    else {
      this.handleAppear(done);
    }
  }
  componentWillEnter(done) {
    this.handleEntrance(done);
  }
  componentWillLeave(done) {
    this.handleLeave(done);
  }

  handleAppear(done) {
    let {timeout=0, appearTimeout, appearDelay=0} = this.props;
    timeout = (appearTimeout || timeout) + appearDelay + 1;
    this.animate(done, 'appear', timeout, appearDelay);
  }

  handleEntrance(done) {
    let {timeout=0, enterTimeout, enterDelay=0} = this.props;
    timeout = (enterTimeout || timeout) + enterDelay + 1;
    this.animate(done, 'enter', timeout, enterDelay);
  }

  handleLeave(done) {
    let {timeout=0, leaveTimeout, leaveDelay=0} = this.props;
    timeout = (leaveTimeout || timeout) + leaveDelay + 1;
    this.animate(done, 'leave', timeout, leaveDelay);
  }

  animate(done, className, timeout, delay) {
    let {transitionName=''} = this.props;
    let activeClass = `${className}-active`;

    addClass(this, transitionName, className);
    setTimeoutAnimationFrame(() => addClass(this, transitionName, activeClass), delay);

    setTimeoutAnimationFrame(done, timeout);
  }

  componentDidAppear() {
    removeAnimationClasses(this, this.props.transitionName);

    if(this.props.onlyEnter) {
      this.props.onEntered && this.props.onEntered();
    }
    else {
      this.props.onAppeared && this.props.onAppeared();
    }
  }
  componentDidEnter() {
    removeAnimationClasses(this, this.props.transitionName);
    this.props.onEntered && this.props.onEntered();
  }
  componentDidLeave() {
    this.props.onLeave && this.props.onLeave();
  }
  
  render() {
    return this.props.children;
  }
}