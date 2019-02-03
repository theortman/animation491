 var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y, 800,800);
};

Background.prototype.update = function () {
};

//spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale)

function Har_HighJump(game, spritesheet) {
    this.animation = new Animation(spritesheet, 90, 60, 15, 0.2, 15, true, 2);
    this.x = 0;
    this.y = 0;
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
}

Har_HighJump.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y+415);
}

Har_HighJump.prototype.update = function () {
    if (this.animation.elapsedTime < this.animation.totalTime * 8 / 14)
		
        this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
}


// inheritance 
function running(game, spritesheet) {
    this.animation = new Animation(spritesheet, 90, 45, 8, 0.2, 8, true, 2);
	
    this.speed = 200;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 250);
}

running.prototype = new Entity();
running.prototype.constructor = running;

running.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
    Entity.prototype.update.call(this);
}

running.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y+300);
    Entity.prototype.draw.call(this);
}

// inheritance 
function Guy(game, spritesheet) {
    this.animation = new Animation(spritesheet, 57.5, 40, 5, 0.2, 5, true, 1);
    this.speed = 100;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 450);
}

Guy.prototype = new Entity();
Guy.prototype.constructor = Guy;

Guy.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    if (this.x > 800) this.x = -230;
    Entity.prototype.update.call(this);
}

Guy.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y-400);//changed here to move up and down
    Entity.prototype.draw.call(this);
}


AM.queueDownload("./img/RobotUnicorn.png");
AM.queueDownload("./img/ufo.png");
AM.queueDownload("./img/Har_HighJump.png");
AM.queueDownload("./img/Haru'unRunningsword.png");
AM.queueDownload("./img/background2.jpg");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background2.jpg")));
    gameEngine.addEntity(new Har_HighJump(gameEngine, AM.getAsset("./img/Har_HighJump.png")));
    gameEngine.addEntity(new running(gameEngine, AM.getAsset("./img/Haru'unRunningsword.png")));
    gameEngine.addEntity(new Guy(gameEngine, AM.getAsset("./img/ufo.png")));

    console.log("All Done!");
});