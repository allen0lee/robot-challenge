const readline = require('readline')
const Robot = require("./robot.js")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Enter command for Robot: '
})

const main = () => {
  let robot = new Robot()

  rl.prompt()
  rl.on('line', (line) => {
    let [command, coordinates] = line.trim().split(' ') // turn input into array

    switch (command) {
      case 'PLACE':
        let [x, y, f] = coordinates.split(',')
        robot.place(x, y, f)
        break
      case 'MOVE':
        robot.move()
        break
      case 'LEFT':
        robot.left()
        break
      case 'RIGHT':
        robot.right()
        break
      case 'REPORT':
        let currentLocation = robot.report()
        console.log(`Output: ${currentLocation}`)
        break
      default:
        console.log("Please enter a valid command.")
    }
    rl.prompt()
  }).on('close', () => {
    console.log('\nGame quit, goodbye!')
    process.exit(0)
  })
  
}

main()