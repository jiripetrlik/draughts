import {pieceType} from "../index"

test('pieceType test', () => {
    const pieces = {
        Whitepieces: [{X: 0, Y: 0}, {X: 0, Y: 2}],
        Blackpieces: [{X: 6, Y: 2}, {X: 5, Y: 3}, {X: 4, Y: 4}],
        Whitequeens: [{X: 4, Y: 6}],
        Blackqueens: [{X: 6, Y: 6}, {X: 4, Y: 4}],
    }

    expect(pieceType(0, 2, pieces)).toEqual("white-piece")
    expect(pieceType(4, 4, pieces)).toEqual("black-piece")
    expect(pieceType(4, 6, pieces)).toEqual("white-queen")
    expect(pieceType(6, 6, pieces)).toEqual("black-queen")
});
