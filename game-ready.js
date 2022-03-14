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
