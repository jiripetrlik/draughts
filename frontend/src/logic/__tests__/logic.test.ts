import {containsPieceWithColor, pieceType} from "../index"

const pieces = {
    Whitepieces: [{X: 0, Y: 0}, {X: 0, Y: 2}],
    Blackpieces: [{X: 6, Y: 2}, {X: 5, Y: 3}, {X: 4, Y: 4}],
    Whitequeens: [{X: 4, Y: 6}],
    Blackqueens: [{X: 6, Y: 6}, {X: 4, Y: 4}],
}

test('pieceType test', () => {
    expect(pieceType(0, 2, pieces)).toEqual("white-piece")
    expect(pieceType(4, 4, pieces)).toEqual("black-piece")
    expect(pieceType(4, 6, pieces)).toEqual("white-queen")
    expect(pieceType(6, 6, pieces)).toEqual("black-queen")
});

test('containsPieceWithColor test', () => {
    expect(containsPieceWithColor(0, 1, "white", pieces)).toBe(false)
    expect(containsPieceWithColor(0, 2, "white", pieces)).toBe(true)
    expect(containsPieceWithColor(4, 6, "white", pieces)).toBe(true)
    expect(containsPieceWithColor(6, 2, "white", pieces)).toBe(false)
    expect(containsPieceWithColor(4, 4, "white", pieces)).toBe(false)

    expect(containsPieceWithColor(7, 7, "black", pieces)).toBe(false)
    expect(containsPieceWithColor(5, 3, "black", pieces)).toBe(true)
    expect(containsPieceWithColor(6, 6, "black", pieces)).toBe(true)
    expect(containsPieceWithColor(0, 0, "black", pieces)).toBe(false)
    expect(containsPieceWithColor(4, 6, "black", pieces)).toBe(false)
});
