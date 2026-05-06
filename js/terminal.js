// Function to update the text on the card in real-time
function updateText(elementId, newValue) {
    // Using innerText for the quote to respect the textarea's line breaks nicely
    document.getElementById(elementId).innerText = newValue;
}

function downloadPost() {
    const postElement = document.getElementById('post-card');
    
    // To get exactly 1080px width from a 540px container, we scale it by 2
    const scaleFactor = 1080 / postElement.offsetWidth;

    // Use html2canvas to take the screenshot
    html2canvas(postElement, {
        scale: scaleFactor, // applies the 2x scale for HQ output
        backgroundColor: null, // keeps CSS background (#050505)
        useCORS: true 
    }).then(canvas => {
        // Convert canvas to image and trigger download
        const link = document.createElement('a');
        link.download = 'coding-motivation-post.png';
        link.href = canvas.toDataURL('image/png', 1.0); // 1.0 means max quality
        link.click();
    });
}