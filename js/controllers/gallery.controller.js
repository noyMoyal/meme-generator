'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.gallery-section')
    
    elGallery.innerHTML = `
    <h2>Gallery</h2>
    <img src="img/1.jpg" onclick="onImgSelect(1)">
    <img src="img/2.jpg" onclick="onImgSelect(2)">
    `
}



function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()
}