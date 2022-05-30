const tiles = {
  t: [3, 0], //treasure
  x: [4, 3], //curve
  r: [4, 4], //curve
  '^': [4, 5], //curve
  '>': [6, 3], //curve
  '<': [6, 5], //curve
  w: [4, 2], //wall
  d: [4, 1], //door
  l: [4, 0], //light
  h: [3, 3], //horizontal pit
  v: [3, 4], //vertical pit
  f: [5, 2], //floor
  g: [5, 3], //яма
  m: [5, 4] //яма
}

const map =
  'dwwlwwlwww' +
  'ffffffffff' +
  'hhhhhhhh>f' +
  'ffffffffvf' +
  'fffffhhh<f' +
  'ffffffffff' +
  'fhgggggggg' +
  'ffmfffffff' +
  'ffmgggfgff' +
  'fffffffmft'

const mapSize = 10
const tileSize = 128

const charactetileSize = 32

let x = 0
let y = 0
let curentStep = 0
let currentState = 'walking'
let jumpStep = 0

const gameArea = document.getElementById('game-area')
const prizeMessage = document.getElementById('prize')
const failMessage = document.getElementById('fail')
gameArea.style.width = gameArea.style.height = mapSize * tileSize + 'px'

const ambient = new Audio('footsteps2.mp3')
const footsteps = new Audio('footsteps1.mp3')
const scream = new Audio('scream.mp3')

for (let i = 0; i < map.length; ++i) {
  const characterStepsprite = document.createElement('div')
  characterStepsprite.style.width = tileSize + 'px'
  characterStepsprite.style.height = tileSize + 'px'
  characterStepsprite.style.position = 'absolute'
  const characterStepspriteImage = tiles[map.charAt(i)]
  characterStepsprite.style.backgroundImage = 'url(tileset.png)'
  characterStepsprite.style.backgroundPositionX =
    '-' + characterStepspriteImage[0] * tileSize + 'px'
  characterStepsprite.style.backgroundPositionY =
    '-' + characterStepspriteImage[1] * tileSize + 'px'
  characterStepsprite.style.left = x * tileSize + 'px'
  characterStepsprite.style.top = y * tileSize + 'px'
  gameArea.appendChild(characterStepsprite)

  if ((i + 1) % mapSize === 0) {
    x = 0
    y++
  } else {
    x++
  }
}

let charactepositionX = 0
let charactepositionY = 0
let characterTileX = 0
let characterTileY = 0
let characterStep = 32
let characterScale = 4
let mapX = 0
let mapY = 0

const characterSprite = document.createElement('div')
characterSprite.style.width = charactetileSize + 'px'
characterSprite.style.height = charactetileSize + 'px'
characterSprite.style.position = 'absolute'
characterSprite.style.backgroundImage = 'url(character.png)'
characterSprite.style.transform = 'scale(' + characterScale + ')'

//playAmbient()

moveCharacter(charactepositionX, charactepositionY)
gameArea.appendChild(characterSprite)

const pressedKeys = {
  up: false,
  down: false,
  left: false,
  right: false
}

window.addEventListener('keydown', event => {
  if (event.key === 'ArrowUp') {
    document.title = 'Стрелка вверх'
    pressedKeys.up = true
    characterTileX = 2
  }
  if (event.key === 'ArrowDown') {
    document.title = 'Стрелка вниз'
    pressedKeys.down = true
    characterTileX = 1
  }
  if (event.key === 'ArrowLeft') {
    document.title = 'Стрелка влево'
    pressedKeys.left = true
    characterTileX = 3
  }
  if (event.key === 'ArrowRight') {
    document.title = 'Стрелка вправо'
    pressedKeys.right = true
    characterTileX = 0
  }
  if (event.code === 'Space') {
    document.title = 'Пробел'
    currentState = 'jumping'
    characterTileX = 0
  }
  if (event.key === 'a') {
    pressedKeys.a = true
  }
  if (event.key === 'w') {
    pressedKeys.w = true
  }
  if (event.key === 'd') {
    pressedKeys.d = true
  }
  if (event.key === 's') {
    pressedKeys.s = true
  }

  playFootsteps()

  event.preventDefault()
  event.stopPropagation()
})

window.addEventListener('keyup', event => {
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
  if (event.key === 'a') {
    pressedKeys.a = false
  }
  if (event.key === 'w') {
    pressedKeys.w = false
  }
  if (event.key === 'd') {
    pressedKeys.d = false
  }
  if (event.key === 's') {
    pressedKeys.s = false
  }
  if (event.code === 'Space') {
    document.title = 'Пробел'
  }

  stopFootsteps()

  event.preventDefault()
})

setInterval(() => {
  if (pressedKeys.a) {
    mapX -= 1
  }
  if (pressedKeys.w) {
    mapY -= 1
  }
  if (pressedKeys.s) {
    mapY += 1
  }
  if (pressedKeys.d) {
    mapX += 1
  }
  const scrollOffset = (mapSize * tileSize) / 4
  window.scrollTo(mapX - scrollOffset, mapY - scrollOffset)

  if (currentState === 'jumping') {
    if (jumpStep < 2) {
      charactepositionY -= 1
    } else {
      charactepositionY += 1
    }
    jumpStep += 1
    if (jumpStep >= 4) {
      jumpStep = 0
      currentState = 'walking'
    }
  } else {
    const tileCode = getTileUnderCharecter()
    if (
      tileCode === 'h' ||
      tileCode === 'x' ||
      tileCode === '^' ||
      tileCode === '>' ||
      tileCode === 'g' ||
      tileCode === 'm' ||
      tileCode === 'v' ||
      tileCode === '<' 
    ) {
      playscream()
      characterTileX++
      characterScale -= 0.3
      if (characterTileX > 3) {
        characterTileX = 0
      }
      if (characterScale < 0) {
        characterScale = 4
        charactepositionX = 0
        charactepositionY = 0
        stopscream()
      }

      showChartherTile(characterTileX, characterTileY)
    } else if (tileCode === 't') {
      const randomValue = Math.random()
      if (randomValue < 0.5) {
        prizeMessage.style.left = mapSize * tileSize - tileSize + 'px'
        prizeMessage.style.top = mapSize * tileSize - tileSize + 'px'
      } else {
        failMessage.style.left = mapSize * tileSize - tileSize + 'px'
        failMessage.style.top = mapSize * tileSize - tileSize + 'px'
      }
    } else {
      if (pressedKeys.right) {
        characterTileY = curentStep
        console.log(charactepositionX)
        charactepositionX += 1
      }
      if (pressedKeys.down) {
        characterTileY = curentStep
        console.log(charactepositionY)
        charactepositionY += 1
      }
      if (pressedKeys.up) {
        characterTileY = curentStep
        console.log(charactepositionY)
        charactepositionY -= 1
      }
      if (pressedKeys.left) {
        characterTileY = curentStep
        console.log(charactepositionX)
        charactepositionX -= 1
      }

      if (charactepositionX <= 0) {
        charactepositionX = 0
      }

      if (charactepositionY <= 0) {
        charactepositionY = 0
      }

      if (charactepositionX >= (mapSize - 1) * 4) {
        charactepositionX = (mapSize - 1) * 4
      }

      if (charactepositionY >= (mapSize - 1) * 4) {
        charactepositionY = (mapSize - 1) * 4
      }
    }
  }
  moveCharacter(charactepositionX, charactepositionY)
  showChartherTile(characterTileX, characterTileY)
  curentStep++
  if (curentStep > 3) {
    curentStep = 0
  }
}, 130)

function showChartherTile (tileX, tileY) {
  characterSprite.style.backgroundPositionX =
    '-' + tileX * charactetileSize + 'px'
  characterSprite.style.backgroundPositionY =
    '-' + tileY * charactetileSize + 'px'
  characterSprite.style.transform = 'scale(' + characterScale + ')'
}

function moveCharacter (x, y) {
  mapX = (x + 2) * charactetileSize
  mapY = (y + 2) * charactetileSize
  characterSprite.style.left = (x + 2) * charactetileSize + 'px'
  characterSprite.style.top = (y + 2) * charactetileSize + 'px'
}

function playFootsteps () {
  //footsteps.play()
}

function stopFootsteps () {
  footsteps.position = 0
  footsteps.pause()
}

function playscream () {
  scream.play()
}

function stopscream () {
  scream.position = 0
  scream.pause()
}

function jump () {}

function playAmbient () {
  ambient.play()
}

function getTileUnderCharecter () {
  const x = Math.round(charactepositionX / 4)
  const y = Math.round(charactepositionY / 4)
  const tileOffset = y * 10 + x
  document.title = map[tileOffset]
  return map[tileOffset]
}
