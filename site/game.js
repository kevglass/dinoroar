var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Anim = /** @class */ (function () {
    function Anim() {
    }
    Anim.IDLE = "idle";
    Anim.MOVE = "move";
    Anim.ATTACK = "attack";
    return Anim;
}());
/// <reference path="Anim.ts"/>
var Dino = /** @class */ (function () {
    function Dino(dinoData) {
        this.frame = 0;
        this.animSpeed = 0.5;
        this.facingRight = true;
        this.tileset = dinoData.tileset;
        this.dinoData = dinoData;
        this.anim = this.dinoData.anims[Anim.IDLE];
        this.x = 100;
        this.y = 100;
        this.frame = 0;
        this.midpoint = dinoData.midpoint;
        this.setAnim(Anim.IDLE);
    }
    Dino.prototype.getAnimName = function () {
        return this.animName;
    };
    Dino.prototype.setAnim = function (anim) {
        this.animName = anim;
        if (this.anim == this.dinoData.anims[anim]) {
            return;
        }
        this.anim = this.dinoData.anims[anim];
        this.frame = 0;
    };
    Dino.prototype.setFacingRight = function (b) {
        this.facingRight = b;
    };
    Dino.prototype.update = function (steg, roarComplete) {
        this.frame += this.animSpeed;
        if (this.frame >= this.anim.length) {
            roarComplete();
        }
        this.frame = this.frame % this.anim.length;
    };
    Dino.prototype.attack = function () {
        this.dinoData.roar.play(1.0);
    };
    Dino.prototype.render = function (steg) {
        if (this.facingRight) {
            this.tileset.drawTile(steg, this.x - this.midpoint, this.y - this.tileset.tileHeight, this.anim[Math.floor(this.frame)]);
        }
        else {
            this.tileset.drawTileReverse(steg, this.x - this.tileset.tileWidth + this.midpoint, this.y - this.tileset.tileHeight, this.anim[Math.floor(this.frame)]);
        }
    };
    return Dino;
}());
var Dinos = /** @class */ (function () {
    function Dinos() {
    }
    Dinos.ORDER = ["TREX", "DIPO", "DIME", "FLAP"];
    Dinos.DATA = {
        TREX: {
            name: "Rex",
            tilesetUrl: "img/dino1.png",
            tileWidth: 256,
            tileHeight: 128,
            roarUrl: "audio/roar.mp3",
            midpoint: 116,
            tileset: null,
            roar: null,
            anims: {
                "idle": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                "move": [10, 11, 12, 13, 14, 15, 16, 17],
                "attack": [18, 19, 20, 21, 22, 23, 24, 25, 26, 27]
            },
            steps: true
        },
        DIPO: {
            name: "Dippy",
            tilesetUrl: "img/dino2.png",
            tileWidth: 309,
            tileHeight: 209,
            roarUrl: "audio/roar2.mp3",
            midpoint: 148,
            tileset: null,
            roar: null,
            anims: {
                "idle": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                "move": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
                "attack": [20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
            },
            steps: true
        },
        DIME: {
            name: "Freda",
            tilesetUrl: "img/dino3.png",
            tileWidth: 216,
            tileHeight: 128,
            roarUrl: "audio/roar3.mp3",
            midpoint: 80,
            tileset: null,
            roar: null,
            anims: {
                "idle": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                "move": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
                "attack": [25, 26, 27, 28, 29, 30, 31, 32]
            },
            steps: true
        },
        FLAP: {
            name: "Flapper",
            tilesetUrl: "img/dino4.png",
            tileWidth: 200,
            tileHeight: 251,
            roarUrl: "audio/roar4.mp3",
            midpoint: 100,
            tileset: null,
            roar: null,
            anims: {
                "idle": [0, 1, 2, 3, 4],
                "move": [0, 1, 2, 3, 4],
                "attack": [0, 1, 2, 3, 4]
            },
            steps: false
        }
    };
    return Dinos;
}());
// SIMPLE TYPESCRIPT ENGINE FOR GAMES
var Steg = /** @class */ (function () {
    function Steg(canvas, game) {
        this.fps = 20;
        this.readyToStart = false;
        this.started = false;
        this.game = game;
        this.canvas = canvas;
    }
    Steg.prototype.start = function () {
        this.init();
    };
    Steg.prototype.setStartImage = function (startImage) {
        this.startImage = startImage;
    };
    Steg.prototype.init = function () {
        var _this = this;
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            console.log("Audio Context Being Created");
            this.audioContext = new AudioContext();
        }
        else {
            console.log("No Audio Context found");
        }
        this.setupMouseHandler();
        this.ctx = this.canvas.getContext("2d");
        this.game.init(this);
        Resources.load(this, function () {
            _this.game.loaded(_this);
            _this.readyToStart = true;
        });
    };
    Steg.prototype.doStart = function () {
        if (this.readyToStart) {
            if (!this.started) {
                if (this.audioContext) {
                    this.audioContext.resume();
                }
                Steg.audioReady = true;
                if (Music.currentMusic) {
                    Music.currentMusic.play();
                }
                this.started = true;
            }
        }
    };
    Steg.prototype.drawLoadingScreen = function (loaded, total) {
        var _this = this;
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.fillRect(0, 0, this.canvas.width, this.canvas.height, "#000000");
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.font = "20px Helvetica";
        this.ctx.fillText("Loading " + loaded + "/" + total, 50, 50);
        this.fillRect(50, 60, (this.canvas.width - 100), 20, "#555555");
        this.fillRect(50, 60, (this.canvas.width - 100) * (loaded / total), 20, "#0000FF");
        if (total == loaded) {
            this.timer = setInterval(function () { _this.tick(); }, 1000 / this.fps);
        }
    };
    Steg.prototype.setupMouseHandler = function () {
        var _this = this;
        var hasTouchStartEvent = 'ontouchstart' in document.createElement('div');
        if (!hasTouchStartEvent) {
            this.canvas.onmousedown = function (e) {
                e.preventDefault();
                _this.invokeMouseDown(1, e.offsetX, e.offsetY);
            };
            this.canvas.onmouseup = function (e) {
                e.preventDefault();
                _this.invokeMouseUp(1, e.offsetX, e.offsetY);
            };
            this.canvas.onmousemove = function (e) {
                e.preventDefault();
                _this.invokeMouseMove(1, e.offsetX, e.offsetY);
            };
        }
        else {
            this.canvas.ontouchstart = function (e) {
                e.preventDefault();
                for (var i = 0; i < e.changedTouches.length; i++) {
                    _this.invokeMouseDown(e.changedTouches.item(i).identifier, e.changedTouches.item(i).pageX, e.changedTouches.item(i).pageY);
                }
            };
            this.canvas.ontouchend = function (e) {
                e.preventDefault();
                for (var i = 0; i < e.changedTouches.length; i++) {
                    _this.invokeMouseUp(e.changedTouches.item(i).identifier, e.changedTouches.item(i).pageX, e.changedTouches.item(i).pageY);
                }
            };
            this.canvas.ontouchmove = function (e) {
                e.preventDefault();
            };
        }
    };
    Steg.prototype.setSoundOn = function (soundOn) {
        if (!this.audioContext) {
            return;
        }
        Steg.soundOn = soundOn;
    };
    Steg.prototype.getSoundOn = function () {
        if (!this.audioContext) {
            return false;
        }
        return Steg.soundOn;
    };
    Steg.prototype.setMusicOn = function (musicOn) {
        if (!this.audioContext) {
            return;
        }
        Steg.musicOn = musicOn;
        if (Music.currentMusic) {
            if (musicOn) {
                Music.currentMusic.play();
            }
            else {
                Music.currentMusic.stop();
            }
        }
    };
    Steg.prototype.getMusicOn = function () {
        if (!this.audioContext) {
            return false;
        }
        return Steg.musicOn;
    };
    Steg.prototype.invokeMouseDown = function (id, x, y) {
        this.doStart();
        this.game.mouseDown(this, id + 1, x, y);
    };
    Steg.prototype.invokeMouseUp = function (id, x, y) {
        this.doStart();
        this.game.mouseUp(this, id + 1, x, y);
    };
    Steg.prototype.invokeMouseMove = function (id, x, y) {
    };
    Steg.prototype.tick = function () {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        if (this.started) {
            this.game.update(this);
            this.game.render(this);
        }
        else {
            this.fillRect(0, 0, this.canvas.width, this.canvas.height, "#000000");
            if (this.startImage) {
                this.startImage.draw(this, (this.canvas.width - this.startImage.width) / 2, (this.canvas.height - this.startImage.height) / 2);
            }
            else {
                this.ctx.fillStyle = "#FFFFFF";
                this.ctx.font = "20px Helvetica";
                this.ctx.fillText("Tap or Click to Start", 50, 50);
            }
        }
    };
    Steg.prototype.setFontSize = function (size) {
        this.ctx.font = size + "px Helvetica";
    };
    Steg.prototype.drawText = function (txt, x, y, col) {
        this.ctx.fillStyle = col;
        this.ctx.fillText(txt, x, y);
    };
    Steg.prototype.centerText = function (txt, y, col) {
        this.ctx.fillStyle = col;
        this.ctx.textAlign = "center";
        this.ctx.fillText(txt, this.canvas.width / 2, y);
    };
    Steg.prototype.fillRect = function (x, y, width, height, col) {
        this.ctx.fillStyle = col;
        this.ctx.fillRect(x, y, width, height);
    };
    Steg.soundOn = true;
    Steg.musicOn = true;
    Steg.audioReady = false;
    return Steg;
}());
/// <reference path="Steg.ts"/>
/// <reference path="../Steg.ts"/>
var Bitmap = /** @class */ (function () {
    function Bitmap(url) {
        this.url = url;
    }
    Bitmap.prototype.load = function (steg, callback) {
        var _this = this;
        this.image = new Image();
        this.image.onload = function () {
            _this.loaded();
            callback(_this);
        };
        this.image.src = this.url;
    };
    Bitmap.prototype.loaded = function () {
        this.width = this.image.width;
        this.height = this.image.height;
    };
    Bitmap.prototype.drawScaled = function (steg, x, y, width, height) {
        var ctx = steg.ctx;
        ctx.drawImage(this.image, x, y, width, height);
    };
    Bitmap.prototype.draw = function (steg, x, y) {
        var ctx = steg.ctx;
        ctx.drawImage(this.image, x, y);
    };
    Bitmap.prototype.getName = function () {
        return "Bitmap [" + this.url + "]";
    };
    return Bitmap;
}());
/// <reference path="Bitmap.ts"/>
var Tileset = /** @class */ (function (_super) {
    __extends(Tileset, _super);
    function Tileset(url, tileWidth, tileHeight) {
        var _this = _super.call(this, url) || this;
        _this.tileWidth = tileWidth;
        _this.tileHeight = tileHeight;
        return _this;
    }
    Tileset.prototype.loaded = function () {
        this.scanline = Math.floor(this.image.width / this.tileWidth);
    };
    Tileset.prototype.getName = function () {
        return "Tileset [" + this.url + "]";
    };
    Tileset.prototype.drawTile = function (steg, x, y, tile) {
        var xp = Math.floor(tile % this.scanline);
        var yp = Math.floor(tile / this.scanline);
        xp *= this.tileWidth;
        yp *= this.tileHeight;
        steg.ctx.drawImage(this.image, xp, yp, this.tileWidth, this.tileHeight, x, y, this.tileWidth, this.tileHeight);
    };
    Tileset.prototype.drawTileScaled = function (steg, x, y, width, height, tile) {
        var xp = Math.floor(tile % this.scanline);
        var yp = Math.floor(tile / this.scanline);
        xp *= this.tileWidth;
        yp *= this.tileHeight;
        steg.ctx.drawImage(this.image, xp, yp, this.tileWidth, this.tileHeight, x, y, width, height);
    };
    Tileset.prototype.drawTileReverse = function (steg, x, y, tile) {
        var xp = Math.floor(tile % this.scanline);
        var yp = Math.floor(tile / this.scanline);
        xp *= this.tileWidth;
        yp *= this.tileHeight;
        steg.ctx.scale(-1, 1);
        steg.ctx.drawImage(this.image, xp, yp, this.tileWidth, this.tileHeight, -(x + this.tileWidth), y, this.tileWidth, this.tileHeight);
        steg.ctx.scale(-1, 1);
    };
    return Tileset;
}(Bitmap));
/// <reference path="resources/Resource.ts"/>
/// <reference path="resources/Bitmap.ts"/>
/// <reference path="resources/Tileset.ts"/>
var Resources = /** @class */ (function () {
    function Resources() {
    }
    Resources.loadMusic = function (url) {
        var music = new Music(url);
        this.added.push(music);
        return music;
    };
    Resources.loadSound = function (url) {
        var sound = new Sound(url);
        this.added.push(sound);
        return sound;
    };
    Resources.laodBitmap = function (url) {
        var bitmap = new Bitmap(url);
        this.added.push(bitmap);
        return bitmap;
    };
    Resources.loadTileset = function (url, tileWidth, tileHeight) {
        var tileset = new Tileset(url, tileWidth, tileHeight);
        this.added.push(tileset);
        return tileset;
    };
    Resources.load = function (steg, callback) {
        var _this = this;
        this.callback = callback;
        this.steg = steg;
        for (var i = 0; i < this.added.length; i++) {
            this.added[i].load(this.steg, function (res) { _this.resourceCallback(res); });
        }
        steg.drawLoadingScreen(this.loaded.length, this.added.length);
        if (this.loaded.length == this.added.length) {
            this.callback();
        }
    };
    Resources.resourceCallback = function (res) {
        console.log("Loaded: " + res.getName());
        this.loaded.push(res);
        this.steg.drawLoadingScreen(this.loaded.length, this.added.length);
        if (this.loaded.length == this.added.length) {
            this.callback();
        }
    };
    Resources.added = [];
    Resources.loaded = [];
    return Resources;
}());
/// <reference path="../Steg.ts"/>
/// <reference path="Resource.ts"/>
var Music = /** @class */ (function () {
    function Music(url) {
        this.loaded = false;
        this.url = url;
    }
    Music.prototype.load = function (steg, callback) {
        var _this = this;
        if (!steg.audioContext) {
            console.log("No audio context. No Sound");
            callback(this);
        }
        else {
            this.audioContext = steg.audioContext;
            var request = new XMLHttpRequest();
            request.open('GET', this.url, true);
            request.responseType = 'arraybuffer';
            request.onload = function () {
                steg.audioContext.decodeAudioData(request.response, function (audioBuffer) {
                    _this.audioBuffer = audioBuffer;
                    callback(_this);
                });
            };
            request.onerror = function (error) { console.log(error); };
            request.send();
        }
    };
    Music.prototype.createSource = function (volume) {
        var bufferSource = this.audioContext.createBufferSource();
        bufferSource.buffer = this.audioBuffer;
        var gainNode = this.audioContext.createGain();
        gainNode.gain.value = volume;
        gainNode.connect(this.audioContext.destination);
        bufferSource.connect(gainNode);
        this.lastSource = bufferSource;
        return bufferSource;
    };
    Music.prototype.playImpl = function () {
        if ((Steg.musicOn) && (Steg.audioReady)) {
            if (this.audioBuffer) {
                var source = this.createSource(1.0);
                source.loop = true;
                source.start();
            }
        }
    };
    Music.prototype.play = function () {
        if (Music.currentMusic) {
            Music.currentMusic.stop();
        }
        Music.currentMusic = this;
        this.playImpl();
    };
    Music.prototype.stop = function () {
        if (this.lastSource) {
            this.lastSource.stop();
            this.lastSource = null;
        }
    };
    Music.prototype.getName = function () {
        return "Music [" + this.url + "]";
    };
    return Music;
}());
/// <reference path="Resource.ts"/>
var Sound = /** @class */ (function () {
    function Sound(url) {
        this.loaded = false;
        this.url = url;
    }
    Sound.prototype.load = function (steg, callback) {
        var _this = this;
        if (!steg.audioContext) {
            console.log("No audio context. No Sound");
            callback(this);
        }
        else {
            this.audioContext = steg.audioContext;
            var request = new XMLHttpRequest();
            request.open('GET', this.url, true);
            request.responseType = 'arraybuffer';
            request.onload = function () {
                steg.audioContext.decodeAudioData(request.response, function (audioBuffer) {
                    _this.audioBuffer = audioBuffer;
                    callback(_this);
                });
            };
            request.onerror = function (error) { console.log(error); };
            request.send();
        }
    };
    Sound.prototype.createSource = function (volume) {
        var bufferSource = this.audioContext.createBufferSource();
        bufferSource.buffer = this.audioBuffer;
        var gainNode = this.audioContext.createGain();
        gainNode.gain.value = volume;
        gainNode.connect(this.audioContext.destination);
        bufferSource.connect(gainNode);
        return bufferSource;
    };
    Sound.prototype.play = function (volume) {
        if ((Steg.soundOn) && (Steg.audioReady)) {
            if (this.audioBuffer) {
                var source = this.createSource(volume);
                source.loop = false;
                source.start();
            }
        }
    };
    Sound.prototype.getName = function () {
        return "Sound [" + this.url + "]";
    };
    return Sound;
}());
/// <reference path="engine/Steg.ts"/>
/// <reference path="engine/Steggi.ts"/>
/// <reference path="engine/Resources.ts"/>
/// <reference path="engine/resources/Music.ts"/>
/// <reference path="engine/resources/Sound.ts"/>
/// <reference path="Anim.ts"/>
/// <reference path="Dinos.ts"/>
var Game = /** @class */ (function () {
    function Game() {
        this.scroll = 0;
        this.stepSfx = [];
        this.step = 0;
        this.lastStep = 0;
        this.count = 0;
        this.speed = 1000;
        this.move = 0;
        this.roar = 0;
        this.left = 0;
        this.right = 0;
        this.showSelect = true;
        this.currentSelectedIndex = 0;
        this.props = [];
        this.viewDistance = 5000;
        this.propSep = 300;
        this.propVar = 400;
    }
    Game.prototype.init = function (steg) {
        this.music = Resources.loadMusic("audio/music.mp3");
        this.stepSfx.push(Resources.loadSound("audio/step.mp3"));
        this.stepSfx.push(Resources.loadSound("audio/step.mp3"));
        this.bg = Resources.laodBitmap("img/bg.png");
        this.fg = Resources.laodBitmap("img/fg.png");
        steg.setStartImage(Resources.laodBitmap("img/start.png"));
        this.worldTileset = Resources.loadTileset("img/world1.png", 128, 128);
        this.propTileset = Resources.loadTileset("img/props.png", 160, 128);
        this.ui = Resources.loadTileset("img/ui.png", 88, 92);
        for (var d in Dinos.DATA) {
            var dinoData = Dinos.DATA[d];
            if (dinoData.midpoint) {
                dinoData.roar = Resources.loadSound(dinoData.roarUrl);
                dinoData.tileset = Resources.loadTileset(dinoData.tilesetUrl, dinoData.tileWidth, dinoData.tileHeight);
            }
        }
        this.generateProps();
        this.selectedDinoData = Dinos.DATA.TREX;
        this.selectDino(this.selectedDinoData);
        this.selectedDino = new Dino(this.selectedDinoData);
    };
    Game.prototype.createProp = function (x) {
        var prop = new Prop();
        prop.x = x;
        prop.type = Math.floor(Math.random() * 8);
        prop.flip = Math.random() > 0.5;
        this.props.push(prop);
    };
    Game.prototype.validateProps = function () {
        for (var i = 0; i < this.props.length; i++) {
            var prop = this.props[i];
            var xp = prop.x - (this.scroll * this.speed);
            var dx = Math.abs(xp);
            if (dx > this.viewDistance) {
                // remove the prop its too far away
                this.props.splice(this.props.indexOf(prop), 1);
                i--;
                if (xp < 0) {
                    this.createProp((this.scroll * this.speed) + this.viewDistance);
                }
                else {
                    this.createProp((this.scroll * this.speed) - this.viewDistance);
                }
            }
        }
    };
    Game.prototype.generateProps = function () {
        var x = this.scroll - this.viewDistance;
        while (x < this.scroll + this.viewDistance) {
            this.createProp(x);
            x += this.propSep + Math.floor(Math.random() * this.propVar);
        }
    };
    Game.prototype.selectDino = function (dinoData) {
        this.dino = new Dino(dinoData);
    };
    Game.prototype.loaded = function (steg) {
        this.music.play();
    };
    Game.prototype.update = function (steg) {
        var _this = this;
        this.move = 0;
        if (!this.roar) {
            if ((this.left && !this.right)) {
                this.move = -1;
            }
            if ((this.right && !this.left)) {
                this.move = 1;
            }
        }
        this.dino.update(steg, function () {
            _this.roar = 0;
        });
        this.selectedDino.update(steg, function () { });
        this.scroll += this.move * 0.01;
        if (this.roar) {
            if (this.dino.getAnimName() != Anim.ATTACK) {
                this.dino.setAnim(Anim.ATTACK);
            }
        }
        else {
            if (this.move != 0) {
                this.dino.setAnim(Anim.MOVE);
                if (this.selectedDinoData.steps) {
                    // sound sfx for steps
                    var now = new Date().getTime();
                    if (now - this.lastStep > Game.STEP_INTERVAL) {
                        this.lastStep = now;
                        this.stepSfx[this.step].play(0.6);
                        this.step = (this.step + 1) % this.stepSfx.length;
                    }
                }
            }
            else {
                this.dino.setAnim(Anim.IDLE);
            }
        }
        if (this.move < 0) {
            this.dino.setFacingRight(false);
        }
        if (this.move > 0) {
            this.dino.setFacingRight(true);
        }
        this.validateProps();
    };
    Game.prototype.render = function (steg) {
        var bgScale = steg.canvas.height / 768;
        var bgWidth = 1280 * bgScale;
        var bgCount = Math.floor(steg.canvas.width / bgWidth) + 2;
        // background
        var bgOffset = -((this.scroll * (this.speed / 2)) % bgWidth);
        for (var i = -1; i < bgCount; i++) {
            this.bg.drawScaled(steg, bgOffset + (bgWidth * i), 0, bgWidth, steg.canvas.height);
        }
        // foreground
        var fgOffset = -((this.scroll * (this.speed / 1.5)) % bgWidth);
        for (var i = -1; i < bgCount; i++) {
            this.fg.drawScaled(steg, fgOffset + (bgWidth * i), 0, bgWidth, steg.canvas.height);
        }
        // ground
        for (var i = -1; i < (steg.canvas.width / 128) + 1; i++) {
            var xp = (i * 128) - ((this.scroll * this.speed) % 128);
            this.worldTileset.drawTile(steg, xp, steg.canvas.height - 140, 2);
            this.worldTileset.drawTile(steg, xp, steg.canvas.height - 140 + 128, 11);
        }
        // props
        for (var i = 0; i < this.props.length; i++) {
            var prop = this.props[i];
            var xp = prop.x - (this.scroll * this.speed);
            if (prop.flip) {
                this.propTileset.drawTileReverse(steg, xp, steg.canvas.height - 140 - 125, prop.type);
            }
            else {
                this.propTileset.drawTile(steg, xp, steg.canvas.height - 140 - 125, prop.type);
            }
        }
        // dinos
        this.dino.x = Math.floor(steg.canvas.width / 2);
        this.dino.y = steg.canvas.height - 132;
        this.dino.render(steg);
        // ui
        this.ui.drawTile(steg, steg.canvas.width - 100, ((steg.canvas.height / 2) - 50), 0);
        this.ui.drawTile(steg, 12, ((steg.canvas.height / 2) - 50), 1);
        this.ui.drawTile(steg, (steg.canvas.width / 2) - 44, steg.canvas.height - 100, 6);
        this.ui.drawTileScaled(steg, 5, 5, 44, 46, steg.getSoundOn() ? 3 : 8);
        this.ui.drawTileScaled(steg, 52, 5, 44, 46, steg.getMusicOn() ? 5 : 9);
        this.ui.drawTileScaled(steg, steg.canvas.width - 50, 5, 44, 46, 7);
        // dino select box
        if (this.showSelect) {
            var offset = 40;
            steg.fillRect(offset, offset, steg.canvas.width - (offset * 2), steg.canvas.height - (offset * 2), "rgba(0,0,0,0.8)");
            this.ui.drawTile(steg, (steg.canvas.width / 2) - 200 - 80, (steg.canvas.height / 2), 11);
            this.ui.drawTile(steg, (steg.canvas.width / 2) + 200, (steg.canvas.height / 2), 10);
            this.selectedDino.x = (steg.canvas.width / 2);
            this.selectedDino.y = (steg.canvas.height / 2);
            this.selectedDino.render(steg);
            steg.setFontSize(40);
            steg.centerText(this.selectedDinoData.name, (steg.canvas.height / 2) + 60, "#fff");
        }
    };
    Game.prototype.mouseUp = function (steg, id, x, y) {
        if (this.showSelect) {
            return;
        }
        if (this.left == id) {
            this.left = 0;
        }
        if (this.right == id) {
            this.right = 0;
        }
    };
    Game.prototype.mouseDown = function (steg, id, x, y) {
        if (this.showSelect) {
            if (x < (steg.canvas.width / 2) - 200) {
                this.currentSelectedIndex--;
                if (this.currentSelectedIndex < 0) {
                    this.currentSelectedIndex = Dinos.ORDER.length - 1;
                }
                this.selectedDinoData = Dinos.DATA[Dinos.ORDER[this.currentSelectedIndex]];
                this.selectedDino = new Dino(this.selectedDinoData);
            }
            else if (x > (steg.canvas.width / 2) + 200) {
                this.currentSelectedIndex++;
                if (this.currentSelectedIndex >= Dinos.ORDER.length) {
                    this.currentSelectedIndex = 0;
                }
                this.selectedDinoData = Dinos.DATA[Dinos.ORDER[this.currentSelectedIndex]];
                this.selectedDino = new Dino(this.selectedDinoData);
            }
            else if ((x > (steg.canvas.width / 2) - 200) && (x < (steg.canvas.width / 2) + 200)) {
                this.selectDino(this.selectedDinoData);
                this.showSelect = false;
            }
            return;
        }
        if (y < 50) {
            if (x < 50) {
                steg.setSoundOn(!steg.getSoundOn());
            }
            else if (x < 100) {
                steg.setMusicOn(!steg.getMusicOn());
            }
            else if (x > steg.canvas.width - 50) {
                this.showSelect = true;
            }
            return;
        }
        if (x < 100) {
            this.left = id;
        }
        if (x > steg.canvas.width - 100) {
            this.right = id;
        }
        if (y > steg.canvas.height - 100) {
            if (this.dino.getAnimName() != Anim.ATTACK) {
                this.dino.attack();
            }
            this.roar = id;
        }
    };
    Game.STEP_INTERVAL = 300;
    return Game;
}());
var Prop = /** @class */ (function () {
    function Prop() {
    }
    return Prop;
}());
//# sourceMappingURL=game.js.map