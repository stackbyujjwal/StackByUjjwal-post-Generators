let textMarginTop = -5, textMarginLeft = 0;
function moveText(dir) {
    if(dir==='up') textMarginTop -= 2; if(dir==='down') textMarginTop += 2;
    if(dir==='left') textMarginLeft -= 2; if(dir==='right') textMarginLeft += 2;
    const c = document.getElementById('text-container');
    c.style.marginTop = textMarginTop + '%'; c.style.marginLeft = textMarginLeft + '%';
}
function updateFont(val) { document.getElementById('text-container').style.fontFamily = val; }
function updateColor(id, color) { document.getElementById(id).style.color = color; }
function updateText(id, val) { document.getElementById(id).innerText = val; }
function updateOpacity(val) { document.getElementById('bg-image-layer').style.opacity = 1 - val; }
function updateContentScale(scaleValue) { document.getElementById('post-canvas').style.setProperty('--base-size', (16 * scaleValue) + 'px'); }

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = e => { document.getElementById('bg-image-layer').src = e.target.result; document.getElementById('bg-image-layer').style.display = 'block'; };
        reader.readAsDataURL(file);
    }
}

function openDownloadModal() { 
    const canvas = document.getElementById('post-canvas');
    document.getElementById('modal-preview-container').appendChild(canvas);
    document.getElementById('download-modal').classList.add('active'); 
}
function closeModal() { 
    const canvas = document.getElementById('post-canvas');
    document.getElementById('original-preview-container').appendChild(canvas);
    document.getElementById('download-modal').classList.remove('active'); 
}
function previewRatio(ratioClass) { 
    const canvas = document.getElementById('post-canvas');
    const customInputs = document.getElementById('custom-size-inputs');
    canvas.classList.remove('ratio-4-5', 'ratio-1-1', 'ratio-9-16', 'ratio-16-9', 'ratio-custom');
    canvas.style.aspectRatio = ''; 

    if (ratioClass === 'ratio-custom') {
        customInputs.style.display = 'flex'; canvas.classList.add('ratio-custom'); applyCustomRatio();
    } else {
        customInputs.style.display = 'none'; canvas.classList.add(ratioClass);
    }
}
function applyCustomRatio() {
    const w = document.getElementById('custom-width').value || 1080;
    const h = document.getElementById('custom-height').value || 1080;
    document.getElementById('post-canvas').style.aspectRatio = `${w} / ${h}`;
}
function executeDownload() {
    const canvas = document.getElementById('post-canvas');
    const format = document.getElementById('export-format').value;
    const ratioVal = document.getElementById('export-ratio').value;
    const btn = document.querySelector('.final-download-btn');
    const ogText = btn.innerText;

    btn.innerText = "Generating Magic... ✨"; btn.style.opacity = "0.7";

    let outputWidth = 1080;
    if (ratioVal === 'ratio-16-9') outputWidth = 1920;
    else if (ratioVal === 'ratio-custom') outputWidth = parseInt(document.getElementById('custom-width').value) || 1080;

    const scaleFactor = outputWidth / canvas.offsetWidth; 
    canvas.style.borderRadius = "0px"; canvas.style.border = "none";

    setTimeout(() => {
        html2canvas(canvas, { scale: scaleFactor, useCORS: true, backgroundColor: null }).then(c => {
            canvas.style.borderRadius = "12px"; canvas.style.border = "4px solid #fff";
            const link = document.createElement('a');
            link.download = `Soulful-Post-${Date.now()}.${format}`;
            link.href = c.toDataURL(`image/${format}`, format === 'jpeg' ? 0.9 : 1.0);
            link.click();
            btn.innerText = ogText; btn.style.opacity = "1"; closeModal();
        });
    }, 300);
}
