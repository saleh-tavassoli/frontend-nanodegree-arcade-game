// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Generate enemies with random speed in the case of off-canvas
    if (this.x > 600) {
        this.x = -150;
        this.randomSpeed();
    }

    // Check for collision between player and enemies
    if (player.x < this.x + 60 &&
        player.x + 40 > this.x &&
        player.y < this.y + 30 &&
        30 + player.y > this.y) {
        this.collision();
    }
};

Enemy.prototype.collision = function() {
    player.x = 200;
    player.y = 380;
};

// Random speed generator function for enemy
Enemy.prototype.randomSpeed = function (){
    this.speed = 100 + Math.floor(Math.random() * 512);
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = 200;
    this.y = 380;
    this.speed = 50;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // Prevent player from moving beyond canvas wall boundaries
    if (this.y > 380) {
        this.y = 380;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    // A successful player move to the top will reset player position
    if (this.y < 0) {
        this.success();
    }
};

Player.prototype.success = function() {
    this.x = 200;
    this.y = 380;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(playerKey) {
    switch (playerKey) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// Enemies are moving in specific vertical positions
var enemyVerticalPosition = [60, 145, 230];
var player = new Player();
var enemy;

enemyVerticalPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
