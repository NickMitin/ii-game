const tiles = {
    't': [3, 0], //treasure
    'x': [4, 3], //curve
    '^': [4, 5], //curve
    '>': [6, 3], //curve
    '<': [6, 5], //curve
    'w': [4, 2], //wall
    'd': [4, 1], //door
    'l': [4, 0], //light
    'h': [3, 3], //horizontal pit
    'v': [3, 4], //vertical pit
    'f': [5, 2] //floor

}

const map =
    'dwwlwwlwww' +
    'ffffffffff' +
    'hhhhhhhh>f' +
    'ffffffffvf' +
    'fffffhhh<f' +
    'ffffffffff' +
    'fhhhhhhhhh' +
    'ffffffffff' +
    'ffffffffff' +
    'ffffffffft'

const mapSize = 10
const tileSize = 128

const characterTileSize = 32

let x = 0
let y = 0

const gameArea = document.getElementById('game-area')
gameArea.style.width = gameArea.style.height = mapSize * tileSize + 'px'

for (let i = 0; i < map.length; ++i) {

    const sprite = document.createElement('div')
    sprite.style.width = tileSize + 'px'
    sprite.style.height = tileSize + 'px'
    sprite.style.position = 'absolute'
    const spriteImage = tiles[map.charAt(i)]
    sprite.style.backgroundImage = 'url(tileset.png)'
    sprite.style.backgroundPositionX = '-' + (spriteImage[0] * tileSize) + 'px'
    sprite.style.backgroundPositionY = '-' + (spriteImage[1] * tileSize) + 'px'
    sprite.style.left = x * tileSize + 'px'
    sprite.style.top = y * tileSize + 'px'
    gameArea.appendChild(sprite)

    if ((i + 1) % mapSize === 0) {
        x = 0
        y++
    } else {
        x++
    }
}

let characterPositionX = 0
let characterPositionY = 0
let characterStep = 32

const characterSprite = document.createElement('div')
characterSprite.style.width = characterTileSize + 'px'
characterSprite.style.height = characterTileSize + 'px'
characterSprite.style.position = 'absolute'
characterSprite.style.backgroundImage = 'url(character.png)'
characterSprite.style.backgroundSize = '400%'
characterSprite.style.backgroundPositionX = '-' + (characterPositionX * characterTileSize) + 'px'
characterSprite.style.backgroundPositionY = '-' + (characterPositionY * characterTileSize) + 'px'
characterSprite.style.left = characterPositionX * characterTileSize + 'px'
characterSprite.style.top = characterPositionY * characterTileSize + 'px'
gameArea.appendChild(characterSprite)

const pressedKeys = {
    up: false,
    down: false,
    left: false,
    right: false
}

window.addEventListener('keydown', (event) => {
    console.log('hit');
    if (event.key === 'ArrowUp') {
        document.title = 'Стрелка вверх'
        pressedKeys.up = true
    }
    if (event.key === 'ArrowDown') {
        document.title = 'Стрелка вниз'
        pressedKeys.down = true
    }
    if (event.key === 'ArrowLeft') {
        document.title = 'Стрелка влево'
        pressedKeys.left = true
    }
    if (event.key === 'ArrowRight') {
        document.title = 'Стрелка вправо'
        pressedKeys.right = true
    }
    event.preventDefault()
})

window.addEventListener('keyup', (event) => {
    console.log('hit');
    if (event.key === 'ArrowUp') {
        document.title = 'Стрелка вверх'
        pressedKeys.up = false
    }
    if (event.key === 'ArrowDown') {
        document.title = 'Стрелка вниз'
        pressedKeys.down = false
    }
    if (event.key === 'ArrowLeft') {
        document.title = 'Стрелка влево'
        pressedKeys.left = false
    }
    if (event.key === 'ArrowRight') {
        document.title = 'Стрелка вправо'
        pressedKeys.right = false
    }
    event.preventDefault()
})

setInterval(() => {
    if (pressedKeys.right) {
        characterPositionX += 1
    }
    if (pressedKeys.left) {
        characterPositionX -= 1
    }
    if (pressedKeys.up) {
        characterPositionY -= 1
    }
    if (pressedKeys.down) {
        characterPositionY += 1
    }
    characterSprite.style.left = characterPositionX * characterTileSize + 'px'
    characterSprite.style.top = characterPositionY * characterTileSize + 'px'
}, 800)
