// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x=x;
    this.y=y;
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.floor(Math.random() * 250 + 1);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
     if(this.x < 505) {
        this.x += dt * this.speed;
    }
    else {
        this.x = 0;
    }

    this.catch();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Function to detect collesion. Name given catch to specify the catching of dog by the dogcatcher.
//Resets the score and resets the location of the dog
Enemy.prototype.catch= function() {
	
	var catchBox = {
		x: this.x,
		y: this.y,
		width: 50,
		height:50
	};

	var dogbox = {
		x: player.x,
		y: player.y,
		width: 50,
		height: 50
	};

	if (catchBox.x < dogbox.x + dogbox.width 
		&& catchBox.x + catchBox.width > dogbox.x 
		&& catchBox.y < dogbox.y+ dogbox.height 
		&& catchBox.height + catchBox.y > dogbox.y) {
		player.reset();
	}
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
	this.x=x;
	this.y=y;
	this.sprite = 'images/char-boy.png'
}

Player.prototype.update= function(){

};

Player.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
};

Player.prototype.handleInput= function(key) {

	  switch(key){
            case 'left' :
              if (this.x >= 95) {
                this.x = this.x - 95;
            };
              break;
            case 'right' :
              if (this.x <= 375) {
                this.x = this.x + 95;
              };
              break;
            case 'up' :
                if (this.y >= 60){
                  this.y = this.y - 83;
                };

              break;
            case 'down' :
                if (this.y <= 350){
                  this.y = this.y + 83;
                };
              break;
        }

};

Player.prototype.reset = function() {
	this.x = 200;
	this.y = 400;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies= [];
var enemy1= new Enemy(-100,50);
allEnemies.push(enemy1);
var enemy2 = new Enemy(-100,140);
allEnemies.push(enemy2);
var enemy3 = new Enemy(-100,230);
allEnemies.push(enemy3);
var enemy4= new Enemy(-100,140);
allEnemies.push(enemy4);
var enemy5 = new Enemy(-100,230);
allEnemies.push(enemy5);
var enemy6 = new Enemy(-100,50);
allEnemies.push(enemy6);
var enemy7= new Enemy(-100,230);
allEnemies.push(enemy7);


var player= new Player(200,400);


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
