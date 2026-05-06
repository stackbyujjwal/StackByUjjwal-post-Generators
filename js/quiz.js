function updateText(elementId, newValue) {
    document.getElementById(elementId).innerHTML = newValue;
}

function downloadPost() {
    const postElement = document.getElementById('post-card');
    const scaleFactor = 1080 / postElement.offsetWidth;

    html2canvas(postElement, {
        scale: scaleFactor, 
        backgroundColor: null, 
        useCORS: true 
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'stackbyujjwal-quiz.png';
        link.href = canvas.toDataURL('image/png', 1.0); 
        link.click();
    });
}