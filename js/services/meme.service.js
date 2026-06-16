'use strict'

const DEFAULT_X = 250
const DEFAULT_TOP_Y = 60
const DEFAULT_BOTTOM_Y = 430

var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,

  lines: [
    {
      txt: "Hello, Meme!",
      size: 40,
      color: "#ffffff",
      pos: {
        x: DEFAULT_X,
        y: DEFAULT_TOP_Y,
      },
       isDrag: false,
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

function setSelectedLineIdx(lineIdx) {
  gMeme.selectedLineIdx = lineIdx
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

// Add a new line using push
function addLine() {
  if (gMeme.lines.length >= 2) return

  // Add a new line using push
  gMeme.lines.push({
    txt: "New Line",
    size: 40,
    color: "#ffffff",
    pos: {
      x: DEFAULT_X,
      y: DEFAULT_BOTTOM_Y,
    },
    isDrag: false,
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

function getClickedLineIdx(clickedPos, canvasWidth) {
  const padding = 20

  return gMeme.lines.findIndex((line) => {
    const { y } = line.pos

    return (
      clickedPos.x >= padding &&
      clickedPos.x <= canvasWidth - padding &&
      clickedPos.y >= y - line.size + 2 &&
      clickedPos.y <= y + 6
    )
  })
}

function setLineDrag(isDrag) {
  gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveLine(dx, dy) {
  const line = gMeme.lines[gMeme.selectedLineIdx]

  line.pos.x += dx
  line.pos.y += dy
}
