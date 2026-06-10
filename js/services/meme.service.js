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


//which line to edit? the first or the second?(no hc)
function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
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
    function addLine() {
        if (gMeme.lines.length >= 2) return

        // new line with push (array method)
        gMeme.lines.push({
            txt: 'New Line',
            size: 40,
            color: 'white',
        })
    }


//toggle first line/second line (if exists)
    function switchLine() {
        //Switch line only works after a second line was added
        if(gMeme.lines.length < 2) return

        gMeme.selectedLineIdx = gMeme.selectedLineIdx === 0 ? 1 : 0

        console.log(gMeme.selectedLineIdx)
    }