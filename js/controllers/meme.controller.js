'use strict'

var gElCanvas
var gCtx

function initMemeEditor() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
   
}

function renderMeme() {
const meme = getMeme()
const img = new Image()
img.onload = () => {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    
    gCtx.font = meme.lines[0].size + 'px Arial'
    gCtx.fillStyle = meme.lines[0].color
    gCtx.textAlign = 'center'
    gCtx.fillText(meme.lines[0].txt, gElCanvas.width / 2, 40)
  
}

img.src = 'img/1.jpg'
  }
  
function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}
