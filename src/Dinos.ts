class Dinos {
    static ORDER = ["TREX", "DIPO", "DIME", "FLAP", "RAPTOR", "TRI"];

    static DATA = {
        TREX: {
            name: "Rex",
            tilesetUrl: "img/dino1.png",
            tileWidth: 256,
            tileHeight: 128,
            roarUrl: "audio/roar.mp3",
            midpoint: 116,
            tileset: null,
            roar: null,
            anims: {
                "idle": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                "move": [10, 11, 12, 13, 14, 15, 16, 17],
                "attack": [18, 19, 20, 21, 22, 23, 24, 25, 26, 27]
            },
            steps: true
        },

        DIPO: {
            name: "Dippy",
            tilesetUrl: "img/dino2.png",
            tileWidth: 309,
            tileHeight: 209,
            roarUrl: "audio/roar2.mp3",
            midpoint: 148,
            tileset: null,
            roar: null,
            anims: {
                "idle": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                "move": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
                "attack": [20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
            },
            steps: true
        },

        DIME: {
            name: "Freda",
            tilesetUrl: "img/dino3.png",
            tileWidth: 216,
            tileHeight: 128,
            roarUrl: "audio/roar3.mp3",
            midpoint: 80,
            tileset: null,
            roar: null,
            anims: {
                "idle": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                "move": [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
                "attack": [25, 26, 27, 28, 29, 30, 31, 32]
            },
            steps: true
        },

        FLAP: {
            name: "Flapper",
            tilesetUrl: "img/dino4.png",
            tileWidth: 200,
            tileHeight: 251,
            roarUrl: "audio/roar4.mp3",
            midpoint: 100,
            tileset: null,
            roar: null,
            anims: {
                "idle": [0, 1, 2, 3, 4],
                "move": [0, 1, 2, 3, 4],
                "attack": [0, 1, 2, 3, 4]
            },
            steps: false
        },

        RAPTOR: {
            name: "Raptor",
            tilesetUrl: "img/dino5.png",
            tileWidth: 176,
            tileHeight: 106,
            roarUrl: "audio/roar5.mp3",
            midpoint: 64,
            tileset: null,
            roar: null,
            anims: {
                "idle": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                "move": [10, 11, 12, 13, 14, 15, 16, 17],
                "attack": [18, 19, 20, 21, 22, 23, 24, 25, 26, 27]
            },
            steps: false
        },

        TRI: {
            name: "Spike",
            tilesetUrl: "img/dino6.png",
            tileWidth: 225,
            tileHeight: 124,
            roarUrl: "audio/roar.mp3",
            midpoint: 105,
            tileset: null,
            roar: null,
            anims: {
                "idle": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                "move": [10, 11, 12, 13, 14, 15, 16, 17],
                "attack": [18, 19, 20, 21, 22, 23, 24, 25]
            },
            steps: false
        }
    }
}