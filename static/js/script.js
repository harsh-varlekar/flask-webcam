// DOM Elements
const captureBtn = document.getElementById('capture-btn');
const settingsBtn = document.getElementById('settings-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const videoFeed = document.querySelector('.video-feed');
const yearElement = document.getElementById('year');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    yearElement.textContent = new Date().getFullYear();
    
    // Set up event listeners
    setupEventListeners();
});

function setupEventListeners() {
    // Capture button functionality
    captureBtn.addEventListener('click', function() {
        captureImage();
    });
    
    // Settings button functionality
    settingsBtn.addEventListener('click', function() {
        alert('Settings functionality will be implemented soon!');
    });
    
    // Fullscreen button functionality
    fullscreenBtn.addEventListener('click', toggleFullscreen);
}

function captureImage() {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = videoFeed.videoWidth || videoFeed.width;
    canvas.height = videoFeed.videoHeight || videoFeed.height;
    const ctx = canvas.getContext('2d');
    
    // Draw the current video frame to the canvas
    ctx.drawImage(videoFeed, 0, 0, canvas.width, canvas.height);
    
    // Convert canvas to image and download
    const link = document.createElement('a');
    link.download = 'capture-' + new Date().getTime() + '.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    // Show feedback to user
    const originalText = captureBtn.innerHTML;
    captureBtn.innerHTML = '<i class="fas fa-check"></i> Captured!';
    setTimeout(() => {
        captureBtn.innerHTML = originalText;
    }, 2000);
}

function toggleFullscreen() {
    const elem = document.querySelector('.stream-container');
    
    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}