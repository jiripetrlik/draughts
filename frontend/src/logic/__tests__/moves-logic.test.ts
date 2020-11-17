import {isCoordinatesArrayEqual, isDraughtsPiecesEqual} from "../query-logic"
import {possibleMoves} from "../moves-logic"

const chessboardSize = 8

describe('possibleMoves test', () => {
    test('scenario 1', () => {
        const pieces = {
            Whitepieces: [{X: 0, Y: 0}],
            Blackpieces: [],
            Whitequeens: [],
            Blackqueens: [],
        }
        const expectedMoves = [{X: 1, Y: 1}]
    
        const moves = possibleMoves(0, 0, pieces, chessboardSize)
        expect(isCoordinatesArrayEqual(moves.map(m => m.destination), expectedMoves)).toBe(true)
        expect(isDraughtsPiecesEqual(moves[0].add, {
            Whitepieces: [{X: 1, Y: 1}],
            Blackpieces: [],
            Whitequeens: [],
            Blackqueens: []
        })).toBe(true)
        expect(isDraughtsPiecesEqual(moves[0].remove, {
            Whitepieces: [{X: 0, Y: 0}],
            Blackpieces: [],
            Whitequeens: [],
            Blackqueens: []
        })).toBe(true)
    });

    test('scenario 2', () => {
        const pieces = {
            Whitepieces: [],
            Blackpieces: [{X: 7, Y: 0}],
            Whitequeens: [],
            Blackqueens: [],
        }
        const expectedMoves = [{X: 6, Y: 1}]
    
        const moves = possibleMoves(7, 0, pieces, chessboardSize)
        expect(isCoordinatesArrayEqual(moves.map(m => m.destination), expectedMoves)).toBe(true)
    });

    test('scenario 3', () => {
        const pieces = {
            Whitepieces: [{X: 0, Y: 2}],
            Blackpieces: [],
            Whitequeens: [],
            Blackqueens: [],
        }
        const expectedMoves = [{X: 1, Y: 1}, {X: 1, Y: 3}]
    
        const moves = possibleMoves(0, 2, pieces, chessboardSize)
        expect(isCoordinatesArrayEqual(moves.map(m => m.destination), expectedMoves)).toBe(true)
    });

    test('scenario 4', () => {
        const pieces = {
            Whitepieces: [],
            Blackpieces: [{X: 7, Y: 2}],
            Whitequeens: [],
            Blackqueens: [],
        }
        const expectedMoves = [{X: 6, Y: 1}, {X: 6, Y: 3}]
    
        const moves = possibleMoves(7, 2, pieces, chessboardSize)
        expect(isCoordinatesArrayEqual(moves.map(m => m.destination), expectedMoves)).toBe(true)
    });

    test('scenario 5', () => {
        const pieces = {
            Whitepieces: [{X: 1, Y: 3}, {X: 3, Y: 4}],
            Blackpieces: [{X: 7, Y: 2}],
            Whitequeens: [{X: 7, Y: 7}],
            Blackqueens: [{X: 2, Y: 5}],
        }
        const expectedMoves = [{X: 2, Y: 2}, {X: 2, Y: 4}]
    
        const moves = possibleMoves(1, 3, pieces, chessboardSize)
        expect(isCoordinatesArrayEqual(moves.map(m => m.destination), expectedMoves)).toBe(true)
    });

    test('scenario 6', () => {
        const pieces = {
            Whitepieces: [{X: 1, Y: 4}, {X: 3, Y: 4}],
            Blackpieces: [{X: 7, Y: 2}],
            Whitequeens: [{X: 7, Y: 7}],
            Blackqueens: [{X: 2, Y: 5}],
        }
        const expectedMoves = [{X: 6, Y: 1}, {X: 6, Y: 3}]
    
        const moves = possibleMoves(7, 2, pieces, chessboardSize)
        expect(isCoordinatesArrayEqual(moves.map(m => m.destination), expectedMoves)).toBe(true)
    });

    test('scenario 7', () => {
        const pieces = {
            Whitepieces: [{X: 0, Y: 2}],
            Blackpieces: [{X: 1, Y: 3}],
            Whitequeens: [],
            Blackqueens: [],
        }
        const expectedMoves = [{X: 1, Y: 1}, {X: 2, Y: 4}]
    
        const moves = possibleMoves(0, 2, pieces, chessboardSize)
        expect(isCoordinatesArrayEqual(moves.map(m => m.destination), expectedMoves)).toBe(true)
    });

    test('scenario 8', () => {
        const pieces = {
            Whitepieces: [{X: 4, Y: 5}],
            Blackpieces: [{X: 5, Y: 6}],
            Whitequeens: [],
            Blackqueens: [],
        }
        const expectedMoves = [{X: 3, Y: 4}, {X: 4, Y: 7}]
    
        const moves = possibleMoves(5, 6, pieces, chessboardSize)
        expect(isCoordinatesArrayEqual(moves.map(m => m.destination), expectedMoves)).toBe(true)
        const moveIndex = moves.findIndex(m => m.destination.X == 3 && m.destination.Y == 4)
        expect(isDraughtsPiecesEqual(moves[moveIndex].add, {
            Whitepieces: [],
            Blackpieces: [{X: 3, Y: 4}],
            Whitequeens: [],
            Blackqueens: []
        })).toBe(true)
        expect(isDraughtsPiecesEqual(moves[moveIndex].remove, {
            Whitepieces: [{X: 4, Y: 5}],
            Blackpieces: [{X: 5, Y: 6}],
            Whitequeens: [],
            Blackqueens: []
        })).toBe(true)
    });
});
