import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';

import { setTimeoutAnimationFrame } from './dom-utils';


export default class AnimatedTransitionGroup extends React.Component {
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
          if(!child) return null; // cloneElement won't work on a non-existent child (then filter it out)

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