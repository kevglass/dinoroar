/// <reference path="Anim.ts"/>

class Dino {
    anim: Array<number>;
    dinoData: any;
    tileset: Tileset;
    x: number;
    y: number;
    frame: number = 0;
    animSpeed: number = 0.5;
    midpoint: number;
    facingRight: boolean = true;
    animName: string;

    constructor(dinoData: any) {
        this.tileset = dinoData.tileset;
        this.dinoData = dinoData;
        this.anim = this.dinoData.anims[Anim.IDLE];
        this.x = 100;
        this.y = 100;
        this.frame = 0;
        this.midpoint = dinoData.midpoint;

        this.setAnim(Anim.IDLE);
    }

    getAnimName() : string {
        return this.animName;
    }
    
    setAnim(anim: string): void {
        this.animName = anim;

        if (this.anim == this.dinoData.anims[anim]) {
            return;
        }
        this.anim = this.dinoData.anims[anim];
        this.frame = 0;
    }

    setFacingRight(b: boolean): void {
        this.facingRight = b;
    }

    update(core: steg.Core, roarComplete: () => void): void {
        this.frame += this.animSpeed;

        if (this.frame >= this.anim.length) {
            roarComplete();
        }

        this.frame = this.frame % this.anim.length;
    }

    attack() : void {
        this.dinoData.roar.play(1.0);
    }

    render(core: Core): void {
        if (this.facingRight) {
            this.tileset.drawTile(core, this.x - this.midpoint, this.y - this.tileset.tileHeight, this.anim[Math.floor(this.frame)]);
        } else {
            this.tileset.drawTileReverse(core, this.x - this.tileset.tileWidth + this.midpoint, this.y - this.tileset.tileHeight, this.anim[Math.floor(this.frame)]);
        }
    }
}