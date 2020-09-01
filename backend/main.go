package main

import (
	"fmt"
	"net/http"

	"github.com/jiripetrlik/draughts-react-go/pkg/draughts"
)

func setupRoutes() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Simple Server")
	})
	http.HandleFunc("/ws", draughts.ServeWs)
}

func main() {
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}
