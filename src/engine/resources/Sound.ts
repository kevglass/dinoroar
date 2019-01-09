/// <reference path="Resource.ts"/>

class Sound implements Resource {
    audioBuffer: AudioBuffer;
    url: string;
    loaded: boolean = false;
    audioContext: AudioContext;

    constructor(url: string) {
        this.url = url;
    }

    load(steg: Steg, callback: (res: Resource) => void): void {
        if (!steg.audioContext) {
            console.log("No audio context. No Sound");
            callback(this);
        } else {
            this.audioContext = steg.audioContext;

            var request = new XMLHttpRequest();
            request.open('GET', this.url, true);
            request.responseType = 'arraybuffer';

            request.onload = () => {
                steg.audioContext.decodeAudioData(request.response, (audioBuffer: AudioBuffer) => {
                    this.audioBuffer = audioBuffer;
                    callback(this);
                });
            };
            request.onerror = (error) => { console.log(error) };
            request.send();
        }
    }

    private createSource(volume: number): AudioBufferSourceNode {
        var bufferSource: AudioBufferSourceNode = this.audioContext.createBufferSource();
        bufferSource.buffer = this.audioBuffer;
        var gainNode = this.audioContext.createGain()
        gainNode.gain.value = volume;
        gainNode.connect(this.audioContext.destination)
        bufferSource.connect(gainNode);

        return bufferSource;
    }

    play(volume: number): void {
        if ((Steg.soundOn) && (Steg.audioReady)) {
            if (this.audioBuffer) {
                var source: AudioBufferSourceNode = this.createSource(volume);
                source.loop = false;

                source.start();
            }
        }
    }

    getName(): string {
        return "Sound [" + this.url + "]";
    }


}