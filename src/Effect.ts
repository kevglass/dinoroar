interface Effect {
    update(core: Core): void;

    render(core: Core, viewPos: number): void;

    complete(core: Core): boolean;
}