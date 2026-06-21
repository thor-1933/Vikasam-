// Login Modal Functions
const modal = document.getElementById('loginModal');

function openLoginModal() {
    modal.classList.add('show');
}

function closeLoginModal() {
    modal.classList.remove('show');
}

// Close if clicked outside
window.onclick = function(event) {
    if (event.target === modal) {
        closeLoginModal();
    }
}

// Dynamic Process Visual Switcher
function switchProcess(targetVisual, clickedElement) {
    // 1. Remove active class from all step cards
    const steps = document.querySelectorAll('.step-card');
    steps.forEach(step => step.classList.remove('active'));
    
    // Add active class to the clicked one
    clickedElement.classList.add('active');

    // 2. Hide all right-side visual panels
    const visuals = document.querySelectorAll('.visual-panel');
    visuals.forEach(visual => visual.classList.remove('active-visual'));
    
    // Fade in the correct visual panel based on ID
    const activeVisual = document.getElementById(`visual-${targetVisual}`);
    if(activeVisual) {
        activeVisual.classList.add('active-visual');
    }
}

// Handle Form Submit Animation
document.getElementById('auditForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button');
    btn.innerText = "Request Sent ✓";
    btn.style.background = "white";
    setTimeout(() => {
        btn.innerText = "Submit Request";
        btn.style.background = "var(--accent-green)";
        this.reset();
    }, 3000);
});
