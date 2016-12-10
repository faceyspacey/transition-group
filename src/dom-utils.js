function addClass(component, transitionName='', className) {
  try { 
    let element = ReactDOM.findDOMNode(component);
    className = transitionName ? `${transitionName}-${className}` : className;
    element.className = `${element.className}  ${className}`;
  }
  catch(e) {
    if(process.env.NODE_ENV !== 'production') {
      console.warn(`AnimatedChild had the following adding classes ${e.toString()}`)
    }
  }
}

function removeAnimationClasses(component, transitionName='') {
  try { //dom node may have been removed if wrapped by an outer animation with a shorter duration (no big deal)
    let element = ReactDOM.findDOMNode(component);
    let classNameReg = !transitionName ? 'enter-active|enter' : `${transitionName}-enter-active|${transitionName}-enter`;

    let re = new RegExp(classNameReg, 'g');
    element.className = element.className.replace(re, '')
  }
  catch(e) {
    if(process.env.NODE_ENV === 'production') {
      console.warn(`AnimatedChild had the following issue removing classes: ${e.toString()}`)
    }
  }
}

function setTimeoutAnimationFrame(func, ms=0) {
  if(!func) return;

  setTimeout(() => {
    requestAnimationFrame(func);
  }, ms);
}