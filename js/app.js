
// Enemies our dog must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.sprite = 'images/dog-catcher.png';
    this.speed = Math.floor(Math.random() * 250 + 1);// Assigning random speed to the dog catcher.
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x += dt * this.speed;
    } else {
        this.x = 0;
    }

    this.catch();// detects collision between dog and dogcatcher
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 80, 80);
};

// Function to detect collision. Name given catch to specify the catching of dog by the dogcatcher.
//Resets the score and resets the location of the dog
Enemy.prototype.catch = function() {

    var catchBox = {
        x: this.x,
        y: this.y,
        width: 50,
        height: 50
    };

    var dogbox = {
        x: dog.x,
        y: dog.y,
        width: 50,
        height: 50
    };

    if (catchBox.x < dogbox.x + dogbox.width &&
        catchBox.x + catchBox.width > dogbox.x &&
        catchBox.y < dogbox.y + dogbox.height &&
        catchBox.height + catchBox.y > dogbox.y) {
        alert("Congrats!!!! \n You scored: " + dog.score + "points.\n Lets Try Again."); // Displays the score of the player when the player loses the game.
        dog.reset();

    }
};

// Now write your own dog class
// This class requires an update(), render() and
// a handleInput() method.

var Dog = function(x, y) {
    this.x = x;
    this.y = y;
    this.score = 0;
    this.sprite = 'images/dog.png';
};

Dog.prototype.update = function() {
    this.displayScore();

};

Dog.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 90, 90);
};

// Function to control the movement of the dog on the canvas.
Dog.prototype.handleInput = function(key) {

    switch (key) {
        case 'left':
            if (this.x >= 45) {
                this.x = this.x - 90;
            }
            break;
        case 'right':
            if (this.x <= 350) {
                this.x = this.x + 90;
            }
            break;
        case 'up':
            if (this.y >= 100) {
                this.y = this.y - 80;
            }

            break;
        case 'down':
            if (this.y <= 400) {
                this.y = this.y + 80;
            }
            break;
    }

};

//Provides the reset conditions if the player loses the game.
Dog.prototype.reset = function() {
    this.x = 200;
    this.y = 450;
    this.score = 0;
    bone.grab = false;// used to identify the condition whether the dog has grabbed the bone from the water.
};

//Function to display score of the player at the  corner of the canvas.
Dog.prototype.displayScore = function() {
    ctx.clearRect(0, 0, 120, 20);
    ctx.font = "20px Verdana";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + this.score, 8, 20);
};

//Increases the score of the player once the player grabs the bone and returns back to the grass area.
Dog.prototype.increaseScore = function() {
    this.score++;
};

// Creating a bone class
var Bone = function(x, y) {
    this.x = x;
    this.y = y;
    this.grab = false;
    this.speed = 50;
    this.sprite = 'images/bone.png';
};

//Displays the bone
Bone.prototype.render = function() {
    if (this.grab) {
        ctx.drawImage(Resources.get(this.sprite), dog.x + 20, dog.y + 30, 30, 30);
    } else {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 50, 50);
    }

};

//Gives the floating bone and score updation
Bone.prototype.update = function(dt) {

    if (this.x < 505) {
        this.x += dt * this.speed;
    } else {
        this.x = 20;
    }

    this.fetch();

    if (this.grab === true && dog.y > 420) {
        this.grab = false;
        dog.score++;
    }
};

//Determines the fetching of bone(Collision of bone and dog)
Bone.prototype.fetch = function() {
    var boneBox = {
        x: this.x,
        y: this.y,
        width: 20,
        height: 20
    };

    var dogbox = {
        x: dog.x,
        y: dog.y,
        width: 50,
        height: 50
    };

    if (boneBox.x < dogbox.x + dogbox.width &&
        boneBox.x + boneBox.width > dogbox.x &&
        boneBox.y < dogbox.y + dogbox.height &&
        boneBox.height + boneBox.y > dogbox.y) {
        this.grab = true;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the dog object in a variable called dog

var allEnemies = [];
var enemy1 = new Enemy(-100, 120);
allEnemies.push(enemy1);
var enemy2 = new Enemy(-100, 210);
allEnemies.push(enemy2);
var enemy3 = new Enemy(-100, 300);
allEnemies.push(enemy3);
var enemy4 = new Enemy(-100, 210);
allEnemies.push(enemy4);
var enemy5 = new Enemy(-100, 300);
allEnemies.push(enemy5);
var enemy6 = new Enemy(-100, 120);
allEnemies.push(enemy6);
var enemy7 = new Enemy(-100, 300);
allEnemies.push(enemy7);


var dog = new Dog(200, 450);

var bone = new Bone(20, 70);


// This listens for key presses and sends the keys to your
// Dog.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    dog.handleInput(allowedKeys[e.keyCode]);
});