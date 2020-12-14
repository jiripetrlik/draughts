package main

import (
	"io"
	"net/http"
	"os"
	"strings"

	"github.com/jiripetrlik/draughts-react-go/pkg/draughts"
	"github.com/markbates/pkger"
)

func serveStatic(w http.ResponseWriter, r *http.Request) {
	file, err := pkger.Open("/static-site" + r.URL.Path)
	if err == os.ErrNotExist {
		http.NotFound(w, r)
		return
	} else if err != nil {
		http.Error(w, "Something bad happened", http.StatusInternalServerError)
		println(err)
		return
	}

	if strings.HasSuffix(r.URL.Path, ".css") {
		w.Header().Set("Content-Type", "text/css; charset=utf-8")
	}
	if strings.HasSuffix(r.URL.Path, ".js") {
		w.Header().Set("Content-Type", "text/javascript; charset=utf-8")
	}
	if strings.HasSuffix(r.URL.Path, ".svg") {
		w.Header().Set("Content-Type", "image/svg+xml; charset=utf-8")
	}
	io.Copy(w, file)
}

func setupRoutes() {
	http.HandleFunc("/", serveStatic)

	go draughts.Pool.Start()
	http.HandleFunc("/ws", draughts.ServeWs)
}

func main() {
	pkger.Include("/static-site")

	setupRoutes()
	http.ListenAndServe(":8080", nil)
}
