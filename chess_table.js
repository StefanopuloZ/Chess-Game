/* exported pieces table selected moves */

const pieces = {
        pawn: {
            black: "♟",
            white: "♙"
        },
        rook: {
            black: "♜",
            white: "♖"
        },
        knight: {
            black: "♞",
            white: "♘"
        },
        bishop: {
            black: "♝",
            white: "♗"
        },
        queen: {
            black: "♛",
            white: "♕"
        },
        king: {
            black: "♚",
            white: "♔"
        }
    },
    table = fenToPosition("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"),
    // table = fenToPosition('4k2p/8/8/8/4Q3/8/3R4/8'),
    // table = fenToPosition('4k3/8/3q4/8/8/8/8/R3K2R'),
    selected = {
        from: -1,
        to: -1
    },
    moves = [];

function fenToPosition(fen) {
    const arr = [];
    fen = fen.replace(/\//g, '').split('');
    for (let i = 0; i < fen.length; i++) {
        if (fen[i] > 0) {
            for (let j = 0; j < fen[i]; j++) {
                arr.push({});
            }
        } else {
            const pairs = {
                    p: "pawn",
                    r: "rook",
                    n: "knight",
                    b: "bishop",
                    q: "queen",
                    k: "king"
                },
                color = /[A-Z]/.test(fen[i]) ? "white" : "black";
            let piece = "";
            for (let p in pairs) {
                if (fen[i].toLowerCase() === p) {
                    piece = fen[i].replace(fen[i], pairs[p]);
                }
            }
            arr.push({
                color,
                piece
            });
        };
    };
    return arr;
};
