/// <reference path="Steg.ts"/>

interface Steggi {

    init(steg: Steg) : void;
    
    loaded(steg: Steg) : void;
    
    render(steg: Steg) : void;

    update(steg: Steg): void;

    mouseUp(steg: Steg, id: number, x: number, y: number): void;

    mouseDown(steg: Steg, id: number, x: number, y: number): void;
}