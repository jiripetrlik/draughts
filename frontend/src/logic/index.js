function pieceType(row, column, pieces) {
    for (const i in pieces.Whitepieces) {
        const coordinates = pieces.Whitepieces[i]

        if (coordinates.X === row && coordinates.Y === column) {
            return "white-piece"
        }
    }

    for (const i in pieces.Blackpieces) {
        const coordinates = pieces.Blackpieces[i]

        if (coordinates.X === row && coordinates.Y === column) {
            return "black-piece"
        }
    }

    for (const i in pieces.Whitequeens) {
        const coordinates = pieces.Whitequeens[i]

        if (coordinates.X === row && coordinates.Y === column) {
            return "white-queen"
        }
    }

    for (const i in pieces.Blackqueens) {
        const coordinates = pieces.Blackqueens[i]

        if (coordinates.X === row && coordinates.Y === column) {
            return "black-queen"
        }
    }

    return "none"
}

export {pieceType}
