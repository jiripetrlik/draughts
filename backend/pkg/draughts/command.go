package draughts

import (
	"encoding/json"
	"strconv"
	"strings"
)

type command struct {
	Name       string
	Parameters json.RawMessage
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
	case "leave-game":
		notifyClients = c.leaveCommand(cl, pool)
	}

	return notifyClients
}

func (c *command) loginCommand(cl *client, pool *clientsPool) []uint64 {
	cl.State.Status = "navigation"
	json.Unmarshal(c.Parameters, &cl.State.Name)
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

	var oponentIDString string
	json.Unmarshal(c.Parameters, &oponentIDString)
	if oponentID, err := strconv.ParseUint(oponentIDString, 10, 64); err == nil {
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

	var messageText string
	json.Unmarshal(c.Parameters, &messageText)
	if cl.State.Status == "game" {
		message := newMessage(cl.State.Name, messageText)

		if len(cl.Game.Messages) >= 7 {
			cl.Game.Messages = cl.Game.Messages[1:]
		}
		cl.Game.Messages = append(cl.Game.Messages, *message)
		cl.Game.parseGame()

		notifyClients = append(notifyClients, cl.Game.WhitePlayer.ID, cl.Game.BlackPlayer.ID)
	}

	return notifyClients
}

func (c *command) moveCommand(cl *client, pool *clientsPool) []uint64 {
	notifyClients := []uint64{}

	if cl.State.Status == "game" {
		var description moveDescription
		json.Unmarshal(c.Parameters, &description)

		cl.Game.doMove(description)
		cl.Game.parseGame()

		notifyClients = append(notifyClients, cl.Game.WhitePlayer.ID, cl.Game.BlackPlayer.ID)
	}

	return notifyClients
}

func (c *command) leaveCommand(cl *client, pool *clientsPool) []uint64 {
	notifyClients := []uint64{}

	if cl.State.Status == "game" && cl.Game != nil {
		if cl.Game.WhitePlayer == cl {
			if strings.Contains(cl.Game.NextMove, "won") == false {
				cl.Game.NextMove = "oponent-left"
			}
			cl.Game.WhitePlayer = nil
			if cl.Game.BlackPlayer != nil {
				notifyClients = append(notifyClients, cl.Game.BlackPlayer.ID)
			}
		}
		if cl.Game.BlackPlayer == cl {
			if strings.Contains(cl.Game.NextMove, "won") == false {
				cl.Game.NextMove = "oponent-left"
			}
			cl.Game.BlackPlayer = nil
			if cl.Game.WhitePlayer != nil {
				notifyClients = append(notifyClients, cl.Game.WhitePlayer.ID)
			}
		}
		cl.Game.parseGame()

		cl.State.Status = "navigation"
		cl.State.Players = pool.findPlayers(cl.ID)
		notifyClients = append(notifyClients, cl.ID)
	}

	return notifyClients
}
