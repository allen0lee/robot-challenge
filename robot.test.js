const Robot = require('./robot')

test('can make a Robot instance', () => {
  let r = new Robot()
  expect(r.x).toBe(null)
  expect(r.y).toBe(null)
  expect(r.facing).toBe(null)
})

test('a position is a valid one to place', () => {
  let r = new Robot()
  expect(r.isPositionValid(0, 0, 'north')).toBe(true)
})

test('a position is invalid', () => {
  let r = new Robot()
  expect(r.isPositionValid(-1, -1, 'northeast')).toBe(false)
})

test('given a valid position, Robot can be placed', () => {
  let r = new Robot()
  r.place(0, 0, 'north')
  expect(r.x).toBe(0)
  expect(r.y).toBe(0)
  expect(r.facing).toBe('NORTH')
  expect(r.isPlaced()).toBe(true)
})

test('given an invalid position, Robot cannot be placed', () => {
  let r = new Robot()
  r.place(6, 0, 'northwest')
  expect(r.x).toBe(null)
  expect(r.y).toBe(null)
  expect(r.facing).toBe(null)
  expect(r.isPlaced()).toBe(false)
})

test('can report Robot current location after a valid placement', () => {
  let r = new Robot()
  r.place(5, 5, 'west')
  expect(r.report()).toBe('5,5,WEST')
})

test('report Robot location to be undefined if a placement is invalid', () => {
  let r = new Robot()
  r.place(6, -1, 'east')
  expect(r.report()).toBe(undefined)
})

test('can left rotate from north to west', () => {
  let r = new Robot()
  r.place(0, 0, 'north')
  r.left()
  expect(r.facing).toBe('WEST')
})

test('can left rotate from west to south', () => {
  let r = new Robot()
  r.place(0, 0, 'west')
  r.left()
  expect(r.facing).toBe('SOUTH')
})

test('can left rotate from south to east', () => {
  let r = new Robot()
  r.place(0, 0, 'south')
  r.left()
  expect(r.facing).toBe('EAST')
})

test('can left rotate from east to north', () => {
  let r = new Robot()
  r.place(0, 0, 'east')
  r.left()
  expect(r.facing).toBe('NORTH')
})

test('can right rotate from north to east', () => {
  let r = new Robot()
  r.place(0, 0, 'north')
  r.right()
  expect(r.facing).toBe('EAST')
})

test('can right rotate from east to south', () => {
  let r = new Robot()
  r.place(0, 0, 'east')
  r.right()
  expect(r.facing).toBe('SOUTH')
})

test('can right rotate from south to west', () => {
  let r = new Robot()
  r.place(0, 0, 'south')
  r.right()
  expect(r.facing).toBe('WEST')
})

test('can right rotate from west to north', () => {
  let r = new Robot()
  r.place(0, 0, 'west')
  r.right()
  expect(r.facing).toBe('NORTH')
})

test('can move north', () => {
  let r = new Robot()
  r.place(0, 0, 'north')
  r.move()
  expect(r.report()).toBe('0,1,NORTH')
})

test('can move south', () => {
  let r = new Robot()
  r.place(0, 1, 'south')
  r.move()
  expect(r.report()).toBe('0,0,SOUTH')
})

test('can move west', () => {
  let r = new Robot()
  r.place(1, 0, 'west')
  r.move()
  expect(r.report()).toBe('0,0,WEST')
})

test('can move east', () => {
  let r = new Robot()
  r.place(0, 0, 'east')
  r.move()
  expect(r.report()).toBe('1,0,EAST')
})

test('cannot move north outside of grid', () => {
  let r = new Robot()
  r.place(0, 5, 'north')
  r.move()
  expect(r.report()).toBe('0,5,NORTH')
})

test('cannot move east outside of grid', () => {
  let r = new Robot()
  r.place(5, 2, 'east')
  r.move()
  expect(r.report()).toBe('5,2,EAST')
})

test('cannot move south outside of grid', () => {
  let r = new Robot()
  r.place(3, 0, 'south')
  r.move()
  expect(r.report()).toBe('3,0,SOUTH')
})

test('cannot move west outside of grid', () => {
  let r = new Robot()
  r.place(0, 3, 'west')
  r.move()
  expect(r.report()).toBe('0,3,WEST')
})

test('can take new commands after an invalid command', () => {
  let r = new Robot()
  r.place(0, 0, 'north')
  r.move()
  r.left()
  r.move() // invalid command that will move outside of grid
  r.right()
  r.move()
  expect(r.report()).toBe('0,2,NORTH')
})