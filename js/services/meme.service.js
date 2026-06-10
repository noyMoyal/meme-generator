"use strict"

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "Hello, Meme!",
      size: 40,
      color: "white",
    },
  ],
}

function getMeme() {
  return gMeme
}

//Update the selected line text
function setLineTxt(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}

function setColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color
}

function increaseFontSize() {
  gMeme.lines[gMeme.selectedLineIdx].size += 2
}

function decreaseFontSize() {
  gMeme.lines[gMeme.selectedLineIdx].size -= 2
}
function addLine() {
  if (gMeme.lines.length >= 2) return

  // Add a new line using push
  gMeme.lines.push({
    txt: "New Line",
    size: 40,
    color: "white",
  })
  // after adding a new line, we want to edit it, so we switch to it
  gMeme.selectedLineIdx = 1
}

//toggle first line/second line (if exists)

function switchLine() {
  //Switch line only works after a second line was added
  if (gMeme.lines.length < 2) return

  gMeme.selectedLineIdx = gMeme.selectedLineIdx === 0 ? 1 : 0
}
