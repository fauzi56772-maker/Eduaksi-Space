// INITIALIZE ANIMATION ON SCROLL (AOS)
AOS.init({
    duration: 1000,
    once: false,
    mirror: true
});

// 1. REMOVE LOADING SCREEN AFTER PAGE LOADED
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 1000);
    }, 500);
});

// 2. THREE.JS SPACE BACKGROUND WITH ANIMATED STARS
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('space-bg'), antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create Stars Geometry
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 2000; // Jumlah bintang
const starPositions = new Float32Array(starsCount * 3);

for(let i = 0; i < starsCount * 3; i++) {
    starPositions[i] = (Math.random() - 0.5) * 500;
}

starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

// Stars Material
const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.8,
    transparent: true
});

const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

camera.position.z = 1;

// Animation Loop for 3D Background
function animateSpace() {
    requestAnimationFrame(animateSpace);
    starField.rotation.y += 0.0004; // Putaran bintang kosmik yang sangat lambat
    starField.rotation.x += 0.0001;
    renderer.render(scene, camera);
}
animateSpace();

// Resize Window Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 4. CURSOR GLOW EFFECT POSITIONING
const customCursor = document.getElementById('custom-cursor');
document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
});

// 5 & 6. SOUND CONTROLLERS & AMBIENCE
const bgMusic = document.getElementById('space-ambient');
const audioIcon = document.getElementById('audio-icon');

function toggleAudio() {
    if (bgMusic.paused) {
        bgMusic.play().catch(err => console.log("Interaksi dibutuhkan untuk musik otomatis."));
        audioIcon.innerText = "🔊";
    } else {
        bgMusic.pause();
        audioIcon.innerText = "🔇";
    }
}

// Hover Sound FX Simulator (Web Audio API internal - tanpa file mp3 eksternal)
function playHoverSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(900, audioCtx.currentTime); 
    gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime); 
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.04); 
}

// 8. BACK TO TOP BUTTON LOGIC
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

