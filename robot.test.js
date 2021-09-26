const Robot = require('./robot.js')

test('can make a Robot instance', () => {
  let robot = new Robot()
  expect(robot.x).toBe(null)
  expect(robot.y).toBe(null)
  expect(robot.facing).toBe(null)
})

test('a position is a valid one to place', () => {
  let robot = new Robot()
  expect(robot.isPositionValid(0, 0, 'north')).toBe(true)
})

test('a position is invalid', () => {
  let robot = new Robot()
  expect(robot.isPositionValid(-1, -1, 'northeast')).toBe(false)
})

test('given a valid position, Robot can be placed', () => {
  let robot = new Robot()
  robot.place(0, 0, 'north')
  expect(robot.x).toBe(0)
  expect(robot.y).toBe(0)
  expect(robot.facing).toBe('NORTH')
  expect(robot.isPlaced()).toBe(true)
})

test('given an invalid position, Robot cannot be placed', () => {
  let robot = new Robot()
  robot.place(6, 0, 'northwest')
  expect(robot.x).toBe(null)
  expect(robot.y).toBe(null)
  expect(robot.facing).toBe(null)
  expect(robot.isPlaced()).toBe(false)
})

test('can report Robot current location after a valid placement', () => {
  let robot = new Robot()
  robot.place(5, 5, 'west')
  expect(robot.report()).toBe('5,5,WEST')
})

test('report Robot location to be undefined if a placement is invalid', () => {
  let robot = new Robot()
  robot.place(6, -1, 'east')
  expect(robot.report()).toBe(undefined)
})

test('can left rotate from north to west', () => {
  let robot = new Robot()
  robot.place(0, 0, 'north')
  robot.left()
  expect(robot.facing).toBe('WEST')
})

test('can left rotate from west to south', () => {
  let robot = new Robot()
  robot.place(0, 0, 'west')
  robot.left()
  expect(robot.facing).toBe('SOUTH')
})

test('can left rotate from south to east', () => {
  let robot = new Robot()
  robot.place(0, 0, 'south')
  robot.left()
  expect(robot.facing).toBe('EAST')
})

test('can left rotate from east to north', () => {
  let robot = new Robot()
  robot.place(0, 0, 'east')
  robot.left()
  expect(robot.facing).toBe('NORTH')
})

test('can right rotate from north to east', () => {
  let robot = new Robot()
  robot.place(0, 0, 'north')
  robot.right()
  expect(robot.facing).toBe('EAST')
})

test('can right rotate from east to south', () => {
  let robot = new Robot()
  robot.place(0, 0, 'east')
  robot.right()
  expect(robot.facing).toBe('SOUTH')
})

test('can right rotate from south to west', () => {
  let robot = new Robot()
  robot.place(0, 0, 'south')
  robot.right()
  expect(robot.facing).toBe('WEST')
})

test('can right rotate from west to north', () => {
  let robot = new Robot()
  robot.place(0, 0, 'west')
  robot.right()
  expect(robot.facing).toBe('NORTH')
})

test('can move north', () => {
  let robot = new Robot()
  robot.place(0, 0, 'north')
  robot.move()
  expect(robot.report()).toBe('0,1,NORTH')
})

test('can move south', () => {
  let robot = new Robot()
  robot.place(0, 1, 'south')
  robot.move()
  expect(robot.report()).toBe('0,0,SOUTH')
})

test('can move west', () => {
  let robot = new Robot()
  robot.place(1, 0, 'west')
  robot.move()
  expect(robot.report()).toBe('0,0,WEST')
})

test('can move east', () => {
  let robot = new Robot()
  robot.place(0, 0, 'east')
  robot.move()
  expect(robot.report()).toBe('1,0,EAST')
})

test('cannot move north outside of grid', () => {
  let robot = new Robot()
  robot.place(0, 5, 'north')
  robot.move()
  expect(robot.report()).toBe('0,5,NORTH')
})

test('cannot move east outside of grid', () => {
  let robot = new Robot()
  robot.place(5, 2, 'east')
  robot.move()
  expect(robot.report()).toBe('5,2,EAST')
})

test('cannot move south outside of grid', () => {
  let robot = new Robot()
  robot.place(3, 0, 'south')
  robot.move()
  expect(robot.report()).toBe('3,0,SOUTH')
})

test('cannot move west outside of grid', () => {
  let robot = new Robot()
  robot.place(0, 3, 'west')
  robot.move()
  expect(robot.report()).toBe('0,3,WEST')
})

test('can take new commands after an invalid command', () => {
  let robot = new Robot()
  robot.place(0, 0, 'north')
  robot.move()
  robot.left()
  robot.move() // invalid command that will move outside of grid
  robot.right()
  robot.move()
  expect(robot.report()).toBe('0,2,NORTH')
})