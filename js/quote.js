// Update the text dynamically
function updateText(elementId, newValue) {
    document.getElementById(elementId).innerText = newValue;
}

// Update the CSS variable for the theme color
function updateColor(newColor) {
    document.documentElement.style.setProperty('--theme-color', newColor);
}

// Download the canvas as an image
function downloadPost() {
    const postElement = document.getElementById('post-canvas');
    
    // Scale factor to ensure high quality (1080px width)
    const scaleFactor = 1080 / postElement.offsetWidth;

    html2canvas(postElement, {
        scale: scaleFactor, 
        backgroundColor: "#000000", 
        useCORS: true 
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'programmer-quote-post.png';
        link.href = canvas.toDataURL('image/png', 1.0); 
        link.click();
    });
}