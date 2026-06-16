'use strict'

var gElCanvas
var gCtx
var gCurrPos

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

function initMemeEditor() {
  gElCanvas = document.querySelector('.editor-section canvas')
  gCtx = gElCanvas.getContext('2d')

  addListeners()
  renderMeme()
}

function renderMeme() {
  const meme = getMeme()

  const img = new Image()
  img.onload = () => {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

    meme.lines.forEach((line, idx) => {
      drawLine(line, idx)
    })
  }

  const imgPath = `img/${meme.selectedImgId}.jpg`
  img.src = imgPath
}

function drawLine(line, idx) {
  const { x, y } = line.pos
  const maxWidth = gElCanvas.width - 40

  var fontSize = line.size

  gCtx.font = fontSize + 'px Arial'

  while (gCtx.measureText(line.txt).width > maxWidth && fontSize > 16) {
    fontSize--
    gCtx.font = fontSize + 'px Arial'
  }

  const textWidth = gCtx.measureText(line.txt).width

  gCtx.fillStyle = line.color
  gCtx.textAlign = 'center'

  gCtx.lineWidth = 2
  gCtx.strokeStyle = '#000000'

  gCtx.strokeText(line.txt, x, y)
  gCtx.fillText(line.txt, x, y)

  if (idx === getMeme().selectedLineIdx) {
    drawSelectedLineFrame(line, textWidth, fontSize)
  }
}

function drawSelectedLineFrame(line, textWidth, fontSize) {
  const { x, y } = line.pos
  const padding = 10

  gCtx.strokeStyle = '#6d6969'
  gCtx.lineWidth = 2
  gCtx.strokeRect(
    x - textWidth / 2 - padding,
    y - fontSize + 2,
    textWidth + padding * 2,
    fontSize + 4
  )
}

function onSetLineTxt(txt) {
  setLineTxt(txt)
  renderMeme()
}

function onDownloadMeme(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
  elLink.download = 'my-meme.jpg'
}

function onSetLineColor(color) {
  setColor(color)
  renderMeme()
}

function onIncreaseFontSize() {
  increaseFontSize()
  renderMeme()
}

function onDecreaseFontSize() {
  decreaseFontSize()
  renderMeme()
}

function onAddLine() {
  addLine()
  updateControls()
  renderMeme()
}

function onSwitchLine() {
  switchLine()
  updateControls()
  renderMeme()
}

function onMoveLineUp() {
  moveLine(0, -10)
  renderMeme()
}

function onMoveLineDown() {
  moveLine(0, 10)
  renderMeme()
}

// Update the editor controls to show the selected line text and color
function updateControls() {
  const meme = getMeme()
  const selectedLine = meme.lines[meme.selectedLineIdx]

  const elColorPicker = document.querySelector('.color-picker')
  elColorPicker.value = selectedLine.color

  const elLineInput = document.querySelector('.line-input')
  elLineInput.value = selectedLine.txt
}

function addListeners() {
  addMouseListeners()
  addTouchListeners()
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
  gCurrPos = getEvPos(ev)

  const clickedLineIdx = getClickedLineIdx(gCurrPos, gElCanvas.width)
  if (clickedLineIdx === -1) return

  setSelectedLineIdx(clickedLineIdx)
  updateControls()

  setLineDrag(true)
  document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
  const meme = getMeme()
  const line = meme.lines[meme.selectedLineIdx]

  if (!line.isDrag) return

  const pos = getEvPos(ev)

  const dx = pos.x - gCurrPos.x
  const dy = pos.y - gCurrPos.y

  moveLine(dx, dy)

  gCurrPos = pos

  renderMeme()
}

function onUp() {
  setLineDrag(false)
  document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
  if (TOUCH_EVENTS.includes(ev.type)) {
    ev.preventDefault()

    const touch = ev.targetTouches[0]

    const rect = gElCanvas.getBoundingClientRect()

    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    }
  } else {
    return {
      x: ev.offsetX,
      y: ev.offsetY,
    }
  }
}