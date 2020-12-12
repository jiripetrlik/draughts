package main

import (
	"net/http"

	"github.com/jiripetrlik/draughts-react-go/pkg/draughts"
)

func setupRoutes() {
	fs := http.FileServer(http.Dir("./static-site"))
	http.Handle("/", fs)

	go draughts.Pool.Start()
	http.HandleFunc("/ws", draughts.ServeWs)
}

func main() {
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}
