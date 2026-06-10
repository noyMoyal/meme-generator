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
      const y = idx === 0 ? 40 : gElCanvas.height - 40
      gCtx.textAlign = "center"
      gCtx.fillText(line.txt, gElCanvas.width / 2, y)
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
  renderMeme()
}

function onSwitchLine() {
  switchLine()
  renderMeme()
}