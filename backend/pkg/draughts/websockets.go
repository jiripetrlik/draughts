package draughts

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func reader(conn *websocket.Conn) {
	s := newState()

	for {
		messageType, messageCommand, err := conn.ReadMessage()
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
		s = executeCommand(c, s)

		message, err := json.Marshal(s)
		if err != nil {
			log.Println(err)
			return
		}

		if err := conn.WriteMessage(messageType, []byte(message)); err != nil {
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

	reader((ws))
}
