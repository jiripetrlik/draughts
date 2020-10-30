package draughts

import (
	"strconv"
	"strings"
)

type command struct {
	Name       string
	Parameters string
}

func (c *command) execute(cl *client, pool *clientsPool) []uint64 {
	notifyClients := []uint64{}

	switch c.Name {
	case "login":
		notifyClients = c.loginCommand(cl, pool)
	case "wait":
		notifyClients = c.waitCommand(cl, pool)
	case "stop-waiting":
		notifyClients = c.stopWaitingCommand(cl, pool)
	case "join":
		notifyClients = c.joinCommand(cl, pool)
	case "message":
		notifyClients = c.messageCommand(cl, pool)
	case "move":
		notifyClients = c.moveCommand(cl, pool)
	}

	return notifyClients
}

func (c *command) loginCommand(cl *client, pool *clientsPool) []uint64 {
	cl.State.Status = "navigation"
	cl.State.Name = c.Parameters
	cl.State.Players = pool.findPlayers(cl.ID)

	return []uint64{cl.ID}
}

func (c *command) waitCommand(cl *client, pool *clientsPool) []uint64 {
	notifyClients := []uint64{cl.ID}

	cl.State.Status = "waiting"
	updatePlayers := pool.findPlayersIDsByStatus("navigation")
	for _, id := range updatePlayers {
		c := pool.Clients[id]
		c.State.Players = pool.findPlayers(id)
		notifyClients = append(notifyClients, id)
	}

	return notifyClients
}

func (c *command) stopWaitingCommand(cl *client, pool *clientsPool) []uint64 {
	notifyClients := []uint64{}

	cl.State.Status = "navigation"
	updatePlayers := pool.findPlayersIDsByStatus("navigation")
	for _, id := range updatePlayers {
		c := pool.Clients[id]
		c.State.Players = pool.findPlayers(id)
		notifyClients = append(notifyClients, id)
	}

	return notifyClients
}

func (c *command) joinCommand(cl *client, pool *clientsPool) []uint64 {
	notifyClients := []uint64{cl.ID}

	if oponentID, err := strconv.ParseUint(c.Parameters, 10, 64); err == nil {
		if oponent, ok := pool.Clients[oponentID]; ok {
			if oponent.State.Status == "waiting" {
				g := newGame(cl, oponent)
				g.initializeChessboard()
				g.parseGame()

				notifyClients = append(notifyClients, oponentID)
			}
		}
	}

	return notifyClients
}

func (c *command) messageCommand(cl *client, pool *clientsPool) []uint64 {
	notifyClients := []uint64{}

	if cl.State.Status == "game" {
		message := newMessage(cl.State.Name, c.Parameters)
		cl.Game.Messages = append(cl.Game.Messages, *message)
		cl.Game.parseGame()

		notifyClients = append(notifyClients, cl.Game.WhitePlayer.ID, cl.Game.BlackPlayer.ID)
	}

	return notifyClients
}

func (c *command) moveCommand(cl *client, pool *clientsPool) []uint64 {
	notifyClients := []uint64{}

	if cl.State.Status == "game" {
		parameters := strings.Split(c.Parameters, ";")
		pieceType := parameters[0]
		fromX, _ := strconv.Atoi(parameters[1])
		fromY, _ := strconv.Atoi(parameters[2])
		toX, _ := strconv.Atoi(parameters[3])
		toY, _ := strconv.Atoi(parameters[4])

		cl.Game.doMove(pieceType, fromX, fromY, toX, toY)
		cl.Game.parseGame()

		notifyClients = append(notifyClients, cl.Game.WhitePlayer.ID, cl.Game.BlackPlayer.ID)
	}

	return notifyClients
}
