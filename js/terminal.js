function updateText(id, val) { document.getElementById(id).innerText = val; }
function updateBgColor(val) { document.getElementById('post-canvas').style.backgroundColor = val; }
function updateTerminalColor(val) { document.getElementById('terminal-box').style.backgroundColor = val; }
function updateContentScale(scaleValue) { document.getElementById('post-canvas').style.setProperty('--base-size', (16 * scaleValue) + 'px'); }

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
            link.download = `Terminal-Post-${Date.now()}.${format}`;
            link.href = c.toDataURL(`image/${format}`, format === 'jpeg' ? 0.9 : 1.0);
            link.click();
            btn.innerText = ogText; btn.style.opacity = "1"; closeModal();
        });
    }, 300);
}
