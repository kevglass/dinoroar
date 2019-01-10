class Prop {
    x: number;
    type: number;
    flip: boolean;
    
    roared(game: Game, steg: Steg): boolean {
        // if its a stone
        if ((this.type == 0) || (this.type == 1) || (this.type == 2)) {
            // do a little particle effect
            game.booshSfx.play(1.0);
            game.addEffect(new PopEffect(game.propCutTileset, this.type, this.x));
            return true;
        }

        return false;
    }
}