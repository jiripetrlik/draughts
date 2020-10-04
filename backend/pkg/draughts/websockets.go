package draughts

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var Pool *clientsPool = newClientsPool()

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func reader(cl *client, conn *websocket.Conn) {
	defer func() {
		Pool.Unregister <- cl
		close(cl.Update)
	}()
	Pool.Register <- cl

	for {
		_, messageCommand, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		var c command
		err = json.Unmarshal(messageCommand, &c)
		if err != nil {
			log.Println(err)
			return
		}

		commandClient := newCommandClient(&c, cl)
		Pool.ExecuteCommand <- commandClient
	}
}

func writer(cl *client, conn *websocket.Conn) {
	for {
		message := <-cl.Update
		if err := conn.WriteMessage(websocket.TextMessage, message); err != nil {
			log.Println(err)
			return
		}
	}
}

func ServeWs(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Host)
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}

	cl := newClient()
	go writer(cl, ws)
	reader(cl, ws)
}
