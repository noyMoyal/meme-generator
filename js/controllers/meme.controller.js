'use strict'

var gElCanvas
var gCtx

const FIRST_LINE_Y = 60
const SECOND_LINE_BOTTOM_MARGIN = 40

function initMemeEditor() {
  gElCanvas = document.querySelector('.editor-section canvas')
  gCtx = gElCanvas.getContext('2d')
  renderMeme()
}


function renderMeme() {
  const meme = getMeme()

  const img = new Image()
  img.onload = () => {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

    meme.lines.forEach((line, idx) => {
      gCtx.font = line.size + 'px Arial'
      gCtx.fillStyle = line.color

      // if this is the first line, position it at the top,
      // otherwise position it at the bottom
      const y = getLineY(idx)
      gCtx.textAlign = 'center'

      // TODO: handle long text overflow
      gCtx.fillText(line.txt, gElCanvas.width / 2, y)

   if (idx === meme.selectedLineIdx) {
    gCtx.strokeStyle = '#6d6969'
    gCtx.lineWidth = 2
    gCtx.strokeRect(80, y - line.size + 2, gElCanvas.width - 160, line.size + 4)
}
    })
  }

  const imgPath = `img/${meme.selectedImgId}.jpg`
  img.src = imgPath
}

function getLineY(idx) {
  return idx === 0 ? FIRST_LINE_Y : gElCanvas.height - SECOND_LINE_BOTTOM_MARGIN
}



function onSetLineTxt(txt) {
  setLineTxt(txt)
  renderMeme()
}

function onDownloadMeme(elLink) {
  const imgContent = gElCanvas.toDataURL('image/jpeg')
  elLink.href = imgContent
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

// Update the color picker to show the selected line color
function updateControls() {
  const meme = getMeme()
  const selectedLine = meme.lines[meme.selectedLineIdx]

  const elColorPicker = document.querySelector('.color-picker')
  elColorPicker.value = selectedLine.color

  const elLineInput = document.querySelector('.line-input')
  elLineInput.value = selectedLine.txt
}

function onCanvasClick(ev) {
  const { offsetX, offsetY } = ev
  const meme = getMeme()

   const clickedLineIdx = meme.lines.findIndex((line, idx) =>
    offsetX >= 80 && offsetX <= 80 + (gElCanvas.width - 160) &&
    offsetY >= getLineY(idx) - line.size + 2 && offsetY <= getLineY(idx) - line.size + 2 + line.size + 4)

  if (clickedLineIdx === -1) return

  setSelectedLineIdx(clickedLineIdx)
  updateControls()
  renderMeme()

}
