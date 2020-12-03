package draughts

import (
	"errors"
	"math/rand"
)

const chessboardSize = 8

type pieces struct {
	Whitepieces []piece
	Blackpieces []piece
	Whitequeens []piece
	Blackqueens []piece
}

type moveDescription struct {
	Add         *pieces
	Remove      *pieces
	Destination *piece
}

func newPieces() *pieces {
	return &pieces{
		Whitepieces: []piece{},
		Blackpieces: []piece{},
		Whitequeens: []piece{},
		Blackqueens: []piece{},
	}
}

func copyPieces(p *pieces) *pieces {
	p2 := newPieces()

	p2.Whitepieces = make([]piece, len(p.Whitepieces))
	p2.Blackpieces = make([]piece, len(p.Blackpieces))
	p2.Whitequeens = make([]piece, len(p.Whitequeens))
	p2.Blackqueens = make([]piece, len(p.Blackqueens))

	copy(p2.Whitepieces, p.Whitepieces)
	copy(p2.Blackpieces, p.Blackpieces)
	copy(p2.Whitequeens, p.Whitequeens)
	copy(p2.Blackqueens, p.Blackqueens)

	return p2
}

type piece struct {
	X int
	Y int
}

func newPiece(X int, Y int) *piece {
	return &piece{
		X: X,
		Y: Y,
	}
}

func pieceIndex(x int, y int, pieces []piece) (int, error) {
	for i, p := range pieces {
		if (p.X == x) && (p.Y == y) {
			return i, nil
		}
	}

	return -1, errors.New("Not found")
}

type message struct {
	Name string
	Text string
}

func newMessage(Name string, Text string) *message {
	return &message{
		Name: Name,
		Text: Text,
	}
}

type game struct {
	WhitePlayer *client
	BlackPlayer *client
	NextMove    string
	Messages    []message
	Pieces      *pieces
}

func newGame(player1 *client, player2 *client) *game {
	r := rand.Int()

	g := &game{
		WhitePlayer: nil,
		BlackPlayer: nil,
		NextMove:    "white",
		Messages:    []message{},
		Pieces:      newPieces(),
	}
	if r%2 == 0 {
		g.WhitePlayer = player1
		g.BlackPlayer = player2
	} else {
		g.WhitePlayer = player2
		g.BlackPlayer = player1
	}

	player1.Game = g
	player2.Game = g

	return g
}

func (g *game) initializeChessboard() {
	g.NextMove = "white"

	for i := 0; i < chessboardSize; i++ {
		if i%2 == 0 {
			g.Pieces.Whitepieces = append(g.Pieces.Whitepieces, *newPiece(0, i))
			g.Pieces.Blackpieces = append(g.Pieces.Blackpieces, *newPiece(chessboardSize-2, i))
		} else {
			g.Pieces.Whitepieces = append(g.Pieces.Whitepieces, *newPiece(1, i))
			g.Pieces.Blackpieces = append(g.Pieces.Blackpieces, *newPiece(chessboardSize-1, i))
		}
	}
}

func (g *game) checkWinner() {
	if (len(g.Pieces.Whitepieces)) == 0 && (len(g.Pieces.Whitequeens) == 0) {
		g.NextMove = "black-won"
	}
	if (len(g.Pieces.Blackpieces)) == 0 && (len(g.Pieces.Blackqueens) == 0) {
		g.NextMove = "white-won"
	}
}

func (g *game) changeTurn() {
	if g.NextMove == "white" {
		g.NextMove = "black"
	} else if g.NextMove == "black" {
		g.NextMove = "white"
	}
}

func (g *game) doMove(description moveDescription) {
	deletePieces(&g.Pieces.Whitepieces, &description.Remove.Whitepieces)
	deletePieces(&g.Pieces.Blackpieces, &description.Remove.Blackpieces)
	deletePieces(&g.Pieces.Whitequeens, &description.Remove.Whitequeens)
	deletePieces(&g.Pieces.Blackqueens, &description.Remove.Blackqueens)

	g.Pieces.Whitepieces = append(g.Pieces.Whitepieces, description.Add.Whitepieces...)
	g.Pieces.Blackpieces = append(g.Pieces.Blackpieces, description.Add.Blackpieces...)
	g.Pieces.Whitequeens = append(g.Pieces.Whitequeens, description.Add.Whitequeens...)
	g.Pieces.Blackqueens = append(g.Pieces.Blackqueens, description.Add.Blackqueens...)

	g.checkWinner()
	g.changeTurn()
}

func (g *game) parseGame() {
	if g.WhitePlayer != nil {
		g.WhitePlayer.State.Status = "game"
		g.WhitePlayer.State.Color = "white"
		g.WhitePlayer.State.NextMove = g.NextMove
		g.WhitePlayer.State.Pieces = copyPieces(g.Pieces)
		g.WhitePlayer.State.Messages = g.Messages
	}

	if g.BlackPlayer != nil {
		g.BlackPlayer.State.Status = "game"
		g.BlackPlayer.State.Color = "black"
		g.BlackPlayer.State.NextMove = g.NextMove
		g.BlackPlayer.State.Pieces = copyPieces(g.Pieces)
		g.BlackPlayer.State.Messages = g.Messages
	}
}

func deletePieces(pieces *[]piece, toDelete *[]piece) {
	newPieces := make([]piece, 0, len(*pieces))
	for _, p := range *pieces {
		remove := false
		for _, d := range *toDelete {
			if p.X == d.X && p.Y == d.Y {
				remove = true
			}
		}

		if remove == false {
			newPieces = append(newPieces, p)
		}
	}

	*pieces = newPieces
}
