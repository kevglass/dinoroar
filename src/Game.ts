/// <reference path="engine/Steg.ts"/>
/// <reference path="engine/Steggi.ts"/>
/// <reference path="engine/Resources.ts"/>
/// <reference path="engine/resources/Music.ts"/>
/// <reference path="engine/resources/Sound.ts"/>

class Game implements Steggi {
    static STEP_INTERVAL : number = 300;

    bg: Bitmap;
    fg: Bitmap;
    scroll: number = 0;

    worldTileset: Tileset;
    trexTileset: Tileset;
    ui: Tileset;

    music: Music;
    roarSfx: Sound;
    stepSfx: Array<Sound> = [];
    step: number = 0;
    lastStep: number = 0;

    count: number = 0;

    dino: Dino;

    speed: number = 1000;
    move: number = 0;

    roar: number = 0;
    left: number = 0;
    right: number = 0;

    init(steg: Steg): void {
        this.music = Resources.loadMusic("audio/music.mp3");
        this.roarSfx = Resources.loadSound("audio/roar.mp3");
        this.stepSfx.push(Resources.loadSound("audio/step.mp3"));
        this.stepSfx.push(Resources.loadSound("audio/step.mp3"));
        this.bg = Resources.laodBitmap("img/bg.png");
        this.fg = Resources.laodBitmap("img/fg.png");
        steg.setStartImage(Resources.laodBitmap("img/start.png"));
        
        this.worldTileset = Resources.loadTileset("img/world1.png", 128, 128);
        this.trexTileset = Resources.loadTileset("img/dino1.png", 256, 128);
        this.ui = Resources.loadTileset("img/ui.png", 88, 92);
        this.dino = new Dino(this.trexTileset, Animations.TREX, 114);
        this.dino.setAnim(Animations.MOVE);
        this.dino.setFacingRight(false);
    }

    loaded(steg: Steg): void {
        this.music.play();
    }

    update(steg: Steg): void {
        this.move = 0;
        if (!this.roar) {
            if ((this.left && !this.right)) {
                this.move = -1;
            }
            if ((this.right && !this.left)) {
                this.move = 1;
            }
        }

        this.dino.update(steg, () => {
            this.roar = 0;
        });

        this.scroll += this.move * 0.01;

        if (this.roar) {
            if (this.dino.getAnimName() != Animations.ATTACK) {
                this.dino.setAnim(Animations.ATTACK);
            }
        } else {
            if (this.move != 0) {
                this.dino.setAnim(Animations.MOVE);

                // sound sfx
                var now = new Date().getTime();
                if (now - this.lastStep > Game.STEP_INTERVAL) {
                    this.lastStep = now;
                    this.stepSfx[this.step].play(0.6);
                    this.step = (this.step+1) % this.stepSfx.length;
                }
            } else {
                this.dino.setAnim(Animations.IDLE);
            }
        }

        if (this.move < 0) {
            this.dino.setFacingRight(false);
        }
        if (this.move > 0) {
            this.dino.setFacingRight(true);
        }

    }

    render(steg: Steg): void {
        var bgScale: number = steg.canvas.height / 768;
        var bgWidth: number = 1280 * bgScale;
        var bgCount: number = Math.floor(steg.canvas.width / bgWidth) + 2;

        // background
        var bgOffset: number = -((this.scroll * (this.speed / 2)) % bgWidth)
        for (var i = -1; i < bgCount; i++) {
            this.bg.drawScaled(steg, bgOffset + (bgWidth * i), 0, bgWidth, steg.canvas.height);
        }
        // foreground
        var fgOffset: number = -((this.scroll * (this.speed / 1.5)) % bgWidth)
        for (var i = -1; i < bgCount; i++) {
            this.fg.drawScaled(steg, fgOffset + (bgWidth * i), 0, bgWidth, steg.canvas.height);
        }

        // ground
        for (var i = -1; i < (steg.canvas.width / 128) + 1; i++) {
            var xp: number = (i * 128) - ((this.scroll * this.speed) % 128);
            this.worldTileset.drawTile(steg, xp, steg.canvas.height - 140, 2);
            this.worldTileset.drawTile(steg, xp, steg.canvas.height - 140 + 128, 11);
        }

        this.dino.x = Math.floor(steg.canvas.width / 2);
        this.dino.y = steg.canvas.height - 132;
        this.dino.render(steg);

        this.ui.drawTile(steg, steg.canvas.width - 100, ((steg.canvas.height / 2) - 50), 0);
        this.ui.drawTile(steg, 12, ((steg.canvas.height / 2) - 50), 1);
        this.ui.drawTile(steg, (steg.canvas.width / 2) - 44, steg.canvas.height - 100, 6);
        this.ui.drawTileScaled(steg, 5, 5, 44, 46, steg.getSoundOn() ? 3 : 8)
        this.ui.drawTileScaled(steg, 52, 5, 44, 46, steg.getMusicOn() ? 5 : 9)
        this.ui.drawTileScaled(steg, steg.canvas.width-50, 5, 44, 46, 7)
    }

    mouseUp(steg: Steg, id: number, x: number, y: number): void {
        if (this.left == id) {
            this.left = 0;
        }
        if (this.right == id) {
            this.right = 0;
        }
    }

    mouseDown(steg: Steg, id: number, x: number, y: number): void {
        if (y < 50) {
            if (x < 50) {
                steg.setSoundOn(!steg.getSoundOn());
            } else if (x < 100) {
                steg.setMusicOn(!steg.getMusicOn());
            } else if (x > steg.canvas.width - 50) {
                // go home to choose dinosaurs
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
            if (this.dino.getAnimName() != Animations.ATTACK) {
                this.roarSfx.play(1.0);
            }
            
            this.roar = id;
        }
    }
} 