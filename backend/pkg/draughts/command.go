package draughts

import (
	"strconv"
)

type command struct {
	Name       string
	Parameters string
}

func (c *command) Execute(cl *client, pool *clientsPool) []uint64 {
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

				cl.Game = g
				parseGame(cl, g)
				oponent.Game = g
				parseGame(oponent, g)

				notifyClients = append(notifyClients, oponentID)
			}
		}
	}

	return notifyClients
}

func parseGame(cl *client, g *game) {
	cl.State.Status = "game"
	cl.State.Pieces = copyPieces(g.Pieces)
	cl.State.Messages = g.Messages
}
