declare class Anim {
    static IDLE: string;
    static MOVE: string;
    static ATTACK: string;
}
declare class Dino {
    anim: Array<number>;
    dinoData: any;
    tileset: Tileset;
    x: number;
    y: number;
    frame: number;
    animSpeed: number;
    midpoint: number;
    facingRight: boolean;
    animName: string;
    constructor(dinoData: any);
    getAnimName(): string;
    setAnim(anim: string): void;
    setFacingRight(b: boolean): void;
    update(core: steg.Core, roarComplete: () => void): void;
    attack(): void;
    render(core: Core): void;
}
declare class Dinos {
    static ORDER: string[];
    static DATA: {
        TREX: {
            name: string;
            tilesetUrl: string;
            tileWidth: number;
            tileHeight: number;
            roarUrl: string;
            midpoint: number;
            tileset: any;
            roar: any;
            anims: {
                "idle": number[];
                "move": number[];
                "attack": number[];
            };
            steps: boolean;
        };
        DIPO: {
            name: string;
            tilesetUrl: string;
            tileWidth: number;
            tileHeight: number;
            roarUrl: string;
            midpoint: number;
            tileset: any;
            roar: any;
            anims: {
                "idle": number[];
                "move": number[];
                "attack": number[];
            };
            steps: boolean;
        };
        DIME: {
            name: string;
            tilesetUrl: string;
            tileWidth: number;
            tileHeight: number;
            roarUrl: string;
            midpoint: number;
            tileset: any;
            roar: any;
            anims: {
                "idle": number[];
                "move": number[];
                "attack": number[];
            };
            steps: boolean;
        };
        FLAP: {
            name: string;
            tilesetUrl: string;
            tileWidth: number;
            tileHeight: number;
            roarUrl: string;
            midpoint: number;
            tileset: any;
            roar: any;
            anims: {
                "idle": number[];
                "move": number[];
                "attack": number[];
            };
            steps: boolean;
        };
        RAPTOR: {
            name: string;
            tilesetUrl: string;
            tileWidth: number;
            tileHeight: number;
            roarUrl: string;
            midpoint: number;
            tileset: any;
            roar: any;
            anims: {
                "idle": number[];
                "move": number[];
                "attack": number[];
            };
            steps: boolean;
        };
        TRI: {
            name: string;
            tilesetUrl: string;
            tileWidth: number;
            tileHeight: number;
            roarUrl: string;
            midpoint: number;
            tileset: any;
            roar: any;
            anims: {
                "idle": number[];
                "move": number[];
                "attack": number[];
            };
            steps: boolean;
        };
    };
}
import Core = steg.Core;
import Game = steg.Game;
import Resources = steg.Resources;
import Bitmap = steg.Bitmap;
import Sound = steg.Sound;
import Music = steg.Music;
import Tileset = steg.Tileset;
declare class DinoGame implements Game {
    static STEP_INTERVAL: number;
    bg: Bitmap;
    fg: Bitmap;
    scroll: number;
    propTileset: Tileset;
    propCutTileset: Tileset;
    worldTileset: Tileset;
    ui: Tileset;
    music: Music;
    stepSfx: Sound;
    booshSfx: Sound;
    lastStep: number;
    count: number;
    dino: Dino;
    speed: number;
    move: number;
    roar: number;
    left: number;
    right: number;
    showSelect: boolean;
    selectedDinoData: any;
    selectedDino: Dino;
    currentSelectedIndex: number;
    props: Array<Prop>;
    viewDistance: number;
    propSep: number;
    propVar: number;
    effects: Array<Effect>;
    init(core: Core): void;
    addEffect(effect: Effect): void;
    createProp(x: number): void;
    validateProps(): void;
    generateProps(): void;
    selectDino(dinoData: any): void;
    loaded(core: Core): void;
    roarAtProps(core: Core): void;
    update(core: Core): void;
    render(steg: Core): void;
    mouseUp(steg: Core, id: number, x: number, y: number): void;
    mouseDown(steg: Core, id: number, x: number, y: number): void;
}
interface Effect {
    update(core: Core): void;
    render(core: Core, viewPos: number): void;
    complete(core: Core): boolean;
}
declare class PopEffect implements Effect {
    type: number;
    x: number;
    tileset: Tileset;
    tx: number;
    ty: number;
    init: boolean;
    particles: Array<any>;
    constructor(tileset: Tileset, type: number, x: number);
    update(core: Core): void;
    render(core: Core, viewPos: number): void;
    complete(core: Core): boolean;
}
declare class Prop {
    x: number;
    type: number;
    flip: boolean;
    roared(game: DinoGame, core: Core): boolean;
}
