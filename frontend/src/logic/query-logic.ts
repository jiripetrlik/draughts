interface Coordinates {
    X: number
    Y: number
}

type PieceColor = "white" | "black"

interface DraughtsPieces {
    Whitepieces: Array<Coordinates>
    Blackpieces: Array<Coordinates>
    Whitequeens: Array<Coordinates>
    Blackqueens: Array<Coordinates>
}

function arrayContainsPiece(row: number, column:number, pieceArray: Array<Coordinates>) {
    for (const i in pieceArray) {
        const coordinates = pieceArray[i]

        if (coordinates.X === row && coordinates.Y === column) {
            return true
        }
    }

    return false
}

function pieceType(row: number, column: number, pieces: DraughtsPieces) {
    if (arrayContainsPiece(row, column, pieces.Whitepieces)) {
        return "white-piece"
    }
    if (arrayContainsPiece(row, column, pieces.Blackpieces)) {
        return "black-piece"
    }
    if (arrayContainsPiece(row, column, pieces.Whitequeens)) {
        return "white-queen"
    }
    if (arrayContainsPiece(row, column, pieces.Blackqueens)) {
        return "black-queen"
    }

    return "none"
}

function containsPieceWithColor(row: number, column: number, color: PieceColor, pieces: DraughtsPieces) {
    if (color === "white") {
        if (arrayContainsPiece(row, column, pieces.Whitepieces)) {
            return true
        }
        if (arrayContainsPiece(row, column, pieces.Whitequeens)) {
            return true
        }
    } else {
        if (arrayContainsPiece(row, column, pieces.Blackpieces)) {
            return true
        }
        if (arrayContainsPiece(row, column, pieces.Blackqueens)) {
            return true
        }
    }

    return false
}

function invertColor(color: PieceColor): PieceColor {
    if (color === "white") {
        return "black"
    } else {
        return "white"
    }
}

function isInChessboard(row: number, column: number, size: number): boolean {
    if ((row < 0) || (row >= size)) {
        return false
    }
    if ((column < 0) || (column >= size)) {
        return false
    }

    return true
}

export type {Coordinates, PieceColor, DraughtsPieces}
export {containsPieceWithColor, pieceType, invertColor, isInChessboard}
