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
let currentStep = 0
let currentState = 'walking'
let jumpStep = 0

const gameArea = document.getElementById('game-area')
const prizeMessage = document.getElementById
gameArea.style.width = gameArea.style.height = mapSize * tileSize + 'px'

const footsteps = new Audio('footsteps.mp3')
const scream = new Audio('scream.mp3')

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
let characterTileX = 0
let characterTileY = 0
let characterStep = 32
let characterScale = 4
let mapX = 0
let mapY = 0

const charactersprite = document.createElement('div')
charactersprite.style.width = characterTileSize + 'px'
charactersprite.style.height = characterTileSize + 'px'
charactersprite.style.position = 'absolute'
charactersprite.style.backgroundImage = 'url(character.png)'
charactersprite.style.transform = 'scale(' + characterScale + ')'
moveCharacter(characterPositionX, characterPositionY)
gameArea.appendChild(charactersprite)

const pressedKeys = {
  up: false,
  down: false,
  left: false,
  right: false,
}


window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    pressedKeys.up = true
    characterTileX = 2
  }

  if (event.key === 'ArrowDown') {
    pressedKeys.down = true
    characterTileX = 1
  }
  if (event.key === 'ArrowLeft') {
    pressedKeys.left = true
    characterTileX = 3
  }
  if (event.key === 'ArrowRight') {
    pressedKeys.right = true
    characterTileX = 0
  }
  if (event.code === 'Space') {
    document.title = 'Пробел'
    currentState = 'jumping'
    characterTileX = 0
  }
  if (event.key === 'w') {
    pressedKeys.w = true
  }

  if (event.key === 's') {
    pressedKeys.s = true
  }
  if (event.key === 'a') {
    pressedKeys.a = true
  }
  if (event.key === 'd') {
    pressedKeys.d = true
  }

  playFootsteps()

  event.preventDefault()
})

window.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowUp') {
    pressedKeys.up = false
  }

  if (event.key === 'ArrowDown') {
    pressedKeys.down = false
  }
  if (event.key === 'ArrowLeft') {
    pressedKeys.left = false
  }
  if (event.key === 'ArrowRight') {
    pressedKeys.right = false
  }

  if (event.key === 'w') {
    pressedKeys.w = false
  }

  if (event.key === 's') {
    pressedKeys.s = false
  }
  if (event.key === 'a') {
    pressedKeys.a = false
  }
  if (event.key === 'd') {
    pressedKeys.d = false
  }
  if (event.code === 'Space') {
    document.title = 'Пробел'
    currentState = 'walking'
  }

  stopFootsteps()

  event.preventDefault()
})


setInterval(() => {
  if (pressedKeys.d) {
    mapX -= 1
  }

  if (pressedKeys.a) {
    mapX += 1
  }

  if (pressedKeys.w) {
    mapY += 1
  }

  if (pressedKeys.s) {
    mapY -= 1
  }
const scrollOffset = (mapSize * tileSize / 4)
window.scrollTo(mapX - scrollOffset, mapY - scrollOffset)

  if (currentState === 'jumping') {
    if (jumpStep < 3) {
      characterPositionY -= 1
    } else {
      characterPositionY += 1
    }
    jumpStep += 1
    if (jumpStep >= 4) {
      jumpStep = 0
    }
    return
  } else {
    const titleCode = getTileUnderCharacter()
    if (
      || titleCode === 'h'
      || titleCode === 'v'
      || titleCode === 'x'
      || titleCode === '^'
      || titleCode === '<'
      || titleCode === '>') {
      playscream()
      characterTileX++;
      characterScale -= 0.3
      if (characterTileX > 3) {
        characterTileX = 0
      }
      if (characterScale < 0) {
        characterScale = 4
        characterPositionX = 0
        characterPositionY = 0
        stopscream()
      }
      showCharacterTile(characterTileX, characterTileY)
    }else if (tileCode === 't') {
      const randomValue = Math.random()

    } else {
      if (pressedKeys.right) {
        characterTileY = currentStep
        characterTileX = 0
        characterPositionX += 1
      }
      if (pressedKeys.left) {
        characterTileY = currentStep
        characterTileX = 3
        characterPositionX -= 1
      }
      if (pressedKeys.up) {
        characterTileY = currentStep
        characterTileX = 2
        characterPositionY -= 1
      }
      if (pressedKeys.down) {
        characterTileY = currentStep
        characterTileX = 1
        characterPositionY += 1
      }
      if (characterPositionX <= 0) {
        characterPositionX = 0
      }
      if (characterPositionY <= 0) {
        characterPositionY = 0
      }
      if (characterPositionX >= (mapSize - 1) * 4) {
        characterPositionX = (mapSize - 1) * 4
      }
      if (characterPositionY >= (mapSize - 1) * 4) {
        characterPositionY = (mapSize - 1) * 4
      }
    }
  }
  moveCharacter(characterPositionX, characterPositionY)
  showCharacterTile(characterTileX, characterTileY)
  currentStep++;
  if (currentStep > 3) {
    currentStep = 0
  }

}, 100)
function showCharacterTile(tileX, tileY) {
  charactersprite.style.backgroundPositionX = '-' + (tileX * characterTileSize) + 'px'
  charactersprite.style.backgroundPositionY = '-' + (tileY * characterTileSize) + 'px'
  charactersprite.style.transform = 'scale(' + characterScale + ')'
}

function moveCharacter(x, y) {
  mapX = (x + 2) * characterTileSize
  mapY = (y + 2) * characterTileSize
  charactersprite.style.left = (x + 2) * characterTileSize + 'px'
  charactersprite.style.top = (y + 2) * characterTileSize + 'px'
}

function playFootsteps() {
  footsteps.play()
}

function stopFootsteps() {
  footsteps.position = 0
  footsteps.pause()
}
function playscream() {
  scream.play()

}

function stopscream() {
  scream.position = 0
  scream.pause()

}

function getTileUnderCharacter() {
  const x = Math.round(characterPositionX / 4)
  const y = Math.round(characterPositionY / 4)
  const tileOffset = y * 10 + x
  document.title = map[tileOffset]
  return map[tileOffset]
}

