"use strict"

var gElCanvas
var gCtx

function initMemeEditor() {
  gElCanvas = document.querySelector("canvas")
  gCtx = gElCanvas.getContext("2d")
  renderMeme()
}

function renderMeme() {
  const meme = getMeme()

  const img = new Image()
  img.onload = () => {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    meme.lines.forEach((line, idx) => {
      gCtx.font = line.size + "px Arial"
      gCtx.fillStyle = line.color

      // if this is the first line, position it at the top,
      // otherwise position it at the bottom
      const y = idx === 0 ? 60 : gElCanvas.height - 40
      gCtx.textAlign = "center"
      
      // TODO: handle long text overflow
      gCtx.fillText(line.txt, gElCanvas.width / 2, y)

      if (idx === meme.selectedLineIdx) {
    gCtx.strokeStyle = '#6d6969'
    gCtx.lineWidth = 2
    gCtx.strokeRect(80, y - line.size+2, gElCanvas.width - 160, line.size + 4)
}
    })
  }

  const imgPath = `img/${meme.selectedImgId}.jpg`
  img.src = imgPath
}

function onSetLineTxt(txt) {
  setLineTxt(txt)
  renderMeme()
}

function onDownloadMeme(elLink) {
  const imgContent = gElCanvas.toDataURL("image/jpeg")
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

  const elColorPicker = document.querySelector(".color-picker")
  elColorPicker.value = selectedLine.color
}
