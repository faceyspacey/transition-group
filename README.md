# AnimatedTransitionGroup
Like `<ReactTransitionGroup />` + callbacks, extras and child-specific customization


## Installation
```yarn add animated-transition-group```


## Usage

```javascript
import React from 'react'
import { connect } from 'react-redux'
import { AnimatedTransitionGroup, AnimatedChild } from 'animated-transition-group'

const PageSwitcher = ({ page }) =>
  <AnimatedTransitionGroup 
    component="div" 
    duration={500}
    delay={100}
    prefix='fade'
  >
    <AnimatedChild key={page} appearDelay={300} enterDelay={500} leaveDuration={1000}>
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
*note: you can have as many nested `<AnimatedChild />`'s as you want. This just happens to be a switcher :)*

# API

### prefix: string
the string pre-pended to all classes like this: `myPrefix-appear`, `myPrefix-appear-active`, `myPrefix-enter`, etc

### duration: number
### delay: number

### appear: string
### enter: string
### leave: string

### enterDuration: number
### leaveDuration: number
### appearDuration: number

### enterDelay: number
### leaveDelay: number
### appearDelay: number

### onAppear: Function
### onEnter: Function
### onLeave: Function



## AnimatedTransitionGroup only:

### onEmpty
### onFull
### zeroElements
