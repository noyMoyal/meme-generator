'use strict'

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Hello, Meme!',
            size: 40,
            color: 'white',
        }
    ]
}
                   
function getMeme() {
    return gMeme
}



function setLineTxt(txt) {
    gMeme.lines[0].txt = txt

}


function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setColor(color) {
    gMeme.lines[0].color = color
}


function increaseFontSize() {
    gMeme.lines[0].size += 2
    }


function decreaseFontSize() {
    gMeme.lines[0].size -= 2
    }