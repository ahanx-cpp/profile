/* === Three.js 背景 === */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("canvas-container").appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();
const count = 500;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i += 3) {
  positions[i] = (Math.random() - 0.5) * 100;
  positions[i+1] = (Math.random() - 0.5) * 60;
  positions[i+2] = (Math.random() - 0.5) * 80;
}

geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  color: 0x3a6d8c,
  size: 0.3
});

const points = new THREE.Points(geometry, material);
scene.add(points);

function animate() {
  requestAnimationFrame(animate);
  points.rotation.y += 0.0005;
  renderer.render(scene, camera);
}
animate();

/* === GSAP === */
gsap.to(".line", {
  opacity: 1,
  stagger: 0.6,
  delay: 0.8,
  ease: "power2.out"
});

/* === 触控 === */
let startX = 0;
document.addEventListener("touchstart", e => startX = e.touches[0].clientX);
document.addEventListener("touchend", e => {
  if (startX - e.changedTouches[0].clientX > 80) {
    window.location.href = "works.html";
  }
});
