# Chess JS

Chess app built using pure Javascript. It is for two players and it is fully functional. It has:

- All rules for figure movement including En passant and castle.
- Move indicator. When figure is selected all basic valid moves are shown. This excludes figures that would discover check by moving or when castling is disabled for any reason. This is on purpose as players are supposed to discover that for themselves.
- Pawn promotion. Players are able to choose promotion figure.
- Check detection.
- Checkmate detection.

## Logic

Chess board has been set up as 8x8 table where every square has its own index. This has been left on purpose in preview as well. Every figure has its own set of rules guiding how it will move. After and before every move whole board setup is checked for checks and checkmates and appropriate prompt is shown.

### General game flow logic

When new game is started white has first turn. Pieces are selected with a mose click. Program first checks weather piece of valid color has been seleceted and prompts player if not. Then, it highlights squares, if any, where that piece can move. When player clicks on one of the highlited squares program checks to see if that move is indeed valid (if moving figure would discover check move will not be allowed and prompt will alert player). If move is valid, piece is moved and game checks whole board to see if oposing king is checked or checkmated and shows correct prompt if necessary. Whole process is then repated until the end of the game. Pawns have adittional set of checks when played to see if they are avilable for promotion. If they are, player is prompted to chose figure which pawn will be promoted in to.

### Code

Board is first set up using fen chess notation. It is much easier for development and testing as with just one line of code board position can be set up as we want.

    table = fenToPosition("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")

Board is made of table 8x8. Each table cell is object containing information what is in it by assigning "color" and "piece" properties. Pieces are objects of their own containing white and black symbols in them. Here is a knight piece:

    knight: {
        black: "♞",
        white: "♘"
    },

Every figure has its own set of rules in a separate method:

    function knightMoves(idS) {
        const id = parseInt(idS, 10),
            color = table[id].color,
            moves = [],
            directions = [6, 15, 10, 17, -6, -15, -10, -17];
        for (let i = 0; i < directions.length; i++) {
            if (table[id + directions[i]] === undefined) continue;
            if (table[id + directions[i]].color === color) continue;
            if (!validJump(id, id + directions[i])) continue;
            moves.push(id + directions[i]);
        };
        return moves;
    };

Method checks all moves for knight at current position and returns all basic valid moves. 

idS - is id of table square
directions - is array of possible knight moves. As every table square has its own index. Top left being 0 and bottom right being 63 they are calculated by adding or substructing numbers from starting square to get knigh moves. Method then checks to each of those squares to see if they are valid moves. If they are out of table bounds or have friendly figure on them they will be skipped.

Queen moves are simplest as they are used by combining bishop and rook:

    function queenMoves(id) {
        return rookMoves(id).concat(bishopMoves(id));
    };

Apart from id each square has its own x/y coordinates which are used in calculations that cant be done as easy with just indexes. Method is used to get x/y coordinates from square index:

    function convertCell(id) {
      return [id % 8, Math.floor(id / 8)]
    };

In our knight example it used in validJump method to check if it out of bounds or otherwise invalid:

    function validJump(start, end) {
        const a = convertCell(start),
            b = convertCell(end);
        return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) === 3;
    };

Another important method is check function. It does two things. It returns whether check has occured and it modifes checkingFigures variable.

    function check(start, end, justCheck) {
        const before = table[start],
            after = table[end];

        let checkingFigures = [],
            color = before.color;

        if (justCheck) {
            color = color === "white" ? "black" : "white";
        };

        table[end] = before;
        table[start] = {};

        table.forEach((cell, id) => {
            if (Object.keys(cell).length > 0 && cell.color !== color) {
                checkingFigures.push(...showValidMoves(id));
            };
        });

        checkingFigures = checkFigures(checkingFigures, color);
        table[end] = after;
        table[start] = before;

        if (checkingFigures.length > 0) {
            checkingFigures = [];
            return true;
        };

        return false;
    };

justCheck - is boolean telling function weather it is validating if check has occured on this players's turn or if it is checking for presence of check for any other reason.

Method checks all figures of specified color and checks to see if in any of their valid moves there is a king of opposing color. If it is, that will be kept in checkingFigures array. If it is empty, there is no check, if it is not, check has occured. 

**Checkmate method** functions similar. If there is a check, king piece is checked to see if there are any valid moves for it. If there are not this still does not mean it is checkmate as another figure can block check or eat checking figure. Program is then performing all valid moves by all other figures to see if after any of them there is no check. If there is not, then it is checkmate.

# Tehnologies

Only thing used here is pure Javascript beside simple HTML and CSS. UI has not been in focus for this project so there is none worth mentioning. Simple alerts and prompts are used where needed. 

Site is hosted using GitHub Pages at https://stefanopuloz.github.io/Chess-JS/

## Created by Stefan Deak
