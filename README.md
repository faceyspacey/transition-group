# TransitionGroup

`TransitionGroup` is a sound answer to `<ReactTransitionGroup />` and any wishlist you might have had for it. 
We suggest you become familiar with it and its higher level CSS-oriented counterpart first to truly understand `TransitionGroups`'s benefits:

* [ReactCSSTransitionGroup](https://facebook.github.io/react/docs/animation.html)
* [ReactTransitionGroup](https://facebook.github.io/react/docs/animation.html#low-level-api-reacttransitiongroup)


The biggest problem `TransitionGroup` solves is that you can ***both*** provide callbacks for the 3 transitions (`appear`, `enter`, `leave`) ***AND***
have your css classes applied. `ReactCSSTransitionGroup` does not allow for callbacks.

However, we've taken it one step farther to allow you to customize each individual child component rendered within the group. So that
means you can provide props (such as animation duration, delay, etc) that apply to all children by setting them at the group level,
***OR*** you can override them by passing the props to the `<Transition />` components that wrap your actual children. 

*Note: unlike `ReactTransitionGroup`
and `ReactCSSTransitionGroup` all child components are required to be wrapped in `<Transition>`.*

Lastly, we offer simpler prop names and a lot more customization:

* **duration** (`duration`, `appearDuration`, `enterDuration`, `leaveDuration`)
* **delay** (`delay`, `appearDelay`, `enterDelay`, `leaveDelay`)
* **class names** (the `appear`, `enter`, and `leave` props)
* **a prefix** (prepended to all classes)

## Installation
```yarn add animated-transition-group```


## Usage

```javascript
import React from 'react'
import { connect } from 'react-redux'
import { TransitionGroup, Transition } from 'animated-transition-group'

const onLeave = () => console.log('left')
const onEmpty = () => console.log('group empty')

const PageSwitcher = ({ page }) =>
  <TransitionGroup 
    component='div'
    className='whatever'
    duration={300}
    delay={100}
    prefix='fade'
    onEmpty={onEmpty}
  >
    <Transition key={page} duration={500} enterDelay={500} leaveDelay={0} onLeave={onLeave}>
      {getComponent(page)}
    </Transition>

    // don't show link for the current page:
    <LinkRow>
      {page !== 'Home' && <Transition key={`${page}-link`>HOME<Transition>}
      {page !== 'List' && <Transition key={`${page}-link`>LIST<Transition>}
      {page !== 'Video' && <Transition key={`${page}-link`>VIDEO<Transition>}
    </LinkRow>
  </TransitionGroup>

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
*note: you can have as many nested `<Transition />`'s as you want. This happens to be primarily for one child :)*

The secret ingredient is obviously the `key` property passed to your children. That lets React differentiate between
the components. More importantly it lets you define just a single component in this case, rather than require you to
hack something together that has 2 components nested in the code at once. React just knows what to do. 

The `ReactTransitionGroup`
toolset hasn't received enough credit in my opinion--*partly because the flaws our component here solves*--but we believe the abstraction
it provides to use state to determine when components should and should not be there *(as you normally would)*, while keeping the concept of the actual 
duration embedded in the DOM *separate*, makes it world class. It allows you to render from state, just as you would hope...*and
without any hacked solutions or trickery.*

As for having multiple nested `Transition` components, of course also use the `key` prop to uniquely identify them so React
knows what to do, i.e. when to attach and detach them to/from the DOM.

# API
The below props can be applied to ***both*** `<TransitionGroup />` and `<Transition />`. The difference is that if
you provide them to `TransitionGroup`, they will be passed down to `Transition`. And of course, if `Transition`
supplies its own, it will override it. duh!

### prefix: string
the string prepended to all classes like this: `myPrefix-appear`, `myPrefix-appear-active`, `myPrefix-enter`, etc

### duration: number
the time in milliseconds that child components are expected to animate for

### delay: number
the time in milliseconds that child components are supposed to wait before being animated. Instances won't be 
removed from the DOM until the sum of the delay and duration has been reached.

### enterDuration: number
### leaveDuration: number
### appearDuration: number
by supplying these, you can customize the duration length (in ms) of the individual transition

### enterDelay: number
### leaveDelay: number
### appearDelay: number
by supplying these, you can customize the delay length (in ms) of the individual transition

### onAppear: Function
### onEnter: Function
### onLeave: Function
these callbacks will of course be called for the given transition

### onBeforeAppear: Function
### onBeforeEnter: Function
### onBeforeLeave: Function
these callbacks will of course be called before their respective transition happens

### appear: string
### enter: string
### leave: string
by suppling these you can override the classes applied, e.g: `leave-active` can be `foobar-active`. These are also very
effective if you're using *CSS Modules* and don't want to define a global class with `:global(.appear)`. Instead, do this:

```javascript
import styles from '.styles'
<Transition appear={styles.appear} />
```

## TransitionGroup only:
The following props are ***only*** available on `<TransitionGroup />`:

### onFull: Function
called when the first `Transition` renders within `TransitionGroup`

### onEmpty: Function
called when there are no nested `<Transition />` components. It is called after the final component animates its departure, using
the the duration and delay passed to `TransitionGroup` (not the child) to calculate that time.

### zeroElements: number
to calculate whether there are zero nested children, sometimes you need to indicate what that number is. For example,
if you have an array of children, when the array is empty, it's counted as `1` even though no children are rendered. 
So you set `zeroElements={1}`.
