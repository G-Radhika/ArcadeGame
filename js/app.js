//Initialization of the global variables to keep track of scores.
var app = app || {};
app.points = 0;
app.winCount = 0;
app.loseCount = 0;
app.totalNumberOfPlays = 0;
app.gemCount = 0;
app.gemBlueCollision = 0;
app.gemGreenCollision = 0;
app.gemOrangeCollision = 0;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    console.log("Enemy Position: ", this.x, this.y);
    this.speed = Math.floor(Math.random() * speed) + 100;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 1000) {
        this.x = 1;
    } //x changed to spped.
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/******************************PLAYER*********************/
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = "images/char-boy.png"; //player image
    //player initial location.
    this.x = 200;
    this.y = 410;
};
Player.prototype.update = function(dt) {

};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Handles the inputs from the keyboard to move the player up, dow, right and left.
Player.prototype.handleInput = function(direction) {
  //Player hop size in X and Y directions.
  var Xhop = 100; //Horizontal Hop
  var Yhop = 92.5; //Vertical Hop.
    if (direction === 'left' && this.x > 5) {
        this.x -= Xhop;
    }
    if (direction === 'up' && this.y > 20) {
        this.y -= Yhop;
    }
    if (direction === 'right' && this.x < 400) { /*600 was 400 before incrementing the col*/
        this.x += Xhop;
    }
    if (direction === 'down' && this.y < 400) {
        this.y += Yhop;
    }
    // At y= -52.5 its END LINE for the player and he gets a WIN.
    // And player is reset to the initial position.    
    var finishLine = -52.5; //Finish line is at Y = -52.5. Dont ask me why.
    if (this.y === finishLine) {
        app.points = app.points + 100;
        app.winCount++;
        console.log("WIN!", "  Points = ", app.points);
        this.reset();
    }
};
// Player reset function resets the player to the initial location when he reaches the WIN LINE or collides with a bug.
Player.prototype.reset = function() {
        this.x = 200;
        this.y = 410;
        app.totalNumberOfPlays = app.winCount + app.loseCount;
        console.log("totalNumberOfPlays = ", app.totalNumberOfPlays);
        if (app.totalNumberOfPlays === 10) {
            console.log("Total Number Of Plays = ", app.totalNumberOfPlays,
                "Wins = ", app.winCount, "Collision = ", app.loseCount);
        }
    };
    /****************************END PLAYER*****************************/
    /*****************************GEM*************************************/
    // Gems are introduced 
    //********************************BLUE GEM**************************/
    /* 1. Gem is created with sprite image and assigned a initial location.
       2. Gem update function
       3. Gem Render function
       4. Gem reset
    */
var GemBlue = function() {
    this.sprite = 'images/GemBlue.png'; // BLUE Gem and its initial location.
    this.x = 200;
    this.y = 230;
};
GemBlue.prototype.update = function(dt) {

};

//Gem render function will draw blue gem as long as there is no collision with the player. 
// Once player collides/collects the gem, the gem png is over written with a stone tile.
// This functionality is same for GEMS.
GemBlue.prototype.render = function() {
    console.log('BLUE = ', app.gemBlueCollision);
    if (app.gemBlueCollision === 0) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    } else {
        this.sprite = 'images/stone-block.png';
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
    }
    
};
GemBlue.prototype.reset = function() {}
var GemGreen = function() {
    this.sprite = 'images/GemGreen.png';
    this.x = 400;
    this.y = 50;
};
GemGreen.prototype.update = function(dt) {};
GemGreen.prototype.render = function() {
    if (app.gemGreenCollision === 0) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    } else {
        this.sprite = 'images/stone-block.png';
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
    }

};
GemGreen.prototype.reset = function() {
    ctx.drawImage(Resources.get('images/stone-block.png'), this.x, this.y);
};
var GemOrange = function() {
    this.sprite = 'images/GemOrange.png';
    this.x = 100;
    this.y = 130;
    console.log("GEM Orange : ", this.x, this.y);
};
GemOrange.prototype.update = function(dt) {

};
GemOrange.prototype.render = function() {
    if (app.gemOrangeCollision === 0) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    } else {
        this.sprite = 'images/stone-block.png';
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
        
    }
};
GemOrange.prototype.reset = function() {

    };
    /***************************END GEM***********************************/

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var row1Bug1 = new Enemy(40, 70, 200);
var row1Bug2 = new Enemy(40, 70, 10);
var row2Bug1 = new Enemy(80, 140, 50);
var row2Bug2 = new Enemy(290, 140, 150);
var row3Bug1 = new Enemy(120, 210, 100);
var row3Bug2 = new Enemy(120, 210, 300);
var row3Bug3 = new Enemy(120, 210, 230);
var allEnemies = [row1Bug1, row1Bug2, row2Bug1, row2Bug2, row3Bug1, row3Bug2, row3Bug3];
// Place the player object in a variable called player
var player = new Player();
var gemBlue = new GemBlue();
var gemGreen = new GemGreen();
var gemOrange = new GemOrange();

//Player and bug collision.
function checkBugCollisions() {
   var buffer = 50; // This is the assumed width of the enemy.
    allEnemies.forEach(function(Enemy) {
        if (Enemy.x < player.x + buffer &&
            Enemy.x + buffer > player.x &&
            Enemy.y < player.y + buffer &&
            Enemy.y + buffer > player.y) {
            app.loseCount++; //If a bug hits the player its treated as a collision and the player is reset to the intial location.
            console.log("Collision!", "LoseCount = ", app.loseCount, "Points = ", app.points,
             "Total GEMS = ", app.gemCount);
            player.reset();
        }
    });
};
//GEM and PLAYER Collision
function checkGemCollisions() {
  var buffer = 50; //This is the assumed width of the player.
    if (gemBlue.x < player.x + buffer &&
        gemBlue.x + buffer > player.x &&
        gemBlue.y < player.y + buffer &&
        gemBlue.y + buffer > player.y) {
        console.log("You Earned A BLUE Gem!");
        app.gemBlueCollision = 1;
        app.gemCount++;
        gemBlue.reset();
    }
    if (gemGreen.x < player.x + buffer &&
        gemGreen.x + buffer > player.x &&
        gemGreen.y < player.y + buffer &&
        gemGreen.y + buffer > player.y) {
        console.log("You Earned A Green Gem!");
        app.gemGreenCollision = 1;
        app.gemCount++;
        gemGreen.reset();
    }
    if (gemOrange.x < player.x + buffer &&
        gemOrange.x + buffer > player.x &&
        gemOrange.y < player.y + buffer &&
        gemOrange.y + buffer > player.y) {
        console.log("You Earned A Orange Gem!");
        app.gemOrangeCollision = 1;
        app.gemCount++;
        gemOrange.reset();
    }
};
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