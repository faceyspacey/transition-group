export default moreProps => ({
  prefix: 'horizontal',
  duration: 500,
  delay: 5,

  appear: 'APPEAR',
  enter: 'ENTER',
  leave: 'LEAVE',

  appearDuration: 666,
  enterDuration: 667,
  leaveDuration: 668,

  appearDelay: 10,
  enterDelay: 20,
  leaveDelay: 30,

  ...moreProps,
})
