interface Resource {
    load(steg: Steg, callback: (res: Resource) => void ): void;

    getName(): string;
}