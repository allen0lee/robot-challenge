const readline = require('readline')
const Robot = require("./robot")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Enter command for Robot: '
})

const main = () => {
  let r = new Robot()
  
  rl.prompt()
  
  rl.on('line', (line) => {
    let [command, coordinates] = line.trim().split(' ') // remove space in input and turn it into array
    
    switch(command) {
      case 'PLACE':    
        let [x, y, f] = coordinates.split(',')
        r.place(x, y, f)
        break
      case 'MOVE':
        r.move()
        break
      case 'LEFT':
        r.left()
        break
      case 'RIGHT':
        r.right()
        break
      case 'REPORT':
        let currentLocation = r.report()
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