function createTiles() {
    const tileContainer = document.getElementById('tile-container');
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Define the number of horizontal tiles (5 for phones, 10 for larger screens)
    const tilesPerRow = screenWidth < 600 ? 5 : 10;

    // Calculate the tile size in vh units so that the tiles fill the screen horizontally
    const tileSize = (screenWidth / tilesPerRow) / screenHeight * 100; // Convert to vh

    // Calculate the number of vertical tiles needed to fill the screen
    const tilesPerColumn = Math.ceil(screenHeight / tileSize);

    // Set the grid properties dynamically
    tileContainer.style.gridTemplateColumns = `repeat(${tilesPerRow}, ${tileSize}vh)`;
    tileContainer.style.gridTemplateRows = `repeat(${tilesPerColumn}, ${tileSize}vh)`;

    // Adjust grid gap based on screen size
    if (screenWidth < 600) {
        // For small screens (phones), set a very small gap (1px)
        tileContainer.style.gridGap = '1px';
    } else {
        // For larger screens, use a slightly larger gap (2px or more)
        tileContainer.style.gridGap = '2px';
    }

    // Clear existing tiles and gradients
    tileContainer.innerHTML = '';

    // Create the tiles and append them to the container
    for (let i = 0; i < tilesPerRow * tilesPerColumn; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tileContainer.appendChild(tile);
    }

    // Add 5 moving circular gradients underneath the tiles
    const directions = ['right', 'left', 'up', 'down'];

    for (let i = 0; i < directions.length; i++) {
        const gradient = document.createElement('div');
        gradient.classList.add('gradient');

        // Random initial position
        const x = Math.random() * screenWidth;
        const y = Math.random() * screenHeight;

        // Adjust gradient size dynamically based on viewport size
        let size;
        if (screenWidth < 600) {
            // For small screens (phones), increase the size of the gradients
            size = Math.random() * (30 - 20) + 20; // Random size between 20vw and 30vw for example
        } else {
            // For larger screens, use a smaller size
            size = Math.random() * (10 - 5) + 5; // Random size between 5vw and 10vw
        }

        gradient.style.left = `${x}px`;
        gradient.style.top = `${y}px`;
        gradient.style.width = `${size}vw`; // Use viewport width to scale size
        gradient.style.height = `${size}vw`; // Use viewport width to scale size

        // Append the gradient to the container
        tileContainer.appendChild(gradient);

        // Start the movement
        const speed = Math.random() * (30 - 10) + 10; // Random speed between 10 and 30
        moveGradient(gradient, directions[i], speed);
    }

    // Add a gradient that follows the mouse
    addMouseGradient(tileContainer);
}

function moveGradient(gradient, direction, speed) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Set up the movement interval
    const moveInterval = setInterval(() => {
        // Get the current position
        let currentX = parseFloat(gradient.style.left);
        let currentY = parseFloat(gradient.style.top);

        // Update position based on direction
        if (direction === 'right') currentX += speed / 10;
        if (direction === 'left') currentX -= speed / 10;
        if (direction === 'up') currentY -= speed / 10;
        if (direction === 'down') currentY += speed / 10;

        // Wrap around when out of bounds
        if (currentX > screenWidth) {
            currentX = -gradient.offsetWidth;
            currentY = Math.random() * screenHeight;
        } else if (currentX < -gradient.offsetWidth) {
            currentX = screenWidth;
            currentY = Math.random() * screenHeight;
        }

        if (currentY > screenHeight) {
            currentY = -gradient.offsetHeight;
            currentX = Math.random() * screenWidth;
        } else if (currentY < -gradient.offsetHeight) {
            currentY = screenHeight;
            currentX = Math.random() * screenWidth;
        }

        // Apply the updated position
        gradient.style.left = `${currentX}px`;
        gradient.style.top = `${currentY}px`;
    }, 16); // Adjust interval for smoother animation
}

function addMouseGradient(container) {
    // Create the mouse-following gradient
    const mouseGradient = document.createElement('div');
    mouseGradient.classList.add('gradient');
    mouseGradient.style.width = '200px';
    mouseGradient.style.height = '200px';
    mouseGradient.style.pointerEvents = 'none'; // Prevent interfering with other interactions
    container.appendChild(mouseGradient);

    // Update position based on mouse movement
    window.addEventListener('mousemove', (e) => {
        mouseGradient.style.left = `${e.clientX - 100}px`; // Center the gradient
        mouseGradient.style.top = `${e.clientY - 100}px`;
    });
}

// Call the function to create tiles when the page loads and when the window is resized
window.addEventListener('load', createTiles);
window.addEventListener('resize', createTiles);

let lastScrollTop = 0; // Store last scroll position

// Detect scroll direction and hide/show the navbar
window.addEventListener("scroll", function () {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Scrolling down
        document.getElementById('navbar').classList.add('hidden');
    } else {
        // Scrolling up
        document.getElementById('navbar').classList.remove('hidden');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevents negative scroll
});

// Add to your script.js
const hamburger = document.querySelector('.hamburger');
const dropdownMenu = document.querySelector('.dropdown-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    dropdownMenu.classList.toggle('show');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !dropdownMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        dropdownMenu.classList.remove('show');
    }
});

// Close menu when clicking a link
dropdownMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        dropdownMenu.classList.remove('show');
    });
});