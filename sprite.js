// Get the canvas element and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to full screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Define the Hacker Sprite class
class HackerAntagonist {
    constructor() {
        this.x = canvas.width / 2; // Initial horizontal position
        this.y = canvas.height / 2; // Initial vertical position
        this.speed = 5; // Movement speed
        this.width = 350; // Sprite display width (scale as needed)
        this.height = 380; // Sprite display height (scale as needed)
        this.isLoaded = false;
        this.image = new Image();

        // **IMPORTANT:** Place your image in the same directory and call it 'hacker_sprite.png'
        this.image.src = 'cyberhack2.jpeg'; // Make sure this matches your image filename

        this.image.onload = () => {
            console.log('Antagonist sprite loaded!');
            this.isLoaded = true;
            this.height = this.width * (this.image.height / this.image.width); // Keep aspect ratio
        };
        this.image.onerror = (e) => {
            console.error('Failed to load sprite. Check the filename.', e);
        };
    }

    // Move functions
    moveUp() { this.y -= this.speed; }
    moveDown() { this.y += this.speed; }
    moveLeft() { this.x -= this.speed; }
    moveRight() { this.x += this.speed; }

    // Constrain position within canvas boundaries
    update() {
        if (this.x < 0) this.x = 0;
        if (this.x > canvas.width - this.width) this.x = canvas.width - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y > canvas.height - this.height) this.y = canvas.height - this.height;
    }

    // Draw the sprite on the canvas
    draw() {
        if (this.isLoaded) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            // Draw a placeholder while loading
            ctx.fillStyle = '#ff4444'; // Red for an antagonist placeholder
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'white';
            ctx.fillText("LOADING SPRITE...", this.x + 10, this.y + this.height/2);
        }
    }
}

// Instantiate the character
const antagonist = new HackerAntagonist();

// Keyboard control mapping
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

// Event listeners for key presses
window.addEventListener('keydown', (e) => {
    if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = true;
        e.preventDefault(); // Prevent page scrolling
    }
});

window.addEventListener('keyup', (e) => {
    if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = false;
    }
});

// The main game loop
function gameLoop() {
    // 1. Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Handle input and move the character
    if (keys.ArrowUp) antagonist.moveUp();
    if (keys.ArrowDown) antagonist.moveDown();
    if (keys.ArrowLeft) antagonist.moveLeft();
    if (keys.ArrowRight) antagonist.moveRight();

    // 3. Update position logic (like constraints)
    antagonist.update();

    // 4. Draw the updated sprite
    antagonist.draw();

    // 5. Request the next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop once the page is fully ready
window.addEventListener('load', () => {
    console.log("Game started.");
    gameLoop();
});