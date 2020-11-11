function containsPiece(row, column, pieceArray) {
    for (const i in pieceArray) {
        const coordinates = pieceArray[i]

        if (coordinates.X === row && coordinates.Y === column) {
            return true
        }
    }

    return false
}

function pieceType(row, column, pieces) {
    if (containsPiece(row, column, pieces.Whitepieces)) {
        return "white-piece"
    }
    if (containsPiece(row, column, pieces.Blackpieces)) {
        return "black-piece"
    }
    if (containsPiece(row, column, pieces.Whitequeens)) {
        return "white-queen"
    }
    if (containsPiece(row, column, pieces.Blackqueens)) {
        return "black-queen"
    }

    return "none"
}

export {pieceType}
