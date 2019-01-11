/// <reference path="engine/Core.ts"/>
/// <reference path="engine/Game.ts"/>
/// <reference path="engine/Resources.ts"/>
/// <reference path="engine/resources/Music.ts"/>
/// <reference path="engine/resources/Sound.ts"/>
/// <reference path="Anim.ts"/>
/// <reference path="Dinos.ts"/>

import Core = steg.Core;
import Game = steg.Game;
import Resources = steg.Resources;
import Bitmap = steg.Bitmap;
import Sound = steg.Sound;
import Music = steg.Music;
import Tileset = steg.Tileset;

class DinoGame implements Game {
    static STEP_INTERVAL: number = 300;

    bg: Bitmap;
    fg: Bitmap;
    scroll: number = 0;

    propTileset: Tileset;
    propCutTileset: Tileset;
    worldTileset: Tileset;
    ui: Tileset;

    music: Music;
    stepSfx: Sound;
    booshSfx: Sound;
    lastStep: number = 0;

    count: number = 0;

    dino: Dino;

    speed: number = 1000;
    move: number = 0;

    roar: number = 0;
    left: number = 0;
    right: number = 0;

    showSelect: boolean = true;
    selectedDinoData: any;
    selectedDino: Dino;
    currentSelectedIndex: number = 0;

    props: Array<Prop> = [];
    viewDistance: number = 5000;
    propSep: number = 300;
    propVar: number = 400;

    effects: Array<Effect> = [];

    init(core: Core): void {
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
    }

    addEffect(effect: Effect): void {
        this.effects.push(effect);
    }

    createProp(x: number): void {
        var prop: Prop = new Prop();
        prop.x = x;
        prop.type = Math.floor(Math.random() * 8);
        prop.flip = Math.random() > 0.5;
        this.props.push(prop);
    }

    validateProps(): void {
        for (var i = 0; i < this.props.length; i++) {
            var prop: Prop = this.props[i];
            var xp: number = prop.x - (this.scroll * this.speed);
            var dx: number = Math.abs(xp);
            if (dx > this.viewDistance) {
                // remove the prop its too far away
                this.props.splice(this.props.indexOf(prop), 1);
                i--;

                if (xp < 0) {
                    this.createProp((this.scroll * this.speed) + this.viewDistance);
                } else {
                    this.createProp((this.scroll * this.speed) - this.viewDistance);
                }
            }
        }
    }

    generateProps(): void {
        var x: number = this.scroll - this.viewDistance;
        while (x < this.scroll + this.viewDistance) {
            this.createProp(x);
            x += this.propSep + Math.floor(Math.random() * this.propVar);
        }
    }

    selectDino(dinoData): void {
        this.dino = new Dino(dinoData);
    }

    loaded(core: Core): void {
        this.music.play();
    }

    roarAtProps(core: Core): void {
        for (var i = 0; i < this.props.length; i++) {
            var prop: Prop = this.props[i];
            var xp: number = prop.x - (this.scroll * this.speed);
            var dx: number = xp - (core.canvas.width / 2);

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
    }

    update(core: Core): void {
        this.move = 0;
        if (!this.roar) {
            if ((this.left && !this.right)) {
                this.move = -1;
            }
            if ((this.right && !this.left)) {
                this.move = 1;
            }
        }

        this.dino.update(core, () => {
            if (this.roar != 0) {
                this.roar = 0;
                this.roarAtProps(core);
            }
        });

        for (var i = 0; i < this.effects.length; i++) {
            var effect: Effect = this.effects[i];
            effect.update(core);
            if (effect.complete(core)) {
                this.effects.splice(i, 1);
                i--;
            }
        }

        this.selectedDino.update(core, () => { });

        this.scroll += this.move * 0.01;

        if (this.roar) {
            if (this.dino.getAnimName() != Anim.ATTACK) {
                this.dino.setAnim(Anim.ATTACK);
            }
        } else {
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
            } else {
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
    }

    render(steg: Core): void {
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

        // props
        for (var i = 0; i < this.props.length; i++) {
            var prop: Prop = this.props[i];
            var xp: number = prop.x - (this.scroll * this.speed);
            if (prop.flip) {
                this.propTileset.drawTileReverse(steg, xp, steg.canvas.height - 140 - 125, prop.type);
            } else {
                this.propTileset.drawTile(steg, xp, steg.canvas.height - 140 - 125, prop.type);
            }
        }
        // dinos
        this.dino.x = Math.floor(steg.canvas.width / 2);
        this.dino.y = steg.canvas.height - 132;
        this.dino.render(steg);

        for (var i = 0; i < this.effects.length; i++) {
            var effect: Effect = this.effects[i];
            effect.render(steg, (this.scroll * this.speed));
        }

        // ui
        this.ui.drawTile(steg, steg.canvas.width - 100, ((steg.canvas.height / 2) - 50), 0);
        this.ui.drawTile(steg, 12, ((steg.canvas.height / 2) - 50), 1);
        this.ui.drawTile(steg, (steg.canvas.width / 2) - 44, steg.canvas.height - 100, 6);
        this.ui.drawTileScaled(steg, 5, 5, 44, 46, steg.getSoundOn() ? 3 : 8)
        this.ui.drawTileScaled(steg, 52, 5, 44, 46, steg.getMusicOn() ? 5 : 9)
        this.ui.drawTileScaled(steg, steg.canvas.width - 50, 5, 44, 46, 7)

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
    }

    mouseUp(steg: Core, id: number, x: number, y: number): void {
        if (this.showSelect) {
            return;
        }

        if (this.left == id) {
            this.left = 0;
        }
        if (this.right == id) {
            this.right = 0;
        }
    }

    mouseDown(steg: Core, id: number, x: number, y: number): void {
        if (this.showSelect) {
            if (x < (steg.canvas.width / 2) - 200) {
                this.currentSelectedIndex--;
                if (this.currentSelectedIndex < 0) {
                    this.currentSelectedIndex = Dinos.ORDER.length - 1;
                }
                this.selectedDinoData = Dinos.DATA[Dinos.ORDER[this.currentSelectedIndex]];
                this.selectedDino = new Dino(this.selectedDinoData);
            } else if (x > (steg.canvas.width / 2) + 200) {
                this.currentSelectedIndex++;
                if (this.currentSelectedIndex >= Dinos.ORDER.length) {
                    this.currentSelectedIndex = 0
                }
                this.selectedDinoData = Dinos.DATA[Dinos.ORDER[this.currentSelectedIndex]];
                this.selectedDino = new Dino(this.selectedDinoData);
            } else if ((x > (steg.canvas.width / 2) - 200) && (x < (steg.canvas.width / 2) + 200)) {
                this.selectDino(this.selectedDinoData);
                this.showSelect = false;
            }
            return;
        }

        if (y < 50) {
            if (x < 50) {
                steg.setSoundOn(!steg.getSoundOn());
            } else if (x < 100) {
                steg.setMusicOn(!steg.getMusicOn());
            } else if (x > steg.canvas.width - 50) {
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
    }
} 