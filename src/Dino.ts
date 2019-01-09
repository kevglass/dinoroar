class Dino {
    anims: any;
    anim: Array<number>;
    tileset: Tileset;
    x: number;
    y: number;
    frame: number = 0;
    animSpeed: number = 0.5;
    midpoint: number;
    facingRight: boolean = true;
    animName: string;

    constructor(tileset: Tileset, anims: any, midpoint: number) {
        this.tileset = tileset;
        this.anims = anims;
        this.anim = this.anims[Animations.IDLE];
        this.x = 100;
        this.y = 100;
        this.frame = 0;
        this.midpoint = midpoint;

        this.setAnim(Animations.IDLE);
    }

    getAnimName() : string {
        return this.animName;
    }
    
    setAnim(anim: string): void {
        this.animName = anim;

        if (this.anim == this.anims[anim]) {
            return;
        }
        this.anim = this.anims[anim];
        this.frame = 0;
    }

    setFacingRight(b: boolean): void {
        this.facingRight = b;
    }

    update(steg: Steg, roarComplete: () => void): void {
        this.frame += this.animSpeed;

        if (this.frame >= this.anim.length) {
            roarComplete();
        }

        this.frame = this.frame % this.anim.length;
    }

    render(steg: Steg): void {
        if (this.facingRight) {
            this.tileset.drawTile(steg, this.x - this.midpoint, this.y - this.tileset.tileHeight, this.anim[Math.floor(this.frame)]);
        } else {
            this.tileset.drawTileReverse(steg, this.x - this.tileset.tileWidth + this.midpoint, this.y - this.tileset.tileHeight, this.anim[Math.floor(this.frame)]);
        }
    }
}