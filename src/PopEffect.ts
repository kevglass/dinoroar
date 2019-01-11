class PopEffect implements Effect {
    type: number;
    x: number;
    tileset: Tileset;
    tx: number;
    ty: number;
    init: boolean = false;
    particles: Array<any> = [];

    constructor(tileset: Tileset, type: number, x: number) {
        this.tileset = tileset;
        this.type = type;
        this.x = x;

        this.tx = (type % 4)
        this.ty = Math.floor(type / 4);
        this.tx *= 4;
        this.ty *= 4;

        console.log("POP");
    }
    
    update(core: Core) : void {
        if (!this.init) {
            this.init = true;

            for (var xp=0;xp<4;xp++) {
                for (var yp=0;yp<4;yp++) {
                    var px : number = this.x + (xp*40);
                    var py : number = core.canvas.height - 140 - 125 + (yp * 32);
                    var pt : number = (this.tx + xp) + (this.ty + (yp * 16));
                    var vx : number = (xp - 2) * 5;
                    var vy : number = (yp - 4) * 7;
                    var a : number = 1;

                    this.particles.push({x: px, y: py, tile: pt, vx: vx, vy: vy, a: a});
                }
            }
        }

        for (var i=0;i<this.particles.length;i++) {
            var part : any = this.particles[i];
        
            part.x += part.vx;
            part.y += part.vy;

            part.vx *= 0.95;
            part.vy += 2;
        }
    }

    render(core: Core, viewPos: number): void {
        for (var i=0;i<this.particles.length;i++) {
            var part : any = this.particles[i];

            this.tileset.drawTile(core, part.x - viewPos, part.y, part.tile);
        }
    }

    complete(core: Core): boolean {
        return false;
    }
}