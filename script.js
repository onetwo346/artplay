// Cart Functionality
let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItems.appendChild(li);
    });
    cartTotal.textContent = total;
}

function checkout() {
    alert(`Thank you for your purchase! Total: $${total}`);
    cart = [];
    total = 0;
    updateCart();
}

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your message!');
    this.reset();
});

// Three.js Setup for 360° View
let popupArtName = '';
let popupArtPrice = 0;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 500, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, 500);
document.getElementById('threejs-container').appendChild(renderer.domElement);

// Load 360° Texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('assets/images/store-360.jpg');
const geometry = new THREE.SphereGeometry(500, 60, 40);
const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Camera Position
camera.position.set(0, 0, 0.1);

// Drag and Drop Functionality
const dragDropZone = document.getElementById('drag-drop-zone');
dragDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dragDropZone.style.backgroundColor = 'rgba(200, 200, 200, 0.8)';
});

dragDropZone.addEventListener('dragleave', () => {
    dragDropZone.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
});

dragDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dragDropZone.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    const file = e.dataTransfer.files[0];
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const imageUrl = event.target.result;
            addHotspot(imageUrl);
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please upload an image file.');
    }
});

// Add Hotspot Function
function addHotspot(imageUrl) {
    const texture = new THREE.TextureLoader().load(imageUrl);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(5, 5, 1); // Adjust size as needed
    sprite.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, -5); // Random position
    scene.add(sprite);
}

// Render Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();