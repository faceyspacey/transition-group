# `<AnimatedTransitionGroup />` and `<AnimatedChild>`
Like `<ReactTransitionGroup />` + callbacks, extras and child-specific customization

## Installation
```yarn add animated-transition-group```

## Usage

*<PageSwitcher /> comomponent:*
```javascript
import React from 'react'
import { connect } from 'react-redux'
import { AnimatedTransitionGroup, AnimatedChild } from 'animated-transition-group'

const PageSwitcher = ({ page }) =>
  <AnimatedTransitionGroup 
    component="div" 
    timeout={500}
    transitionName='fade'
  >
    <AnimatedChild key={page}>
      {getComponent(page)}
    </AnimatedChild>
  </AnimatedTransitionGroup>

const getComponent = page => {
  switch(page) {
    case 'Home':  
      return <Home />
    case 'List':  
      return <List />
    case 'Video':  
      return <Video />
  }
}

const mapState = ({ page }) => ({ page })
export default connect(mapState)(PageSwitcher)
```

# API

### prefix
### duration
### delay

### appear
### enter
### leave

### enterDuration
### leaveDuration
### appearDuration

### enterDelay
### leaveDelay
### appearDelay

### onAppear
### onEnter
### onLeave



## AnimatedTransitionGroup only:

### onEmpty
### onFull
### zeroElements
