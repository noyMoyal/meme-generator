'use strict'

var gElCanvas
var gCtx

function initMemeEditor() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
   
}

function renderMeme() {
const img = new Image()
img.onload = () => {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    
    gCtx.font = '40px Arial'
    gCtx.fillStyle = 'white'
    gCtx.textAlign = 'center'
    gCtx.fillText('Hello, Meme!', gElCanvas.width / 2, 40)
  
}

img.src = 'img/1.jpg'
  }