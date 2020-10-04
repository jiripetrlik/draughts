package draughts

import (
	"encoding/json"
	"log"
)

type client struct {
	ID     uint64
	State  *state
	Update chan []byte
}

func newClient() *client {
	return &client{
		ID:     0,
		State:  newState(),
		Update: make(chan []byte),
	}
}

type commandClient struct {
	C  *command
	CL *client
}

func newCommandClient(c *command, cl *client) *commandClient {
	return &commandClient{
		C:  c,
		CL: cl,
	}
}

type clientsPool struct {
	NextClientID   uint64
	Register       chan *client
	Unregister     chan *client
	ExecuteCommand chan *commandClient
	Clients        map[uint64]*client
}

func newClientsPool() *clientsPool {
	return &clientsPool{
		NextClientID:   0,
		Register:       make(chan *client),
		Unregister:     make(chan *client),
		ExecuteCommand: make(chan *commandClient),
		Clients:        make(map[uint64]*client),
	}
}

func (pool *clientsPool) Start() {
	for {
		select {
		case client := <-pool.Register:
			pool.registerClient(client)
		case client := <-pool.Unregister:
			pool.unregisterClient(client)
		case cs := <-pool.ExecuteCommand:
			pool.executeClientCommand(cs)
		}
	}
}

func (pool *clientsPool) registerClient(c *client) {
	pool.NextClientID++
	c.ID = pool.NextClientID
	pool.Clients[c.ID] = c
}

func (pool *clientsPool) unregisterClient(c *client) {
	if _, exists := pool.Clients[c.ID]; exists {
		delete(pool.Clients, c.ID)
		c.ID = 0
	}
}

func (pool *clientsPool) executeClientCommand(cs *commandClient) {
	clientIDs := cs.C.Execute(cs.CL, pool)
	pool.notifyClients(clientIDs)
}

func (pool *clientsPool) findPlayersIDsByStatus(status string) []uint64 {
	waitingPlayers := []uint64{}

	for _, c := range pool.Clients {
		if c.State.Status == status {
			waitingPlayers = append(waitingPlayers, c.ID)
		}
	}

	return waitingPlayers
}

func (pool *clientsPool) findPlayers(myID uint64) *players {
	players := newPlayers()

	for _, c := range pool.Clients {
		if c.ID != myID && c.State.Status == "waiting" {
			players.Waiting = append(players.Waiting, *newPlayer(c.ID, c.State.Name))
		}
	}

	return players
}

func (pool *clientsPool) notifyClients(clientIDs []uint64) {
	for _, ID := range clientIDs {
		cl := pool.Clients[ID]

		s := cl.State
		message, err := json.Marshal(s)
		if err != nil {
			log.Println(err)
			return
		}

		cl.Update <- message
	}
}
