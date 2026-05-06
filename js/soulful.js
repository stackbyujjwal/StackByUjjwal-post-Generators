let textMarginTop = -5; 
let textMarginLeft = 0;

function moveText(direction) {
    const step = 2; 
    if (direction === 'up') textMarginTop -= step;
    if (direction === 'down') textMarginTop += step;
    if (direction === 'left') textMarginLeft -= step;
    if (direction === 'right') textMarginLeft += step;
    
    const container = document.getElementById('text-container');
    container.style.marginTop = textMarginTop + '%';
    container.style.marginLeft = textMarginLeft + '%';
}

function updateFont(fontValue) { document.getElementById('text-container').style.fontFamily = fontValue; }
function updateColor(elementId, hexColor) { document.getElementById(elementId).style.color = hexColor; }
function updateAlignment(alignValue) { document.getElementById('text-container').style.textAlign = alignValue; }

function updateTextSize(sizeValue) {
    document.getElementById('display-line1').style.fontSize = sizeValue + 'px';
    document.getElementById('display-line2').style.fontSize = sizeValue + 'px';
    document.getElementById('size-val').innerText = sizeValue + 'px';
}

function updateText(elementId, value) { document.getElementById(elementId).innerText = value; }

function updateOpacity(value) {
    document.getElementById('bg-image-layer').style.opacity = value;
    document.getElementById('opacity-val').innerText = Math.round(value * 100) + '%';
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) applyBackgroundImage(file);
}

document.addEventListener('paste', function(e) {
    if (e.clipboardData && e.clipboardData.items) {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const file = items[i].getAsFile();
                applyBackgroundImage(file);
                break;
            }
        }
    }
});

function applyBackgroundImage(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const imgLayer = document.getElementById('bg-image-layer');
        imgLayer.src = e.target.result;
        imgLayer.style.display = 'block'; 
    }
    reader.readAsDataURL(file);
}

function downloadPost() {
    const postElement = document.getElementById('post-canvas');
    const scaleFactor = 1080 / postElement.offsetWidth; 

    postElement.style.borderRadius = "0px";

    html2canvas(postElement, {
        scale: scaleFactor, 
        backgroundColor: "#000000", 
        useCORS: true 
    }).then(canvas => {
        postElement.style.borderRadius = "4px"; 
        const link = document.createElement('a');
        link.download = 'quote-by-ujjwal.png';
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
    });
}