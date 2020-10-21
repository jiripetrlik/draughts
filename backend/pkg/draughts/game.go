package draughts

import (
	"math/rand"
)

type pieces struct {
	Whitepieces []piece
	Blackpieces []piece
	Whitequeens []piece
	Blackqueens []piece
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

	copy(p.Whitepieces, p2.Whitepieces)
	copy(p.Blackpieces, p2.Blackpieces)
	copy(p.Whitequeens, p2.Whitequeens)
	copy(p.Blackqueens, p2.Blackqueens)

	return p2
}

type piece struct {
	X int
	Y int
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

func (g *game) parseGame() {
	if g.WhitePlayer != nil {
		g.WhitePlayer.State.Status = "game"
		g.WhitePlayer.State.Pieces = copyPieces(g.Pieces)
		g.WhitePlayer.State.Messages = g.Messages
	}

	if g.BlackPlayer != nil {
		g.BlackPlayer.State.Status = "game"
		g.BlackPlayer.State.Pieces = copyPieces(g.Pieces)
		g.BlackPlayer.State.Messages = g.Messages
	}
}
