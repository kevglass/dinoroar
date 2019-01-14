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
    Dino.prototype.update = function (core, roarComplete) {
        this.frame += this.animSpeed;
        if (this.frame >= this.anim.length) {
            roarComplete();
        }
        this.frame = this.frame % this.anim.length;
    };
    Dino.prototype.attack = function () {
        this.dinoData.roar.play(1.0);
    };
    Dino.prototype.render = function (core) {
        if (this.facingRight) {
            this.tileset.drawTile(core, this.x - this.midpoint, this.y - this.tileset.tileHeight, this.anim[Math.floor(this.frame)]);
        }
        else {
            this.tileset.drawTileReverse(core, this.x - this.tileset.tileWidth + this.midpoint, this.y - this.tileset.tileHeight, this.anim[Math.floor(this.frame)]);
        }
    };
    return Dino;
}());
var Dinos = /** @class */ (function () {
    function Dinos() {
    }
    Dinos.ORDER = ["TREX", "DIPO", "DIME", "FLAP", "RAPTOR", "TRI"];
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
        },
        RAPTOR: {
            name: "Raptor",
            tilesetUrl: "img/dino5.png",
            tileWidth: 176,
            tileHeight: 106,
            roarUrl: "audio/roar5.mp3",
            midpoint: 64,
            tileset: null,
            roar: null,
            anims: {
                "idle": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                "move": [10, 11, 12, 13, 14, 15, 16, 17],
                "attack": [18, 19, 20, 21, 22, 23, 24, 25, 26, 27]
            },
            steps: true
        },
        TRI: {
            name: "Spike",
            tilesetUrl: "img/dino6.png",
            tileWidth: 225,
            tileHeight: 124,
            roarUrl: "audio/roar.mp3",
            midpoint: 105,
            tileset: null,
            roar: null,
            anims: {
                "idle": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                "move": [10, 11, 12, 13, 14, 15, 16, 17],
                "attack": [18, 19, 20, 21, 22, 23, 24, 25]
            },
            steps: true
        }
    };
    return Dinos;
}());
/// <reference path="Anim.ts"/>
/// <reference path="Dinos.ts"/>
var Core = steg.Core;
var Resources = steg.Resources;
var Bitmap = steg.Bitmap;
var Sound = steg.Sound;
var Music = steg.Music;
var Tileset = steg.Tileset;
var DinoGame = /** @class */ (function () {
    function DinoGame() {
        this.scroll = 0;
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
        this.effects = [];
    }
    DinoGame.prototype.init = function (core) {
        this.music = Resources.loadMusic("audio/music.mp3");
        this.stepSfx = Resources.loadSound("audio/step.mp3");
        this.booshSfx = Resources.loadSound("audio/boosh.mp3");
        this.bg = Resources.laodBitmap("img/bg.png");
        this.fg = Resources.laodBitmap("img/fg.png");
        core.setStartImage(Resources.laodBitmap("img/start.png"));
        this.worldTileset = Resources.loadTileset("img/world1.png", 128, 128);
        this.propTileset = Resources.loadTileset("img/props.png", 160, 128);
        this.propCutTileset = Resources.loadTileset("img/props.png", 40, 32);
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
    DinoGame.prototype.addEffect = function (effect) {
        this.effects.push(effect);
    };
    DinoGame.prototype.createProp = function (x) {
        var prop = new Prop();
        prop.x = x;
        prop.type = Math.floor(Math.random() * 8);
        prop.flip = Math.random() > 0.5;
        this.props.push(prop);
    };
    DinoGame.prototype.validateProps = function () {
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
    DinoGame.prototype.generateProps = function () {
        var x = this.scroll - this.viewDistance;
        while (x < this.scroll + this.viewDistance) {
            this.createProp(x);
            x += this.propSep + Math.floor(Math.random() * this.propVar);
        }
    };
    DinoGame.prototype.selectDino = function (dinoData) {
        this.dino = new Dino(dinoData);
    };
    DinoGame.prototype.loaded = function (core) {
        this.music.play();
    };
    DinoGame.prototype.roarAtProps = function (core) {
        for (var i = 0; i < this.props.length; i++) {
            var prop = this.props[i];
            var xp = prop.x - (this.scroll * this.speed);
            var dx = xp - (core.canvas.width / 2);
            if ((this.dino.facingRight) && (dx > 0) && (dx < 200)) {
                if (prop.roared(this, core)) {
                    this.props.splice(this.props.indexOf(prop), 1);
                    i--;
                }
            }
            if ((!this.dino.facingRight) && (dx < 0) && (dx > -300)) {
                if (prop.roared(this, core)) {
                    this.props.splice(this.props.indexOf(prop), 1);
                    i--;
                }
            }
        }
    };
    DinoGame.prototype.update = function (core) {
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
        this.dino.update(core, function () {
            if (_this.roar != 0) {
                _this.roar = 0;
                _this.roarAtProps(core);
            }
        });
        for (var i = 0; i < this.effects.length; i++) {
            var effect = this.effects[i];
            effect.update(core);
            if (effect.complete(core)) {
                this.effects.splice(i, 1);
                i--;
            }
        }
        this.selectedDino.update(core, function () { });
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
                    if (now - this.lastStep > DinoGame.STEP_INTERVAL) {
                        this.lastStep = now;
                        this.stepSfx.play(0.6);
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
    DinoGame.prototype.render = function (steg) {
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
        for (var i = 0; i < this.effects.length; i++) {
            var effect = this.effects[i];
            effect.render(steg, (this.scroll * this.speed));
        }
        // ui
        this.ui.drawTile(steg, steg.canvas.width - 100, ((steg.canvas.height / 2) - 50), 0);
        this.ui.drawTile(steg, 12, ((steg.canvas.height / 2) - 50), 1);
        this.ui.drawTile(steg, (steg.canvas.width / 2) - 44, steg.canvas.height - 100, 6);
        this.ui.drawTileScaled(steg, 5, 5, 44, 46, steg.getSoundOn() ? 3 : 8);
        this.ui.drawTileScaled(steg, 52, 5, 44, 46, steg.getMusicOn() ? 5 : 9);
        this.ui.drawTileScaled(steg, steg.canvas.width - 80, 5, 75, 75, 4);
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
    DinoGame.prototype.mouseUp = function (steg, id, x, y) {
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
    DinoGame.prototype.mouseDown = function (steg, id, x, y) {
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
        if (y < 75) {
            if (x > steg.canvas.width - 75) {
                this.showSelect = true;
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
    DinoGame.STEP_INTERVAL = 300;
    return DinoGame;
}());
var PopEffect = /** @class */ (function () {
    function PopEffect(tileset, type, x) {
        this.init = false;
        this.particles = [];
        this.tileset = tileset;
        this.type = type;
        this.x = x;
        this.tx = (type % 4);
        this.ty = Math.floor(type / 4);
        this.tx *= 4;
        this.ty *= 4;
        console.log("POP");
    }
    PopEffect.prototype.update = function (core) {
        if (!this.init) {
            this.init = true;
            for (var xp = 0; xp < 4; xp++) {
                for (var yp = 0; yp < 4; yp++) {
                    var px = this.x + (xp * 40);
                    var py = core.canvas.height - 140 - 125 + (yp * 32);
                    var pt = (this.tx + xp) + (this.ty + (yp * 16));
                    var vx = (xp - 2) * 5;
                    var vy = (yp - 4) * 7;
                    var a = 1;
                    this.particles.push({ x: px, y: py, tile: pt, vx: vx, vy: vy, a: a });
                }
            }
        }
        for (var i = 0; i < this.particles.length; i++) {
            var part = this.particles[i];
            part.x += part.vx;
            part.y += part.vy;
            part.vx *= 0.95;
            part.vy += 2;
        }
    };
    PopEffect.prototype.render = function (core, viewPos) {
        for (var i = 0; i < this.particles.length; i++) {
            var part = this.particles[i];
            this.tileset.drawTile(core, part.x - viewPos, part.y, part.tile);
        }
    };
    PopEffect.prototype.complete = function (core) {
        return false;
    };
    return PopEffect;
}());
var Prop = /** @class */ (function () {
    function Prop() {
    }
    Prop.prototype.roared = function (game, core) {
        // if its a stone
        if ((this.type == 0) || (this.type == 1) || (this.type == 2)) {
            // do a little particle effect
            game.booshSfx.play(1.0);
            game.addEffect(new PopEffect(game.propCutTileset, this.type, this.x));
            return true;
        }
        return false;
    };
    return Prop;
}());
//# sourceMappingURL=game.js.map