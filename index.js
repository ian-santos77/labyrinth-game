const prompt = require("prompt-sync")()
class Position {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class Player {
    constructor(position) {
        this.pos = position
    }
    static show() {
        process.stdout.write('P ')
    } 
    move(pos) {
        this.pos = pos
    }
    reset() {
        this.pos.y = 0
        this.pos.x = 0
    }
}

class Room {
    static number = 1
    constructor (height, width) {
        this.height = height
        this.width = width
        this.grid = Array.from({length: height}, () => Array(width).fill(0))
        this.createPath()
    }
    print(player) {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (player.pos.x == j && player.pos.y == i) {
                    Player.show()
                    continue
                }
                if (i == this.height - 1 && j == this.width - 1) {
                    process.stdout.write('! ')
                    continue
                }
                if (this.grid[i][j] == 1) {
                    process.stdout.write('. ')
                    continue
                }
                process.stdout.write('# ')
            }
            console.log()
        }
    }
    createPath() {
        let y = 0
        let x = 0
        this.grid[y][x] = 1
        while(y < this.height - 1 || x < this.width - 1) {
            if(y == this.height - 1) x++
            else if (x == this.height - 1) y++
            else if (Math.round(Math.random() * 2) == 1) y++
            else x++
            this.grid[y][x] = 1
        }
    }
}

const movePlayer = (player, room) => {
    const auxPos = {...player.pos}
    const input = prompt("(w/a/s/d) to move: ")
    switch (input) {
        case 'a': auxPos.x--; break
        case 's': auxPos.y++; break
        case 'w': auxPos.y--; break
        case 'd': auxPos.x++; break
        default: 
            console.log("invalid input!")
            return
    }
    if (auxPos.x >= room.width || auxPos.x < 0 || auxPos.y >= room.height || auxPos.y < 0) {
        console.log("invalid movement!")
    }
    else if (room.grid[auxPos.y][auxPos.x] == 0) {
        console.log("barrier!")
    }
    else {
        player.move(auxPos)
    }
}

const game = (player) => {
    player.reset()
    const room = new Room(8, 8)
    while (player.pos.y < room.height - 1 || player.pos.x < room.width - 1) {
        console.log('===ROOM ' + Room.number + '===')   
        room.print(player)
        movePlayer(player, room)
    }
    Room.number++
}

const player = new Player (new Position(0, 0))

console.log(Math.round(Math.random() * 1))

while (true) {
    game(player)
}