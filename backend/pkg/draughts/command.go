package draughts

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
