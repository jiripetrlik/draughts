package main

import (
	"embed"
	"net/http"
	"net/url"

	"github.com/jiripetrlik/draughts-react-go/pkg/draughts"
)

//go:embed static
var static embed.FS

func setupRoutes() {
	fs := http.FileServer(http.FS(static))
	http.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		r2 := new(http.Request)
		*r2 = *r
		r2.URL = new(url.URL)
		*r2.URL = *r.URL
		r2.URL.Path = "/static/content" + r.URL.Path
		r2.URL.RawPath = "/static/content" + r.URL.RawPath

		fs.ServeHTTP(w, r2)
	}))

	go draughts.Pool.Start()
	http.HandleFunc("/ws", draughts.ServeWs)
}

func main() {
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}
