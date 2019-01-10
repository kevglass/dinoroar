interface Effect {
    update(steg: Steg): void;

    render(steg: Steg, viewPos: number): void;

    complete(steg: Steg): boolean;
}