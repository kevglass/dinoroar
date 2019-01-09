// SIMPLE TYPESCRIPT ENGINE FOR GAMES
class Steg {
    static soundOn : boolean = true;
    static musicOn: boolean = true;
    static audioReady: boolean = false;

    game: Steggi;
    timer: any;
    fps: number = 20;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    readyToStart: boolean = false;
    started: boolean = false;
    audioContext: AudioContext;
    startImage: Bitmap;

    constructor(canvas: HTMLCanvasElement, game: Steggi) {
        this.game = game;
        this.canvas = canvas;
    }

    start(): void {
        this.init();
    }

    setStartImage(startImage: Bitmap) : void {
        this.startImage = startImage;
    }

    init(): void {
        var AudioContext = (<any>window).AudioContext || (<any>window).webkitAudioContext;
        if (AudioContext) {
            console.log("Audio Context Being Created");
            this.audioContext = new AudioContext();
            console.log(this.audioContext);
        } else {
            console.log("No Audio Context found");
        }

        this.setupMouseHandler();
        this.ctx = this.canvas.getContext("2d");

        this.game.init(this);

        Resources.load(this, () => {
            this.game.loaded(this);
            this.readyToStart = true;
        });
    }

    doStart() : void {
        if (this.readyToStart) {
            if (!this.started) {
                if (this.audioContext) {
                    this.audioContext.resume();
                }

                Steg.audioReady = true;
                if (Music.currentMusic) {
                    Music.currentMusic.play();
                }
        
                this.started = true;
                this.timer = setInterval(() => { this.tick() }, 1000 / this.fps);
            }
        }
    }

    drawLoadingScreen(loaded: number, total: number): void {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

        this.fillRect(0,0,this.canvas.width,this.canvas.height,"#000000");
        if (loaded == total) {
            if (this.startImage) {
                this.startImage.draw(this, (this.canvas.width - this.startImage.width) / 2, (this.canvas.height - this.startImage.height) / 2);
            } else {
                this.ctx.fillStyle = "#FFFFFF";
                this.ctx.font = "20px Helvetica";
                this.ctx.fillText("Tap or Click to Start", 50,50);
            }
        } else {
            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.font = "20px Helvetica";
            this.ctx.fillText("Loading "+loaded+"/"+total, 50,50);
            this.fillRect(50,60,(this.canvas.width-100),20,"#555555");
            this.fillRect(50,60,(this.canvas.width-100)*(loaded/total),20,"#0000FF");
        }
    }

    setupMouseHandler(): void {
        var hasTouchStartEvent = 'ontouchstart' in document.createElement('div');

        if (!hasTouchStartEvent) {
            this.canvas.onmousedown = (e) => {
                e.preventDefault();
                this.invokeMouseDown(1, e.offsetX, e.offsetY);
            }

            this.canvas.onmouseup = (e) => {
                e.preventDefault();
                this.invokeMouseUp(1, e.offsetX, e.offsetY);
            }

            this.canvas.onmousemove = (e) => {
                e.preventDefault();
                this.invokeMouseMove(1, e.offsetX, e.offsetY);
            }
        } else {
            this.canvas.ontouchstart = (e) => {
                e.preventDefault();
                for (var i = 0; i < e.changedTouches.length; i++) {
                    this.invokeMouseDown(e.changedTouches.item(i).identifier, e.changedTouches.item(i).pageX, e.changedTouches.item(i).pageY);
                }
            }

            this.canvas.ontouchend = (e) => {
                e.preventDefault();
                for (var i = 0; i < e.changedTouches.length; i++) {
                    this.invokeMouseUp(e.changedTouches.item(i).identifier, e.changedTouches.item(i).pageX, e.changedTouches.item(i).pageY);
                }
            }

            this.canvas.ontouchmove = (e) => {
                e.preventDefault();
            }
        }
    }

    setSoundOn(soundOn: boolean) : void {
        if (!this.audioContext) {
            return;
        }
        Steg.soundOn = soundOn;
    }

    getSoundOn() : boolean {
        if (!this.audioContext) {
            return false;
        }

        return Steg.soundOn;
    }

    setMusicOn(musicOn: boolean) : void {
        if (!this.audioContext) {
            return;
        }

        Steg.musicOn = musicOn;
        if (Music.currentMusic) {
            if (musicOn) {
                Music.currentMusic.play();
            } else {
                Music.currentMusic.stop();
            }
        }
    }

    getMusicOn() : boolean {
        if (!this.audioContext) {
            return false;
        }
        
        return Steg.musicOn;
    }

    invokeMouseDown(id: number, x: number, y: number) {
        this.doStart();

        this.game.mouseDown(this, id + 1, x, y);
    }

    invokeMouseUp(id: number, x: number, y: number) {
        this.doStart();

        this.game.mouseUp(this, id + 1, x, y);
    }

    invokeMouseMove(id: number, x: number, y: number) {

    }

    tick(): void {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

        this.game.update(this);
        this.game.render(this);
    }

    fillRect(x: number, y: number, width: number, height: number, col: string): void {
        this.ctx.fillStyle = col;
        this.ctx.fillRect(x, y, width, height);
    }
}